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
      const registration = await navigator.serviceWorker.register('/sw.js');
      await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

      console.log('Subscription object:', JSON.stringify(subscription));
      
      // TODO: Décommentez et adaptez l'appel API vers votre backend
      /*
      await fetch('/api/notifications/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: { 'Content-Type': 'application/json' },
      });
      */

      setPermission('granted');
      toast.success('Notifications activées avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      toast.error("Impossible d'activer les notifications.");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
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
      toast.error("Vous avez bloqué les notifications. Veuillez les réactiver dans les paramètres de votre navigateur (cadenas dans la barre d'adresse).");
      return;
    }

    // Afficher la modale style Apple avant de demander la permission native
    setShowModal(true);
  };

  const handleAllow = async () => {
    setShowModal(false);
    await subscribe();
  };

  const handleClose = () => {
    setShowModal(false);
  };

  if (typeof window === 'undefined' || !('Notification' in window)) {
    return null;
  }

  return (
    <>
    <button
      onClick={handleClick}
      disabled={loading}
      className="relative inline-flex items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-100 focus-visible:outline-none disabled:opacity-50"
      title={permission === 'granted' ? "Notifications activées" : "Activer les notifications"}
    >
      {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : permission === 'granted' ? <BellRing className="h-6 w-6 text-green-600" /> : <Bell className="h-6 w-6" />}
    </button>
    <IOSNotificationModal 
      isOpen={showModal} 
      onClose={handleClose} 
      onAllow={handleAllow} 
    />
    </>
  );
}