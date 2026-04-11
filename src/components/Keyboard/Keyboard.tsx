import { memo } from "react";
import { z } from "zod";
import Image from "next/image";
import { KeyHintMapSchema, KeyHint } from "@/schemas/game";

const KeyboardPropsSchema = z.object({
    onKeyPress: z.custom<(key: string) => void>(),
    keyHints: KeyHintMapSchema,
});

type KeyboardProps = z.infer<typeof KeyboardPropsSchema>;

const HINT_STYLES: Record<KeyHint, string> = {
    correct: "bg-green-500 text-white",
    present: "bg-yellow-400 text-white",
    absent: "bg-neutral-400 text-neutral-500",
};

const DEFAULT_STYLE = "bg-neutral-200";

export const Keyboard = memo(function Keyboard({ onKeyPress, keyHints }: KeyboardProps) {
    const rows = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["ENTER", "z", "x", "c", "v", "b", "n", "m", "<"],
    ];

    const getKeyStyle = (key: string): string => {
        const hint = keyHints[key.toLowerCase()];
        return hint ? HINT_STYLES[hint] : DEFAULT_STYLE;
    };

    const renderKey = (key: string) => {
        if (key === "ENTER") {
            return (
                <button
                    key={key}
                    onClick={() => onKeyPress("Enter")}
                    className={`h-14 w-[49px] xs:w-14 ${DEFAULT_STYLE} rounded text-xs font-bold`}
                >
                    {key}
                </button>
            )
        }
        else if (key === "<") {
            return (
                <button
                    key={"Backspace"}
                    onClick={() => onKeyPress("Backspace")}
                    className={`h-14 w-[49px] xs:w-14 ${DEFAULT_STYLE} rounded font-bold`}
                >
                    <Image className="m-auto" width={24} height={24} src={"/icons/backspace.svg"} alt="backspace" />
                </button>
            )
        }
        else {
            return (
                <button
                    key={key}
                    onClick={() => onKeyPress(key.toLowerCase())}
                    className={`h-14 w-[1.9rem] xs:w-9 ${getKeyStyle(key)} rounded font-bold transition-colors duration-300`}
                >
                    {key.toUpperCase()}
                </button>
            )
        }
    }

    return (
        <div className="grid place-content-center gap-[0.3rem] m-auto">
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className={`flex gap-[0.3rem] ${rowIndex < 2 ? "m-auto" : ""}`}>
                    {row.map((key) => (
                        renderKey(key)
                    ))}
                </div>
            ))}
        </div>
    );
});
