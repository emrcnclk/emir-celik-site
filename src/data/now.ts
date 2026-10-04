/**
 * The /now page data. Update this file each season.
 * href turns a row into a door to another room.
 */

export const nowUpdated = "2026-10-04";

export type NowItem = {
  label: string;
  detail: string;
  href?: string;
  external?: boolean;
};

export const nowItems: NowItem[] = [
  {
    label: "Building",
    detail:
      "BlockSlide — Unity 6 mobile puzzle, iOS-first. Also extending Kiel with an AI layer.",
    href: "/projects",
  },
  {
    label: "Learning",
    detail:
      "Game-theoretic framing for multi-agent systems, and how those ideas transfer into practical AI tooling.",
    href: "/ai",
  },
  {
    label: "Listening",
    detail: "Spotify lists on rotation — open the Music page for the full dispatch.",
    href: "/music",
  },
  {
    label: "Watching",
    detail: "Latest Letterboxd reviews land on Cinema — posters, scores, short notes.",
    href: "/cinema",
  },
  {
    label: "Thinking about",
    detail:
      "How innovative game systems and AI can share the same design language without losing the feel of play.",
    href: "/about",
  },
];
