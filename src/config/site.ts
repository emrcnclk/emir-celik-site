/**
 * Single source of truth for personal identity.
 * Change these values once — the entire site follows.
 */
export const site = {
  name: "Emir",
  fullName: "Emir Çelik",
  monogram: "E—Ç",
  url: "https://emirinspace.com",
  title: "Emir Çelik — Game theory × AI × interactive systems",
  description:
    "Computer engineer and game developer exploring innovative solutions at the intersection of game theory and artificial intelligence.",
  /** Professional motto — used in hero, about, OG. */
  motto:
    "Innovative systems for interactive worlds — where game theory meets artificial intelligence.",
  locale: "en_US",
  location: "Istanbul, Türkiye",
  timezone: "Europe/Istanbul",
  roles: [
    "Computer Engineer",
    "AI Engineer",
    "Unity Game Developer",
    "Mobile Developer",
    "Problem Solver",
  ],
  email: "emircancelik0102@gmail.com",
  socials: {
    github: "https://github.com/emrcnclk",
    linkedin: "https://www.linkedin.com/in/emrcncelk1/",
    podcast: "https://open.spotify.com/show/033rE9pVG5abTgsAmifrw6?si=f631895e679641dd",
    spotify: "https://open.spotify.com/user/iktqe9rnrzvkwr65cqj2sxvb6?si=ae812e4b317d446f",
    letterboxd: "https://letterboxd.com/Ekmech/",
  },
  githubUser: "emrcnclk",
  spotifyUser: "iktqe9rnrzvkwr65cqj2sxvb6",
  letterboxdUser: "Ekmech",
} as const;

export type Site = typeof site;
