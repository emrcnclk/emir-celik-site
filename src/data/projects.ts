/**
 * Project registry — the bounty board.
 * Curated entries carry the art, the numbers and the copy (EN + TR).
 * Public GitHub repos are merged in live by lib/github.ts; private ones
 * (most of the games) live only here and link to their devlogs instead.
 */

export type Discipline = "ai" | "game" | "mobile" | "software";

export type Localized = { en: string; tr: string };

export type ProjectMedia = {
  /** Wide key art used on cards and the case-file header. */
  cover?: string;
  /** Ultra-wide banner for the case-file hero. */
  hero?: string;
  /** Screenshots, in display order. */
  shots?: { src: string; caption: Localized }[];
  /** Short muted loops (webm). */
  clips?: { src: string; caption: Localized }[];
  /** Pixel art — render with nearest-neighbour scaling. */
  pixel?: boolean;
};

export type ProjectStats = {
  commits: number;
  /** ISO dates of the first and latest commit we know of. */
  from: string;
  to: string;
  /** Headline figures, e.g. "22 heroes". */
  facts?: Localized[];
};

export type Project = {
  slug: string;
  title: string;
  year: number;
  discipline: Discipline;
  logline: string;
  summary: string;
  status: "shipped" | "in-progress" | "archived";
  stack: string[];
  link?: string;
  featured?: boolean;
  stars?: number;
  /** Turkish copy for logline / summary. */
  tr?: { logline: string; summary: string };
  /** Bebop-style alias shown on the bounty poster. */
  alias?: string;
  /** Poster accent — one of the palette signal colours. */
  accent?: "amber" | "cyan" | "signal" | "mustard" | "teal";
  media?: ProjectMedia;
  stats?: ProjectStats;
  /** Platforms the build targets. */
  platforms?: string[];
  /** Case-file body paragraphs. */
  story?: { en: string[]; tr: string[] };
  /** True when the source is private — no GitHub link is shown. */
  private?: boolean;
};

export const disciplineLabels: Record<Discipline, string> = {
  ai: "Artificial Intelligence",
  game: "Game Development",
  mobile: "Mobile",
  software: "Software",
};

const shot = (slug: string, n: number, en: string, tr: string) => ({
  src: `/work/${slug}/shot-${n}.webp`,
  caption: { en, tr },
});

export const projects: Project[] = [
  {
    slug: "blood-moon",
    title: "Blood Moon",
    alias: "Kan Ayı",
    year: 2026,
    discipline: "game",
    accent: "signal",
    logline:
      "A 1–4 player co-op survivors game — Steam lobbies, split screen, and a moon that turns the night against you.",
    summary:
      "Unity 6 bullet-heaven with online co-op over Steam and up to four players on one screen. The simulation is plain C#, tested outside Unity; the netcode is a binary snapshot protocol built for it.",
    tr: {
      logline:
        "1–4 oyunculu co-op bir survivors oyunu — Steam lobileri, bölünmüş ekran ve geceyi sana karşı çeviren bir ay.",
      summary:
        "Steam üzerinden online co-op ve tek ekranda dört oyuncuya kadar oynanan Unity 6 bullet-heaven. Simülasyon saf C#, Unity dışında test ediliyor; ağ kodu ona göre yazılmış ikili bir snapshot protokolü.",
    },
    status: "in-progress",
    stack: ["Unity 6", "C#", "URP 2D", "Steamworks", "PixelLab"],
    platforms: ["Windows", "Steam"],
    featured: true,
    private: true,
    media: {
      cover: "/work/blood-moon/cover.webp",
      hero: "/work/blood-moon/hero.webp",
      pixel: true,
      clips: [
        { src: "/work/blood-moon/coop.webm", caption: { en: "Four-player co-op", tr: "Dört kişilik co-op" } },
        { src: "/work/blood-moon/bloodmoon.webm", caption: { en: "The Blood Moon rises", tr: "Kan Ayı yükseliyor" } },
      ],
      shots: [
        shot("blood-moon", 1, "A final boss", "Bir final bossu"),
        shot("blood-moon", 2, "Co-op over Steam", "Steam üzerinden co-op"),
        shot("blood-moon", 3, "The Blood Moon event", "Kan Ayı olayı"),
        shot("blood-moon", 4, "Hell Gate", "Cehennem Kapısı"),
        shot("blood-moon", 5, "Split screen, four players", "Bölünmüş ekran, dört oyuncu"),
        shot("blood-moon", 6, "Level-up cards, picked while the game runs", "Oyun akarken seçilen seviye kartları"),
        shot("blood-moon", 7, "Frostwood", "Buz Ormanı"),
        shot("blood-moon", 8, "Bone Crypt", "Kemik Mahzeni"),
      ],
    },
    stats: {
      commits: 28,
      from: "2026-09-28",
      to: "2026-10-03",
      facts: [
        { en: "22 heroes", tr: "22 karakter" },
        { en: "32 weapons · 23 passives · 56 items", tr: "32 silah · 23 pasif · 56 eşya" },
        { en: "4 maps, each with a final boss", tr: "4 harita, her birinde final bossu" },
        { en: "53 Steam achievements", tr: "53 Steam başarımı" },
        { en: "11 languages", tr: "11 dil" },
      ],
    },
    story: {
      en: [
        "Blood Moon started as a question: how much of a co-op survivors game can be written so that Unity never sees it? The answer turned out to be almost all of it. Combat, spawning, loot, progression and the meta game are a pure C# simulation, with its own test runner and balance bots — the game can be played, measured and broken without opening the editor.",
        "On top of that sits a small binary protocol and a snapshot encoder for host/client sessions, so the same simulation runs over Steam lobbies, LAN, and up to four players on one screen. When players walk close together, the split screen merges back into one.",
        "Every sprite was generated with PixelLab through a manifest-driven pipeline, then corrected where the generator got feet, wings or walk cycles wrong. Six days in, it had a title screen, a store page in eleven languages and 53 achievements.",
      ],
      tr: [
        "Blood Moon bir soruyla başladı: co-op bir survivors oyununun ne kadarı Unity hiç görmeden yazılabilir? Cevap: neredeyse tamamı. Dövüş, düşman doğurma, ganimet, ilerleme ve meta oyun saf bir C# simülasyonu; kendi test koşucusu ve denge botları var — oyun editör açılmadan oynanabiliyor, ölçülebiliyor ve kırılabiliyor.",
        "Bunun üstünde host/istemci oturumları için küçük bir ikili protokol ve snapshot kodlayıcı duruyor; böylece aynı simülasyon Steam lobilerinde, LAN'da ve tek ekranda dört oyuncuya kadar çalışıyor. Oyuncular birbirine yaklaşınca bölünmüş ekran tek ekrana birleşiyor.",
        "Bütün görseller manifest tabanlı bir hatla PixelLab ile üretildi, üreticinin ayakları, kanatları ya da yürüme döngülerini yanlış çizdiği yerlerde düzeltildi. Altıncı günde bir açılış ekranı, 11 dilde mağaza sayfası ve 53 başarımı vardı.",
      ],
    },
  },
  {
    slug: "idle-pixel-hero",
    title: "Idle Pixel Hero",
    alias: "The Strip",
    year: 2026,
    discipline: "game",
    accent: "mustard",
    logline:
      "An idle RPG that lives in a thin strip on your desktop — your party fights on while you work.",
    summary:
      "Unity 6 idle RPG with a click-through, always-on-top widget strip and a full Headquarters window for builds, loot and prestige. Windows, macOS, Android and iOS from one project, with a Steam page ready.",
    tr: {
      logline:
        "Masaüstünde ince bir şeritte yaşayan idle RPG — sen çalışırken ekibin savaşmaya devam ediyor.",
      summary:
        "Tıklamayı arkaya geçiren, hep üstte duran bir şerit ve build, ganimet ve prestige için tam bir Karargâh penceresiyle Unity 6 idle RPG. Tek projeden Windows, macOS, Android ve iOS; Steam sayfası hazır.",
    },
    status: "in-progress",
    stack: ["Unity 6", "C#", "Steamworks", "PixelLab", "IAP"],
    platforms: ["Windows", "macOS", "Android", "iOS", "Steam"],
    featured: true,
    private: true,
    media: {
      cover: "/work/idle-pixel-hero/cover.webp",
      hero: "/work/idle-pixel-hero/hero.webp",
      pixel: true,
      clips: [
        { src: "/work/idle-pixel-hero/desktop.webm", caption: { en: "Living on the desktop", tr: "Masaüstünde yaşıyor" } },
        { src: "/work/idle-pixel-hero/boss.webm", caption: { en: "A boss, enraged", tr: "Öfkelenen bir boss" } },
        { src: "/work/idle-pixel-hero/regions.webm", caption: { en: "Nine regions", tr: "Dokuz bölge" } },
      ],
      shots: [
        shot("idle-pixel-hero", 1, "Boss fight on the strip", "Şeritte boss dövüşü"),
        shot("idle-pixel-hero", 2, "The strip over a working desktop", "Çalışan bir masaüstünün üstünde şerit"),
        shot("idle-pixel-hero", 3, "Headquarters — a desk of windows", "Karargâh — pencerelerden bir masa"),
        shot("idle-pixel-hero", 4, "A locked chest on the road", "Yolda kilitli bir sandık"),
        shot("idle-pixel-hero", 5, "The bag, with rarity rules", "Nadirlik kurallarıyla çanta"),
        shot("idle-pixel-hero", 6, "Volcano", "Volkan"),
        shot("idle-pixel-hero", 7, "The clockwork region", "Saat işleyişi bölgesi"),
        shot("idle-pixel-hero", 8, "Glacier", "Buzul"),
      ],
    },
    stats: {
      commits: 225,
      from: "2026-09-07",
      to: "2026-10-01",
      facts: [
        { en: "6 classes × 5 races", tr: "6 sınıf × 5 ırk" },
        { en: "150 named items, 6 rarities", tr: "150 isimli eşya, 6 nadirlik" },
        { en: "9 regions, endless depth", tr: "9 bölge, sonsuz derinlik" },
        { en: "9 languages", tr: "9 dil" },
        { en: "4 platforms from one project", tr: "Tek projeden 4 platform" },
      ],
    },
    story: {
      en: [
        "The pitch is one sentence: an RPG that keeps playing in a strip at the edge of your screen while you get on with your day. The strip lets clicks through, stays on top, hides when a fullscreen game or video opens, and costs almost no CPU. When you want to make decisions, the same window becomes the Headquarters.",
        "Most of the work was in the details nobody asks for: a cleanup pass that repaired 42,327 sprite outlines and left zero off-palette colours, a Mac version that behaves like a native desktop widget without a native plugin, a deep game that pays out in power past zone 100 so it climbs instead of crawling.",
        "In its fourth week it grew phones — the fight full screen, the Headquarters over it, hero packs and rewarded ads — then a trailer recorder inside the game, and a Steam page cut from the game's own clips.",
      ],
      tr: [
        "Fikir tek cümle: sen gününe devam ederken ekranının kenarındaki bir şeritte oynamaya devam eden bir RPG. Şerit tıklamaları arkaya geçiriyor, hep üstte kalıyor, tam ekran bir oyun ya da video açılınca gizleniyor ve neredeyse hiç CPU harcamıyor. Karar vermek istediğinde aynı pencere Karargâh'a dönüşüyor.",
        "İşin çoğu kimsenin istemediği ayrıntılardaydı: 42.327 sprite kenarını onaran ve paletin dışında tek bir renk bırakmayan bir temizlik turu, native eklenti olmadan gerçek bir masaüstü widget'ı gibi davranan bir Mac sürümü, 100. bölgeden sonra güçle ödeme yaparak sürünmek yerine tırmanan bir derin oyun.",
        "Dördüncü haftasında telefonlara geçti — dövüş tam ekran, Karargâh üstünde, kahraman paketleri ve ödüllü reklamlar — sonra oyunun içinde bir fragman kaydedici ve oyunun kendi kliplerinden kesilmiş bir Steam sayfası geldi.",
      ],
    },
  },
  {
    slug: "gmrlog-app",
    title: "GMRLOG",
    alias: "Every player has a journey",
    year: 2026,
    discipline: "software",
    accent: "cyan",
    logline:
      "A social platform for players — profiles as gaming identity, reviews, tier lists, circles and a taste-match engine.",
    summary:
      "Turborepo monorepo: React Native + web frontend, Node backend, Postgres, Redis queues and a catalog mirror. OAuth with Google, Discord and Steam, a DNA-match similarity engine, and a release-candidate security pass.",
    tr: {
      logline:
        "Oyuncular için bir sosyal platform — oyun kimliği olarak profiller, incelemeler, tier listeleri, topluluklar ve bir zevk eşleştirme motoru.",
      summary:
        "Turborepo monorepo: React Native + web arayüz, Node backend, Postgres, Redis kuyrukları ve bir katalog aynası. Google, Discord ve Steam ile OAuth, DNA-match benzerlik motoru ve sürüm adayı öncesi bir güvenlik turu.",
    },
    status: "in-progress",
    stack: ["TypeScript", "React Native", "Node.js", "PostgreSQL", "Redis", "Docker"],
    platforms: ["Web", "iOS", "Android"],
    featured: true,
    link: "https://github.com/emrcnclk/GMRLog-app",
    stats: {
      commits: 229,
      from: "2026-08-01",
      to: "2026-09-19",
      facts: [
        { en: "v1.0.0-rc1 cut on 18 Aug", tr: "v1.0.0-rc1 18 Ağustos'ta" },
        { en: "33/33 turbo tasks green", tr: "33/33 turbo görevi yeşil" },
        { en: "Google · Discord · Steam OAuth", tr: "Google · Discord · Steam OAuth" },
      ],
    },
    story: {
      en: [
        "GMRLOG is not a launcher, not a store and not one more review site. It is meant to answer one question the moment a profile opens: what kind of player is this?",
        "Seven weeks of work went into the parts that make that believable — a design system re-valued from the palette up, a similarity engine that returns a breakdown instead of a bare score, OAuth that refuses self-reported Steam accounts outside development, refresh tokens consumed atomically, profile visibility enforced on every public surface, and a legal-consent gate wired through the app.",
      ],
      tr: [
        "GMRLOG bir başlatıcı, bir mağaza ya da bir inceleme sitesi daha değil. Bir profil açıldığı anda tek bir soruya cevap vermek için var: bu nasıl bir oyuncu?",
        "Yedi haftalık iş bunu inandırıcı yapan parçalara gitti — paletten başlayarak yeniden değerlenen bir tasarım sistemi, çıplak bir skor yerine kırılım döndüren bir benzerlik motoru, geliştirme dışında beyana dayalı Steam hesaplarını reddeden OAuth, atomik tüketilen refresh token'lar, her açık yüzeyde uygulanan profil görünürlüğü ve uygulamaya bağlanmış bir yasal onay kapısı.",
      ],
    },
  },
  {
    slug: "mythkeep",
    title: "Mythkeep",
    alias: "A record, not a score",
    year: 2026,
    discipline: "mobile",
    accent: "teal",
    logline:
      "A creature-raising game wearing a focus app's clothes — finish a session, feed a creature.",
    summary:
      "Local-first React Native app: no account, no server, no analytics, one SQLite file. 48 species across eight elements and four life stages, all pixel art, with a domain layer covered by 610 tests at 98%.",
    tr: {
      logline:
        "Odak uygulaması kılığına girmiş bir yaratık büyütme oyunu — seansı bitir, yaratığı besle.",
      summary:
        "Yerel öncelikli React Native uygulaması: hesap yok, sunucu yok, analitik yok, tek bir SQLite dosyası. Sekiz elementte 48 tür ve dört yaşam evresi, hepsi pixel art; domain katmanı %98 kapsamla 610 testle korunuyor.",
    },
    status: "in-progress",
    stack: ["React Native", "Expo", "TypeScript", "SQLite", "Skia", "Reanimated"],
    platforms: ["Android", "iOS"],
    featured: true,
    private: true,
    media: {
      cover: "/work/mythkeep/cover.webp",
      pixel: true,
      shots: [
        shot("mythkeep", 1, "The sanctuary atlas — every species, every stage", "Sığınak atlası — her tür, her evre"),
        shot("mythkeep", 2, "Ember element, focus poses", "Ateş elementi, odak pozları"),
        shot("mythkeep", 3, "Frost element, focus poses", "Buz elementi, odak pozları"),
      ],
    },
    stats: {
      commits: 39,
      from: "2026-08-26",
      to: "2026-09-02",
      facts: [
        { en: "48 species × 4 life stages", tr: "48 tür × 4 yaşam evresi" },
        { en: "610 tests, 98% domain coverage", tr: "610 test, %98 domain kapsamı" },
        { en: "14 permissions cut to 7", tr: "14 izin 7'ye indi" },
      ],
    },
    story: {
      en: [
        "A session is 25, 45 or 90 minutes. A ring of twelve seals closes as it runs; leave the app for more than ten seconds and a seal breaks. A finished session feeds a creature; an abandoned one leaves a mark on its record. Nothing you raise ever dies, and nothing you earn is taken back.",
        "Halfway through, the whole shell went 8-bit. A pixel generator and an atlas pipeline followed, and most of the 48 × 4 sprites are derived rather than drawn — even the breathing.",
      ],
      tr: [
        "Bir seans 25, 45 ya da 90 dakika. Seans ilerledikçe on iki mühürden bir halka kapanıyor; uygulamadan on saniyeden fazla çıkarsan bir mühür kırılıyor. Biten seans bir yaratığı besliyor, yarım bırakılan onun kaydına bir iz bırakıyor. Büyüttüğün hiçbir şey ölmüyor, kazandığın hiçbir şey geri alınmıyor.",
        "Yarı yolda bütün kabuk 8-bit'e döndü. Ardından bir pixel üretici ve bir atlas hattı geldi; 48 × 4 sprite'ın çoğu çizilmedi, türetildi — nefes alma bile.",
      ],
    },
  },
  {
    slug: "blockslide",
    title: "BlockSlide",
    alias: "Inkframe",
    year: 2026,
    discipline: "game",
    accent: "amber",
    logline: "A Unity 6 mobile puzzle — sliding blocks, tight loops, iOS-first.",
    summary:
      "Inkframe's BlockSlide is a Unity 6 puzzle built for the App Store first. Monetization, IAP and privacy pipeline wired for shipping — and an editor tool that remixes existing levels into new ones that are exactly as solvable.",
    tr: {
      logline: "Unity 6 mobil bulmaca — kayan bloklar, kısa döngüler, önce iOS.",
      summary:
        "Inkframe'in BlockSlide'ı önce App Store için yapılmış bir Unity 6 bulmacası. Monetizasyon, IAP ve gizlilik hattı yayına hazır — ve mevcut seviyeleri kaynakları kadar çözülebilir yeni seviyelere dönüştüren bir editör aracı.",
    },
    status: "in-progress",
    stack: ["Unity 6", "C#", "iOS", "AdMob", "Firebase"],
    platforms: ["iOS", "Android", "Windows"],
    featured: true,
    private: true,
    media: {
      cover: "/work/blockslide/cover.webp",
      shots: [
        shot("blockslide", 1, "The app icon", "Uygulama ikonu"),
        shot("blockslide", 2, "Loading background", "Yükleme ekranı arka planı"),
      ],
    },
    stats: {
      commits: 5,
      from: "2026-06-02",
      to: "2026-09-27",
      facts: [
        { en: "Levels 101–200 generated by remix", tr: "101–200. seviyeler remix ile üretildi" },
        { en: "iOS 15+ · Unity 6000.4", tr: "iOS 15+ · Unity 6000.4" },
      ],
    },
    story: {
      en: [
        "BlockSlide is the shipping exercise: a puzzle small enough to finish and polish, with everything a store build needs — AdMob, IAP, Firebase, privacy and terms hosting, app-ads.txt, and a Mac guide for the teammate who builds the iOS binary.",
        "The most interesting piece is an editor window. It takes levels 21–100, mirrors them horizontally, vertically or both, and permutes their colours. Mirroring and colour permutation keep the puzzle rules symmetric, so every remix is exactly as solvable as its source — a hundred new levels without a single unsolvable one.",
      ],
      tr: [
        "BlockSlide yayına çıkma alıştırması: bitirip cilalanacak kadar küçük bir bulmaca, bir mağaza build'inin ihtiyaç duyduğu her şeyiyle — AdMob, IAP, Firebase, gizlilik ve kullanım şartları sayfaları, app-ads.txt ve iOS binary'sini derleyen takım arkadaşı için bir Mac rehberi.",
        "En ilginç parça bir editör penceresi. 21–100. seviyeleri alıyor, yatay, dikey ya da iki yönde aynalıyor ve renklerini karıştırıyor. Aynalama ve renk permütasyonu bulmaca kurallarını simetrik tutuyor; yani her remix kaynağı kadar çözülebilir — tek bir çözümsüz seviye olmadan yüz yeni seviye.",
      ],
    },
  },
  {
    slug: "kiel-app",
    title: "Kiel",
    year: 2025,
    discipline: "mobile",
    accent: "cyan",
    logline: "A support system for autistic children and their families — routines, experts, progress.",
    summary:
      "React Native client plus Node backend: daily activity tracking, educational games, expert appointments and development reports. Capstone-born, product-shaped.",
    tr: {
      logline: "Otizmli çocuklar ve aileleri için bir destek sistemi — rutinler, uzmanlar, gelişim.",
      summary:
        "React Native istemci ve Node backend: günlük aktivite takibi, eğitici oyunlar, uzman randevuları ve gelişim raporları. Bitirme projesinden doğdu, ürün gibi büyüdü.",
    },
    status: "shipped",
    stack: ["React Native", "TypeScript", "Node.js", "MongoDB", "JWT"],
    link: "https://github.com/emrcnclk/kiel-app",
    stars: 2,
  },
  {
    slug: "kiel-ai-full",
    title: "Kiel AI",
    year: 2026,
    discipline: "ai",
    accent: "teal",
    logline: "AI layer for Kiel — smarter support signals on top of the care platform.",
    summary:
      "TypeScript AI stack extending the Kiel ecosystem. Exploring how machine intelligence can assist therapists and families without replacing human judgment.",
    tr: {
      logline: "Kiel için yapay zekâ katmanı — bakım platformunun üstünde daha akıllı destek sinyalleri.",
      summary:
        "Kiel ekosistemini genişleten TypeScript yapay zekâ yığını. Makine zekâsının terapistlere ve ailelere insan yargısının yerini almadan nasıl yardım edebileceğini araştırıyor.",
    },
    status: "in-progress",
    stack: ["TypeScript", "AI", "Node.js"],
    link: "https://github.com/emrcnclk/kiel-ai-full",
  },
  {
    slug: "lumenbra",
    title: "Lumenbra",
    year: 2025,
    discipline: "game",
    accent: "mustard",
    logline: "Light and dark as mechanics — a 2D puzzle from a game jam sprint.",
    summary:
      "Unity C# puzzle built around illumination and shadow. Born in Lumenbra Game Jam: small scope, strong mechanic, player-first puzzle design.",
    tr: {
      logline: "Mekanik olarak ışık ve karanlık — bir game jam koşusundan çıkan 2D bulmaca.",
      summary:
        "Aydınlık ve gölge üzerine kurulu Unity C# bulmacası. Lumenbra Game Jam'de doğdu: küçük kapsam, güçlü mekanik, oyuncu öncelikli bulmaca tasarımı.",
    },
    status: "shipped",
    stack: ["Unity", "C#", "2D"],
    link: "https://github.com/emrcnclk/Lumenbra-LightAndDark-2D-Puzzle",
  },
  {
    slug: "game-interview-solutions",
    title: "Game Interview Solutions",
    year: 2026,
    discipline: "software",
    logline: "A living notebook of game-dev interview problems — solved, annotated, reusable.",
    summary:
      "Technical interview drills for game engineering: algorithms, systems thinking and craft notes for the next studio conversation.",
    tr: {
      logline: "Oyun geliştirme mülakat sorularından yaşayan bir defter — çözülmüş, açıklanmış, tekrar kullanılabilir.",
      summary:
        "Oyun mühendisliği için teknik mülakat alıştırmaları: algoritmalar, sistem düşüncesi ve bir sonraki stüdyo görüşmesi için zanaat notları.",
    },
    status: "in-progress",
    stack: ["Game Eng"],
    link: "https://github.com/emrcnclk/GameInterviewSolutions",
  },
  {
    slug: "bitirmeprojekiel",
    title: "Bitirme — Kiel",
    year: 2025,
    discipline: "software",
    logline: "Graduation thesis codebase that seeded the Kiel product line.",
    summary:
      "The academic root of Kiel: research questions, early architecture and the first vertical slice that proved the idea deserved a real app.",
    tr: {
      logline: "Kiel ürün hattını başlatan bitirme tezi kod tabanı.",
      summary:
        "Kiel'in akademik kökü: araştırma soruları, erken mimari ve fikrin gerçek bir uygulamayı hak ettiğini kanıtlayan ilk dikey kesit.",
    },
    status: "archived",
    stack: ["TypeScript", "Research"],
    link: "https://github.com/emrcnclk/BitirmeProjeKiel",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const projectsByDiscipline = (d: Discipline) =>
  projects.filter((p) => p.discipline === d);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Case files exist for projects with a story. */
export const caseFileProjects = projects.filter((p) => p.story);

export function projectCopy(p: Project, lang: "en" | "tr") {
  return lang === "tr" && p.tr ? p.tr : { logline: p.logline, summary: p.summary };
}

/**
 * Bebop-style bounty: one commit is worth ₩ 250,000.
 * Silly on purpose, honest underneath — it is the commit count.
 */
export function bounty(p: Project) {
  return (p.stats?.commits ?? 0) * 250_000;
}

export function formatWoolong(n: number) {
  return `₩${n.toLocaleString("en-US")}`;
}
