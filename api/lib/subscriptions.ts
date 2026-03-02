import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// En production Vercel, /tmp est le seul répertoire inscriptible
const DATA_DIR = '/tmp';
const SUBS_FILE = join(DATA_DIR, 'push-subscriptions.json');
const STATE_FILE = join(DATA_DIR, 'notification-state.json');

export interface PushSubscriptionData {
    endpoint: string;
    keys: {
        p256dh: string;
        auth: string;
    };
    createdAt: string;
}

export interface NotificationState {
    lastAnnouncementId: number | null;
    notifiedPrayers: Record<string, string[]>; // date -> prayer names already notified
}

function ensureDir() {
    if (!existsSync(DATA_DIR)) {
        mkdirSync(DATA_DIR, { recursive: true });
    }
}

// ——— Subscriptions ———

export function getSubscriptions(): PushSubscriptionData[] {
    ensureDir();
    if (!existsSync(SUBS_FILE)) return [];
    try {
        const raw = readFileSync(SUBS_FILE, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

export function saveSubscriptions(subs: PushSubscriptionData[]) {
    ensureDir();
    writeFileSync(SUBS_FILE, JSON.stringify(subs, null, 2));
}

export function addSubscription(sub: PushSubscriptionData): boolean {
    const subs = getSubscriptions();
    // Éviter les doublons par endpoint
    if (subs.some(s => s.endpoint === sub.endpoint)) return false;
    subs.push(sub);
    saveSubscriptions(subs);
    return true;
}

export function removeSubscription(endpoint: string): boolean {
    const subs = getSubscriptions();
    const filtered = subs.filter(s => s.endpoint !== endpoint);
    if (filtered.length === subs.length) return false;
    saveSubscriptions(filtered);
    return true;
}

// ——— Notification State ———

export function getState(): NotificationState {
    ensureDir();
    if (!existsSync(STATE_FILE)) {
        return { lastAnnouncementId: null, notifiedPrayers: {} };
    }
    try {
        const raw = readFileSync(STATE_FILE, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return { lastAnnouncementId: null, notifiedPrayers: {} };
    }
}

export function saveState(state: NotificationState) {
    ensureDir();
    writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}
