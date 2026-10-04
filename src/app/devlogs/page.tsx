import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { SessionRow } from "@/components/cards/session-row";
import { getPosts } from "@/lib/content";
import { getPageUi } from "@/lib/i18n-pages";
import { resolvePageLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Devlogs",
  description:
    "Session logs from Blood Moon, Idle Pixel Hero, GMRLOG, Mythkeep and BlockSlide — written from the commit history, in English and Turkish.",
  path: "/devlogs",
});

export default async function DevlogsPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string | string[] }>;
}) {
  const lang = await resolvePageLang(searchParams);
  const ui = getPageUi("devlogs", lang);
  const posts = getPosts("devlogs", lang);

  return (
    <>
      <PageHeader kicker={ui.kicker} title={ui.title} lede={ui.lede} />
      <Container size="wide" className="pb-32">
        {posts.length === 0 ? (
          <p className="border-t border-line pt-10 font-mono text-sm text-faint">{ui.empty}</p>
        ) : (
          <ul className="border-b border-line">
            {posts.map((post, i) => (
              <SessionRow key={post.slug} post={post} index={i} lang={lang} />
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
