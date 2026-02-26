import { usePrayerNotifications } from '@/hooks/usePrayerNotifications';
import { useAnnouncementNotifications } from '@/hooks/useAnnouncementNotifications';

/**
 * Composant invisible qui active les notifications push :
 * - Horaires de prière (notification à l'heure de l'adhan)
 * - Nouvelles annonces (vérification toutes les 5 min)
 */
export function NotificationProvider() {
    usePrayerNotifications();
    useAnnouncementNotifications();
    return null;
}
