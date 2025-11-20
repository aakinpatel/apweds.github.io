import React, { useState, useEffect } from 'react';
import { WEDDING_DETAILS } from '../constants';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    // Append a time if only date is provided to ensure it counts to a reasonable start time (e.g., 9 AM)
    // If the date string already has time, this might need adjustment, but WEDDING_DETAILS.date is just "July 19, 2026"
    const eventDate = new Date(`${WEDDING_DETAILS.date} 09:00:00`); 
    const now = new Date();
    const difference = eventDate.getTime() - now.getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 md:mx-6">
      <div className="relative">
        <span className="font-serif text-3xl md:text-5xl text-wedding-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] font-medium tabular-nums">
          {value < 10 ? `0${value}` : value}
        </span>
      </div>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-wedding-300 mt-2 font-medium">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex justify-center items-center mt-12 mb-4 animate-fade-in-up">
      <div className="flex items-center bg-wedding-900/40 backdrop-blur-sm border border-wedding-300/20 px-4 py-6 md:px-8 md:py-6 rounded-sm shadow-2xl">
        <TimeUnit value={timeLeft.days} label="Days" />
        <div className="h-8 w-px bg-wedding-300/30 self-center mb-6"></div>
        <TimeUnit value={timeLeft.hours} label="Hrs" />
        <div className="h-8 w-px bg-wedding-300/30 self-center mb-6"></div>
        <TimeUnit value={timeLeft.minutes} label="Mins" />
        <div className="h-8 w-px bg-wedding-300/30 self-center mb-6"></div>
        <TimeUnit value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
};

export default Countdown;