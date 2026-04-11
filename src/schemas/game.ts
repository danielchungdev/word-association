import { z } from "zod";

export const WordStateSchema = z.record(z.string(), z.array(z.string()));

export type WordState = z.infer<typeof WordStateSchema>;

export const KeyHintSchema = z.enum(["correct", "present", "absent"]);

export type KeyHint = z.infer<typeof KeyHintSchema>;

export type KeyHintMap = Record<string, KeyHint>;

export const KeyHintMapSchema = z.record(z.string(), KeyHintSchema);

export const GameStateSchema = z.object({
  wordState: WordStateSchema,
  correctState: z.array(z.boolean()),
  currentRow: z.number(),
  currentWordIndex: z.number(),
  tries: z.number(),
  keyHints: KeyHintMapSchema.default({}),
});

export type GameState = z.infer<typeof GameStateSchema>;

export const SavedAttemptSchema = GameStateSchema.extend({
  date: z.coerce.date(),
});

export type SavedAttempt = z.infer<typeof SavedAttemptSchema>;
