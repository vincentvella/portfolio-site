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
      role="region"
      aria-label="Tech stack — scroll horizontally to explore"
      tabIndex={0}
      className={cn(
        "group/marquee neo-border bg-card relative w-full overflow-hidden overscroll-x-contain py-3 outline-none focus-visible:ring-2 focus-visible:ring-foreground hover:overflow-x-auto focus-within:overflow-x-auto",
        className,
      )}
    >
      <div className="flex w-max animate-[marquee_45s_linear_infinite] gap-3 group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]">
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
