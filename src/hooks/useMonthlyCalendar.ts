import { useState, useEffect } from 'react';

export interface DayPrayerTimes {
  day: number;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export const useMonthlyCalendar = (month: number) => {
  const [calendar, setCalendar] = useState<DayPrayerTimes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://mawaqit-api-i5z7.onrender.com/api/v1/rahmane-decines-charpieu/calendar/${month}`);
        const data = await response.json();
        
        setCalendar(data);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement du calendrier mensuel');
        console.error('Monthly calendar fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, [month]);

  return { calendar, loading, error };
};