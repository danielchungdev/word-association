import { useState, useEffect } from "react";
import { z } from "zod";

const TimeLeftSchema = z.object({
  hours: z.number(),
  minutes: z.number(),
  seconds: z.number(),
});

export type TimeLeft = z.infer<typeof TimeLeftSchema>;

function calculateTimeUntilMidnight(): TimeLeft {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setUTCHours(24, 0, 0, 0);

  const timeRemaining = midnight.getTime() - now.getTime();

  return {
    hours: Math.floor((timeRemaining / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((timeRemaining / 1000 / 60) % 60),
    seconds: Math.floor((timeRemaining / 1000) % 60),
  };
}

export function useCountdown(): TimeLeft {
  const [timeLeft, setTimeLeft] = useState(calculateTimeUntilMidnight);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}
