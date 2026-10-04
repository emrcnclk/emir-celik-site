"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_CINEMA } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Three flat bars — mustard, rust, teal — that wipe in left to right. */
export function ColorBars({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden className={cn("flex h-3 w-24 md:w-32", className)}>
      {["bg-mustard", "bg-rust", "bg-teal"].map((bg, i) => (
        <motion.span
          key={bg}
          className={cn("block h-full flex-1 origin-left", bg)}
          initial={reduced ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.09, ease: EASE_CINEMA }}
        />
      ))}
    </div>
  );
}
