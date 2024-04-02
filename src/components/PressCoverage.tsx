import { PressCoverageLoader } from "@/lib/data-loaders/press-coverage-loader";
import Card from "./Card";
import { FormattedDateString } from "./FormattedDateString";
import Image from "next/image";
import { load } from "@/lib/load";

export const PressCoverage = async () => {
  const db = await load();
  const coverage = await new PressCoverageLoader(db).load();
  return (
    <Card className="p-4 mt-12 dark:bg-zinc-900 dark:text-zinc-200">
      <Card.Header>
        <h2 className="text-2xl font-semibold leading-none tracking-tight mb-3">
          📰 Press Coverage
        </h2>
      </Card.Header>
      <Card.Content>
        {coverage.map((item, index) => {
          const { publishedAt, title, content, description, slug, coverImage } =
            item;
          return (
            <>
              {index !== 0 && <hr className="my-3" />}
              <div key={slug}>
                <section>
                  <h3 className="text-xl font-semibold leading-none tracking-tight hover:underline">
                    <a href={content}>{title}</a>
                  </h3>
                  <p className="text-sm min-h-6 italic font-light">
                    <FormattedDateString date={publishedAt} />
                  </p>
                  <div className="flex flex-row my-4">
                    {!!coverImage && (
                      <Image
                        className="relative pr-2"
                        src={coverImage}
                        alt="Avatar Image"
                        width={100}
                        height={100}
                        priority
                      />
                    )}
                    <p className="text-sm">{description}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute bottom-2 right-2">
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
            </>
          );
        })}
      </Card.Content>
    </Card>
  );
};
