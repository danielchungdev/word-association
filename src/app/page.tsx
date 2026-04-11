"use client";
import { TileRow } from "@/components/TileRow";
import { Navbar } from "@/components/Navbar";
import { Keyboard } from "@/components/Keyboard";
import { Modal } from "@/components/Modal";
import { Instructions } from "@/components/Instructions";
import { Congratulations } from "@/components/Congratulations";
import { Footer } from "@/components/Footer/Footer";
import { useDailyPuzzle } from "@/hooks/useDailyPuzzle";
import { useStats } from "@/hooks/useStats";
import { useGameState } from "@/hooks/useGameState";
import { WORD_COUNT } from "@/utils/game";

export default function Home() {
  const { words } = useDailyPuzzle();
  const {
    stats,
    showInstructions,
    showFinished,
    openInstructions,
    closeInstructions,
    closeFinished,
    recordCompletion,
  } = useStats();
  const { wordState, correctState, tileRowControls, keyHints, handleKeyPress } =
    useGameState(words, stats.completedToday, recordCompletion);

  return (
    <main>
      <div className="w-screen">
        <div className="w-11/12 m-auto grid place-content-center">
          <Navbar openInstructions={openInstructions} />
          <div className="mx-auto my-8 flex flex-col gap-2">
            {Array.from({ length: WORD_COUNT }, (_, index) => (
              <TileRow
                key={index}
                word={wordState[index]}
                animate={tileRowControls[index]}
                correct={correctState[index]}
              />
            ))}
          </div>
          <Keyboard onKeyPress={handleKeyPress} keyHints={keyHints} />
          {!showFinished && <Footer />}
        </div>
      </div>
      <Modal isOpen={showInstructions} onClose={closeInstructions}>
        <Instructions />
      </Modal>
      <Modal isOpen={showFinished} onClose={closeFinished} solidBackdrop={true}>
        <Congratulations
          todayTries={stats.lastTries | 0}
          totalCompleted={stats.totalCompleted | 0}
          history={stats.history}
        />
      </Modal>
    </main>
  );
}
