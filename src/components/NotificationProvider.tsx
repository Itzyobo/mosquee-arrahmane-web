import { useState, useEffect } from 'react';
import { usePrayerNotifications } from '@/hooks/usePrayerNotifications';
import { useAnnouncementNotifications } from '@/hooks/useAnnouncementNotifications';

/**
 * Composant invisible qui active les notifications push :
 * - Horaires de prière (notification à l'heure de l'adhan)
 * - Nouvelles annonces (vérification toutes les 5 min)
 *
 * Écoute le changement de permission via un événement custom
 * dispatché par PushNotificationButton pour réactiver les hooks.
 */
export function NotificationProvider() {
    const [permissionGranted, setPermissionGranted] = useState(
        typeof window !== 'undefined' &&
        'Notification' in window &&
        Notification.permission === 'granted'
    );

    useEffect(() => {
        // Écouter les changements de permission (depuis PushNotificationButton)
        const handlePermissionChange = () => {
            const granted =
                typeof window !== 'undefined' &&
                'Notification' in window &&
                Notification.permission === 'granted';
            setPermissionGranted(granted);
        };

        window.addEventListener('notification-permission-changed', handlePermissionChange);

        // Vérifier aussi au retour au premier plan (cas iOS qui peut révoquer)
        const handleVisibility = () => {
            if (document.visibilityState === 'visible') {
                handlePermissionChange();
            }
        };
        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            window.removeEventListener('notification-permission-changed', handlePermissionChange);
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, []);

    usePrayerNotifications(permissionGranted);
    useAnnouncementNotifications(permissionGranted);
    return null;
}
