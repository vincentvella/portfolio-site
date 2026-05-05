import { cn } from "@/lib/classname";

type StackTag = { value: string; label: string };

type StackMarqueeProps = {
  tags: StackTag[];
  className?: string;
};

const TILE_BG = [
  "bg-primary text-primary-foreground",
  "bg-accent text-accent-foreground",
  "bg-secondary text-secondary-foreground",
  "bg-brand-violet text-zinc-950",
];

export function StackMarquee({ tags, className }: StackMarqueeProps) {
  if (tags.length === 0) return null;
  const loop = [...tags, ...tags];
  return (
    <div
      aria-hidden
      className={cn(
        "neo-border bg-card relative w-full overflow-hidden py-3",
        className,
      )}
    >
      <div className="flex w-max animate-[marquee_45s_linear_infinite] gap-3 hover:[animation-play-state:paused]">
        {loop.map((tag, idx) => (
          <span
            key={`${tag.value}-${idx}`}
            className={cn(
              "neo-border inline-flex shrink-0 items-center rounded-md px-3 py-1.5 text-sm font-bold uppercase tracking-wide",
              TILE_BG[idx % TILE_BG.length],
            )}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
}
