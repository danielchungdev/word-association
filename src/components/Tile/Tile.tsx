"use client"
import { memo, useRef, useEffect } from "react"
import { z } from "zod"
import { motion } from "framer-motion"

const TilePropsSchema = z.object({
    letter: z.string().nullable(),
    correct: z.boolean(),
    size: z.enum(["small", "normal"]),
})

type TileProps = z.infer<typeof TilePropsSchema>

export const Tile = memo(function Tile({ letter, correct, size }: TileProps) {
    const prevLetterRef = useRef(letter)
    const isNewLetter = letter !== prevLetterRef.current && letter !== "" && letter !== null

    useEffect(() => {
        prevLetterRef.current = letter
    })

    return (
        <motion.div
            className={`${size === "normal" ? "w-11 h-11" : "w-6 h-6"} grid place-content-center border-2 ${ correct ? "border-green-500" : "border-neutral-900"}`}
            animate={isNewLetter ? { scale: [1.15, 1] } : undefined}
            transition={{ duration: 0.1 }}
        >
            <p className={`${size === "normal" ? "text-2xl" : "text-sm"} text-center font-bold ${correct ? "text-green-500" : "text-neutral-900"}`}>{letter?.toUpperCase()}</p>
        </motion.div>
    )
})
