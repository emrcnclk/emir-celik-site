"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { atmosphere } from "@/data/atmosphere";
import { EASE_CINEMA } from "@/lib/motion";
import { Kicker } from "@/components/ui/kicker";
import { Marquee } from "@/components/bebop/marquee";
import { useOpeningDelay } from "@/components/bebop/opening-titles";
import { getHeroUi, getRoles, type Lang } from "@/lib/i18n";

function useDepth(mx: MotionValue<number>, my: MotionValue<number>, depth: number) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return { x, y };
}

/**
 * Opening scene — the Bebop title sequence as a page.
 * Flat colour panels drift with the pointer, the name is set in
 * condensed caps, the old GIF plays in a framed "live feed".
 */
export function Hero({ lang = "en" }: { lang?: Lang }) {
  const ui = getHeroUi(lang);
  const roles = getRoles(lang);
  const reduced = useReducedMotion();
  const d = useOpeningDelay();

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const lift = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18 });
  const p1 = useDepth(mx, my, 18);
  const p2 = useDepth(mx, my, -26);
  const p3 = useDepth(mx, my, 34);
  const p4 = useDepth(mx, my, -12);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [rawX, rawY, reduced]);

  const [role, setRole] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRole((r) => (r + 1) % roles.length), 2600);
    return () => clearInterval(t);
  }, [roles.length]);

  const slam = (delay: number, from: Record<string, string | number>) => ({
    initial: reduced ? false : from,
    animate: { x: 0, y: 0, scaleX: 1, scaleY: 1 },
    transition: { duration: 0.9, ease: EASE_CINEMA, delay: d + delay },
  });

  return (
    <section ref={ref} className="relative flex min-h-dvh flex-col overflow-hidden">
      {/* ---- Colour panels ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          style={reduced ? undefined : p1}
          className="absolute right-[-4%] top-[-6%] h-[52%] w-[46%] md:w-[40%]"
        >
          <motion.div {...slam(0.05, { y: "-110%" })} className="size-full bg-mustard/90" />
        </motion.div>
        <motion.div
          style={reduced ? undefined : p2}
          className="absolute right-[30%] top-[38%] h-[44%] w-[2.2%]"
        >
          <motion.div {...slam(0.18, { scaleY: 0 })} className="size-full origin-top bg-rust" />
        </motion.div>
        <motion.div
          style={reduced ? undefined : p3}
          className="absolute bottom-[-8%] left-[-6%] h-[30%] w-[34%]"
        >
          <motion.div {...slam(0.12, { x: "-110%" })} className="size-full bg-teal/80" />
        </motion.div>
        <motion.div
          style={reduced ? undefined : p4}
          className="absolute bottom-[18%] right-[6%] h-[16%] w-[22%]"
        >
          <motion.div
            {...slam(0.28, { scaleX: 0 })}
            className="halftone size-full origin-right bg-cream/90"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/80 to-night/10" />
      </div>

      {/* ---- Live feed window ---- */}
      <motion.figure
        style={reduced ? undefined : { x: p4.x, y: p4.y }}
        initial={reduced ? false : { opacity: 0, scale: 0.92, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: -2 }}
        transition={{ duration: 1.1, ease: EASE_CINEMA, delay: d + 0.45 }}
        className="absolute right-[7%] top-[22%] hidden w-[34vw] max-w-[560px] border-4 border-ink bg-ink shadow-[12px_12px_0_var(--rust)] lg:block"
      >
        <div className="flex items-center justify-between bg-cream px-3 pt-2 pb-1 text-ink">
          <span className="bebop text-xl">Bebop · {ui.feed}</span>
          <span className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em]">
            <span className="size-1.5 animate-flicker rounded-full bg-rust" /> rec
          </span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={atmosphere.first} alt="" className="aspect-video w-full object-cover" />
        <figcaption className="flex items-center justify-between px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cream/70">
          <span>{ui.theme}</span>
          <svg viewBox="0 0 40 40" className="size-7 animate-spin-slow" aria-hidden>
            <circle cx="20" cy="20" r="19" fill="#111" stroke="var(--cream)" strokeOpacity=".3" />
            <circle cx="20" cy="20" r="13" fill="none" stroke="var(--cream)" strokeOpacity=".15" />
            <circle cx="20" cy="20" r="6" fill="var(--mustard)" />
            <circle cx="20" cy="20" r="1.5" fill="#111" />
          </svg>
        </figcaption>
      </motion.figure>

      {/* ---- Type ---- */}
      <motion.div
        style={reduced ? undefined : { y: lift, opacity: fade }}
        className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pt-28 pb-16 md:px-10"
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: d + 0.3 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Kicker signal>
            {ui.session} — {ui.episode}
          </Kicker>
          <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.28em] text-faint sm:inline">
            {site.location} · {ui.live}
          </span>
        </motion.div>

        <h1 className="bebop mt-6 text-[clamp(5.5rem,19vw,17rem)]" aria-label={site.fullName}>
          {ui.headline.map((line, i) => (
            <span key={line} className="-my-[0.12em] block overflow-hidden py-[0.12em]">
              <motion.span
                className={i === 1 ? "block text-mustard" : "block"}
                initial={reduced ? false : { y: "110%", skewY: 6 }}
                animate={{ y: "0%", skewY: 0 }}
                transition={{ duration: 1, ease: EASE_CINEMA, delay: d + 0.15 + i * 0.12 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_CINEMA, delay: d + 0.7 }}
        >
          {ui.tagline}
        </motion.p>

        <motion.div
          className="mt-6 flex h-6 items-center gap-3 overflow-hidden font-mono text-xs uppercase tracking-[0.22em] text-amber"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: d + 0.9 }}
        >
          <span className="text-faint">&gt;</span>
          <motion.span
            key={role}
            initial={reduced ? false : { y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE_CINEMA }}
          >
            {roles[role]}
          </motion.span>
          <span className="h-4 w-2 animate-flicker bg-amber/80" aria-hidden />
        </motion.div>

        <motion.div
          className="mt-10 flex flex-wrap gap-3"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_CINEMA, delay: d + 1 }}
        >
          <Link
            href="/projects"
            className="bebop group inline-flex items-center gap-3 bg-mustard px-6 pt-3.5 pb-2.5 text-2xl text-ink shadow-[5px_5px_0_var(--rust)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--rust)]"
          >
            {ui.bounties}
            <ArrowRight className="size-5 -translate-y-0.5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/devlogs"
            className="bebop inline-flex items-center gap-3 border border-line-strong px-6 pt-3.5 pb-2.5 text-2xl text-foreground transition-colors duration-200 hover:border-cream hover:bg-cream hover:text-ink"
          >
            {ui.sessions}
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={reduced ? false : { y: "120%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: EASE_CINEMA, delay: d + 1.1 }}
        className="relative z-10 -rotate-1 scale-[1.02]"
      >
        <Marquee items={ui.marquee} />
      </motion.div>
    </section>
  );
}
