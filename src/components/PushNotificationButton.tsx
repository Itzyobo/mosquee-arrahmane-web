import { useState, useEffect } from 'react';
import { Bell, BellRing, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { IOSNotificationModal } from './IOSNotificationModal';

const VAPID_PUBLIC_KEY = 'BNCUxuoei9S2yOsU8dZh71jjRpUO12A_nxo7L2_VIrOqx86TTxiiIcHeIiJ1Gl83FBWvSuvr25rVz4HyUU59Mow';

export function PushNotificationButton() {
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [loading, setLoading] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setPermission(Notification.permission);
        }

        const userAgent = window.navigator.userAgent.toLowerCase();
        const ios = /iphone|ipad|ipod/.test(userAgent);
        setIsIOS(ios);

        const isStandaloneMode =
            window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as any).standalone === true;
        setIsStandalone(isStandaloneMode);

        // Si déjà autorisé, s'assurer que la subscription est envoyée au backend
        if ('Notification' in window && Notification.permission === 'granted' && 'serviceWorker' in navigator) {
            ensureBackendSubscription();
        }
    }, []);

    const urlBase64ToUint8Array = (base64String: string) => {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    };

    // Envoyer la subscription au backend pour les notifications serveur
    const sendSubscriptionToBackend = async (subscription: PushSubscription) => {
        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subscription: subscription.toJSON(),
                }),
            });
            const data = await res.json();
            console.log('[PushButton] Backend subscription:', data);
        } catch (err) {
            console.warn('[PushButton] Erreur envoi subscription au backend:', err);
        }
    };

    // S'assurer que la subscription existe côté backend (pour les utilisateurs déjà abonnés)
    const ensureBackendSubscription = async () => {
        try {
            const registration = await navigator.serviceWorker.ready;
            let subscription = await registration.pushManager.getSubscription();

            if (subscription) {
                // Réenvoyer au backend (idempotent — le backend ignore les doublons)
                await sendSubscriptionToBackend(subscription);
            } else {
                // Pas de subscription existante → en créer une nouvelle
                subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
                });
                await sendSubscriptionToBackend(subscription);
            }
        } catch (err) {
            console.warn('[PushButton] Erreur ensureBackendSubscription:', err);
        }
    };

    const subscribe = async () => {
        setLoading(true);
        try {
            // ÉTAPE 1 : Demander la permission de notification
            const result = await Notification.requestPermission();

            if (result === 'denied') {
                setPermission('denied');
                toast.error("Vous avez refusé les notifications. Réactivez-les dans les paramètres.");
                return;
            }

            if (result !== 'granted') {
                setPermission(result);
                toast.info("Permission de notification non accordée.");
                return;
            }

            // ✅ Permission accordée
            setPermission('granted');
            window.dispatchEvent(new Event('notification-permission-changed'));
            console.log('[PushButton] Permission accordée');

            // ÉTAPE 2 : Créer la subscription push et l'envoyer au backend
            try {
                const registration = await navigator.serviceWorker.ready;
                let subscription = await registration.pushManager.getSubscription();

                if (!subscription) {
                    subscription = await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
                    });
                }

                console.log('[PushButton] Push subscription créée');

                // Envoyer au backend pour les notifications serveur
                await sendSubscriptionToBackend(subscription);
            } catch (pushError) {
                console.warn('[PushButton] Abonnement push échoué:', pushError);
            }

            toast.success('Notifications activées avec succès ! Vous recevrez les notifications même quand l\'app est fermée.');
        } catch (error) {
            console.error('[PushButton] Erreur:', error);
            toast.error("Impossible d'activer les notifications. Vérifiez que l'app est ajoutée à l'écran d'accueil sur iOS.");
        } finally {
            setLoading(false);
        }
    };

    const handleClick = async () => {
        // iOS nécessite que l'app soit en mode standalone (ajoutée à l'écran d'accueil)
        if (isIOS && !isStandalone) {
            toast.info(
                "Sur iOS, ajoutez d'abord l'application à l'écran d'accueil (Partager > Sur l'écran d'accueil) pour activer les notifications.",
                { duration: 8000 }
            );
            return;
        }

        if (permission === 'granted') {
            toast.info('Les notifications sont déjà activées.');
            return;
        }

        if (permission === 'denied') {
            toast.error("Vous avez bloqué les notifications. Veuillez les réactiver dans les paramètres de votre navigateur.");
            return;
        }

        // Afficher la modale "style Apple" avant la permission native
        setShowModal(true);
    };

    const handleAllow = async () => {
        setShowModal(false);
        await subscribe();
    };

    const handleClose = () => {
        setShowModal(false);
    };

    // Ne rien afficher si les notifications ne sont pas supportées
    if (typeof window === 'undefined' || !('Notification' in window) || !('serviceWorker' in navigator)) {
        return null;
    }

    return (
        <>
            <button
                onClick={handleClick}
                disabled={loading}
                className="relative inline-flex items-center justify-center rounded-full p-2 transition-colors hover:bg-muted focus-visible:outline-none disabled:opacity-50"
                title={permission === 'granted' ? "Notifications activées" : "Activer les notifications"}
            >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : permission === 'granted' ? <BellRing className="h-5 w-5 text-green-600" /> : <Bell className="h-5 w-5" />}
            </button>
            <IOSNotificationModal
                isOpen={showModal}
                onClose={handleClose}
                onAllow={handleAllow}
            />
        </>
    );
}


