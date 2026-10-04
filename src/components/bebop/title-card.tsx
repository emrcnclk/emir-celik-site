"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_CINEMA, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TitleCardProps = {
  /** Small line above, e.g. "Session #02". */
  kicker: string;
  title: string;
  className?: string;
  /** Right-aligned slot, usually a link. */
  action?: React.ReactNode;
};

const bars = ["bg-mustard", "bg-rust", "bg-teal"] as const;

/**
 * Section opener in the Bebop title-card grammar: three colour bars
 * wipe across, then the title drops in, set in condensed caps.
 */
export function TitleCard({ kicker, title, className, action }: TitleCardProps) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("mb-14 md:mb-20", className)}>
      <div className="flex items-center gap-4">
        <div aria-hidden className="flex h-3 w-24 overflow-hidden md:w-32">
          {bars.map((bar, i) => (
            <motion.span
              key={bar}
              className={cn("block h-full flex-1 origin-left", bar)}
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: i * 0.09, ease: EASE_CINEMA }}
            />
          ))}
        </div>
        <motion.span
          className="kicker"
          initial={reduced ? false : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE_CINEMA }}
        >
          {kicker}
        </motion.span>
      </div>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
        <h2 className="bebop -my-[0.12em] overflow-hidden py-[0.12em] text-6xl md:text-8xl lg:text-9xl">
          <motion.span
            className="block"
            initial={reduced ? false : { y: "105%" }}
            whileInView={{ y: "0%" }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_CINEMA }}
          >
            {title}
          </motion.span>
        </h2>
        {action}
      </div>
    </div>
  );
}
