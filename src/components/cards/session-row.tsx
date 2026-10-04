import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { getProject } from "@/data/projects";
import type { PostMeta } from "@/lib/content";
import type { Lang } from "@/lib/i18n";
import { cn, formatDate, pad } from "@/lib/utils";
import { accentBg } from "@/lib/accents";

const ui = {
  en: { session: "Session", min: "min" },
  tr: { session: "Seans", min: "dk" },
} as const;

/**
 * A devlog as an episode card: the big session number in hollow caps,
 * the project it belongs to, and a still that slides in on hover.
 */
export function SessionRow({
  post,
  index = 0,
  lang = "en",
}: {
  post: PostMeta;
  index?: number;
  lang?: Lang;
}) {
  const project = post.project ? getProject(post.project) : undefined;
  const accent = project?.accent ?? "amber";
  const l = ui[lang];

  return (
    <Reveal as="li" delay={Math.min(index * 0.05, 0.25)}>
      <Link
        href={`/${post.collection}/${post.slug}`}
        className="group relative grid items-center gap-5 overflow-hidden border-t border-line py-8 md:grid-cols-[9rem_1fr_14rem] md:gap-10 md:py-10"
      >
        <span
          aria-hidden
          className={cn(
            "absolute inset-y-0 left-0 w-full origin-left scale-x-0 opacity-[0.07] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100",
            accentBg[accent],
          )}
        />
        <div className="relative">
          <span className="kicker text-faint">{l.session}</span>
          <span className="bebop outline-text block text-7xl text-muted transition-colors duration-300 group-hover:text-mustard md:text-8xl">
            #{pad(post.session ?? index + 1)}
          </span>
        </div>

        <div className="relative">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-faint">
            {project && (
              <span className={cn("px-2 py-0.5 text-ink", accentBg[accent])}>{project.title}</span>
            )}
            <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
            <span>
              · {post.readingMinutes} {l.min}
            </span>
          </div>
          <h3 className="display mt-3 text-2xl transition-colors duration-300 group-hover:text-amber md:text-4xl">
            {post.title}
          </h3>
          <p className="mt-2 max-w-2xl leading-relaxed text-muted">{post.description}</p>
        </div>

        {post.cover && (
          <div className="relative hidden aspect-[16/10] overflow-hidden border-2 border-ink md:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover}
              alt=""
              loading="lazy"
              className={cn(
                "size-full translate-x-6 object-cover opacity-0 grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100 group-hover:grayscale-0",
                project?.media?.pixel && "pixelated",
                (post.cover.includes("/blockslide/") || post.cover.includes("/mythkeep/")) &&
                  "bg-ink object-contain p-3",
              )}
            />
          </div>
        )}
      </Link>
    </Reveal>
  );
}
