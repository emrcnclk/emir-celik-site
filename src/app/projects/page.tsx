import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { NoirLink } from "@/components/ui/noir-link";
import { TitleCard } from "@/components/bebop/title-card";
import { BountyCard } from "@/components/cards/bounty-card";
import { site } from "@/config/site";
import { getLiveProjects } from "@/lib/github";
import { getPageUi } from "@/lib/i18n-pages";
import { resolvePageLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "The bounty board — Blood Moon, Idle Pixel Hero, GMRLOG, Mythkeep, BlockSlide and more, each with a case file.",
  path: "/projects",
});

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string | string[] }>;
}) {
  const lang = await resolvePageLang(searchParams);
  const ui = getPageUi("projects", lang);
  const projects = await getLiveProjects();
  const wanted = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <>
      <PageHeader kicker={ui.kicker} title={ui.title} lede={ui.lede}>
        <div className="mt-8">
          <NoirLink href={site.socials.github} external>
            github.com/{site.githubUser}
          </NoirLink>
        </div>
      </PageHeader>

      <Container size="wide" className="pb-24">
        <ul className="grid gap-8 md:grid-cols-2 lg:gap-10">
          {wanted.map((project, i) => (
            <li key={project.slug} className={i === 0 ? "md:col-span-2" : undefined}>
              <BountyCard project={project} index={i} lang={lang} size={i === 0 ? "lg" : "md"} />
            </li>
          ))}
        </ul>
      </Container>

      {others.length > 0 && (
        <Container size="wide" className="pb-32">
          <TitleCard kicker={ui.othersKicker} title={ui.others} />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((project, i) => (
              <li key={project.slug}>
                <BountyCard project={project} index={wanted.length + i} lang={lang} />
              </li>
            ))}
          </ul>
        </Container>
      )}
    </>
  );
}
