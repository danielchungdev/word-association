import { WordState, KeyHint, KeyHintMap } from "@/schemas/game";

export const WORD_COUNT = 5;

const HINT_PRIORITY: Record<KeyHint, number> = {
  correct: 3,
  present: 2,
  absent: 1,
};

export function computeKeyHints(
  guess: string[],
  target: string,
  existing: KeyHintMap,
): KeyHintMap {
  const merged = { ...existing };
  const targetLower = target.toLowerCase();

  // Skip position 0 (pre-filled hint letter)
  for (let i = 1; i < guess.length; i++) {
    const letter = guess[i].toLowerCase();
    if (!letter) continue;

    let hint: KeyHint;
    if (letter === targetLower[i]) {
      hint = "correct";
    } else if (targetLower.includes(letter)) {
      hint = "present";
    } else {
      hint = "absent";
    }

    const existingPriority = merged[letter] ? HINT_PRIORITY[merged[letter]] : 0;
    if (HINT_PRIORITY[hint] > existingPriority) {
      merged[letter] = hint;
    }
  }

  return merged;
}

export function buildWordState(
  words: string[],
  revealedCount: number,
): WordState {
  const state: WordState = {};
  for (let i = 0; i < WORD_COUNT; i++) {
    if (i < revealedCount) {
      state[i] = words[i].split("");
    } else {
      state[i] = [words[i][0], ...Array(words[i].length - 1).fill("")];
    }
  }
  return state;
}

export function buildCorrectState(revealedCount: number): boolean[] {
  return Array.from({ length: WORD_COUNT }, (_, i) => i < revealedCount);
}

export function isLetter(str: string): boolean {
  return str.length === 1 && /[a-z]/i.test(str);
}
