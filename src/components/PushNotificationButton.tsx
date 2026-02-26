import { useState, useEffect } from 'react';
import { Bell, BellRing, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { IOSNotificationModal } from './IOSNotificationModal';

const VAPID_PUBLIC_KEY = 'BLWDe-PrK0Q9i1Wv5A6UUdx8QMHznEFkfMikuq9mtUowTVW_Nc3DNleHZdXFJibz3KCEIYGqJVTZKo7p-f99GAQ';

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

    const subscribe = async () => {
        setLoading(true);
        try {
            // ÉTAPE 1 : Demander la permission de notification (OBLIGATOIRE sur iOS 16.4+)
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

            // ÉTAPE 2 : Attendre que le service worker soit prêt
            const registration = await navigator.serviceWorker.ready;

            // ÉTAPE 3 : Vérifier s'il y a déjà un abonnement push
            let subscription = await registration.pushManager.getSubscription();

            if (!subscription) {
                // ÉTAPE 4 : S'abonner aux notifications push avec VAPID
                subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
                });
            }

            console.log('Push subscription:', JSON.stringify(subscription));

            // TODO: Envoyez l'objet subscription à votre backend
            // await fetch('/api/notifications/subscribe', {
            //   method: 'POST',
            //   body: JSON.stringify(subscription),
            //   headers: { 'Content-Type': 'application/json' },
            // });

            setPermission('granted');
            toast.success('Notifications activées avec succès !');
        } catch (error) {
            console.error('Erreur lors de l\'inscription push:', error);
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
