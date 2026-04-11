import { History } from "@/schemas/stats";

export function calculateStreak(history: History[]): number {
  if (history.length === 0) return 0;

  let consecutiveDays = 1;

  for (let i = 0; i < history.length - 1; i++) {
    const currentDate = new Date(history[i].date);
    const nextDate = new Date(history[i + 1].date);

    const diffTime = Math.abs(nextDate.getTime() - currentDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      consecutiveDays++;
    } else {
      break;
    }
  }

  return consecutiveDays;
}
