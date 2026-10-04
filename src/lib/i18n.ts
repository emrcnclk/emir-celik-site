export type Lang = "en" | "tr";

export const LANG_COOKIE = "lang";

export function normalizeLang(input?: string | null): Lang {
  const raw = (input ?? "").toLowerCase();
  if (raw.startsWith("tr")) return "tr";
  if (raw.startsWith("en")) return "en";
  return "en";
}

export function langLabel(lang: Lang): string {
  return lang === "tr" ? "Türkçe" : "English";
}

const navGroupTrMap: Record<string, string> = {
  Orientation: "Yön",
  Work: "İş",
  Signals: "Sinyaller",
  "Off Duty": "Vardiya Dışı",
};

const navItemLabelTrMap: Record<string, string> = {
  Home: "Ana",
  About: "Hikaye",
  Now: "Şimdi",
  Contact: "İletişim",
  Projects: "Projeler",
  AI: "Yapay Zeka",
  "Game Development": "Oyun Geliştirme",
  "Mobile Apps": "Mobil Uygulamalar",
  Playground: "Atölye",
  Devlogs: "Devloglar",
  Podcast: "Podcast",
  Cinema: "Sinema",
  "Creative Works": "Yaratıcı İşler",
  Music: "Müzik",
  Photography: "Fotoğraf",
  Drawings: "Çizimler",
  Journal: "Günlük",
};

const navItemNoteTrMap: Record<string, string> = {
  "opening scene": "açılış sahnesi",
  "who is this": "kim bu",
  "this season": "bu sezon",
  "open channel": "kanal aç",
  "from the hangar": "hangardan",
  "mind like a machine": "makine gibi zihin",
  "machine minds": "makine gibi zihin",
  unity: "unity",
  "pocket software": "cep yazılımı",
  toys: "oyuncaklar",
  "build notes": "build notları",
  "on spotify": "spotify’da",
  "letterboxd feed": "letterboxd akışı",
  "everything else": "gerisi",
  rotation: "dönüş",
  "night walks": "gece yürüyüşleri",
  sketchbook: "eskiz defteri",
  "loose thoughts": "serbest düşünceler",
};

export function tNavGroupTitle(title: string, lang: Lang): string {
  if (lang === "tr") return navGroupTrMap[title] ?? title;
  return title;
}

export function tNavItemLabel(label: string, lang: Lang): string {
  if (lang === "tr") return navItemLabelTrMap[label] ?? label;
  return label;
}

export function tNavItemNote(note: string | undefined, lang: Lang): string | undefined {
  if (!note) return undefined;
  if (lang === "tr") return navItemNoteTrMap[note] ?? note;
  return note;
}

export const headerUi = {
  en: { menu: "Menu", close: "Close", openAria: "Open menu", closeAria: "Close menu" },
  tr: { menu: "Menü", close: "Kapat", openAria: "Menüyü aç", closeAria: "Menüyü kapat" },
} as const;

export const cinemaUi = {
  en: {
    kicker: "Sec. 14 — Cinema log",
    title: "Absolute cinema, logged.",
    lede: "Latest Letterboxd reviews land here. Below: a profile preview — tap to open the full feed.",
    openProfile: "Open Letterboxd profile",
    profilePreview: "Profile preview",
    latestReviews: "Latest reviews",
    readOn: "Read on Letterboxd",
    unrated: "unrated",
    noPoster: "no poster",
    recentSignalsSuffix: "recent signals in feed · click to open profile",
  },
  tr: {
    kicker: "Böl. 14 — Sinema kaydı",
    title: "Mutlak sinema, arşivlendi.",
    lede: "Son Letterboxd incelemeleri buraya düşer. Aşağıda profil önizlemesi — tıkla, asıl salona geç.",
    openProfile: "Letterboxd profilini aç",
    profilePreview: "Profil önizlemesi",
    latestReviews: "Son incelemeler",
    readOn: "Letterboxd’da oku",
    unrated: "oylanmadı",
    noPoster: "poster yok",
    recentSignalsSuffix: "feed’de sinyal · profili açmak için tıkla",
  },
} as const;

export function getCinemaUi(lang: Lang) {
  return cinemaUi[lang];
}

export const heroUi = {
  en: {
    session: "Session #01",
    episode: "Game Theory Blues",
    live: "live · no overdubs",
    headline: ["Emir", "Çelik"],
    tagline:
      "Game developer & computer engineer. I build games that live in your desktop's margins, co-op nights under a red moon, and the systems underneath them.",
    theme: "Theme — Tank! · The Seatbelts",
    feed: "Live feed",
    bounties: "Bounty board",
    sessions: "Read the sessions",
    marquee: [
      "3, 2, 1 — Let’s jam",
      "Unity 6",
      "C#",
      "React Native",
      "TypeScript",
      "Steamworks",
      "Game theory",
      "AI systems",
      "Pixel art pipelines",
      "Co-op netcode",
    ],
  },
  tr: {
    session: "Seans #01",
    episode: "Oyun Teorisi Blues",
    live: "canlı · overdub yok",
    headline: ["Emir", "Çelik"],
    tagline:
      "Oyun geliştirici ve bilgisayar mühendisi. Masaüstünün kenarında yaşayan oyunlar, kızıl bir ayın altında co-op geceler ve onların altındaki sistemleri yapıyorum.",
    theme: "Tema — Tank! · The Seatbelts",
    feed: "Canlı yayın",
    bounties: "Ödül panosu",
    sessions: "Seansları oku",
    marquee: [
      "3, 2, 1 — Let’s jam",
      "Unity 6",
      "C#",
      "React Native",
      "TypeScript",
      "Steamworks",
      "Oyun teorisi",
      "Yapay zekâ sistemleri",
      "Pixel art hatları",
      "Co-op ağ kodu",
    ],
  },
} as const;

export const rolesByLang = {
  en: [
    "Computer Engineer",
    "AI Engineer",
    "Unity Game Developer",
    "Mobile Developer",
    "Problem Solver",
  ],
  tr: [
    "Bilgisayar Mühendisi",
    "Yapay Zeka Mühendisi",
    "Unity Oyun Geliştirici",
    "Mobil Geliştirici",
    "Problem Çözücü",
  ],
} as const;

export const mottoByLang = {
  en: "Innovative systems for interactive worlds — where game theory meets artificial intelligence.",
  tr: "Etkileşimli dünyalar için yenilikçi sistemler — oyun teorisinin yapay zekâyla buluştuğu yer.",
} as const;

export const homeUi = {
  en: {
    ethosKicker: "01 — Ethos",
    ethosHeadline: "Innovative play. Rigorous theory. Intelligence that serves the player.",
    ethosBody:
      "I design interactive systems where game theory informs AI, and AI sharpens gameplay — from Unity puzzles to care platforms and research prototypes. Craft first. Hype never.",
    fullStory: "The full story",
    hangarKicker: "02 — Hangar",
    hangarTitle: "Projects from the bench",
    allProjects: "All projects",
    openHangar: "Open the hangar",
    universeKicker: "03 — The universe",
    universeTitle: "Pick a frequency",
    currentlyPrefix: "Currently — updated",
    nowPage: "The now page",
    universe: [
      { label: "AI", href: "/ai", note: "theory into models" },
      { label: "Games", href: "/game-development", note: "systems you can feel" },
      { label: "Mobile", href: "/mobile", note: "software for the pocket" },
      { label: "Cinema", href: "/cinema", note: "letterboxd dispatches" },
      { label: "Music", href: "/music", note: "spotify playlists" },
      { label: "Projects", href: "/projects", note: "live github hangar" },
    ],
  },
  tr: {
    ethosKicker: "01 — Ethos",
    ethosHeadline: "Yenilikçi oyun. Katı teori. Oyuncuya hizmet eden zekâ.",
    ethosBody:
      "Oyun teorisinin yapay zekâyı beslediği, yapay zekânın da oynanışı keskinleştirdiği etkileşimli sistemler tasarlıyorum — Unity bulmacalarından bakım platformlarına ve araştırma prototiplerine. Önce zanaat. Asla hype.",
    fullStory: "Tam hikaye",
    hangarKicker: "02 — Hangar",
    hangarTitle: "Tezgahtan projeler",
    allProjects: "Tüm projeler",
    openHangar: "Hangarı aç",
    universeKicker: "03 — Evren",
    universeTitle: "Bir frekans seç",
    currentlyPrefix: "Şu an — güncellendi",
    nowPage: "Şimdi sayfası",
    universe: [
      { label: "Yapay Zeka", href: "/ai", note: "teoriden modele" },
      { label: "Oyunlar", href: "/game-development", note: "hissedilen sistemler" },
      { label: "Mobil", href: "/mobile", note: "cep için yazılım" },
      { label: "Sinema", href: "/cinema", note: "letterboxd sinyalleri" },
      { label: "Müzik", href: "/music", note: "spotify listeleri" },
      { label: "Projeler", href: "/projects", note: "canlı github hangarı" },
    ],
  },
} as const;

export const nowUi = {
  en: [
    {
      label: "Building",
      detail:
        "Blood Moon — a four-player co-op survivors game, six days old and already on a Steam page. Idle Pixel Hero is heading to Steam and the stores.",
      href: "/projects/blood-moon",
    },
    {
      label: "Shipping",
      detail:
        "BlockSlide's store build with a hundred remixed levels, and Mythkeep's first release profiles.",
      href: "/devlogs",
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
  ],
  tr: [
    {
      label: "İnşa",
      detail:
        "Blood Moon — dört kişilik co-op bir survivors oyunu; altı günlük ve şimdiden bir Steam sayfası var. Idle Pixel Hero Steam'e ve mağazalara hazırlanıyor.",
      href: "/projects/blood-moon",
    },
    {
      label: "Yayın",
      detail:
        "Yüz remix seviyeyle BlockSlide'ın mağaza build'i ve Mythkeep'in ilk sürüm profilleri.",
      href: "/devlogs",
    },
    {
      label: "Dinleme",
      detail: "Spotify listeleri rotasyonda — tam yayın için Müzik sayfasını aç.",
      href: "/music",
    },
    {
      label: "İzleme",
      detail: "Son Letterboxd incelemeleri Sinema’da — posterler, skorlar, kısa notlar.",
      href: "/cinema",
    },
    {
      label: "Düşündüğüm",
      detail:
        "Yenilikçi oyun sistemleri ile yapay zekânın, oyunun hissini kaybetmeden aynı tasarım dilini paylaşması.",
      href: "/about",
    },
  ],
} as const;

export const footerUi = {
  en: {
    endSession: "End of session",
    farewell: "See you, space cowboy.",
    farewellMuted: "The frequency stays open — write anytime.",
    credit: "tuned by hand, one take at a time",
    freqOpen: "freq open",
  },
  tr: {
    endSession: "Seans sonu",
    farewell: "Görüşürüz, uzay kovboyu.",
    farewellMuted: "Frekans açık kalır — istediğin zaman yaz.",
    credit: "elle ayarlandı, tek take",
    freqOpen: "frekans açık",
  },
} as const;

export const projectStatusUi = {
  en: {
    shipped: "Shipped",
    "in-progress": "In progress",
    archived: "Archived",
  },
  tr: {
    shipped: "Yayında",
    "in-progress": "Devam ediyor",
    archived: "Arşiv",
  },
} as const;

export const disciplineUi = {
  en: {
    ai: "Artificial Intelligence",
    game: "Game Development",
    mobile: "Mobile",
    software: "Software",
  },
  tr: {
    ai: "Yapay Zeka",
    game: "Oyun Geliştirme",
    mobile: "Mobil",
    software: "Yazılım",
  },
} as const;

export function getHomeUi(lang: Lang) {
  return homeUi[lang];
}

export function getHeroUi(lang: Lang) {
  return heroUi[lang];
}

export function getFooterUi(lang: Lang) {
  return footerUi[lang];
}

export function getNowItems(lang: Lang) {
  return nowUi[lang];
}

export function getRoles(lang: Lang) {
  return rolesByLang[lang];
}

export function getMotto(lang: Lang) {
  return mottoByLang[lang];
}
