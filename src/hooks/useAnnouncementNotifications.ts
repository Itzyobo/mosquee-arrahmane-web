import { useEffect, useRef } from 'react';

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
export const useAnnouncementNotifications = () => {
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (
            typeof window === 'undefined' ||
            !('Notification' in window) ||
            Notification.permission !== 'granted' ||
            !('serviceWorker' in navigator)
        ) {
            return;
        }

        const checkForNewAnnouncements = async () => {
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

                // Envoyer une notification pour chaque nouvelle annonce
                const registration = await navigator.serviceWorker.ready;

                for (const article of newArticles) {
                    const category = article["typeD'annonce"] || 'Annonce';
                    const title = `${category} | ${article.titre}`;
                    const body = article.description || '';

                    await registration.showNotification(title, {
                        body,
                        icon: '/pwa-192x192.png',
                        badge: '/pwa-192x192.png',
                        tag: `announcement-${article.id}`,
                        data: { url: '/actualites' },
                    });
                }

                // Mettre à jour le dernier ID vu
                localStorage.setItem(LAST_SEEN_KEY, String(latestArticle.id));
            } catch (error) {
                console.error('Erreur vérification annonces:', error);
            }
        };

        // Vérifier au démarrage (avec petit délai pour pas bloquer le chargement)
        const initialTimeout = setTimeout(checkForNewAnnouncements, 5000);

        // Puis vérifier toutes les 5 minutes
        intervalRef.current = setInterval(checkForNewAnnouncements, CHECK_INTERVAL);

        return () => {
            clearTimeout(initialTimeout);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);
};
