import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/motion/reveal";
import { NoirLink } from "@/components/ui/noir-link";
import { SceneBackdrop } from "@/components/atmosphere/scene-backdrop";
import { atmosphere, rotation } from "@/data/atmosphere";
import { site } from "@/config/site";
import { getSpotifyPlaylists, getSpotifyShow } from "@/lib/spotify";
import { getPageUi } from "@/lib/i18n-pages";
import { resolvePageLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Music",
  description:
    "Spotify playlists and the heavy rotation: Radiohead, Jeff Buckley — most-streamed cuts that run the room.",
  path: "/music",
});

export default async function MusicPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string | string[] }>;
}) {
  const lang = await resolvePageLang(searchParams);
  const ui = getPageUi("music", lang);
  const [playlists, podcast] = await Promise.all([
    getSpotifyPlaylists(),
    getSpotifyShow(),
  ]);

  return (
    <div className="relative overflow-hidden">
      <SceneBackdrop
        src={atmosphere.listening}
        opacity={28}
        fit="cover"
        position="center 25%"
      />
      <div className="relative z-10">
        <PageHeader kicker={ui.kicker} title={ui.title} lede={ui.lede}>
          <Reveal delay={0.55} className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <NoirLink href={site.socials.spotify} external>
              {ui.openSpotify}
            </NoirLink>
            <NoirLink href={site.socials.podcast} external>
              {ui.openPodcast}
            </NoirLink>
          </Reveal>
        </PageHeader>
        <Container className="pb-32">
          <div className="mb-20">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <p className="kicker">{ui.podcastKicker}</p>
              <NoirLink href={site.socials.podcast} external>
                {ui.spotifyShow}
              </NoirLink>
            </div>
            <Reveal className="bg-night">
              <a
                href={site.socials.podcast}
                target="_blank"
                rel="noreferrer"
                className="group relative z-10 grid gap-8 border border-line p-8 transition-colors duration-500 hover:bg-panel md:grid-cols-[220px_1fr] md:p-12"
              >
                <span className="relative aspect-square overflow-hidden border border-line bg-panel">
                  {podcast?.image ? (
                    <Image
                      src={podcast.image}
                      alt={podcast.title}
                      fill
                      sizes="(min-width: 768px) 220px, calc(100vw - 4rem)"
                      className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center font-mono text-xs uppercase tracking-[0.2em] text-faint">
                      Podcast
                    </span>
                  )}
                </span>
                <span className="flex flex-col justify-between gap-14">
                  <span className="font-mono text-xs text-faint">SHOW 01</span>
                  <span>
                    <span className="display block text-2xl transition-colors duration-300 group-hover:text-amber md:text-3xl">
                      {podcast?.title ?? ui.podcastTitle}
                    </span>
                    <span className="mt-3 block max-w-2xl text-sm leading-relaxed text-muted">
                      {ui.podcastBody}
                    </span>
                    <span className="mt-5 block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-cyan">
                      open.spotify.com/show
                    </span>
                  </span>
                </span>
              </a>
            </Reveal>
          </div>

          <div className="mb-20">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <p className="kicker">{ui.dispatch}</p>
              <NoirLink href={site.socials.spotify} external>
                {ui.profile}
              </NoirLink>
            </div>
            <div className="relative z-10 grid gap-px border border-line bg-line md:grid-cols-2">
              {playlists.map((playlist, i) => (
                <Reveal
                  key={playlist.url}
                  delay={Math.min(i * 0.07, 0.28)}
                  className="bg-night"
                >
                  <a
                    href={playlist.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full flex-col justify-between gap-14 p-8 transition-colors duration-500 hover:bg-panel md:p-12"
                  >
                    <span className="font-mono text-xs text-faint">
                      PL {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="display block text-2xl transition-colors duration-300 group-hover:text-amber md:text-3xl">
                        {playlist.name}
                      </span>
                      <span className="mt-3 block text-sm leading-relaxed text-muted">
                        {playlist.description}
                      </span>
                      {playlist.tracks != null && (
                        <span className="mt-5 block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-cyan">
                          {playlist.tracks} {ui.tracks}
                        </span>
                      )}
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="kicker">{ui.heavy}</p>
          </div>
          <ul className="grid gap-px border border-line bg-line md:grid-cols-2">
            {rotation.map((track, i) => (
              <Reveal
                as="li"
                key={`${track.artist}-${track.title}`}
                delay={Math.min(i * 0.05, 0.3)}
                className="bg-night"
              >
                <div className="group flex h-full flex-col justify-between gap-12 p-8 transition-colors duration-500 hover:bg-panel md:p-12">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-xs text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-cyan">
                      {track.mood}
                    </span>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                      {track.artist} · {track.year}
                    </p>
                    <h2 className="display mt-2 text-2xl transition-colors duration-300 group-hover:text-amber md:text-3xl">
                      {track.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-muted">{track.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </div>
    </div>
  );
}
