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

// Simulated prayer times - In production, this would call the Mawaqit API
export const usePrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        
        // TODO: Replace with actual Mawaqit API call
        // const response = await fetch('https://mawaqit.net/api/...');
        // const data = await response.json();
        
        // Simulated data for now
        const mockData: PrayerTimesData = {
          prayers: [
            { name: 'Fajr', adhan: '06:15', iqama: '06:30' },
            { name: 'Dhuhr', adhan: '13:45', iqama: '14:00' },
            { name: 'Asr', adhan: '16:30', iqama: '16:45' },
            { name: 'Maghrib', adhan: '19:20', iqama: '19:25' },
            { name: 'Isha', adhan: '21:00', iqama: '21:15' },
          ],
          nextPrayer: 'Asr',
          hijriDate: '15 Jumada Al-Awwal 1446',
          gregorianDate: new Date().toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setPrayerTimes(mockData);
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
