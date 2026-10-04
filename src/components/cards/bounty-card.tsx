"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";
import { bounty, formatWoolong, projectCopy, type Project } from "@/data/projects";
import { projectStatusUi, type Lang } from "@/lib/i18n";
import { EASE_CINEMA, viewportOnce } from "@/lib/motion";
import { cn, pad } from "@/lib/utils";
import { accentBg, accentText } from "@/lib/accents";

const labels = {
  en: {
    wanted: "Bounty",
    alive: "Dead or alive",
    commits: "commits",
    days: "days",
    open: "Open case file",
  },
  tr: {
    wanted: "Ödül",
    alive: "Ölü ya da diri",
    commits: "commit",
    days: "gün",
    open: "Dosyayı aç",
  },
} as const;

function daysBetween(from: string, to: string) {
  return Math.max(1, Math.round((+new Date(to) - +new Date(from)) / 86_400_000) + 1);
}

/** Cover for a project with no art: its name, printed like a wanted poster. */
export function TypeCover({ project, className }: { project: Project; className?: string }) {
  const accent = project.accent ?? "amber";
  return (
    <div
      className={cn(
        "relative flex size-full items-end overflow-hidden",
        accentBg[accent],
        className,
      )}
    >
      <div className="halftone absolute inset-0 opacity-70" />
      <span className="bebop absolute -right-4 -top-6 text-[11rem] leading-none text-ink/15">
        {project.title.slice(0, 3)}
      </span>
      <span className="bebop relative p-5 text-6xl text-ink">{project.title}</span>
    </div>
  );
}

/**
 * A project as a Big Shot bounty poster: mugshot, alias, price.
 * The price is the commit count dressed up in woolongs.
 */
export function BountyCard({
  project,
  index,
  lang = "en",
  size = "md",
}: {
  project: Project;
  index: number;
  lang?: Lang;
  size?: "md" | "lg";
}) {
  const reduced = useReducedMotion();
  const l = labels[lang];
  const copy = projectCopy(project, lang);
  const accent = project.accent ?? "amber";
  const cover = project.media?.cover;
  const href = project.story ? `/projects/${project.slug}` : project.link;
  const external = !project.story;

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(useTransform(ry, [-0.5, 0.5], [5, -5]), {
    stiffness: 150,
    damping: 16,
  });
  const rotateY = useSpring(useTransform(rx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 150,
    damping: 16,
  });

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    rx.set((e.clientX - r.left) / r.width - 0.5);
    ry.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const body = (
    <>
      {/* Header strip */}
      <div className="flex items-center justify-between border-b-2 border-ink bg-cream px-4 pt-2 pb-1 text-ink">
        <span className="bebop text-2xl">
          {l.wanted} · {pad(index + 1)}
        </span>
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em]">{l.alive}</span>
      </div>

      <div
        className={cn("flex flex-1 flex-col", size === "lg" && "md:grid md:grid-cols-[1.55fr_1fr]")}
      >
        {/* Mugshot */}
        <div className="relative aspect-[16/10] overflow-hidden bg-ink">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover}
              alt=""
              loading="lazy"
              className={cn(
                "size-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] md:grayscale md:contrast-125 md:group-hover:grayscale-0 md:group-hover:contrast-100",
                project.media?.pixel && "pixelated",
                cover.includes("/blockslide/") || cover.includes("/mythkeep/")
                  ? "object-contain p-6"
                  : "",
              )}
            />
          ) : (
            <TypeCover project={project} />
          )}
          <div
            aria-hidden
            className={cn(
              "absolute inset-y-0 left-0 w-2 origin-top transition-transform duration-500 group-hover:scale-y-100 md:scale-y-0",
              accentBg[accent],
            )}
          />
          <span className="absolute right-3 top-3 bg-ink/80 px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-cream">
            {projectStatusUi[lang][project.status]}
          </span>
        </div>

        {/* Particulars */}
        <div className="flex flex-1 flex-col gap-4 bg-panel p-5 md:p-6">
          <div>
            <h3 className="bebop text-5xl transition-colors duration-300 group-hover:text-mustard md:text-6xl">
              {project.title}
            </h3>
            {project.alias && (
              <p className="typewriter mt-1 text-sm text-faint">a.k.a. “{project.alias}”</p>
            )}
          </div>
          <p className="leading-relaxed text-muted">{copy.logline}</p>
          <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-dashed border-line-strong pt-4">
            {project.stats ? (
              <div>
                <p className={cn("bebop text-4xl", accentText[accent])}>
                  {formatWoolong(bounty(project))}
                </p>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-faint">
                  {project.stats.commits} {l.commits} ·{" "}
                  {daysBetween(project.stats.from, project.stats.to)} {l.days}
                </p>
              </div>
            ) : (
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">
                {project.year} · {project.stack.slice(0, 3).join(" / ")}
              </p>
            )}
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-muted transition-colors group-hover:text-foreground">
              {project.story ? l.open : "GitHub"} →
            </span>
          </div>
        </div>
      </div>
    </>
  );

  const cardClass =
    "group relative flex h-full flex-col overflow-hidden border-2 border-ink bg-ink shadow-[6px_6px_0_rgba(0,0,0,0.6)] transition-shadow duration-300 hover:shadow-[10px_10px_0_var(--rust)]";

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 40, rotate: index % 2 ? 1.5 : -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, ease: EASE_CINEMA, delay: Math.min((index % 3) * 0.08, 0.24) }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        style={reduced ? undefined : { rotateX, rotateY }}
        className="h-full"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        {href ? (
          external ? (
            <a href={href} target="_blank" rel="noreferrer" className={cardClass}>
              {body}
            </a>
          ) : (
            <Link href={href} className={cardClass}>
              {body}
            </Link>
          )
        ) : (
          <div className={cardClass}>{body}</div>
        )}
      </motion.div>
    </motion.div>
  );
}
