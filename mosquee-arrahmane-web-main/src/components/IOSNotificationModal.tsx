import { useEffect, useState } from 'react';

interface IOSNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAllow: () => void;
}

export function IOSNotificationModal({ isOpen, onClose, onAllow }: IOSNotificationModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`w-[270px] bg-white/90 backdrop-blur-xl rounded-[14px] shadow-lg overflow-hidden text-center transform transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className="pt-5 pb-4 px-4">
          <h3 className="text-[17px] font-semibold leading-6 text-black mb-1">
            "Mosquée Ar-Rahmane" souhaite vous envoyer des notifications
          </h3>
          <p className="text-[13px] leading-4 text-black/80">
            Les notifications peuvent inclure des alertes, des sons et des badges d'icônes.
          </p>
        </div>
        <div className="grid grid-cols-2 border-t border-gray-300/60">
          <button onClick={onClose} className="py-3 text-[17px] text-[#007AFF] border-r border-gray-300/60 active:bg-gray-200/50 transition-colors hover:bg-gray-50">Refuser</button>
          <button onClick={onAllow} className="py-3 text-[17px] font-semibold text-[#007AFF] active:bg-gray-200/50 transition-colors hover:bg-gray-50">Autoriser</button>
        </div>
      </div>
    </div>
  );
}