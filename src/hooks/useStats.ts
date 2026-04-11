import { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Stats, StatsSchema } from "@/schemas/stats";
import { storage } from "@/services/storage";
import { formatDate } from "@/utils/date";

const DEFAULT_STATS: Stats = {
  totalTries: 0,
  totalCompleted: 0,
  history: [],
  showTutorial: true,
  completedToday: false,
  lastTries: 0,
};

const StatsFormValuesSchema = z.object({
  stats: StatsSchema,
  showInstructions: z.boolean(),
  showFinished: z.boolean(),
});

type StatsFormValues = z.infer<typeof StatsFormValuesSchema>;

export function useStats() {
  const { watch, setValue, getValues } = useForm<StatsFormValues>({
    defaultValues: {
      stats: DEFAULT_STATS,
      showInstructions: true,
      showFinished: false,
    },
  });

  const stats = watch("stats");
  const showInstructions = watch("showInstructions");
  const showFinished = watch("showFinished");

  useEffect(() => {
    const parsed = storage.stats.load();
    if (!parsed) return;

    const lastDate = parsed.history[parsed.history.length - 1]?.date;
    const completedToday = lastDate === formatDate(new Date());

    setValue("showInstructions", false);
    setValue("stats", { ...parsed, showTutorial: false, completedToday });
    if (completedToday) {
      setValue("showFinished", true);
    }
  }, [setValue]);

  const recordCompletion = useCallback(
    (tries: number) => {
      const current = getValues("stats");
      const newHistory = [
        ...current.history,
        { date: formatDate(new Date()), tries },
      ];
      const updated: Stats = {
        totalTries: current.totalTries + tries,
        totalCompleted: current.totalCompleted + 1,
        history: newHistory,
        showTutorial: false,
        completedToday: true,
        lastTries: tries,
      };
      storage.stats.save(updated);
      setValue("stats", updated);
      setValue("showFinished", true);
    },
    [getValues, setValue],
  );

  const openInstructions = useCallback(
    () => setValue("showInstructions", true),
    [setValue],
  );
  const closeInstructions = useCallback(
    () => setValue("showInstructions", false),
    [setValue],
  );
  const closeFinished = useCallback(
    () => setValue("showFinished", false),
    [setValue],
  );

  return {
    stats,
    showInstructions,
    showFinished,
    openInstructions,
    closeInstructions,
    closeFinished,
    recordCompletion,
  };
}
