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
      setLoading(true);
      
      // Function to convert English Islamic months to French phonetic
      const translateHijriMonth = (date: string): string => {
        const monthTranslations: { [key: string]: string } = {
          'Muharram': 'Muhharram',
          'Safar': 'Safar',
          'Rabi Al-Awwal': 'Rabi Al-Awwal',
          'Rabi Al-Thani': 'Rabi At-Thani',
          'Jumada Al-Awwal': 'Jumada Al-Awwal',
          'Jumada Al-Thani': 'Jumada Al-Thani',
          'Rajab': 'Rajab',
          'Shaban': 'Shaban',
          'Ramadan': 'Ramadan',
          'Shawwal': 'Shawwal',
          'Dhul-Qadah': 'Dhul-Qadah',
          'Dhul-Hijjah': 'Dhul-Hijjah'
        };
        
        let translatedDate = date;
        Object.entries(monthTranslations).forEach(([eng, fr]) => {
          translatedDate = translatedDate.replace(eng, fr);
        });
        return translatedDate;
      };
      
      // Fetch Hijri date independently - always try to get it
      let hijriDate = '';
      try {
        const hijriResponse = await fetch('https://hijri.habibur.com/api01/date/', {
          method: 'GET',
          headers: {
            'Accept': 'text/plain',
          },
        });
        const hijriText = await hijriResponse.text();
        // Translate to French phonetic: "14-Jumada Al-Awwal-1447" -> "14-Joumada Al-Oula-1447"
        hijriDate = translateHijriMonth(hijriText.trim());
        console.log('Hijri date loaded:', hijriDate);
      } catch (hijriError) {
        console.error('Hijri date fetch error:', hijriError);
        // Use browser's built-in Islamic calendar as fallback
        const browserDate = new Date().toLocaleDateString('fr-FR-u-ca-islamic', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        // Convert "5 joumada al-oula 1447" to "5-Joumada Al-Oula-1447"
        hijriDate = browserDate.split(' ').map((part, i) => 
          i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
        ).join('-');
      }

      // Fetch prayer times
      try {
        const response = await fetch('https://mawaqit-api-tedl2a.fly.dev/api/v1/rahmane-decines-charpieu/prayer-times');
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

        // Transform API data - API uses French spelling: dohr, maghreb, icha
        const prayers: PrayerTime[] = [
          { name: 'Fajr', adhan: data.fajr, iqama: calculateIqama(data.fajr, 'Fajr') },
          { name: 'Dhuhr', adhan: data.dohr, iqama: calculateIqama(data.dohr, 'Dhuhr') },
          { name: 'Asr', adhan: data.asr, iqama: calculateIqama(data.asr, 'Asr') },
          { name: 'Maghrib', adhan: data.maghreb, iqama: calculateIqama(data.maghreb, 'Maghrib') },
          { name: 'Isha', adhan: data.icha, iqama: calculateIqama(data.icha, 'Isha') },
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
          hijriDate,
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
        // If Mawaqit fails but we have Hijri date, still show it
        if (hijriDate) {
          const fallbackData: PrayerTimesData = {
            prayers: [],
            nextPrayer: '',
            hijriDate,
            gregorianDate: new Date().toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
          };
          setPrayerTimes(fallbackData);
        }
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
