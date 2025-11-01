import { useState, useEffect } from 'react';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PrayerCard from '@/components/PrayerCard';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';

const PrayerTimes = () => {
  const { prayerTimes, loading } = usePrayerTimes();
  const [timeUntilNext, setTimeUntilNext] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate time until next prayer
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      if (prayerTimes?.prayers) {
        const nextPrayer = prayerTimes.prayers.find(prayer => {
          const [hours, minutes] = prayer.iqama.split(':').map(Number);
          const prayerTime = hours * 60 + minutes;
          return prayerTime > currentTime;
        });

        if (nextPrayer) {
          const [hours, minutes] = nextPrayer.iqama.split(':').map(Number);
          const prayerTime = hours * 60 + minutes;
          const diff = prayerTime - currentTime;
          const hoursLeft = Math.floor(diff / 60);
          const minutesLeft = diff % 60;
          setTimeUntilNext(`${hoursLeft}h ${minutesLeft}min`);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes]);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary via-secondary to-accent text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Clock className="w-20 h-20 mx-auto mb-6 animate-float" />
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Horaires des Prières
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              {loading ? 'Chargement...' : prayerTimes?.gregorianDate}
            </p>
            {prayerTimes && (
              <div className="glass-effect p-6 rounded-2xl inline-block">
                <p className="text-sm text-primary-foreground/80 mb-2">Date Hijri</p>
                <p className="text-2xl font-bold">{prayerTimes.hijriDate}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      {!loading && prayerTimes && (
        <section className="py-12 bg-accent text-accent-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-lg mb-2">Prochaine prière</p>
              <div className="flex items-center justify-center space-x-4">
                <p className="text-4xl font-bold font-display">{prayerTimes.nextPrayer}</p>
                <div className="h-8 w-px bg-accent-foreground/30" />
                <p className="text-2xl font-semibold">{timeUntilNext}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Prayer Times Grid */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-56 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {prayerTimes?.prayers.map((prayer) => (
                <PrayerCard
                  key={prayer.name}
                  name={prayer.name}
                  adhan={prayer.adhan}
                  iqama={prayer.iqama}
                  isNext={prayer.name === prayerTimes.nextPrayer}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Monthly Calendar Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Calendrier Mensuel
            </h2>
            <p className="text-lg text-muted-foreground">
              Consultez les horaires pour tout le mois
            </p>
          </div>

          <div className="max-w-6xl mx-auto glass-effect p-8 rounded-2xl">
            <div className="text-center text-muted-foreground py-12">
              <CalendarIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">
                Le calendrier mensuel complet sera bientôt disponible
              </p>
              <p className="text-sm mt-2">
                En attendant, veuillez consulter les horaires du jour ci-dessus
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
              Informations Importantes
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-effect p-6 rounded-xl">
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  Horaires d'Iqama
                </h3>
                <p className="text-muted-foreground">
                  Les horaires d'Iqama indiquent le début effectif de la prière en congrégation. Nous vous recommandons d'arriver quelques minutes avant.
                </p>
              </div>
              <div className="glass-effect p-6 rounded-xl">
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  Prière du Vendredi
                </h3>
                <p className="text-muted-foreground">
                  La Jumou'a a lieu tous les vendredis avec un prêche en français. Arrivez tôt pour profiter du sermon complet.
                </p>
              </div>
              <div className="glass-effect p-6 rounded-xl">
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  Espace Femmes
                </h3>
                <p className="text-muted-foreground">
                  La mosquée dispose d'une salle de prière dédiée aux femmes avec des ablutions séparées.
                </p>
              </div>
              <div className="glass-effect p-6 rounded-xl">
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  Ramadan
                </h3>
                <p className="text-muted-foreground">
                  Durant le mois de Ramadan, des prières de Tarawih sont organisées tous les soirs après la prière d'Isha.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrayerTimes;
