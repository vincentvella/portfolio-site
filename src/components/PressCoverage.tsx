import { PressCoverageLoader } from "@/lib/data-loaders/press-coverage-loader";
import Card from "./Card";
import { FormattedDateString } from "./FormattedDateString";
import Image from "next/image";
import { Fragment } from "react";
import { load } from "outstatic/server";

export const PressCoverage = async () => {
  const db = await load();
  const coverage = await new PressCoverageLoader(db).load();
  return (
    <Card variant="neo" className="mt-12 p-6">
      <Card.Header>
        <div className="mb-4 flex items-center gap-2">
          <span className="bg-secondary neo-border inline-flex h-9 w-9 items-center justify-center rounded-md text-lg">
            📰
          </span>
          <h2 className="font-display text-2xl leading-none font-bold tracking-tight">
            Press Coverage
          </h2>
        </div>
      </Card.Header>
      <Card.Content>
        {coverage.map((item, index) => {
          const { publishedAt, title, content, description, slug, coverImage } =
            item;
          return (
            <Fragment key={slug}>
              {index !== 0 && (
                <hr className="border-foreground my-4 border-t-2 border-dashed" />
              )}
              <div>
                <section>
                  <h3 className="font-display text-xl leading-tight font-bold tracking-tight hover:underline">
                    <a href={content}>{title}</a>
                  </h3>
                  <p className="text-muted-foreground min-h-6 font-mono text-xs">
                    <FormattedDateString date={publishedAt} />
                  </p>
                  <div className="my-4 flex flex-row gap-3 pb-4">
                    <div className="relative h-24 min-w-32">
                      {!!coverImage && (
                        <Image
                          className="neo-border rounded-sm"
                          src={coverImage}
                          alt="Avatar Image"
                          sizes="6.667vw"
                          fill
                          style={{ objectFit: "cover" }}
                          priority
                        />
                      )}
                    </div>
                    <p className="text-sm">{description}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute right-2 bottom-2">
                      <a
                        className="font-semibold underline decoration-2 underline-offset-2 hover:decoration-primary"
                        href={content}
                      >
                        {"Read more →"}
                      </a>
                    </div>
                  </div>
                </section>
              </div>
            </Fragment>
          );
        })}
      </Card.Content>
    </Card>
  );
};
