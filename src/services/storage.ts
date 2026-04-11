import { Stats, StatsSchema } from "@/schemas/stats";
import { SavedAttempt, SavedAttemptSchema, GameState } from "@/schemas/game";

const KEYS = {
  stats: "word-association-stats",
  attempt: "word-association-current-attempt",
} as const;

export const storage = {
  stats: {
    load(): Stats | null {
      const raw = localStorage.getItem(KEYS.stats);
      if (!raw) return null;
      const result = StatsSchema.safeParse(JSON.parse(raw));
      return result.success ? result.data : null;
    },

    save(stats: Stats): void {
      localStorage.setItem(KEYS.stats, JSON.stringify(stats));
    },
  },

  attempt: {
    load(): SavedAttempt | null {
      const raw = localStorage.getItem(KEYS.attempt);
      if (!raw) return null;
      const result = SavedAttemptSchema.safeParse(JSON.parse(raw));
      return result.success ? result.data : null;
    },

    save(state: GameState): void {
      localStorage.setItem(
        KEYS.attempt,
        JSON.stringify({ date: new Date(), ...state }),
      );
    },

    clear(): void {
      localStorage.removeItem(KEYS.attempt);
    },

    exists(): boolean {
      return localStorage.getItem(KEYS.attempt) !== null;
    },
  },
};
