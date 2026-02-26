import { useEffect, useRef } from 'react';
import { usePrayerTimes } from './usePrayerTimes';

const PRAYER_NOTIF_KEY = 'prayer_notified_';

/**
 * Hook qui envoie une notification locale quand l'heure d'une prière est atteinte.
 * Vérifie chaque 30 secondes si l'adhan d'une prière correspond à l'heure actuelle.
 */
export const usePrayerNotifications = () => {
    const { prayerTimes } = usePrayerTimes();
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        // Ne rien faire si les notifications ne sont pas supportées ou non permises
        if (
            typeof window === 'undefined' ||
            !('Notification' in window) ||
            Notification.permission !== 'granted' ||
            !('serviceWorker' in navigator)
        ) {
            return;
        }

        if (!prayerTimes?.prayers || prayerTimes.prayers.length === 0) {
            return;
        }

        const checkPrayerTimes = () => {
            const now = new Date();
            const currentHours = now.getHours();
            const currentMinutes = now.getMinutes();
            const today = now.toISOString().slice(0, 10); // YYYY-MM-DD

            prayerTimes.prayers.forEach((prayer) => {
                const [prayerHours, prayerMinutes] = prayer.adhan.split(':').map(Number);

                // Notifier à l'heure exacte de l'adhan (même minute)
                if (currentHours === prayerHours && currentMinutes === prayerMinutes) {
                    const notifKey = `${PRAYER_NOTIF_KEY}${today}_${prayer.name}`;

                    // Éviter les doublons : ne notifier qu'une fois par prière par jour
                    if (localStorage.getItem(notifKey)) {
                        return;
                    }

                    localStorage.setItem(notifKey, 'true');

                    // Envoyer via le Service Worker pour iOS compatibilité
                    navigator.serviceWorker.ready.then((registration) => {
                        registration.showNotification(`🕌 ${prayer.name} — Adhan`, {
                            body: `Il est ${prayer.adhan}. C'est l'heure de la prière ${prayer.name}. Iqama à ${prayer.iqama}.`,
                            icon: '/pwa-192x192.png',
                            badge: '/pwa-192x192.png',
                            tag: `prayer-${prayer.name}-${today}`,
                            data: { url: '/prieres' },
                        });
                    });
                }
            });

            // Nettoyage des anciennes clés (jour précédent)
            const yesterday = new Date(now);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().slice(0, 10);
            prayerTimes.prayers.forEach((prayer) => {
                localStorage.removeItem(`${PRAYER_NOTIF_KEY}${yesterdayStr}_${prayer.name}`);
            });
        };

        // Vérifier toutes les 30 secondes
        checkPrayerTimes();
        intervalRef.current = setInterval(checkPrayerTimes, 30_000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [prayerTimes]);
};
