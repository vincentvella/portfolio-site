import Image from "next/image";
import Card from "./Card";
import { PositionLoader } from "@/lib/data-loaders/position-loader";
import { Fragment } from "react";
import { load } from "outstatic/server";

export const ProfessionalTLDR: React.FC = async ({}) => {
  const db = await load();
  const summaries = await new PositionLoader(db).loadPositionSummaries();
  return (
    <Card
      variant="neo"
      className="mt-12 p-6"
      data-sketch-label="professional summary"
      data-sketch-label-dir="below"
    >
      <Card.Header>
        <div className="mb-4 flex items-center gap-2">
          <span className="bg-accent neo-border inline-flex h-9 w-9 items-center justify-center rounded-md text-lg">
            💼
          </span>
          <h2 className="font-display text-2xl leading-none font-bold tracking-tight">
            Professional TLDR;
          </h2>
        </div>
      </Card.Header>
      <Card.Content>
        {summaries.map(([name, position], i) => {
          const { titles, endDate, startDate, avatar, brandColor } = position;
          return (
            <Fragment key={name}>
              {i !== 0 && (
                <hr className="border-foreground my-4 border-t-2 border-dashed" />
              )}
              <div className="flex justify-between gap-4 pt-2">
                <div className="flex flex-row gap-3">
                  <div
                    data-company-logo
                    className="neo-border relative h-16 w-16 min-w-16 rounded-md"
                    style={{ backgroundColor: brandColor }}
                  >
                    <Image
                      className="p-1"
                      src={avatar ?? ""}
                      alt={`${name} Logo`}
                      style={{ objectFit: "contain" }}
                      sizes="3.3vw"
                      fill
                      priority
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight">
                      {name}
                    </h3>
                    <div className="text-muted-foreground text-sm md:hidden">
                      {startDate} → {endDate}
                    </div>
                    <p className="whitespace-break-spaces text-sm">
                      {titles.join(" → ")}
                    </p>
                  </div>
                </div>
                <div className="text-muted-foreground hidden font-mono text-sm tabular-nums md:block">
                  {startDate} → {endDate}
                </div>
              </div>
            </Fragment>
          );
        })}
      </Card.Content>
    </Card>
  );
};
