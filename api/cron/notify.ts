import type { VercelRequest, VercelResponse } from '@vercel/node';
import webpush from 'web-push';
import { getSubscriptions, saveSubscriptions, getState, saveState } from '../lib/subscriptions.js';

// ——— Configuration VAPID ———
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || '';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || '';
const VAPID_EMAIL = process.env.VAPID_EMAIL || 'mailto:contact@arrahman.fr';

webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

// ——— APIs ———
const PRAYER_API = 'https://mawaqit-api-tedl2a.fly.dev/api/v1/rahmane-decines-charpieu/prayer-times';
const ANNOUNCEMENTS_API = 'https://api.sheety.co/081e9cf1a69c44c55df8cb87d1baab84/annoncemosquee/feuille1';

// ——— Constantes ———
const PRAYER_NAMES = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const API_FIELDS = ['fajr', 'dohr', 'asr', 'maghreb', 'icha'];
const CATCH_UP_WINDOW = 2; // minutes — fenêtre de rattrapage

interface SheetyItem {
    id: number;
    titre: string;
    description: string;
    "typeD'annonce"?: string;
}

// ——— Helper : envoyer un push à tous les abonnés ———
async function sendPushToAll(payload: { title: string; body: string; tag: string; url: string }) {
    const subs = getSubscriptions();
    if (subs.length === 0) {
        console.log('[Cron] Aucun abonné');
        return;
    }

    const invalidEndpoints: string[] = [];

    for (const sub of subs) {
        try {
            await webpush.sendNotification(
                {
                    endpoint: sub.endpoint,
                    keys: sub.keys,
                },
                JSON.stringify(payload),
                { TTL: 300 } // Le push expire après 5 min
            );
            console.log(`[Cron] ✅ Push envoyé à ${sub.endpoint.slice(0, 50)}...`);
        } catch (err: any) {
            console.error(`[Cron] ❌ Push échoué:`, err?.statusCode || err?.message);
            // 404 ou 410 = subscription expirée → la retirer
            if (err?.statusCode === 404 || err?.statusCode === 410) {
                invalidEndpoints.push(sub.endpoint);
            }
        }
    }

    // Nettoyer les subscriptions expirées
    if (invalidEndpoints.length > 0) {
        const validSubs = subs.filter(s => !invalidEndpoints.includes(s.endpoint));
        saveSubscriptions(validSubs);
        console.log(`[Cron] 🧹 ${invalidEndpoints.length} subscription(s) expirée(s) retirée(s)`);
    }
}

// ——— Helper : calculer l'iqama ———
function calculateIqama(adhanTime: string, prayerName: string): string {
    const [hours, minutes] = adhanTime.split(':').map(Number);
    const additionalMinutes = prayerName === 'Maghrib' ? 7 : 10;
    const totalMinutes = hours * 60 + minutes + additionalMinutes;
    const iqamaHours = Math.floor(totalMinutes / 60);
    const iqamaMinutes = totalMinutes % 60;
    return `${String(iqamaHours).padStart(2, '0')}:${String(iqamaMinutes).padStart(2, '0')}`;
}

// ——— Vérifier les prières ———
async function checkPrayers() {
    try {
        const res = await fetch(PRAYER_API);
        if (!res.ok) {
            console.warn(`[Cron] Prayer API status ${res.status}`);
            return;
        }
        const data = await res.json();

        // Heure actuelle (fuseau Europe/Paris pour la France)
        const now = new Date();
        const parisTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
        const currentHours = parisTime.getHours();
        const currentMinutes = parisTime.getMinutes();
        const currentTotalMin = currentHours * 60 + currentMinutes;
        const today = parisTime.toISOString().slice(0, 10);

        const state = getState();

        // Nettoyer les dates passées
        for (const dateKey of Object.keys(state.notifiedPrayers)) {
            if (dateKey !== today) {
                delete state.notifiedPrayers[dateKey];
            }
        }
        if (!state.notifiedPrayers[today]) {
            state.notifiedPrayers[today] = [];
        }

        for (let i = 0; i < PRAYER_NAMES.length; i++) {
            const name = PRAYER_NAMES[i];
            const adhan = data[API_FIELDS[i]];
            if (!adhan) continue;

            const [h, m] = adhan.split(':').map(Number);
            const prayerTotalMin = h * 60 + m;
            const diff = currentTotalMin - prayerTotalMin;

            // La prière est due : entre 0 et CATCH_UP_WINDOW minutes
            if (diff >= 0 && diff <= CATCH_UP_WINDOW) {
                if (state.notifiedPrayers[today].includes(name)) {
                    continue; // Déjà notifié
                }

                const iqama = calculateIqama(adhan, name);
                await sendPushToAll({
                    title: `🕌 ${name} — Adhan`,
                    body: `Il est ${adhan}. C'est l'heure de la prière ${name}. Iqama à ${iqama}.`,
                    tag: `prayer-${name}-${today}`,
                    url: '/prieres',
                });

                state.notifiedPrayers[today].push(name);
                console.log(`[Cron] 🕌 Notification prière ${name} envoyée`);
            }
        }

        saveState(state);
    } catch (err) {
        console.error('[Cron] Erreur prières:', err);
    }
}

// ——— Vérifier les annonces ———
async function checkAnnouncements() {
    try {
        const cacheBust = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const url = `${ANNOUNCEMENTS_API}?_nocache=${cacheBust}`;

        const res = await fetch(url, {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
            },
        });

        if (!res.ok) {
            console.warn(`[Cron] Announcements API status ${res.status}`);
            return;
        }

        const data = await res.json();
        if (!data.feuille1 || data.feuille1.length === 0) return;

        const articles: SheetyItem[] = data.feuille1;
        const latestArticle = articles[articles.length - 1];

        const state = getState();

        // Premier lancement — sauvegarder baseline
        if (state.lastAnnouncementId === null) {
            state.lastAnnouncementId = latestArticle.id;
            saveState(state);
            console.log(`[Cron] 📢 Baseline annonce = ${latestArticle.id}`);
            return;
        }

        // Nouvelles annonces ?
        const newArticles = articles.filter(item => item.id > state.lastAnnouncementId!);
        if (newArticles.length === 0) return;

        console.log(`[Cron] 📢 ${newArticles.length} nouvelle(s) annonce(s)`);

        for (const article of newArticles) {
            const category = article["typeD'annonce"] || 'Annonce';
            await sendPushToAll({
                title: `${category} | ${article.titre}`,
                body: article.description || '',
                tag: `announcement-${article.id}`,
                url: '/actualites',
            });
        }

        state.lastAnnouncementId = latestArticle.id;
        saveState(state);
    } catch (err) {
        console.error('[Cron] Erreur annonces:', err);
    }
}

// ——— Handler principal ———
export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Sécuriser le cron avec un secret
    const cronSecret = process.env.CRON_SECRET;
    const authHeader = req.headers.authorization;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        console.warn('[Cron] Requête non autorisée');
        return res.status(401).json({ error: 'Non autorisé' });
    }

    console.log(`[Cron] ⏰ Exécution à ${new Date().toISOString()}`);

    await Promise.all([
        checkPrayers(),
        checkAnnouncements(),
    ]);

    return res.status(200).json({
        success: true,
        timestamp: new Date().toISOString(),
    });
}
