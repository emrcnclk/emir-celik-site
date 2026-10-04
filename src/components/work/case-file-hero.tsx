"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Kicker } from "@/components/ui/kicker";
import { EASE_CINEMA } from "@/lib/motion";
import { accentBg } from "@/lib/accents";
import { cn } from "@/lib/utils";

type Accent = keyof typeof accentBg;

/**
 * Case-file opener: the key art behind a split of colour panels,
 * the title slammed in as one word, the alias typed underneath.
 */
export function CaseFileHero({
  title,
  alias,
  kicker,
  logline,
  image,
  pixel,
  contain,
  accent,
  fallback,
}: {
  title: string;
  alias?: string;
  kicker: string;
  logline: string;
  image?: string;
  pixel?: boolean;
  contain?: boolean;
  accent: Accent;
  fallback?: ReactNode;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <header ref={ref} className="relative flex min-h-[92dvh] items-end overflow-hidden">
      <motion.div
        aria-hidden
        style={reduced ? undefined : { y: imgY }}
        className="absolute inset-0"
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            className={cn(
              "size-full",
              contain ? "object-contain p-[12vh] opacity-80" : "object-cover",
              pixel && "pixelated",
            )}
          />
        ) : (
          fallback
        )}
      </motion.div>

      {/* Panels tear away to reveal the art */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex">
        {["bg-ink", accentBg[accent], "bg-cream", "bg-ink"].map((bg, i) => (
          <motion.span
            key={i}
            className={cn("h-full flex-1", bg)}
            initial={reduced ? false : { scaleY: 1 }}
            animate={{ scaleY: 0 }}
            style={{ originY: i % 2 ? 0 : 1 }}
            transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1], delay: 0.1 + i * 0.07 }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-night/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-night/80 to-transparent" />

      <motion.div
        style={reduced ? undefined : { y: textY }}
        className="relative mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-24"
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Kicker signal>{kicker}</Kicker>
        </motion.div>
        <h1 className="bebop mt-4 -mb-[0.12em] overflow-hidden pt-[0.12em] pb-[0.12em] text-[clamp(4.5rem,15vw,13rem)]">
          <motion.span
            className="block"
            initial={reduced ? false : { y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: EASE_CINEMA, delay: 0.55 }}
          >
            {title}
          </motion.span>
        </h1>
        {alias && (
          <motion.p
            className="typewriter mt-2 text-lg text-mustard md:text-xl"
            initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.1, ease: "linear", delay: 1.1 }}
          >
            a.k.a. “{alias}”
          </motion.p>
        )}
        <motion.p
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_CINEMA, delay: 1.2 }}
        >
          {logline}
        </motion.p>
      </motion.div>
    </header>
  );
}
