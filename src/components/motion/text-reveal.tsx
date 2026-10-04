"use client";

import { motion, useReducedMotion } from "framer-motion";
import { stagger, viewportOnce, wordReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
};

/**
 * Reveals a headline word by word, each rising from behind a mask.
 * Use for display typography only — body copy should use <Reveal>.
 */
export function TextReveal({ text, className, as = "h2", delay = 0 }: TextRevealProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as];
  const words = text.split(" ");

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Comp
      className={cn(className)}
      variants={stagger(delay, 0.07)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pt-[0.1em] -mt-[0.1em] pb-[0.08em] -mb-[0.08em] align-top">
          <motion.span variants={wordReveal} className="inline-block will-change-transform">
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}
