import Image from "next/image";
import Card from "./Card";
import { PositionLoader } from "@/lib/data-loaders/position-loader";
import { load } from "@/lib/load";
import { Fragment } from "react";

export const ProfessionalTLDR: React.FC = async ({}) => {
  const db = await load();
  const summaries = await new PositionLoader(db).loadPositionSummaries();
  return (
    <Card className="mt-12 p-4 dark:bg-zinc-900 dark:text-zinc-200">
      <Card.Header>
        <h2 className="mb-3 text-2xl font-semibold leading-none tracking-tight">
          💼 Professional TLDR;
        </h2>
      </Card.Header>
      <Card.Content>
        {summaries.map(([name, position], i) => {
          const { titles, endDate, startDate, avatar, brandColor } = position;
          return (
            <Fragment key={name}>
              {i !== 0 && <hr className="my-3" />}
              <div className="flex justify-between pt-2">
                <div className="flex flex-row">
                  <div
                    className={`mr-2 max-h-16 min-h-16 min-w-16 max-w-16 content-center rounded-full p-2 bg-[${brandColor}]`}
                    style={{ backgroundColor: brandColor }}
                  >
                    <Image
                      src={avatar ?? ""}
                      alt={`${name} Logo`}
                      width={64}
                      height={64}
                      priority
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{name}</h3>
                    <div className="md:hidden">
                      {startDate} - {endDate}
                    </div>
                    <p className="whitespace-break-spaces">
                      {titles.join(" -> ")}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block">
                  {startDate} - {endDate}
                </div>
              </div>
            </Fragment>
          );
        })}
      </Card.Content>
    </Card>
  );
};
