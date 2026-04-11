import { useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { LegacyAnimationControls, useAnimation } from "framer-motion";
import { GameState, KeyHintMap } from "@/schemas/game";
import { storage } from "@/services/storage";
import { isSameUTCDay } from "@/utils/date";
import {
  WORD_COUNT,
  buildWordState,
  buildCorrectState,
  computeKeyHints,
  isLetter,
} from "@/utils/game";

const INITIAL_REVEALED = 1;

export function useGameState(
  words: string[],
  completedToday: boolean,
  onComplete: (tries: number) => void,
) {
  const { watch, setValue, getValues, reset } = useForm<GameState>({
    defaultValues: {
      wordState: buildWordState(words, INITIAL_REVEALED),
      correctState: buildCorrectState(INITIAL_REVEALED),
      currentRow: INITIAL_REVEALED,
      currentWordIndex: 1,
      tries: 0,
      keyHints: {},
    },
  });

  const wordState = watch("wordState");
  const correctState = watch("correctState");
  const keyHints = watch("keyHints");

  const tileRowControls: LegacyAnimationControls[] = [
    useAnimation(),
    useAnimation(),
    useAnimation(),
    useAnimation(),
    useAnimation(),
  ];

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const controlsRef = useRef(tileRowControls);
  controlsRef.current = tileRowControls;

  const wordsRef = useRef(words);
  wordsRef.current = words;

  // Initialize word state when words change (new day)
  useEffect(() => {
    if (!storage.attempt.exists()) {
      reset({
        wordState: buildWordState(words, INITIAL_REVEALED),
        correctState: buildCorrectState(INITIAL_REVEALED),
        currentRow: INITIAL_REVEALED,
        currentWordIndex: 1,
        tries: 0,
        keyHints: {},
      });
    }
  }, [words, reset]);

  // Load saved attempt on mount
  useEffect(() => {
    const saved = storage.attempt.load();
    if (!saved) return;

    if (isSameUTCDay(saved.date, new Date())) {
      reset({
        wordState: saved.wordState,
        correctState: saved.correctState,
        currentRow: saved.currentRow,
        currentWordIndex: saved.currentWordIndex,
        tries: saved.tries,
        keyHints: saved.keyHints ?? {},
      });
    } else {
      storage.attempt.clear();
    }
  }, [reset]);

  // Show completed state when already finished today
  useEffect(() => {
    if (completedToday) {
      setValue("wordState", buildWordState(wordsRef.current, WORD_COUNT));
      setValue("correctState", buildCorrectState(WORD_COUNT));
      setValue("keyHints", {});
    }
  }, [completedToday, setValue]);

  const saveAttempt = useCallback(() => {
    storage.attempt.save(getValues());
  }, [getValues]);

  const fillTile = useCallback(
    (letter: string) => {
      const { wordState, currentRow, currentWordIndex } = getValues();
      const currentWords = wordsRef.current;
      if (currentWordIndex >= currentWords[currentRow].length) return;

      const currentWordArray = [...wordState[currentRow]];
      if (currentWordArray[currentWordIndex] === "") {
        currentWordArray[currentWordIndex] = letter;
        setValue("wordState", { ...wordState, [currentRow]: currentWordArray });
      }
      setValue("currentWordIndex", currentWordIndex + 1);
    },
    [getValues, setValue],
  );

  const clearTile = useCallback(() => {
    const { wordState, currentRow, currentWordIndex } = getValues();
    const deleteAt = currentWordIndex - 1;
    if (deleteAt <= 0) return;

    const currentWordArray = [...wordState[currentRow]];
    currentWordArray[deleteAt] = "";
    setValue("wordState", { ...wordState, [currentRow]: currentWordArray });
    setValue("currentWordIndex", currentWordIndex - 1);
  }, [getValues, setValue]);

  const checkSubmission = useCallback(() => {
    const { wordState, currentRow, correctState, tries, keyHints } =
      getValues();
    const currentWords = wordsRef.current;
    const currentWord = wordState[currentRow].join("").toLowerCase();
    const matchWord = currentWords[currentRow].toLowerCase();

    if (currentWord.length !== matchWord.length) {
      saveAttempt();
      return;
    }

    if (currentWord === matchWord) {
      setValue("wordState", {
        ...wordState,
        [currentRow]: currentWord.split(""),
      });

      const newCorrectState = [...correctState];
      newCorrectState[currentRow] = true;
      setValue("correctState", newCorrectState);
      setValue("currentRow", currentRow + 1);
      setValue("currentWordIndex", 1);
      setValue("keyHints", {});

      if (currentRow === WORD_COUNT - 1) {
        storage.attempt.clear();
        onCompleteRef.current(tries);
      } else {
        saveAttempt();
      }
    } else {
      controlsRef.current[currentRow].start({
        x: [-4, 4, -4, 4, 0],
        transition: { duration: 0.5 },
      });

      const updatedHints = computeKeyHints(
        wordState[currentRow],
        currentWords[currentRow],
        keyHints,
      );
      setValue("keyHints", updatedHints);
      setValue("tries", tries + 1);
    }
  }, [getValues, setValue, saveAttempt]);

  const handleKeyPress = useCallback(
    (key: string) => {
      const { currentRow } = getValues();
      if (currentRow >= WORD_COUNT) return;

      if (isLetter(key)) {
        fillTile(key);
      } else if (key === "Backspace") {
        clearTile();
      } else if (key === "Enter") {
        checkSubmission();
      }
    },
    [getValues, fillTile, clearTile, checkSubmission],
  );

  // Physical keyboard listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => handleKeyPress(e.key);
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [handleKeyPress]);

  return {
    wordState,
    correctState,
    tileRowControls,
    keyHints,
    handleKeyPress,
  };
}
