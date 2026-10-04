import type { Lang } from "@/lib/i18n";

type PageChrome = {
  kicker: string;
  title: string;
  lede: string;
};

export const pagesUi = {
  about: {
    en: {
      kicker: "Sec. 01 — Dossier",
      title: "Engineer. Player. Night owl.",
      capabilities: "Capabilities",
      principles: "Operating principles",
      trajectory: "Trajectory",
      openChannel: "Open a channel",
      paragraphs: [
        "I'm {name} — computer engineer, Unity game developer and mobile engineer with a bias for systems that feel alive. My work sits at the intersection of game theory, interactive design and artificial intelligence: inventing solutions for playable worlds, then teaching machines to inhabit them with taste.",
        "On the bench you'll find BlockSlide, Kiel, jam prototypes and research notes. Off the bench: jazz, film (Letterboxd), late-night podcasts and the sketchbook. Same practice — pay attention, then make something with what you noticed.",
        "This site is the hangar. Built by hand. Tuned like a record you leave on after midnight.",
      ],
      beliefs: [
        {
          title: "Game theory as design language",
          body: "Every interactive system is a game of incentives, information and timing. I use that lens to design mechanics — and to reason about AI agents that inhabit them.",
        },
        {
          title: "Intelligence that serves play",
          body: "AI should sharpen the loop, not steal the spotlight. I integrate models where they earn their keep: better opponents, smarter tools, clearer feedback.",
        },
        {
          title: "Feel is engineering",
          body: "The gap between 'works' and 'feels right' is measured in frames and easing curves. I treat that gap as a hard requirement.",
        },
        {
          title: "Ship the innovative, keep the honest",
          body: "Novelty without craft is noise. I chase new solutions — then cut until what remains is inevitable.",
        },
      ],
      timeline: [
        {
          period: "Now",
          note: "Shipping BlockSlide (Unity 6 / iOS), extending Kiel with AI, and studying how game-theoretic thinking lands in machine learning systems.",
        },
        {
          period: "Recent years",
          note: "Built Kiel — a mobile care platform for autistic children and families. Shipped Lumenbra from a game jam. Graduated into CS with game + AI focus.",
        },
        {
          period: "The beginning",
          note: "A gamer who opened the editor and never closed it. Still true.",
        },
      ],
    },
    tr: {
      kicker: "Böl. 01 — Dosya",
      title: "Mühendis. Oyuncu. Gece kuşu.",
      capabilities: "Yetkinlikler",
      principles: "Çalışma ilkeleri",
      trajectory: "Yörünge",
      openChannel: "Kanal aç",
      paragraphs: [
        "Ben {name} — canlı hisseden sistemlere düşkün bilgisayar mühendisi, Unity oyun geliştirici ve mobil mühendis. İşlerim oyun teorisi, etkileşimli tasarım ve yapay zekânın kesişiminde: oynanabilir dünyalar için çözümler üretmek, sonra makinelere onları zevkle doldurmayı öğretmek.",
        "Tezgahta BlockSlide, Kiel, jam prototipleri ve araştırma notları var. Tezgâh dışında: caz, film (Letterboxd), gece podcast’leri ve eskiz defteri. Aynı pratik — dikkat et, sonra fark ettiğinle bir şey yap.",
        "Bu site hangar. Elle yapıldı. Gece yarısından sonra açık bıraktığın bir plak gibi ayarlandı.",
      ],
      beliefs: [
        {
          title: "Tasarım dili olarak oyun teorisi",
          body: "Her etkileşimli sistem teşvik, bilgi ve zamanlama oyunudur. Mekanikleri bununla tasarlıyorum — ve onları dolduran yapay zekâ ajanlarını da aynı lensle düşünüyorum.",
        },
        {
          title: "Oyuna hizmet eden zekâ",
          body: "Yapay zekâ döngüyü keskinleştirmeli, sahneyi çalmamalı. Modelleri hak ettikleri yerde kullanırım: daha iyi rakipler, daha akıllı araçlar, daha net geri bildirim.",
        },
        {
          title: "His mühendisliktir",
          body: "‘Çalışıyor’ ile ‘doğru hissediyor’ arasındaki mesafe kareler ve easing eğrileriyle ölçülür. Bu boşluğu sert bir gereksinim gibi ele alırım.",
        },
        {
          title: "Yeniyi gönder, dürüstü tut",
          body: "Zanaatsız yenilik gürültüdür. Yeni çözümler peşinde koşarım — sonra kalan kaçınılmaz olana kadar keserim.",
        },
      ],
      timeline: [
        {
          period: "Şimdi",
          note: "BlockSlide’ı (Unity 6 / iOS) çıkarıyorum, Kiel’e yapay zekâ katmanı ekliyorum ve oyun-teorik düşüncenin makine öğrenmesine nasıl indiğini inceliyorum.",
        },
        {
          period: "Son yıllar",
          note: "Kiel’i kurdum — otizmli çocuklar ve aileler için mobil bakım platformu. Lumenbra’yı bir jam’den çıkardım. Oyun + yapay zekâ odaklı bilgisayar mühendisliğiyle mezun oldum.",
        },
        {
          period: "Başlangıç",
          note: "Editörü açıp bir daha kapatmayan bir oyuncu. Hâlâ doğru.",
        },
      ],
    },
  },
  contact: {
    en: {
      kicker: "Sec. 21 — Open channel",
      title: "The signal is open.",
      lede: "No forms, no funnels. Write a real message and you'll get a real reply — usually within a few days, usually at night.",
      primary: "Primary frequency",
      elsewhere: "Elsewhere",
      reasons: [
        {
          title: "A game × AI problem",
          note: "Systems where game theory, interactive design and intelligence overlap. Weird constraints welcome.",
        },
        {
          title: "A collaboration",
          note: "Small teams, clear scope, high craft. Unity, mobile or applied AI — if the taste matches, let's talk.",
        },
        {
          title: "A good record or film",
          note: "Jazz recommendations and Letterboxd picks are read before business. This is policy.",
        },
      ],
    },
    tr: {
      kicker: "Böl. 21 — Açık kanal",
      title: "Sinyal açık.",
      lede: "Form yok, huniler yok. Gerçek bir mesaj yaz — gerçek bir cevap alırsın. Genelde birkaç gün içinde, genelde gece.",
      primary: "Ana frekans",
      elsewhere: "Başka yerde",
      reasons: [
        {
          title: "Oyun × yapay zekâ problemi",
          note: "Oyun teorisi, etkileşimli tasarım ve zekânın örtüştüğü sistemler. Tuhaf kısıtlar hoş geldiniz.",
        },
        {
          title: "Bir işbirliği",
          note: "Küçük ekipler, net kapsam, yüksek zanaat. Unity, mobil veya uygulamalı yapay zekâ — zevk uyuyorsa konuşalım.",
        },
        {
          title: "İyi bir plak veya film",
          note: "Caz önerileri ve Letterboxd seçimleri işten önce okunur. Bu politikadır.",
        },
      ],
    },
  },
  music: {
    en: {
      kicker: "Sec. 16 — The rotation",
      title: "Records, playlists, night drives.",
      lede: "Spotify playlists and the podcast live here. Below: heavy rotation — Radiohead and Jeff Buckley, most-streamed cuts.",
      openSpotify: "Open my Spotify",
      openPodcast: "Open the podcast",
      podcastKicker: "Podcast",
      spotifyShow: "Spotify show",
      podcastTitle: "Podcast",
      podcastBody: "The show on Spotify — episodes live there. Tap in, catch the frequency.",
      dispatch: "Spotify dispatch",
      profile: "Profile",
      tracks: "tracks",
      heavy: "Heavy rotation — most streamed",
    },
    tr: {
      kicker: "Böl. 16 — Rotasyon",
      title: "Plaklar, listeler, gece sürüşleri.",
      lede: "Spotify listeleri ve podcast burada. Alttaki heavy rotation ise Radiohead ve Jeff Buckley — en çok dinlenenler.",
      openSpotify: "Spotify’ımı aç",
      openPodcast: "Podcast’i aç",
      podcastKicker: "Podcast",
      spotifyShow: "Spotify show",
      podcastTitle: "Podcast",
      podcastBody: "Spotify’daki show — bölümler orada. Tıkla, frekansa geç.",
      dispatch: "Spotify yayın",
      profile: "Profil",
      tracks: "parça",
      heavy: "Heavy rotation — en çok dinlenenler",
    },
  },
  creative: {
    en: {
      kicker: "Sec. 15 — Off duty",
      title: "The other output.",
      lede: "Not everything I make compiles. These rooms hold the rest — and they feed the software more than the software knows.",
      rooms: [
        {
          label: "Music",
          href: "/music",
          note: "Spotify, playlists, records on rotation — jazz, mostly.",
        },
        {
          label: "Cinema",
          href: "/cinema",
          note: "Letterboxd notes, ratings, posters, small opinions in the dark.",
        },
        {
          label: "Photography",
          href: "/photography",
          note: "Night walks with a camera. Wet asphalt, warm windows, closing time.",
        },
        {
          label: "Drawings",
          href: "/drawings",
          note: "The sketchbook. Ink, pencil, and forty attempts at hands.",
        },
        {
          label: "Journal",
          href: "/journal",
          note: "Loose pages. Thinking without an argument to win.",
        },
      ],
    },
    tr: {
      kicker: "Böl. 15 — Vardiya dışı",
      title: "Diğer çıktı.",
      lede: "Yaptığım her şey derlenmez. Bu odalar gerisini tutar — ve yazılımın bildiğinden fazla besler.",
      rooms: [
        {
          label: "Müzik",
          href: "/music",
          note: "Spotify, listeler, rotasyondaki plaklar — çoğunlukla caz.",
        },
        {
          label: "Sinema",
          href: "/cinema",
          note: "Letterboxd notları, skorlar, posterler, karanlıkta küçük fikirler.",
        },
        {
          label: "Fotoğraf",
          href: "/photography",
          note: "Kamerayla gece yürüyüşleri. Islak asfalt, sıcak pencereler, kapanış saati.",
        },
        {
          label: "Çizimler",
          href: "/drawings",
          note: "Eskiz defteri. Mürekkep, kurşun, kırk el denemesi.",
        },
        {
          label: "Günlük",
          href: "/journal",
          note: "Serbest sayfalar. Kazanılacak bir argüman olmadan düşünmek.",
        },
      ],
    },
  },
  photography: {
    en: {
      kicker: "Sec. 17 — Contact sheets",
      title: "The city, developing.",
      lede: "I photograph at night, mostly after rain, when the city does its own lighting design. Sets are small and edited hard — nine good frames beat ninety maybes.",
      setLabel: "Set",
      frames: "frames",
      footer: "Full sets are being scanned and developed. Frames arrive here as they dry.",
    },
    tr: {
      kicker: "Böl. 17 — Kontak baskılar",
      title: "Şehir, banyo ediyor.",
      lede: "Çoğunlukla yağmurdan sonra, şehir kendi ışık tasarımını yaparken gece çekiyorum. Setler küçük ve sert kurgulanır — dokuz iyi kare, doksan belki’yi yener.",
      setLabel: "Set",
      frames: "kare",
      footer: "Tam setler taranıyor ve banyo ediliyor. Kareler kurudukça buraya düşer.",
    },
  },
  drawings: {
    en: {
      kicker: "Sec. 18 — Sketchbook",
      title: "Practice, in ink.",
      lede: "Drawing is my slowest feedback loop and my best teacher. No undo, no versions — just the honest record of a hand learning. Scans arrive as pages fill.",
    },
    tr: {
      kicker: "Böl. 18 — Eskiz defteri",
      title: "Pratik, mürekkeple.",
      lede: "Çizim en yavaş geri bildirim döngüm ve en iyi öğretmenim. Undo yok, versiyon yok — öğrenen bir elin dürüst kaydı. Sayfalar doldukça taramalar gelir.",
    },
  },
  playground: {
    en: {
      kicker: "Sec. 08 — After hours",
      title: "Built for the joy of it.",
      lede: "No roadmap, no metrics, no shame. The playground is where I keep the toys — small builds whose only requirement was making me grin at 2am. Some of the best ideas started here.",
    },
    tr: {
      kicker: "Böl. 08 — Mesai sonrası",
      title: "Sırf keyfi için.",
      lede: "Yol haritası yok, metrik yok, utanç yok. Atölye oyuncakların yeri — tek şartı sabah 2’de gülümsemek olan küçük yapılar. En iyi fikirlerden bazıları burada başladı.",
    },
  },
  projects: {
    en: {
      kicker: "Sec. 02 — The bounty board",
      title: "Wanted: dead or alive.",
      lede: "Every project is a bounty. The price is honest — commits × ₩250,000. Open a poster for the case file: the story, the clips, the stills and the devlogs.",
      others: "Small fry",
      othersKicker: "Other repos, live from GitHub",
    },
    tr: {
      kicker: "Böl. 02 — Ödül panosu",
      title: "Aranıyor: ölü ya da diri.",
      lede: "Her proje bir ödül. Fiyat dürüst — commit × ₩250.000. Dosyayı açmak için bir postere tıkla: hikâye, klipler, kareler ve devloglar.",
      others: "Küçük balıklar",
      othersKicker: "Diğer repolar, GitHub’dan canlı",
    },
  },
  now: {
    en: {
      kickerPrefix: "Sec. 13 — Status report · updated",
      title: "This season.",
      lede: "A snapshot of the present tense. Listening opens Music, Watching opens Cinema — every row is a door.",
    },
    tr: {
      kickerPrefix: "Böl. 13 — Durum raporu · güncellendi",
      title: "Bu sezon.",
      lede: "Şimdiki zamanın anlık görüntüsü. Dinleme Müzik’i, İzleme Sinema’yı açar — her satır bir kapı.",
    },
  },
  disciplineShared: {
    en: {
      fieldWork: "Field work · live GitHub",
      allProjects: "All projects",
      empty: "Work in this direction is still in the dark room. Developing.",
    },
    tr: {
      fieldWork: "Saha · canlı GitHub",
      allProjects: "Tüm projeler",
      empty: "Bu yöndeki iş hâlâ karanlık odada. Gelişiyor.",
    },
  },
  ai: {
    en: {
      kicker: "Sec. 03 — Mind like a machine",
      title: "Small models, sharp tools.",
      lede: "I build AI systems the way I build everything else: scoped tight, tuned by hand, and answerable to the person using them. Local-first when possible, honest about limits always.",
      principles: [
        {
          title: "Specificity beats scale",
          body: "A small model with a precise scaffold routinely outperforms a giant one with a vague prompt. Most problems deserve a scalpel, not a cathedral.",
        },
        {
          title: "Privacy is architecture",
          body: "If the design requires shipping someone's life to a datacenter, the design is wrong. On-device inference is a feature users can feel.",
        },
        {
          title: "Failure must be legible",
          body: "An AI tool that fails silently is a liability. I design for visible confidence: the system says what it knows, and what it's guessing.",
        },
      ],
    },
    tr: {
      kicker: "Böl. 03 — Makine gibi zihin",
      title: "Küçük modeller, keskin araçlar.",
      lede: "Yapay zekâ sistemlerini her şeyi kurduğum gibi kuruyorum: dar kapsam, elle ayar, kullanan kişiye hesap verebilir. Mümkünse önce yerelde, sınırlar konusunda her zaman dürüst.",
      principles: [
        {
          title: "Özgüllük ölçeği yener",
          body: "Kesin iskeleli küçük bir model, muğlak prompt’lu devi çoğu zaman geçer. Çoğu sorun katedral değil, neşter ister.",
        },
        {
          title: "Gizlilik mimaridir",
          body: "Tasarım birinin hayatını veri merkezine yollamayı gerektiriyorsa tasarım yanlıştır. Cihaz üstü çıkarım hissedilen bir özelliktir.",
        },
        {
          title: "Hata okunaklı olmalı",
          body: "Sessizce çöken bir yapay zekâ aracı yükümlülüktür. Görünür güven için tasarlarım: sistem ne bildiğini, ne tahmin ettiğini söyler.",
        },
      ],
    },
  },
  game: {
    en: {
      kicker: "Sec. 04 — The arcade",
      title: "Feel is a feature.",
      lede: "I make games in Unity, and games made me a better engineer everywhere else. The player is the only benchmark: if it doesn't feel right in the hands, the math doesn't matter.",
      principles: [
        {
          title: "Tune by ear",
          body: "Handling curves, camera lag, hit pause — the final values come from hundreds of playtests, not spreadsheets. Taste is a debugging tool.",
        },
        {
          title: "Respect the session",
          body: "No dark patterns, no artificial grind. A game should be generous with fun and stingy with friction. Eleven honest minutes beat two addicted hours.",
        },
        {
          title: "Ship the trick",
          body: "Players feel results, not techniques. The cheap shader nobody notices beats the expensive one nobody needed. Build for the screen, not the conference talk.",
        },
      ],
    },
    tr: {
      kicker: "Böl. 04 — Arkade",
      title: "His bir özelliktir.",
      lede: "Unity’de oyun yapıyorum; oyunlar beni her yerde daha iyi mühendis yaptı. Tek ölçüt oyuncu: elde doğru hissetmiyorsa matematik umurumda değil.",
      principles: [
        {
          title: "Kulaktan ayarla",
          body: "Handling eğrileri, kamera gecikmesi, hit pause — son değerler tablodan değil yüzlerce playtest’ten gelir. Zevk bir debug aracıdır.",
        },
        {
          title: "Seansa saygı",
          body: "Karanlık pattern yok, yapay grind yok. Oyun eğlencede cömert, sürtünmede cimri olmalı. On bir dürüst dakika, iki bağımlı saati yener.",
        },
        {
          title: "Numarayı gönder",
          body: "Oyuncu tekniği değil sonucu hisseder. Kimsenin fark etmediği ucuz shader, kimsenin ihtiyaç duymadığı pahalıyı yener. Konferans değil ekran için yap.",
        },
      ],
    },
  },
  mobile: {
    en: {
      kicker: "Sec. 05 — Pocket software",
      title: "Software for one hand.",
      lede: "The phone is the most intimate computer ever made — it's in the bed, on the street, at the funeral. Building for it well is a matter of manners as much as engineering.",
      principles: [
        {
          title: "The thumb is the user",
          body: "Reachability, touch targets, forgiveness radius. I design for the commuter holding a coffee, not the mockup with a floating hand.",
        },
        {
          title: "Battery is trust",
          body: "An app that drains the battery is borrowing against the user's day. Efficiency isn't an optimization pass; it's the deal.",
        },
        {
          title: "Offline is the baseline",
          body: "Elevators exist. Tunnels exist. Software that panics without a signal was never finished.",
        },
      ],
    },
    tr: {
      kicker: "Böl. 05 — Cep yazılımı",
      title: "Tek el için yazılım.",
      lede: "Telefon yapılmış en mahrem bilgisayar — yatakta, sokakta, cenazede. İyi yapmak mühendislik kadar görgü meselesi.",
      principles: [
        {
          title: "Kullanıcı başparmak",
          body: "Ulaşılabilirlik, dokunma hedefleri, affetme yarıçapı. Kahve tutan yolcu için tasarlarım, havada el olan mockup için değil.",
        },
        {
          title: "Pil güvendir",
          body: "Pili eriten uygulama kullanıcının gününden borç alır. Verimlilik bir optimizasyon turu değil; anlaşmanın kendisi.",
        },
        {
          title: "Çevrimdışı tabandır",
          body: "Asansörler var. Tüneller var. Sinyalsiz panikleyen yazılım hiç bitmemiştir.",
        },
      ],
    },
  },
  devlogs: {
    en: {
      kicker: "Sec. 11 — Session logs",
      title: "The sessions.",
      lede: "Devlogs written from the commit logs on my machine — real dates, real decisions, the dead ends left in. Every session has a Turkish edition.",
      empty: "Nothing here yet. The tape is still recording.",
    },
    tr: {
      kicker: "Böl. 11 — Seans kayıtları",
      title: "Seanslar.",
      lede: "Bilgisayarımdaki commit geçmişlerinden yazılmış devloglar — gerçek tarihler, gerçek kararlar, çıkmaz sokaklar dahil. Her seansın İngilizce ve Türkçe baskısı var.",
      empty: "Henüz bir şey yok. Bant hâlâ kayıtta.",
    },
  },
  journal: {
    en: {
      kicker: "Sec. 12 — Notebook",
      title: "Loose pages.",
      lede: "Unpolished by policy. These are notes from walks, late nights and slow mornings — thinking in public without an argument to win.",
      empty: "Nothing here yet. The tape is still recording.",
    },
    tr: {
      kicker: "Böl. 12 — Defter",
      title: "Serbest sayfalar.",
      lede: "Politika gereği cilasız. Yürüyüş, geç gece ve yavaş sabahlardan notlar — kazanılacak argüman olmadan kamuya açık düşünmek.",
      empty: "Henüz bir şey yok. Bant hâlâ kayıtta.",
    },
  },
  postLabels: {
    en: {
      devlogs: { kicker: "Devlog", back: "All devlogs", minRead: "min read" },
      journal: { kicker: "Journal", back: "All entries", minRead: "min read" },
    },
    tr: {
      devlogs: { kicker: "Devlog", back: "Tüm devloglar", minRead: "dk okuma" },
      journal: { kicker: "Günlük", back: "Tüm yazılar", minRead: "dk okuma" },
    },
  },
  experimentStatus: {
    en: { live: "Live", dormant: "Dormant", dissected: "Dissected" },
    tr: { live: "Canlı", dormant: "Uykuda", dissected: "İncelendi" },
  },
} as const;

export function getPageUi<K extends keyof typeof pagesUi>(
  key: K,
  lang: Lang,
): (typeof pagesUi)[K][Lang] {
  return pagesUi[key][lang] as (typeof pagesUi)[K][Lang];
}

export type { PageChrome };
