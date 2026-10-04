import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Kicker } from "@/components/ui/kicker";
import { NoirLink } from "@/components/ui/noir-link";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { ColorBars } from "@/components/bebop/color-bars";
import { getPost, getPosts, type Collection } from "@/lib/content";
import { getProject } from "@/data/projects";
import { articleJsonLd } from "@/lib/seo";
import { cn, formatDate, pad } from "@/lib/utils";
import { getPageUi } from "@/lib/i18n-pages";
import { accentBg } from "@/lib/accents";
import type { Lang } from "@/lib/i18n";

const sessionUi = {
  en: { session: "Session", caseFile: "Open the case file", next: "Next session", end: "See you, space cowboy…" },
  tr: { session: "Seans", caseFile: "Dosyayı aç", next: "Sıradaki seans", end: "See you, space cowboy…" },
} as const;

/**
 * Shared reading experience for every MDX collection.
 * Devlogs open like an episode: session number, project, still.
 */
export function PostPage({
  collection,
  slug,
  lang = "en",
}: {
  collection: Collection;
  slug: string;
  lang?: Lang;
}) {
  const post = getPost(collection, slug, lang);
  if (!post) notFound();

  const labels = getPageUi("postLabels", lang)[collection];
  const s = sessionUi[lang];
  const project = post.project ? getProject(post.project) : undefined;
  const accent = project?.accent ?? "amber";

  // Chronological neighbour: the next session after this one.
  const all = getPosts(collection, lang);
  const at = all.findIndex((p) => p.slug === slug);
  const next = at > 0 ? all[at - 1] : undefined;

  return (
    <article className="pt-36 pb-28 md:pt-48">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: post.title,
              description: post.description,
              path: `/${collection}/${slug}`,
              date: post.date,
            }),
          ),
        }}
      />
      <Container size="narrow">
        <header className="mb-14">
          <div className="flex flex-wrap items-center gap-4">
            <ColorBars />
            <Reveal distance={12}>
              <Kicker signal>
                {labels.kicker} — {formatDate(post.date, lang)} — {post.readingMinutes}{" "}
                {labels.minRead}
              </Kicker>
            </Reveal>
          </div>

          {post.session && (
            <Reveal delay={0.1}>
              <p className="mt-8 flex flex-wrap items-baseline gap-4">
                <span className="bebop outline-text text-7xl text-mustard md:text-8xl">
                  {s.session} #{pad(post.session)}
                </span>
                {project && (
                  <Link
                    href={`/projects/${project.slug}`}
                    className={cn(
                      "bebop px-2 pt-1 text-xl text-ink transition-opacity hover:opacity-80",
                      accentBg[accent],
                    )}
                  >
                    {project.title}
                  </Link>
                )}
              </p>
            </Reveal>
          )}

          <TextReveal
            as="h1"
            text={post.title}
            delay={0.15}
            className="display mt-6 text-4xl md:text-6xl"
          />
          <Reveal delay={0.45}>
            <p className="mt-6 text-lg leading-relaxed text-muted">{post.description}</p>
          </Reveal>
        </header>
      </Container>

      {post.cover && (
        <Container size="default" className="mb-16">
          <Reveal>
            <figure className="relative overflow-hidden border-4 border-ink shadow-[10px_10px_0_var(--rust)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover}
                alt=""
                className={cn(
                  "max-h-[70vh] w-full",
                  project?.media?.pixel && "pixelated",
                  post.cover.includes("/blockslide/") || post.cover.includes("/mythkeep/")
                    ? "bg-ink object-contain p-10"
                    : "object-cover",
                )}
              />
            </figure>
          </Reveal>
        </Container>
      )}

      <Container size="narrow">
        <Reveal delay={0.2}>
          <div className="prose-noir">
            <MDXRemote source={post.content} />
          </div>
        </Reveal>

        {post.session && (
          <p className="bebop mt-16 text-right text-3xl text-faint md:text-4xl">{s.end}</p>
        )}

        <footer className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
          <div className="flex flex-col gap-3">
            <NoirLink href={`/${collection}`}>{labels.back}</NoirLink>
            {project?.story && (
              <NoirLink href={`/projects/${project.slug}`}>{s.caseFile}</NoirLink>
            )}
          </div>
          {next ? (
            <Link href={`/${collection}/${next.slug}`} className="group sm:text-right">
              <span className="kicker block">{s.next}</span>
              <span className="display mt-2 block text-xl transition-colors group-hover:text-amber">
                {next.title}
              </span>
            </Link>
          ) : (
            post.tags.length > 0 && (
              <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-faint sm:text-right">
                {post.tags.join(" · ")}
              </span>
            )
          )}
        </footer>
      </Container>
    </article>
  );
}
