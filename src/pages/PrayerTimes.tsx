import React from 'react';
import { useMonthlyCalendar } from '../hooks/useMonthlyCalendar';

const PrayerTimes = () => {
    const prayerTimes = useMonthlyCalendar(2); // Updated month from 12 to 2

    return (
        <div>
            <h1>Prayer Times for February 2026</h1> {/* Updated date formatting */}
            <ul>
                {prayerTimes.map((time, index) => (
                    <li key={index}>{time}</li>
                ))}
            </ul>
        </div>
    );
};

export default PrayerTimes;