import { useState, useEffect, useMemo } from "react";
import { WORDLIST } from "@/utils/wordlist";

const START_DATE = new Date(2024, 2, 26);
START_DATE.setUTCHours(0, 0, 0, 0);

export function useDailyPuzzle() {
  const [currentDay, setCurrentDay] = useState(0);

  useEffect(() => {
    const checkTime = () => {
      const today = new Date();
      const timeDifference = today.getTime() - START_DATE.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      setCurrentDay(daysDifference);
    };
    checkTime();
    const interval = setInterval(checkTime, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const words = useMemo(
    () => WORDLIST[currentDay % WORDLIST.length],
    [currentDay],
  );

  return { words };
}
