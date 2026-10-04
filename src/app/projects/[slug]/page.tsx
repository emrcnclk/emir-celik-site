import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { TitleCard } from "@/components/bebop/title-card";
import { Marquee } from "@/components/bebop/marquee";
import { TypeCover } from "@/components/cards/bounty-card";
import { SessionRow } from "@/components/cards/session-row";
import { ClipReel, Gallery } from "@/components/work/gallery";
import { CaseFileHero } from "@/components/work/case-file-hero";
import { bounty, caseFileProjects, formatWoolong, getProject, projectCopy } from "@/data/projects";
import { getProjectPosts } from "@/lib/content";
import { disciplineUi, projectStatusUi } from "@/lib/i18n";
import { resolvePageLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";
import { accentBg } from "@/lib/accents";
import { cn, formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ lang?: string | string[] }>;
};

const ui = {
  en: {
    caseFile: "Case file",
    bounty: "Bounty",
    commits: "Commits",
    active: "Active",
    platforms: "Platforms",
    stack: "Stack",
    status: "Status",
    story: "The story",
    storyKicker: "Debriefing",
    clips: "Rolling tape",
    clipsKicker: "Muted loops",
    shots: "Stills",
    shotsKicker: "Screenshots",
    sessions: "Sessions",
    sessionsKicker: "Devlogs from this hangar",
    source: "Source on GitHub",
    private: "Private repository",
    back: "Bounty board",
    next: "Next bounty",
  },
  tr: {
    caseFile: "Dosya",
    bounty: "Ödül",
    commits: "Commit",
    active: "Aktif",
    platforms: "Platformlar",
    stack: "Teknoloji",
    status: "Durum",
    story: "Hikâye",
    storyKicker: "Brifing",
    clips: "Dönen bant",
    clipsKicker: "Sessiz döngüler",
    shots: "Kareler",
    shotsKicker: "Ekran görüntüleri",
    sessions: "Seanslar",
    sessionsKicker: "Bu hangardan devloglar",
    source: "GitHub'da kaynak",
    private: "Özel repo",
    back: "Ödül panosu",
    next: "Sıradaki ödül",
  },
} as const;

export function generateStaticParams() {
  return caseFileProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.logline,
    path: `/projects/${slug}`,
  });
}

export default async function CaseFilePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const lang = await resolvePageLang(searchParams);
  const project = getProject(slug);
  if (!project?.story) notFound();

  const l = ui[lang];
  const copy = projectCopy(project, lang);
  const accent = project.accent ?? "amber";
  const posts = getProjectPosts(project.slug, lang);
  const idx = caseFileProjects.findIndex((p) => p.slug === project.slug);
  const next = caseFileProjects[(idx + 1) % caseFileProjects.length];
  const media = project.media;

  const particulars = [
    project.stats && { k: l.bounty, v: formatWoolong(bounty(project)), accent: true },
    project.stats && { k: l.commits, v: String(project.stats.commits) },
    project.stats && {
      k: l.active,
      v: `${formatDate(project.stats.from, lang)} → ${formatDate(project.stats.to, lang)}`,
    },
    { k: l.status, v: projectStatusUi[lang][project.status] },
    project.platforms && { k: l.platforms, v: project.platforms.join(" · ") },
    { k: l.stack, v: project.stack.join(" · ") },
  ].filter(Boolean) as { k: string; v: string; accent?: boolean }[];

  return (
    <article className="relative">
      <CaseFileHero
        title={project.title}
        alias={project.alias}
        kicker={`${l.caseFile} — ${disciplineUi[lang][project.discipline]} · ${project.year}`}
        logline={copy.logline}
        image={media?.hero ?? media?.cover}
        pixel={media?.pixel}
        contain={!media?.hero && (slug === "blockslide" || slug === "mythkeep")}
        accent={accent}
        fallback={!media?.cover ? <TypeCover project={project} /> : undefined}
      />

      {project.stats?.facts && (
        <div className="-rotate-1">
          <Marquee
            items={project.stats.facts.map((f) => f[lang])}
            tone={
              accent === "signal"
                ? "rust"
                : accent === "teal" || accent === "cyan"
                  ? "teal"
                  : "mustard"
            }
            fast
          />
        </div>
      )}

      <Container className="py-24 md:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_22rem]">
          <div>
            <TitleCard kicker={l.storyKicker} title={l.story} />
            <div className="space-y-6">
              {project.story[lang].map((para, i) => (
                <Reveal key={i} delay={Math.min(i * 0.08, 0.24)}>
                  <p
                    className={cn(
                      "max-w-2xl leading-[1.85]",
                      i === 0
                        ? "display text-2xl leading-snug text-foreground md:text-3xl"
                        : "text-lg text-muted",
                    )}
                  >
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.2}>
            <aside className="halftone sticky top-28 border-2 border-ink bg-cream text-ink shadow-[8px_8px_0_var(--rust)]">
              <div className="border-b-2 border-ink px-5 pt-3 pb-2">
                <p className="bebop text-3xl">{l.caseFile}</p>
                <p className="typewriter text-xs">#{project.slug.toUpperCase()}</p>
              </div>
              <dl className="divide-y-2 divide-dashed divide-ink/30">
                {particulars.map((row) => (
                  <div key={row.k} className="px-5 py-3">
                    <dt className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-ink/60">
                      {row.k}
                    </dt>
                    <dd
                      className={cn(
                        "typewriter mt-1 text-sm",
                        row.accent && "bebop text-3xl text-rust",
                      )}
                    >
                      {row.v}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="border-t-2 border-ink px-5 py-3">
                {project.link && !project.private ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="bebop inline-flex items-center gap-2 text-xl hover:text-rust"
                  >
                    {l.source} <ArrowUpRight className="size-4 -translate-y-0.5" />
                  </a>
                ) : (
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink/60">
                    {l.private}
                  </span>
                )}
              </div>
            </aside>
          </Reveal>
        </div>
      </Container>

      {media?.clips && media.clips.length > 0 && (
        <section className="border-t border-line bg-panel/40 py-24 md:py-32">
          <Container>
            <TitleCard kicker={l.clipsKicker} title={l.clips} />
            <ClipReel clips={media.clips.map((c) => ({ src: c.src, caption: c.caption[lang] }))} />
          </Container>
        </section>
      )}

      {media?.shots && media.shots.length > 0 && (
        <section className="py-24 md:py-32">
          <Container>
            <TitleCard kicker={l.shotsKicker} title={l.shots} />
            <Gallery
              pixel={media.pixel}
              shots={media.shots.map((s) => ({ src: s.src, caption: s.caption[lang] }))}
            />
          </Container>
        </section>
      )}

      {posts.length > 0 && (
        <section className="border-t border-line py-24 md:py-32">
          <Container>
            <TitleCard kicker={l.sessionsKicker} title={l.sessions} />
            <ul className="border-b border-line">
              {posts.map((post, i) => (
                <SessionRow key={post.slug} post={post} index={i} lang={lang} />
              ))}
            </ul>
          </Container>
        </section>
      )}

      <Container className="pb-28">
        <div className="flex flex-wrap items-stretch justify-between gap-4 border-t border-line pt-10">
          <Link
            href="/projects"
            className="bebop inline-flex items-center gap-3 text-3xl text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-6 -translate-y-0.5" /> {l.back}
          </Link>
          {next && next.slug !== project.slug && (
            <Link href={`/projects/${next.slug}`} className="group text-right">
              <span className="kicker block">{l.next}</span>
              <span className="bebop mt-1 inline-flex items-center gap-3 text-5xl transition-colors group-hover:text-mustard md:text-6xl">
                {next.title}
                <span className={cn("inline-block size-3", accentBg[next.accent ?? "amber"])} />
                <ArrowRight className="size-7 -translate-y-1 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          )}
        </div>
      </Container>
    </article>
  );
}
