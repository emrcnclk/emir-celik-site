"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_CINEMA } from "@/lib/motion";

/**
 * Page transition: a scene cut in the Bebop grammar — three flat bars
 * sweep off the screen (CSS, see .scene-wipe) and the page settles in.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <div aria-hidden className="scene-wipe">
        <span />
        <span />
        <span />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_CINEMA, delay: 0.15 }}
      >
        {children}
      </motion.div>
    </>
  );
}
