import { cn } from "@/lib/classname";

type StampedHeaderProps = {
  stamp: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export function StampedHeader({
  stamp,
  title,
  subtitle,
  className,
}: StampedHeaderProps) {
  return (
    <header className={cn("relative mb-8 mt-8 select-none", className)}>
      <span
        aria-hidden
        className="font-display text-foreground/[0.07] pointer-events-none absolute inset-x-0 -top-4 -z-0 block -rotate-2 whitespace-nowrap text-[clamp(4rem,18vw,9rem)] font-black uppercase leading-none tracking-tighter"
      >
        {stamp}
      </span>
      <div className="relative z-10 select-text">
        <h1 className="font-display text-5xl font-bold tracking-tight md:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-muted-foreground mt-2 text-lg">{subtitle}</p>
        ) : null}
      </div>
    </header>
  );
}
