"use client";
import { memo } from "react";
import { z } from "zod";
import { motion, LegacyAnimationControls } from "framer-motion";
import { Tile } from "@/components/Tile";

const TileRowPropsSchema = z.object({
	word: z.array(z.string()),
	animate: z.custom<LegacyAnimationControls>().optional(),
	correct: z.boolean(),
	size: z.enum(["small", "normal"]).optional(),
});

type TileRowProps = z.infer<typeof TileRowPropsSchema>;

export const TileRow = memo(function TileRow({ word, animate, correct, size = "normal" }: TileRowProps) {
	return (
		<motion.div
			className="flex gap-2"
			animate={animate}
		>
			{word.map((letter: string, index: number) => (
				<Tile key={index} letter={letter} correct={correct} size={size}/>
			))}
		</motion.div>
	);
});
