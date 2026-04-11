import { memo, useMemo } from "react";
import { z } from "zod";
import { Footer } from "@/components/Footer";
import { Stats } from "@/components/Stats";
import { useWindowSize } from "@uidotdev/usehooks";
import { History, HistorySchema } from "@/schemas/stats";
import { useCountdown } from "@/hooks/useCountdown";
import { calculateStreak } from "@/utils/stats";

const CongratulationsPropsSchema = z.object({
  todayTries: z.number(),
  totalCompleted: z.number(),
  history: z.array(HistorySchema),
});

type CongratulationsProps = z.infer<typeof CongratulationsPropsSchema>;

export const Congratulations = memo(function Congratulations({
  todayTries,
  totalCompleted,
  history,
}: CongratulationsProps) {
  const timeLeft = useCountdown();
  const size = useWindowSize();
  const streak = useMemo(() => calculateStreak(history), [history]);

  const formattedSize = useMemo(
    () => ({
      width: size.width || 400,
      height: size.height || 1000,
    }),
    [size],
  );

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <>
      <p className="text-xl font-bold text-green-500 text-center">
        Congratulations!
      </p>
      <div className="text-sm ">
        <p className="mt-4">
          You&apos;ve completed today&apos;s challenge, you made a total of{" "}
          <b>{todayTries}</b> wrong guesses.
        </p>
        <p className="mt-2">
          You have <b>{streak}</b> {streak > 1 ? "days" : "day"} in a row and a
          total of <b>{totalCompleted}</b> word associations completed!
        </p>
        <p className="mt-2">These are your statistics by tries:</p>
        <div className="mt-2">
          {formattedSize.width && (
            <Stats
              data={history}
              screenHeight={formattedSize.height}
              screenWidth={formattedSize.width}
            />
          )}
        </div>
      </div>
      <hr className="h-px my-4 w-48 mx-auto bg-gray-200 border-0" />
      <p className="text-sm">
        Next Challenge in: {timeLeft.hours}:{pad(timeLeft.minutes)}:
        {pad(timeLeft.seconds)}
      </p>
      <Footer />
    </>
  );
});
