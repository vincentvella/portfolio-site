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
    <Card className="mt-12 p-4 dark:bg-zinc-900 dark:text-zinc-200">
      <Card.Header>
        <h2 className="mb-3 text-2xl leading-none font-semibold tracking-tight">
          📰 Press Coverage
        </h2>
      </Card.Header>
      <Card.Content>
        {coverage.map((item, index) => {
          const { publishedAt, title, content, description, slug, coverImage } =
            item;
          return (
            <Fragment key={slug}>
              {index !== 0 && <hr className="my-3" />}
              <div>
                <section>
                  <h3 className="text-xl leading-none font-semibold tracking-tight hover:underline">
                    <a href={content}>{title}</a>
                  </h3>
                  <p className="min-h-6 text-sm font-light italic">
                    <FormattedDateString date={publishedAt} />
                  </p>
                  <div className="my-4 flex flex-row pb-4">
                    <div className="relative h-24 min-w-32">
                      {!!coverImage && (
                        <Image
                          className="relative pr-2"
                          src={coverImage}
                          alt="Avatar Image"
                          sizes="6.667vw"
                          fill
                          style={{ objectFit: "cover" }}
                          priority
                        />
                      )}
                    </div>
                    <p className="pl-2 text-sm">{description}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute right-2 bottom-2">
                      <a
                        className="font-semibold hover:underline"
                        href={content}
                      >
                        {"Read more ->"}
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
