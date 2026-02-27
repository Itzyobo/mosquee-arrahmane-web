import { useEffect, useRef, useCallback } from 'react';
import { usePrayerTimes } from './usePrayerTimes';

const PRAYER_NOTIF_KEY = 'prayer_notified_';

// Fenêtre de "rattrapage" en ms : si une prière est passée depuis moins de 5 min
// et qu'on n'a pas encore notifié, on envoie la notification immédiatement.
const CATCH_UP_WINDOW_MS = 5 * 60 * 1000;

/**
 * Hook qui envoie une notification pile à la seconde de l'adhan.
 * Gère aussi le retour au premier plan (visibilitychange) pour
 * reprogrammer les timers et rattraper les prières manquées.
 */
export const usePrayerNotifications = (permissionGranted: boolean) => {
    const { prayerTimes } = usePrayerTimes();
    const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    const scheduleNotifications = useCallback(async () => {
        // Nettoyer les anciens timers
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];

        if (!permissionGranted) return;
        if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
        if (!prayerTimes?.prayers || prayerTimes.prayers.length === 0) return;

        // Attendre que le SW soit prêt (avec timeout de 5s pour éviter de bloquer)
        let registration: ServiceWorkerRegistration;
        try {
            registration = await Promise.race([
                navigator.serviceWorker.ready,
                new Promise<never>((_, reject) =>
                    setTimeout(() => reject(new Error('SW ready timeout')), 5000)
                ),
            ]);
        } catch {
            console.warn('[PrayerNotif] Service Worker non prêt, notifications désactivées');
            return;
        }

        const now = new Date();
        const today = now.toISOString().slice(0, 10);

        // Nettoyage des clés d'hier
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().slice(0, 10);
        prayerTimes.prayers.forEach((prayer) => {
            localStorage.removeItem(`${PRAYER_NOTIF_KEY}${yesterdayStr}_${prayer.name}`);
        });

        for (const prayer of prayerTimes.prayers) {
            const [prayerHours, prayerMinutes] = prayer.adhan.split(':').map(Number);

            const target = new Date(now);
            target.setHours(prayerHours, prayerMinutes, 0, 0);

            const delayMs = target.getTime() - now.getTime();
            const notifKey = `${PRAYER_NOTIF_KEY}${today}_${prayer.name}`;

            // Déjà notifié aujourd'hui → skip
            if (localStorage.getItem(notifKey)) continue;

            if (delayMs > 0) {
                // Prière dans le futur → programmer le timer
                const timeout = setTimeout(async () => {
                    if (localStorage.getItem(notifKey)) return;
                    localStorage.setItem(notifKey, 'true');

                    try {
                        await registration.showNotification(`🕌 ${prayer.name} — Adhan`, {
                            body: `Il est ${prayer.adhan}. C'est l'heure de la prière ${prayer.name}. Iqama à ${prayer.iqama}.`,
                            icon: '/pwa-192x192.png',
                            badge: '/pwa-192x192.png',
                            tag: `prayer-${prayer.name}-${today}`,
                            renotify: true,
                            vibrate: [200, 100, 200],
                            data: { url: '/prieres' },
                        } as any);
                    } catch (err) {
                        console.error(`[PrayerNotif] Erreur envoi notification ${prayer.name}:`, err);
                    }
                }, delayMs);

                timeoutsRef.current.push(timeout);
            } else if (Math.abs(delayMs) <= CATCH_UP_WINDOW_MS) {
                // Prière passée depuis < 5 min (retour au premier plan) → notifier immédiatement
                localStorage.setItem(notifKey, 'true');

                try {
                    await registration.showNotification(`🕌 ${prayer.name} — Adhan`, {
                        body: `Il est ${prayer.adhan}. C'est l'heure de la prière ${prayer.name}. Iqama à ${prayer.iqama}.`,
                        icon: '/pwa-192x192.png',
                        badge: '/pwa-192x192.png',
                        tag: `prayer-${prayer.name}-${today}`,
                        renotify: true,
                        vibrate: [200, 100, 200],
                        data: { url: '/prieres' },
                    } as any);
                } catch (err) {
                    console.error(`[PrayerNotif] Erreur envoi notification rattrapage ${prayer.name}:`, err);
                }
            }
            // sinon : prière passée depuis > 5 min → on ne notifie pas
        }
    }, [prayerTimes, permissionGranted]);

    useEffect(() => {
        scheduleNotifications();

        // Quand l'app revient au premier plan, reprogrammer les timers
        const handleVisibility = () => {
            if (document.visibilityState === 'visible') {
                scheduleNotifications();
            }
        };

        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current = [];
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, [scheduleNotifications]);
};
