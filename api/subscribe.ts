import type { VercelRequest, VercelResponse } from '@vercel/node';
import { addSubscription, removeSubscription } from './lib/subscriptions.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        try {
            const { subscription } = req.body;
            if (!subscription || !subscription.endpoint || !subscription.keys) {
                return res.status(400).json({ error: 'Subscription invalide' });
            }

            const added = addSubscription({
                endpoint: subscription.endpoint,
                keys: subscription.keys,
                createdAt: new Date().toISOString(),
            });

            return res.status(200).json({
                success: true,
                isNew: added,
                message: added ? 'Abonnement enregistré' : 'Déjà abonné',
            });
        } catch (err) {
            console.error('[Subscribe] Erreur:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            const { endpoint } = req.body;
            if (!endpoint) {
                return res.status(400).json({ error: 'Endpoint manquant' });
            }
            removeSubscription(endpoint);
            return res.status(200).json({ success: true });
        } catch (err) {
            console.error('[Unsubscribe] Erreur:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    return res.status(405).json({ error: 'Méthode non autorisée' });
}
