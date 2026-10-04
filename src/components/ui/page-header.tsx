import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Kicker } from "@/components/ui/kicker";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { ColorBars } from "@/components/bebop/color-bars";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  /** Mono eyebrow, e.g. "SEC. 04 — GAME DEVELOPMENT". */
  kicker: string;
  title: string;
  lede?: string;
  children?: ReactNode;
  className?: string;
};

/**
 * The opening frame of every inner page — a Bebop title card:
 * colour bars, eyebrow, the title in condensed caps, one-paragraph lede.
 */
export function PageHeader({ kicker, title, lede, children, className }: PageHeaderProps) {
  return (
    <header className={cn("pt-36 pb-16 md:pt-48 md:pb-24", className)}>
      <Container size="wide">
        <div className="flex items-center gap-4">
          <ColorBars />
          <Reveal distance={12}>
            <Kicker signal>{kicker}</Kicker>
          </Reveal>
        </div>
        <TextReveal
          as="h1"
          text={title}
          delay={0.15}
          className="bebop mt-6 max-w-5xl text-[clamp(3.8rem,11vw,9.5rem)]"
        />
        {lede && (
          <Reveal delay={0.5} className="mt-8 max-w-xl">
            <p className="text-lg leading-relaxed text-muted">{lede}</p>
          </Reveal>
        )}
        {children}
      </Container>
    </header>
  );
}
