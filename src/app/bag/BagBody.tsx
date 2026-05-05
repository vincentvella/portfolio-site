import { Bag } from "@/lib/data-loaders/bag-loader";

const ACCENTS: Array<{ bg: string; ink: string }> = [
  { bg: "bg-primary", ink: "text-primary-foreground" },
  { bg: "bg-accent", ink: "text-accent-foreground" },
  { bg: "bg-secondary", ink: "text-secondary-foreground" },
  { bg: "bg-brand-violet", ink: "text-zinc-950" },
];

type Props = {
  bag: Bag;
};

export function BagBody({ bag }: Props) {
  return (
    <div className="space-y-8">
      {bag.intro && (
        <p className="text-muted-foreground text-lg leading-relaxed">
          {bag.intro}
        </p>
      )}
      {bag.categories.map((category, index) => {
        const accent = ACCENTS[index % ACCENTS.length];
        return (
          <section
            key={category.title}
            className="neo-border neo-shadow bg-card overflow-hidden rounded-md"
          >
            <header
              className={`border-b-2 border-foreground px-5 py-3 ${accent.bg} ${accent.ink}`}
            >
              <h2 className="font-display text-xl font-bold uppercase tracking-tight md:text-2xl">
                {category.title}
              </h2>
            </header>
            <ul className="space-y-3 px-5 py-5">
              {category.items.map((item) => (
                <li key={item.name} className="leading-snug">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold underline decoration-2 underline-offset-2 hover:decoration-primary"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <span className="font-bold">{item.name}</span>
                  )}
                  {item.note && (
                    <span className="text-muted-foreground"> — {item.note}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
