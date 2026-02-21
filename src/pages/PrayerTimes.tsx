import { useState, useEffect } from 'react';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PrayerCard from '@/components/PrayerCard';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { useMonthlyCalendar } from '@/hooks/useMonthlyCalendar';

const PrayerTimes = () => {
  const { prayerTimes, loading } = usePrayerTimes();
  const { calendar, loading: calendarLoading } = useMonthlyCalendar(2);
  const [timeUntilNext, setTimeUntilNext] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate time until next prayer (Adhan)
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      if (prayerTimes?.prayers) {
        const nextPrayer = prayerTimes.prayers.find(prayer => {
          const [hours, minutes] = prayer.adhan.split(':').map(Number);
          const prayerTime = hours * 60 + minutes;
          return prayerTime > currentTime;
        });

        if (nextPrayer) {
          const [hours, minutes] = nextPrayer.adhan.split(':').map(Number);
          const prayerTime = hours * 60 + minutes;
          const diff = prayerTime - currentTime;
          const hoursLeft = Math.floor(diff / 60);
          const minutesLeft = diff % 60;
          setTimeUntilNext(`${hoursLeft}h ${minutesLeft}min`);
        } else {
          // After Isha, calculate time until Fajr tomorrow
          const fajrPrayer = prayerTimes.prayers[0]; // Fajr is first prayer
          const [fajrHours, fajrMinutes] = fajrPrayer.adhan.split(':').map(Number);
          const fajrTime = fajrHours * 60 + fajrMinutes;
          
          // Time until midnight + time from midnight to Fajr
          const minutesUntilMidnight = (24 * 60) - currentTime;
          const totalMinutes = minutesUntilMidnight + fajrTime;
          
          const hoursLeft = Math.floor(totalMinutes / 60);
          const minutesLeft = totalMinutes % 60;
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
                <p className="text-lg font-semibold">
                  Prochaine prière dans: <span className="text-2xl">{timeUntilNext}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Prayer Times Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Horaires d'aujourd'hui
            </h2>
            <p className="text-lg text-muted-foreground">
              Les horaires de prière d'aujourd'hui
            </p>
          </div>

          {!loading && prayerTimes ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {prayerTimes.prayers.map((prayer) => (
                <PrayerCard
                  key={prayer.name}
                  name={prayer.name}
                  adhan={prayer.adhan}
                  iqama={prayer.iqama}
                  isNext={prayer.name === prayerTimes.nextPrayer}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              <p className="text-lg">Les horaires de prière ne sont pas disponibles pour le moment.</p>
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

          <div className="max-w-6xl mx-auto glass-effect p-8 rounded-2xl overflow-x-auto">
            {calendarLoading ? (
              <div className="text-center text-muted-foreground py-12">
                <CalendarIcon className="w-16 h-16 mx-auto mb-4 opacity-50 animate-pulse" />
                <p className="text-lg">Chargement du calendrier...</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-3 text-left font-display font-bold text-foreground">Jour</th>
                    <th className="p-3 text-center font-display font-bold text-foreground">Fajr</th>
                    <th className="p-3 text-center font-display font-bold text-foreground">Shourouk</th>
                    <th className="p-3 text-center font-display font-bold text-foreground">Dhuhr</th>
                    <th className="p-3 text-center font-display font-bold text-foreground">Asr</th>
                    <th className="p-3 text-center font-display font-bold text-foreground">Maghrib</th>
                    <th className="p-3 text-center font-display font-bold text-foreground">Isha</th>
                  </tr>
                </thead>
                <tbody>
                  {calendar.map((day) => {
                    const date = new Date(2026, 1, day.day); // February 2026
                    const formattedDate = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
                    return (
                      <tr key={day.day} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="p-3 font-semibold text-foreground">{formattedDate}</td>
                        <td className="p-3 text-center text-muted-foreground">{day.fajr}</td>
                        <td className="p-3 text-center text-muted-foreground">{day.sunrise}</td>
                        <td className="p-3 text-center text-muted-foreground">{day.dhuhr}</td>
                        <td className="p-3 text-center text-muted-foreground">{day.asr}</td>
                        <td className="p-3 text-center text-muted-foreground">{day.maghrib}</td>
                        <td className="p-3 text-center text-muted-foreground">{day.isha}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrayerTimes;