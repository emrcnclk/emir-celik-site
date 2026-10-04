"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { EASE_CINEMA, viewportOnce } from "@/lib/motion";
import { cn, pad } from "@/lib/utils";

type Shot = { src: string; caption: string };

/**
 * Screenshot wall with a lightbox. The first frame runs wide,
 * the rest tile; arrows and Esc work in the lightbox.
 */
export function Gallery({ shots, pixel }: { shots: Shot[]; pixel?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const step = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + shots.length) % shots.length)),
    [shots.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, step]);

  const tall = (src: string) => src.includes("/blockslide/") || src.includes("/mythkeep/");

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shots.map((shot, i) => (
          <motion.li
            key={shot.src}
            className={cn(i === 0 && shots.length > 2 && "sm:col-span-2 lg:row-span-2")}
            initial={reduced ? false : { opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE_CINEMA, delay: Math.min((i % 3) * 0.08, 0.2) }}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block size-full overflow-hidden border-2 border-ink bg-ink text-left"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.src}
                alt={shot.caption}
                loading="lazy"
                className={cn(
                  "size-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]",
                  tall(shot.src) ? "aspect-square object-contain p-4" : "aspect-video object-cover",
                  i === 0 && shots.length > 2 && !tall(shot.src) && "lg:aspect-auto lg:h-full",
                  pixel && "pixelated",
                )}
              />
              <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between gap-3 bg-cream px-3 pt-1.5 pb-1 text-ink transition-transform duration-300 group-hover:translate-y-0">
                <span className="bebop truncate text-lg">{shot.caption}</span>
                <span className="font-mono text-[0.6rem]">{pad(i + 1)}</span>
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/95 p-4 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={shots[open].caption}
          >
            <motion.figure
              key={open}
              className="relative max-h-full max-w-6xl"
              initial={reduced ? false : { opacity: 0, scale: 0.96, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.45, ease: EASE_CINEMA }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shots[open].src}
                alt={shots[open].caption}
                className={cn(
                  "max-h-[78vh] w-auto border-4 border-cream object-contain",
                  pixel && "pixelated",
                )}
              />
              <figcaption className="mt-4 flex items-center justify-between gap-4 text-cream">
                <span className="bebop text-3xl">{shots[open].caption}</span>
                <span className="font-mono text-xs text-cream/60">
                  {pad(open + 1)} / {pad(shots.length)}
                </span>
              </figcaption>
            </motion.figure>

            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(null)}
              className="absolute right-4 top-4 bg-cream p-2 text-ink transition-colors hover:bg-mustard md:right-8 md:top-8"
            >
              <X className="size-5" />
            </button>
            {shots.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-cream p-2 text-ink transition-colors hover:bg-mustard md:left-6"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-cream p-2 text-ink transition-colors hover:bg-mustard md:right-6"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Muted, looping clips — they play only while on screen. */
export function ClipReel({ clips }: { clips: { src: string; caption: string }[] }) {
  return (
    <ul className={cn("grid gap-4", clips.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2")}>
      {clips.map((clip, i) => (
        <motion.li
          key={clip.src}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: EASE_CINEMA, delay: i * 0.08 }}
        >
          <figure className="border-2 border-ink bg-ink">
            <AutoVideo src={clip.src} />
            <figcaption className="flex items-center justify-between bg-cream px-3 pt-1.5 pb-1 text-ink">
              <span className="bebop text-lg">{clip.caption}</span>
              <span className="flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.2em]">
                <span className="size-1.5 animate-flicker rounded-full bg-rust" /> loop
              </span>
            </figcaption>
          </figure>
        </motion.li>
      ))}
    </ul>
  );
}

function AutoVideo({ src }: { src: string }) {
  const [el, setEl] = useState<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [el]);

  return (
    <video
      ref={setEl}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      className="pixelated aspect-video w-full object-cover"
    />
  );
}
