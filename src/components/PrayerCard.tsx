import { Clock } from 'lucide-react';

interface PrayerCardProps {
  name: string;
  adhan: string;
  iqama: string;
  isNext?: boolean;
}

const PrayerCard = ({ name, adhan, iqama, isNext = false }: PrayerCardProps) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl p-6 transition-all hover-lift ${
        isNext
          ? 'bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg animate-pulse-glow'
          : 'glass-effect'
      }`}
    >
      {isNext && (
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
            Prochaine
          </span>
        </div>
      )}

      <div className="flex items-center space-x-3 mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isNext ? 'bg-primary-foreground/20' : 'bg-primary/10'
        }`}>
          <Clock className={`w-6 h-6 ${isNext ? 'text-primary-foreground' : 'text-primary'}`} />
        </div>
        <h3 className={`font-display text-2xl font-bold ${isNext ? 'text-primary-foreground' : 'text-foreground'}`}>
          {name}
        </h3>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className={`text-sm ${isNext ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
            Adhan
          </span>
          <span className={`text-xl font-semibold ${isNext ? 'text-primary-foreground' : 'text-foreground'}`}>
            {adhan}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className={`text-sm ${isNext ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
            Iqama
          </span>
          <span className={`text-xl font-semibold ${isNext ? 'text-primary-foreground' : 'text-foreground'}`}>
            {iqama}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PrayerCard;
