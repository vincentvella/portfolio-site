type BagHeroProps = {
  year: number;
  tagline?: string;
};

const ACCENTS: Array<{ bg: string; ink: string }> = [
  { bg: "bg-primary", ink: "text-primary-foreground" },
  { bg: "bg-accent", ink: "text-accent-foreground" },
  { bg: "bg-secondary", ink: "text-secondary-foreground" },
  { bg: "bg-brand-violet", ink: "text-zinc-950" },
];

function pickAccent(year: number) {
  return ACCENTS[Math.abs(year) % ACCENTS.length];
}

export function BagHero({ year, tagline }: BagHeroProps) {
  const accent = pickAccent(year);
  return (
    <div className="relative mt-8 mb-10">
      <div
        className={`neo-border neo-shadow-lg relative rounded-md px-6 py-8 md:px-10 md:py-12 ${accent.bg} ${accent.ink}`}
      >
        <span className="font-display block text-sm font-bold uppercase tracking-[0.2em] opacity-80">
          What's in my bag
        </span>
        <div className="mt-2 flex items-end gap-4">
          <h1 className="font-display text-7xl font-black leading-none tracking-tighter md:text-9xl">
            {year}
          </h1>
        </div>
        {tagline && (
          <p className="mt-4 max-w-prose text-base font-medium md:text-lg">
            {tagline}
          </p>
        )}
      </div>
    </div>
  );
}
