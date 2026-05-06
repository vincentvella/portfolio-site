import { PressCoverageLoader } from "@/lib/data-loaders/press-coverage-loader";
import Card from "./Card";
import { FormattedDateString } from "./FormattedDateString";
import Image from "next/image";
import { load } from "outstatic/server";

const PIN_COLORS = [
  "bg-secondary",
  "bg-primary",
  "bg-accent",
  "bg-brand-violet",
];

const TILTS = ["-rotate-1", "rotate-1", "-rotate-[0.5deg]", "rotate-[0.5deg]"];

function publicationFromUrl(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export const PressCoverage = async () => {
  const db = await load();
  const coverage = await new PressCoverageLoader(db).load();
  if (coverage.length === 0) return null;

  return (
    <Card
      variant="neo"
      className="mt-12 p-6"
      data-sketch-label="press coverage"
      data-sketch-label-dir="below"
    >
      <Card.Header>
        <div className="mb-6 flex items-center gap-2">
          <span className="bg-secondary neo-border inline-flex h-9 w-9 items-center justify-center rounded-md text-lg">
            📰
          </span>
          <h2 className="font-display text-2xl leading-none font-bold tracking-tight">
            Press Coverage
          </h2>
        </div>
      </Card.Header>
      <Card.Content>
        <ul className="grid gap-y-8 pt-2">
          {coverage.map((item, index) => {
            const { publishedAt, title, content, description, slug, coverImage } =
              item;
            const publication = publicationFromUrl(content ?? "");
            const pinColor = PIN_COLORS[index % PIN_COLORS.length];
            const tilt = TILTS[index % TILTS.length];
            const articleLd = {
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: title,
              description,
              datePublished: publishedAt,
              url: content,
              ...(publication ? { publisher: { "@type": "Organization", name: publication } } : {}),
              ...(coverImage
                ? { image: coverImage.startsWith("http") ? coverImage : `https://vincevella.com${coverImage}` }
                : {}),
              about: {
                "@type": "Person",
                name: "Vincent Vella",
                url: "https://vincevella.com",
              },
            };
            return (
              <li key={slug}>
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
                />
                <a
                  href={content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`neo-border neo-shadow neo-press bg-card relative block ${tilt} rounded-sm p-4 pt-6 transition-transform duration-200 ease-out hover:[rotate:0deg]`}
                >
                  <span
                    aria-hidden
                    className={`push-pin absolute -top-2 left-1/2 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full ${pinColor}`}
                  />
                  <div className="flex flex-col gap-4 sm:flex-row">
                    {coverImage ? (
                      <div className="relative h-40 w-full sm:h-24 sm:w-32 sm:min-w-32 sm:shrink-0">
                        <Image
                          className="neo-border rounded-sm"
                          src={coverImage}
                          alt={`${title} preview`}
                          sizes="(min-width: 640px) 128px, 100vw"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-mono uppercase tracking-widest">
                        {publication ? (
                          <span className="neo-border bg-muted text-foreground rounded-sm px-1.5 py-0.5">
                            {publication}
                          </span>
                        ) : null}
                        <span className="text-muted-foreground">
                          Filed{" "}
                          <FormattedDateString date={publishedAt} />
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-black leading-tight tracking-tight md:text-2xl">
                        {title}
                      </h3>
                      <p className="text-muted-foreground mt-2 text-sm">
                        {description}
                      </p>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </Card.Content>
    </Card>
  );
};
