import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { TitleCard } from "@/components/bebop/title-card";
import { CountUp } from "@/components/bebop/count-up";
import { Marquee } from "@/components/bebop/marquee";
import { BountyCard } from "@/components/cards/bounty-card";
import { SessionRow } from "@/components/cards/session-row";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Kicker } from "@/components/ui/kicker";
import { NoirLink } from "@/components/ui/noir-link";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { nowUpdated } from "@/data/now";
import { bounty, projects } from "@/data/projects";
import { getFeaturedProjects } from "@/lib/github";
import { getPosts } from "@/lib/content";
import { getHomeUi, getNowItems } from "@/lib/i18n";
import { resolvePageLang } from "@/lib/i18n-server";
import { formatDate } from "@/lib/utils";

const homeBebop = {
  en: {
    statsKicker: "01 — The crew’s ledger",
    stats: ["Total bounty", "Commits since August", "Projects on the board", "Sessions logged"],
    boardKicker: "02 — Wanted",
    boardTitle: "Bounty board",
    allBounties: "All bounties",
    sessionsKicker: "03 — Session logs",
    sessionsTitle: "Latest sessions",
    allSessions: "All sessions",
    universeKicker: "04 — Off the ship",
    universeTitle: "Other frequencies",
  },
  tr: {
    statsKicker: "01 — Mürettebat defteri",
    stats: ["Toplam ödül", "Ağustos’tan beri commit", "Panodaki projeler", "Kayıtlı seanslar"],
    boardKicker: "02 — Aranıyor",
    boardTitle: "Ödül panosu",
    allBounties: "Tüm ödüller",
    sessionsKicker: "03 — Seans kayıtları",
    sessionsTitle: "Son seanslar",
    allSessions: "Tüm seanslar",
    universeKicker: "04 — Gemi dışı",
    universeTitle: "Diğer frekanslar",
  },
} as const;

const tape = [
  "You’re gonna carry that weight",
  "Whatever happens, happens",
  "See you, space cowboy",
  "Bang",
] as const;

const panelColors = ["bg-mustard", "bg-rust", "bg-teal"] as const;

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string | string[] }>;
}) {
  const lang = await resolvePageLang(searchParams);
  const ui = getHomeUi(lang);
  const b = homeBebop[lang];
  const nowItems = getNowItems(lang);
  const featured = await getFeaturedProjects();
  const sessions = getPosts("devlogs", lang);

  const stats = [
    {
      value: projects.reduce((sum, p) => sum + bounty(p), 0) / 1_000_000,
      prefix: "₩",
      suffix: "M",
      decimals: 1,
    },
    {
      value: projects
        .filter((p) => p.stats && p.stats.from >= "2026-08-01")
        .reduce((sum, p) => sum + (p.stats?.commits ?? 0), 0),
    },
    { value: projects.length },
    { value: sessions.length },
  ];

  return (
    <>
      <Hero lang={lang} />

      {/* Ledger */}
      <Section compact>
        <Container size="wide">
          <Reveal distance={10}>
            <Kicker>{b.statsKicker}</Kicker>
          </Reveal>
          <dl className="mt-8 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={b.stats[i]} delay={i * 0.06} className="bg-night">
                <div className="flex h-full flex-col-reverse justify-end gap-3 p-6 md:p-8">
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-faint">
                    {b.stats[i]}
                  </dt>
                  <dd className="bebop text-4xl text-foreground md:text-6xl">
                    <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Bounty board */}
      <Section compact>
        <Container size="wide">
          <TitleCard
            kicker={b.boardKicker}
            title={b.boardTitle}
            action={<NoirLink href="/projects">{b.allBounties}</NoirLink>}
          />
          <ul className="grid gap-8 md:grid-cols-2 lg:gap-10">
            {featured.slice(0, 4).map((project, i) => (
              <li key={project.slug}>
                <BountyCard project={project} index={i} lang={lang} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <div className="rotate-1 py-6">
        <Marquee items={tape} tone="rust" reverse />
      </div>

      {/* Sessions */}
      <Section compact>
        <Container size="wide">
          <TitleCard
            kicker={b.sessionsKicker}
            title={b.sessionsTitle}
            action={<NoirLink href="/devlogs">{b.allSessions}</NoirLink>}
          />
          <ul className="border-b border-line">
            {sessions.slice(0, 4).map((post, i) => (
              <SessionRow key={post.slug} post={post} index={i} lang={lang} />
            ))}
          </ul>
        </Container>
      </Section>

      {/* Universe */}
      <Section compact>
        <Container size="wide">
          <TitleCard kicker={b.universeKicker} title={b.universeTitle} />
          <div className="relative z-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {ui.universe.map((item, i) => (
              <Reveal key={item.href} delay={Math.min(i * 0.07, 0.35)} className="bg-night">
                <Link
                  href={item.href}
                  className="group relative z-10 flex h-full flex-col justify-between gap-14 overflow-hidden p-8 md:p-10"
                >
                  <span
                    aria-hidden
                    className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 ${
                      panelColors[i % 3]
                    }`}
                  />
                  <span className="relative font-mono text-xs text-faint transition-colors group-hover:text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative">
                    <span className="bebop block text-5xl transition-colors duration-300 group-hover:text-ink">
                      {item.label}
                    </span>
                    <span className="mt-2 block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint transition-colors group-hover:text-ink/70">
                      {item.note}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Now */}
      <Section>
        <Container size="wide">
          <Parallax offset={24}>
            <div className="halftone relative z-10 overflow-hidden border-2 border-ink bg-cream p-8 text-ink shadow-[10px_10px_0_var(--teal)] md:p-14">
              <div className="relative mb-10 flex flex-wrap items-center justify-between gap-4">
                <span className="bebop text-4xl md:text-5xl">
                  {ui.currentlyPrefix} {formatDate(nowUpdated, lang)}
                </span>
                <Link
                  href="/now"
                  className="font-mono text-xs uppercase tracking-[0.2em] underline decoration-rust underline-offset-4 hover:text-rust"
                >
                  {ui.nowPage} →
                </Link>
              </div>
              <dl className="relative grid gap-x-12 gap-y-8 md:grid-cols-2">
                {nowItems.slice(0, 4).map((item, i) => {
                  const body = (
                    <>
                      <dt className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60 transition-colors group-hover:text-rust">
                        {item.label}
                      </dt>
                      <dd className="typewriter mt-2 leading-relaxed">{item.detail}</dd>
                    </>
                  );
                  return (
                    <Reveal key={item.label} delay={Math.min(i * 0.08, 0.3)}>
                      {item.href ? (
                        <Link href={item.href} className="group block">
                          {body}
                        </Link>
                      ) : (
                        <div>{body}</div>
                      )}
                    </Reveal>
                  );
                })}
              </dl>
            </div>
          </Parallax>
        </Container>
      </Section>
    </>
  );
}
