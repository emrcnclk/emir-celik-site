import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: readonly string[];
  className?: string;
  /** Visual tone of the band. */
  tone?: "mustard" | "rust" | "teal" | "line";
  fast?: boolean;
  reverse?: boolean;
};

const tones = {
  mustard: "bg-mustard text-ink",
  rust: "bg-rust text-cream",
  teal: "bg-teal text-cream",
  line: "border-y border-line text-muted",
} as const;

/** A ticker band — the opening credits that never stop rolling. */
export function Marquee({ items, className, tone = "mustard", fast, reverse }: MarqueeProps) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 md:px-8">{item}</span>
          <span aria-hidden className="opacity-60">
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn("relative overflow-hidden py-3 md:py-4", tones[tone], className)}
      aria-label={items.join(", ")}
    >
      <div
        aria-hidden
        className={cn(
          "bebop flex w-max text-2xl md:text-4xl",
          fast ? "animate-marquee-fast" : "animate-marquee",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {row}
        {row}
      </div>
    </div>
  );
}
