import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * File-based content layer.
 * Every collection is a folder of MDX files under /content.
 * Publishing = dropping a new .mdx file. No code changes, ever.
 *
 * A Turkish edition sits beside the original as `slug.tr.mdx`;
 * when it exists, Turkish readers get it, everyone else the original.
 */

export type Collection = "devlogs" | "journal";
type Lang = "en" | "tr";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  collection: Collection;
  readingMinutes: number;
  /** Devlogs: the project slug this session belongs to. */
  project?: string;
  /** Devlogs: the session number, Bebop-style. */
  session?: number;
  /** Optional cover image. */
  cover?: string;
};

export type Post = PostMeta & { content: string };

const CONTENT_DIR = path.join(process.cwd(), "content");

function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function fileFor(collection: Collection, slug: string, lang: Lang) {
  const dir = path.join(CONTENT_DIR, collection);
  if (lang === "tr") {
    const tr = path.join(dir, `${slug}.tr.mdx`);
    if (fs.existsSync(tr)) return tr;
  }
  const base = path.join(dir, `${slug}.mdx`);
  return fs.existsSync(base) ? base : null;
}

function parse(collection: Collection, slug: string, file: string): Post {
  const { data, content } = matter(fs.readFileSync(file, "utf-8"));
  return {
    slug,
    title: String(data.title ?? "Untitled"),
    description: String(data.description ?? ""),
    date:
      data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    collection,
    readingMinutes: readingTime(content),
    project: data.project ? String(data.project) : undefined,
    session: typeof data.session === "number" ? data.session : undefined,
    cover: data.cover ? String(data.cover) : undefined,
    content,
  };
}

export function getPosts(collection: Collection, lang: Lang = "en"): PostMeta[] {
  const dir = path.join(CONTENT_DIR, collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx") && !file.endsWith(".tr.mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { content, ...meta } = parse(collection, slug, fileFor(collection, slug, lang)!);
      void content;
      return meta;
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date) || (b.session ?? 0) - (a.session ?? 0));
}

export function getPost(collection: Collection, slug: string, lang: Lang = "en"): Post | null {
  const file = fileFor(collection, slug, lang);
  return file ? parse(collection, slug, file) : null;
}

export function getProjectPosts(project: string, lang: Lang = "en") {
  return getPosts("devlogs", lang).filter((p) => p.project === project);
}
