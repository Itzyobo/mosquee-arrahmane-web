import { usePrayerNotifications } from '@/hooks/usePrayerNotifications';
import { useAnnouncementNotifications } from '@/hooks/useAnnouncementNotifications';

/**
 * Composant invisible qui active les notifications :
 * - Horaires de prière (vérification toutes les 30s)
 * - Nouvelles annonces (vérification toutes les 60s)
 *
 * Les hooks vérifient la permission directement à chaque tick.
 * Aucun état ni événement custom nécessaire.
 */
export function NotificationProvider() {
    usePrayerNotifications();
    useAnnouncementNotifications();
    return null;
}
