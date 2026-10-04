import Link from "next/link";
import { navigation } from "@/config/navigation";
import { site } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { getFooterUi, tNavGroupTitle, tNavItemLabel } from "@/lib/i18n";
import { getServerLang } from "@/lib/i18n-server";

export async function SiteFooter() {
  const lang = await getServerLang();
  const ui = getFooterUi(lang);

  return (
    <footer className="relative overflow-hidden border-t border-line bg-panel/40">
      <div aria-hidden className="flex h-2">
        <span className="flex-1 bg-mustard" />
        <span className="flex-1 bg-rust" />
        <span className="flex-1 bg-teal" />
        <span className="flex-1 bg-cream" />
      </div>
      <Container size="wide" className="py-20 md:py-28">
        <Reveal>
          <p className="kicker mb-6">{ui.endSession}</p>
          <p className="bebop text-[clamp(3.6rem,12vw,11rem)] text-foreground">
            See you,
            <br />
            <span className="text-mustard">space cowboy</span>
            <span className="text-rust">…</span>
          </p>
          <p className="typewriter mt-6 max-w-xl text-lg text-muted">{ui.farewellMuted}</p>
          <a
            href={`mailto:${site.email}`}
            className="bebop mt-8 inline-flex items-center gap-3 bg-cream px-5 pt-3 pb-2 text-2xl text-ink shadow-[5px_5px_0_var(--rust)] transition-all hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--rust)]"
          >
            {site.email}
          </a>
        </Reveal>

        <div className="mt-20 grid grid-cols-2 gap-10 md:grid-cols-4">
          {navigation.map((group) => (
            <nav key={group.title} aria-label={tNavGroupTitle(group.title, lang)}>
              <p className="kicker mb-5 text-faint">{tNavGroupTitle(group.title, lang)}</p>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted transition-colors duration-300 hover:text-foreground"
                      >
                        {tNavItemLabel(item.label, lang)}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm text-muted transition-colors duration-300 hover:text-foreground"
                      >
                        {tNavItemLabel(item.label, lang)}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
          <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-faint">
            © {new Date().getFullYear()} {site.fullName} — {ui.credit}
          </p>
          <div className="flex flex-wrap gap-5">
            {Object.entries(site.socials).map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-faint transition-colors hover:text-amber"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
