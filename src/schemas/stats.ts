import { z } from "zod";

export const HistorySchema = z.object({
  date: z.string(),
  tries: z.number(),
});

export type History = z.infer<typeof HistorySchema>;

export const StatsSchema = z.object({
  totalTries: z.number(),
  totalCompleted: z.number(),
  history: z.array(HistorySchema),
  showTutorial: z.boolean(),
  completedToday: z.boolean(),
  lastTries: z.number(),
});

export type Stats = z.infer<typeof StatsSchema>;
