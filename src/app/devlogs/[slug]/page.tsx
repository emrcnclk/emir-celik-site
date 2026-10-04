import type { Metadata } from "next";
import { PostPage } from "@/components/post/post-page";
import { getPost, getPosts } from "@/lib/content";
import { resolvePageLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ lang?: string | string[] }>;
};

export function generateStaticParams() {
  return getPosts("devlogs").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("devlogs", slug);  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/devlogs/${slug}`,
  });
}

export default async function DevlogPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const lang = await resolvePageLang(searchParams);
  return <PostPage collection="devlogs" slug={slug} lang={lang} />;
}
