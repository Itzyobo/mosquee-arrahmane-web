import { useEffect, useRef, useCallback } from 'react';

const ANNOUNCEMENTS_API = 'https://api.sheety.co/081e9cf1a69c44c55df8cb87d1baab84/annoncemosquee/feuille1';
const LAST_SEEN_KEY = 'last_seen_announcement_id';
const CHECK_INTERVAL = 60 * 1000; // 1 minute (plus réactif)

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
        if (!permissionGranted) {
            console.log('[AnnouncementNotif] Permission non accordée, skip');
            return;
        }
        if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
            console.log('[AnnouncementNotif] SW non supporté, skip');
            return;
        }

        try {
            // Cache-bust pour toujours avoir les données fraîches
            const url = `${ANNOUNCEMENTS_API}?_t=${Date.now()}`;
            const response = await fetch(url, { cache: 'no-store' });
            const data = await response.json();

            if (!data.feuille1 || data.feuille1.length === 0) {
                console.log('[AnnouncementNotif] Aucune annonce trouvée');
                return;
            }

            const articles: SheetyItem[] = data.feuille1;
            const latestArticle = articles[articles.length - 1];
            const lastSeenId = localStorage.getItem(LAST_SEEN_KEY);

            console.log(`[AnnouncementNotif] Dernier ID API: ${latestArticle.id}, Dernier ID vu: ${lastSeenId}`);

            // Premier lancement : sauvegarder l'ID sans notifier
            if (!lastSeenId) {
                localStorage.setItem(LAST_SEEN_KEY, String(latestArticle.id));
                console.log(`[AnnouncementNotif] Premier lancement, baseline ID = ${latestArticle.id}`);
                return;
            }

            const lastSeenIdNum = parseInt(lastSeenId, 10);

            // Trouver toutes les nouvelles annonces (ID > dernier vu)
            const newArticles = articles.filter((item) => item.id > lastSeenIdNum);

            if (newArticles.length === 0) {
                console.log('[AnnouncementNotif] Pas de nouvelles annonces');
                return;
            }

            console.log(`[AnnouncementNotif] ${newArticles.length} nouvelle(s) annonce(s) détectée(s)`);

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

                console.log(`[AnnouncementNotif] Envoi notification: "${title}"`);

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
                    console.log(`[AnnouncementNotif] ✅ Notification envoyée pour annonce ${article.id}`);
                } catch (err) {
                    console.error(`[AnnouncementNotif] ❌ Erreur notification annonce ${article.id}:`, err);
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

        // Vérifier au démarrage (petit délai)
        const initialTimeout = setTimeout(checkForNewAnnouncements, 2000);

        // Puis vérifier toutes les minutes
        intervalRef.current = setInterval(checkForNewAnnouncements, CHECK_INTERVAL);

        // Quand l'app revient au premier plan, vérifier immédiatement
        const handleVisibility = () => {
            if (document.visibilityState === 'visible') {
                console.log('[AnnouncementNotif] App revenue au premier plan, vérification...');
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
