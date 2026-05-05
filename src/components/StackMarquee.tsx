"use client";

import { useEffect, useRef } from "react";
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

const COPIES = 3;

export function StackMarquee({ tags, className }: StackMarqueeProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const single = el.scrollWidth / COPIES;
      if (el.scrollLeft >= single * 2) {
        el.scrollLeft -= single;
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft += single;
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  if (tags.length === 0) return null;
  const loop = Array.from({ length: COPIES }, () => tags).flat();

  return (
    <div
      ref={scrollRef}
      role="region"
      aria-label="Tech stack — scroll horizontally to explore"
      tabIndex={0}
      className={cn(
        "group/marquee no-scrollbar neo-border bg-card relative w-full overflow-hidden overscroll-x-contain py-3 outline-none focus-visible:ring-2 focus-visible:ring-foreground hover:overflow-x-auto focus-within:overflow-x-auto",
        className,
      )}
    >
      <div
        className="flex w-max animate-[marquee_45s_linear_infinite] gap-3 group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]"
        style={{ "--marquee-distance": `-${100 / COPIES}%` } as React.CSSProperties}
      >
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
