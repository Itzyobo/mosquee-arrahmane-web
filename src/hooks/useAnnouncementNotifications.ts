import { useEffect, useRef } from 'react';

const ANNOUNCEMENTS_API = 'https://api.sheety.co/081e9cf1a69c44c55df8cb87d1baab84/annoncemosquee/feuille1';
const LAST_SEEN_KEY = 'last_seen_announcement_id';
const CHECK_INTERVAL = 30 * 1000; // 30 secondes — plus réactif
const RETRY_INTERVAL = 10 * 1000; // Réessayer après 10s en cas d'erreur

interface SheetyItem {
    id: number;
    titre: string;
    description: string;
    date: string;
    "typeD'annonce"?: string;
}

/**
 * Hook qui vérifie les nouvelles annonces toutes les 30s.
 * - Vérifie la permission directement (pas de prop)
 * - Anti-cache agressif (headers + query param)
 * - Retry automatique en cas d'erreur
 * - Timeout SW augmenté pour iOS (10s)
 */
export const useAnnouncementNotifications = () => {
    const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

        let swRegistration: ServiceWorkerRegistration | null = null;

        // Pré-récupérer le SW registration une seule fois
        const initSW = async () => {
            try {
                swRegistration = await Promise.race([
                    navigator.serviceWorker.ready,
                    new Promise<never>((_, reject) =>
                        setTimeout(() => reject(new Error('SW init timeout')), 10000)
                    ),
                ]);
                console.log('[AnnouncementNotif] SW prêt');
            } catch {
                console.warn('[AnnouncementNotif] SW non disponible');
            }
        };

        const sendNotification = async (
            registration: ServiceWorkerRegistration,
            article: SheetyItem
        ): Promise<boolean> => {
            const category = article["typeD'annonce"] || 'Annonce';
            const title = `${category} | ${article.titre}`;
            const body = article.description || '';

            try {
                await registration.showNotification(title, {
                    body,
                    icon: '/pwa-192x192.png',
                    badge: '/pwa-192x192.png',
                    tag: `announcement-${article.id}-${Date.now()}`,
                    data: { url: '/actualites' },
                });
                console.log(`[AnnouncementNotif] ✅ "${title}"`);
                return true;
            } catch (err) {
                console.error(`[AnnouncementNotif] ❌ Erreur:`, err);
                return false;
            }
        };

        const checkAnnouncements = async () => {
            // 1. Vérifier la permission à chaque tick
            if (!('Notification' in window) || Notification.permission !== 'granted') {
                return;
            }

            // 2. Vérifier que le SW est prêt
            if (!swRegistration) {
                await initSW();
                if (!swRegistration) return;
            }

            // 3. Vérifier que le SW est toujours actif (peut mourir sur iOS)
            if (!swRegistration.active) {
                console.warn('[AnnouncementNotif] SW inactif, ré-initialisation...');
                swRegistration = null;
                await initSW();
                if (!swRegistration) return;
            }

            try {
                // 4. Fetch avec anti-cache agressif
                const cacheBust = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
                const url = `${ANNOUNCEMENTS_API}?_nocache=${cacheBust}`;

                const controller = new AbortController();
                const fetchTimeout = setTimeout(() => controller.abort(), 8000);

                const response = await fetch(url, {
                    cache: 'no-store',
                    signal: controller.signal,
                    headers: {
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                    },
                });
                clearTimeout(fetchTimeout);

                if (!response.ok) {
                    console.warn(`[AnnouncementNotif] API status ${response.status}`);
                    scheduleRetry();
                    return;
                }

                const data = await response.json();

                if (!data.feuille1 || data.feuille1.length === 0) return;

                const articles: SheetyItem[] = data.feuille1;
                const latestArticle = articles[articles.length - 1];
                const lastSeenId = localStorage.getItem(LAST_SEEN_KEY);

                // Premier lancement : sauvegarder baseline sans notifier
                if (!lastSeenId) {
                    localStorage.setItem(LAST_SEEN_KEY, String(latestArticle.id));
                    console.log(`[AnnouncementNotif] Baseline = ${latestArticle.id}`);
                    return;
                }

                const lastSeenIdNum = parseInt(lastSeenId, 10);
                const newArticles = articles.filter((item) => item.id > lastSeenIdNum);

                if (newArticles.length === 0) return;

                console.log(`[AnnouncementNotif] ${newArticles.length} nouvelle(s) annonce(s)`);

                let allSent = true;
                for (const article of newArticles) {
                    const success = await sendNotification(swRegistration, article);
                    if (!success) {
                        allSent = false;
                        // Si le SW a crashé, le ré-initialiser
                        swRegistration = null;
                        await initSW();
                        if (swRegistration) {
                            // Réessayer avec le nouveau SW
                            await sendNotification(swRegistration, article);
                        }
                    }
                }

                // Mettre à jour uniquement si au moins certaines notifs ont été envoyées
                if (allSent) {
                    localStorage.setItem(LAST_SEEN_KEY, String(latestArticle.id));
                }
            } catch (error) {
                if ((error as Error).name === 'AbortError') {
                    console.warn('[AnnouncementNotif] Timeout API');
                } else {
                    console.error('[AnnouncementNotif] Erreur:', error);
                }
                scheduleRetry();
            }
        };

        const scheduleRetry = () => {
            if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
            retryTimeoutRef.current = setTimeout(checkAnnouncements, RETRY_INTERVAL);
        };

        // Initialiser le SW
        initSW();

        // Premier check après 2s
        const initialTimeout = setTimeout(checkAnnouncements, 2000);

        // Puis toutes les 30s
        const interval = setInterval(checkAnnouncements, CHECK_INTERVAL);

        // Au retour au premier plan : check immédiat + ré-init SW si besoin
        const handleVisibility = () => {
            if (document.visibilityState === 'visible') {
                console.log('[AnnouncementNotif] Retour au premier plan');
                // Ré-init SW au cas où iOS l'a tué
                swRegistration = null;
                initSW().then(() => checkAnnouncements());
            }
        };
        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
            if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, []);
};
