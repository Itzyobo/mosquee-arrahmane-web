import { useEffect, useRef, useCallback } from 'react';

const ANNOUNCEMENTS_API = 'https://api.sheety.co/081e9cf1a69c44c55df8cb87d1baab84/annoncemosquee/feuille1';
const LAST_SEEN_KEY = 'last_seen_announcement_id';
const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

interface SheetyItem {
    id: number;
    titre: string;
    description: string;
    date: string;
    "typeD'annonce"?: string;
}

/**
 * Hook qui vérifie périodiquement les nouvelles annonces de la mosquée
 * et envoie une notification pour chaque nouvelle annonce.
 *
 * Format de notification :
 *   Header : Type d'annonce | Titre
 *   Body   : description
 */
export const useAnnouncementNotifications = (permissionGranted: boolean) => {
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const checkForNewAnnouncements = useCallback(async () => {
        if (!permissionGranted) return;
        if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

        try {
            const response = await fetch(ANNOUNCEMENTS_API);
            const data = await response.json();

            if (!data.feuille1 || data.feuille1.length === 0) return;

            const articles: SheetyItem[] = data.feuille1;
            const latestArticle = articles[articles.length - 1];
            const lastSeenId = localStorage.getItem(LAST_SEEN_KEY);

            // Premier lancement : sauvegarder l'ID sans notifier
            if (!lastSeenId) {
                localStorage.setItem(LAST_SEEN_KEY, String(latestArticle.id));
                return;
            }

            const lastSeenIdNum = parseInt(lastSeenId, 10);

            // Trouver toutes les nouvelles annonces (ID > dernier vu)
            const newArticles = articles.filter((item) => item.id > lastSeenIdNum);

            if (newArticles.length === 0) return;

            // Attendre que le SW soit prêt (avec timeout)
            let registration: ServiceWorkerRegistration;
            try {
                registration = await Promise.race([
                    navigator.serviceWorker.ready,
                    new Promise<never>((_, reject) =>
                        setTimeout(() => reject(new Error('SW ready timeout')), 5000)
                    ),
                ]);
            } catch {
                console.warn('[AnnouncementNotif] Service Worker non prêt');
                return;
            }

            // Envoyer une notification pour chaque nouvelle annonce
            for (const article of newArticles) {
                const category = article["typeD'annonce"] || 'Annonce';
                const title = `${category} | ${article.titre}`;
                const body = article.description || '';

                try {
                    await registration.showNotification(title, {
                        body,
                        icon: '/pwa-192x192.png',
                        badge: '/pwa-192x192.png',
                        tag: `announcement-${article.id}`,
                        renotify: true,
                        vibrate: [200, 100, 200],
                        data: { url: '/actualites' },
                    } as any);
                } catch (err) {
                    console.error(`[AnnouncementNotif] Erreur notification annonce ${article.id}:`, err);
                }
            }

            // Mettre à jour le dernier ID vu
            localStorage.setItem(LAST_SEEN_KEY, String(latestArticle.id));
        } catch (error) {
            console.error('[AnnouncementNotif] Erreur vérification annonces:', error);
        }
    }, [permissionGranted]);

    useEffect(() => {
        if (!permissionGranted) return;

        // Vérifier au démarrage (avec petit délai pour pas bloquer le chargement)
        const initialTimeout = setTimeout(checkForNewAnnouncements, 3000);

        // Puis vérifier toutes les 5 minutes
        intervalRef.current = setInterval(checkForNewAnnouncements, CHECK_INTERVAL);

        // Quand l'app revient au premier plan, vérifier immédiatement
        const handleVisibility = () => {
            if (document.visibilityState === 'visible') {
                checkForNewAnnouncements();
            }
        };

        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            clearTimeout(initialTimeout);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, [permissionGranted, checkForNewAnnouncements]);
};
