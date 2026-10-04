"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const SEEN_KEY = "bebop-opening-seen";

/**
 * The "Tank!" cold open: flat colour panels slam in, a count-in,
 * "LET'S JAM", then the panels tear away to reveal the page.
 * Plays once per browser session; any key or click skips it.
 * A tiny inline script (see OpeningGate) hides it before paint for
 * repeat visits and reduced-motion users, so nothing flashes.
 */
const beats = ["3", "2", "1", "LET'S JAM"] as const;

const panels = [
  { className: "left-0 top-0 h-[58%] w-[46%] bg-mustard", from: { x: "-100%" } },
  { className: "right-0 top-0 h-[38%] w-[54%] bg-rust", from: { y: "-100%" } },
  { className: "right-0 top-[38%] h-[62%] w-[28%] bg-teal", from: { x: "100%" } },
  { className: "left-0 bottom-0 h-[42%] w-[72%] bg-cream", from: { y: "100%" } },
  { className: "left-[46%] top-[38%] h-[20%] w-[26%] bg-ink", from: { scale: 0 } },
];

export function OpeningTitles() {
  // Lives in the root layout (outside the page transition) but only opens the home page.
  return usePathname() === "/" ? <Opening /> : null;
}

function Opening() {
  const [beat, setBeat] = useState(-1);
  const [done, setDone] = useState(false);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
    document.documentElement.dataset.opening = "skip";
    setDone(true);
  }, []);

  useEffect(() => {
    if (document.documentElement.dataset.opening === "skip") {
      setDone(true);
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const timers = [
      setTimeout(() => setBeat(0), 520),
      setTimeout(() => setBeat(1), 860),
      setTimeout(() => setBeat(2), 1200),
      setTimeout(() => setBeat(3), 1540),
      setTimeout(finish, 2650),
    ];
    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      document.documentElement.style.overflow = "";
    };
  }, [finish]);

  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="opening"
          data-opening
          aria-hidden
          className="opening fixed inset-0 z-[120] overflow-hidden bg-ink"
          exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.45 } }}
        >
          {panels.map((p, i) => (
            <motion.div
              key={i}
              className={`absolute ${p.className}`}
              initial={p.from}
              animate={{ x: 0, y: 0, scale: 1 }}
              exit={{ ...p.from, transition: { duration: 0.55, ease: [0.7, 0, 0.84, 0] } }}
              transition={{ duration: 0.42, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}

          {/* Silhouette bars — the sax player, abstracted */}
          <motion.div
            className="absolute bottom-[42%] left-[8%] flex items-end gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ delay: 0.35 }}
          >
            {[46, 78, 30, 96, 58, 22, 70].map((h, i) => (
              <motion.span
                key={i}
                className="block w-3 bg-ink md:w-4"
                initial={{ height: 0 }}
                animate={{ height: [0, h, h * 0.55, h] }}
                transition={{ duration: 0.9, delay: 0.35 + i * 0.04, ease: "easeOut" }}
              />
            ))}
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center">
            {beat >= 0 && (
              // Keyed so each beat remounts and slams in fresh — hard cuts, no exits.
              <motion.p
                key={beats[beat]}
                className={`bebop select-none text-center text-ink ${
                  beat === 3 ? "text-[clamp(4.5rem,17vw,15rem)]" : "text-[clamp(7rem,30vw,24rem)]"
                }`}
                style={{ textShadow: "6px 6px 0 var(--cream)" }}
                initial={{ scale: 1.6, opacity: 0, rotate: beat === 3 ? -4 : 0 }}
                animate={{ scale: 1, opacity: 1, rotate: beat === 3 ? -4 : 0 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              >
                {beats[beat]}
              </motion.p>
            )}
          </div>

          <motion.span
            className="absolute bottom-6 right-6 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-ink/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            press any key
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Seconds the hero should wait so it lands as the opening clears. */
export function useOpeningDelay() {
  const [delay] = useState(() => {
    if (typeof document === "undefined") return 0;
    return document.documentElement.dataset.opening === "skip" ? 0 : 2.5;
  });
  return delay;
}

/** Runs before paint: skip the opening for repeat visits and reduced motion. */
export function OpeningGate() {
  const code = `try{if(sessionStorage.getItem("${SEEN_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.opening="skip"}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
