import { useState, useEffect } from 'react';

export interface PrayerTime {
  name: string;
  adhan: string;
  iqama: string;
}

export interface PrayerTimesData {
  prayers: PrayerTime[];
  nextPrayer: string;
  hijriDate: string;
  gregorianDate: string;
}

// Real prayer times using Mawaqit API
export const usePrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('https://mawaqit-api-i5z7.onrender.com/api/v1/rahmane-decines-charpieu/prayer-times');
        const data = await response.json();
        
        // Calculate Iqama times: +10 minutes except Maghrib (+7 minutes)
        const calculateIqama = (adhanTime: string, prayerName: string) => {
          const [hours, minutes] = adhanTime.split(':').map(Number);
          const additionalMinutes = prayerName === 'Maghrib' ? 7 : 10;
          const totalMinutes = hours * 60 + minutes + additionalMinutes;
          const iqamaHours = Math.floor(totalMinutes / 60);
          const iqamaMinutes = totalMinutes % 60;
          return `${String(iqamaHours).padStart(2, '0')}:${String(iqamaMinutes).padStart(2, '0')}`;
        };

        // Transform API data
        const prayers: PrayerTime[] = [
          { name: 'Fajr', adhan: data.fajr, iqama: calculateIqama(data.fajr, 'Fajr') },
          { name: 'Dhuhr', adhan: data.dhuhr, iqama: calculateIqama(data.dhuhr, 'Dhuhr') },
          { name: 'Asr', adhan: data.asr, iqama: calculateIqama(data.asr, 'Asr') },
          { name: 'Maghrib', adhan: data.maghrib, iqama: calculateIqama(data.maghrib, 'Maghrib') },
          { name: 'Isha', adhan: data.isha, iqama: calculateIqama(data.isha, 'Isha') },
        ];

        // Determine next prayer
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const nextPrayer = prayers.find(prayer => {
          const [hours, minutes] = prayer.iqama.split(':').map(Number);
          const prayerTime = hours * 60 + minutes;
          return prayerTime > currentTime;
        })?.name || prayers[0].name;

        const prayerData: PrayerTimesData = {
          prayers,
          nextPrayer,
          hijriDate: data.hijriDate || '',
          gregorianDate: data.gregorianDate || new Date().toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        };
        
        setPrayerTimes(prayerData);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des horaires de prières');
        console.error('Prayer times fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  return { prayerTimes, loading, error };
};