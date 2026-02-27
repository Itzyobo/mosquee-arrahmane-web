import { useEffect, useRef } from 'react';
import { usePrayerTimes } from './usePrayerTimes';

const PRAYER_NOTIF_KEY = 'prayer_notified_';
const CHECK_INTERVAL = 30 * 1000; // Vérifier toutes les 30 secondes
const CATCH_UP_WINDOW_MS = 5 * 60 * 1000; // Rattrapage si passée depuis < 5 min

/**
 * Hook qui vérifie toutes les 30s si une prière est due.
 * Approche par polling : fiable sur iOS et PC, survit aux mises en veille.
 * Vérifie la permission à chaque tick (pas besoin d'événement custom).
 */
export const usePrayerNotifications = () => {
    const { prayerTimes } = usePrayerTimes();
    const prayerTimesRef = useRef(prayerTimes);

    // Toujours garder la ref à jour
    useEffect(() => {
        prayerTimesRef.current = prayerTimes;
    }, [prayerTimes]);

    useEffect(() => {
        if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

        const checkPrayers = async () => {
            // Vérifier la permission à chaque tick (pas en paramètre)
            if (!('Notification' in window) || Notification.permission !== 'granted') return;

            const prayers = prayerTimesRef.current?.prayers;
            if (!prayers || prayers.length === 0) return;

            const now = new Date();
            const today = now.toISOString().slice(0, 10);

            // Nettoyage des clés d'hier
            const yesterday = new Date(now);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().slice(0, 10);
            prayers.forEach((prayer) => {
                localStorage.removeItem(`${PRAYER_NOTIF_KEY}${yesterdayStr}_${prayer.name}`);
            });

            // Obtenir le SW
            let registration: ServiceWorkerRegistration;
            try {
                registration = await Promise.race([
                    navigator.serviceWorker.ready,
                    new Promise<never>((_, reject) =>
                        setTimeout(() => reject(new Error('SW timeout')), 3000)
                    ),
                ]);
            } catch {
                return;
            }

            for (const prayer of prayers) {
                const [h, m] = prayer.adhan.split(':').map(Number);
                const target = new Date(now);
                target.setHours(h, m, 0, 0);

                const diffMs = now.getTime() - target.getTime();
                const notifKey = `${PRAYER_NOTIF_KEY}${today}_${prayer.name}`;

                // Déjà notifié → skip
                if (localStorage.getItem(notifKey)) continue;

                // La prière est due : elle vient de passer (0 à 5 min) ou pile maintenant
                if (diffMs >= 0 && diffMs <= CATCH_UP_WINDOW_MS) {
                    localStorage.setItem(notifKey, 'true');
                    try {
                        await registration.showNotification(`🕌 ${prayer.name} — Adhan`, {
                            body: `Il est ${prayer.adhan}. C'est l'heure de la prière ${prayer.name}. Iqama à ${prayer.iqama}.`,
                            icon: '/pwa-192x192.png',
                            badge: '/pwa-192x192.png',
                            tag: `prayer-${prayer.name}-${today}`,
                            data: { url: '/prieres' },
                        });
                        console.log(`[PrayerNotif] ✅ Notification ${prayer.name}`);
                    } catch (err) {
                        console.error(`[PrayerNotif] ❌ Erreur ${prayer.name}:`, err);
                        // Retirer la clé pour réessayer au prochain tick
                        localStorage.removeItem(notifKey);
                    }
                }
            }
        };

        // Vérifier immédiatement au montage
        checkPrayers();

        // Puis toutes les 30s
        const interval = setInterval(checkPrayers, CHECK_INTERVAL);

        // Au retour au premier plan, vérifier immédiatement
        const handleVisibility = () => {
            if (document.visibilityState === 'visible') {
                checkPrayers();
            }
        };
        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            clearInterval(interval);
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, []); // Aucune dépendance → un seul intervalle stable
};
