import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { PostRow } from "@/components/cards/post-row";
import { getPosts, type Collection } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

type PostIndexProps = {
  collection: Collection;
  kicker: string;
  title: string;
  lede: string;
  empty: string;
  lang?: Lang;
};

/** Shared listing page for all writing collections. */
export function PostIndex({
  collection,
  kicker,
  title,
  lede,
  empty,
  lang = "en",
}: PostIndexProps) {
  const posts = getPosts(collection, lang);

  return (
    <>
      <PageHeader kicker={kicker} title={title} lede={lede} />
      <Container className="pb-32">
        {posts.length === 0 ? (
          <p className="border-t border-line pt-10 font-mono text-sm text-faint">{empty}</p>
        ) : (
          <ul className="border-b border-line">
            {posts.map((post, i) => (
              <PostRow key={post.slug} post={post} index={i} />
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
