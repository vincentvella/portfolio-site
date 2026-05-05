import Image from "next/image";
import Card from "./Card";
import { PositionLoader } from "@/lib/data-loaders/position-loader";
import { Fragment } from "react";
import { load } from "outstatic/server";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(date: string) {
  if (!date || date.toLowerCase() === "present") return "Present";
  const [m, y] = date.split("/").map(Number);
  if (!m || !y) return date;
  return `${MONTH_NAMES[m - 1]} ${y}`;
}

export const ProfessionalTLDR: React.FC = async ({}) => {
  const db = await load();
  const positionLoader = new PositionLoader(db);
  const summaries = await positionLoader.loadPositionSummaries();
  const careerYears = await positionLoader.careerYears();
  const totalRoles = summaries.reduce((sum, [, p]) => sum + p.titles.length, 0);

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
            Track Record
          </h2>
        </div>
      </Card.Header>
      <Card.Content>
        <div className="mb-6 grid grid-cols-3 gap-3">
          <div className="neo-border bg-primary text-primary-foreground rounded-md px-3 py-3 text-center">
            <div className="font-display text-3xl font-black leading-none tracking-tight md:text-4xl">
              {careerYears}+
            </div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-widest md:text-xs">
              Years
            </div>
          </div>
          <div className="neo-border bg-secondary text-secondary-foreground rounded-md px-3 py-3 text-center">
            <div className="font-display text-3xl font-black leading-none tracking-tight md:text-4xl">
              {summaries.length}
            </div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-widest md:text-xs">
              Companies
            </div>
          </div>
          <div className="neo-border bg-brand-violet rounded-md px-3 py-3 text-center text-zinc-950">
            <div className="font-display text-3xl font-black leading-none tracking-tight md:text-4xl">
              {totalRoles}
            </div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-widest md:text-xs">
              Roles
            </div>
          </div>
        </div>

        <ol className="border-foreground relative ml-3 border-l-4 pl-6">
          {summaries.map(([name, position], i) => {
            const { titles, endDate, startDate, avatar, brandColor } = position;
            const isCurrent = !endDate || endDate === "Present";
            return (
              <Fragment key={name}>
                <li
                  className={`relative ${i !== 0 ? "mt-6" : ""}`}
                >
                  <span
                    aria-hidden
                    className="neo-border absolute -left-[2.1rem] top-1.5 h-4 w-4 rounded-sm"
                    style={{ backgroundColor: brandColor }}
                  />
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-row gap-3">
                      <div
                        data-company-logo
                        className="neo-border relative h-14 w-14 min-w-14 rounded-md"
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
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-xl font-bold tracking-tight">
                            {name}
                          </h3>
                          {isCurrent ? (
                            <span className="neo-border bg-primary text-primary-foreground rounded-sm px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                              Current
                            </span>
                          ) : null}
                        </div>
                        <p className="text-muted-foreground mt-0.5 text-sm font-mono tabular-nums md:hidden">
                          {formatDate(endDate)} ← {formatDate(startDate)}
                        </p>
                        <p className="mt-1 whitespace-break-spaces text-sm">
                          {titles.join(" → ")}
                        </p>
                      </div>
                    </div>
                    <div className="text-muted-foreground hidden text-right font-mono text-xs tabular-nums md:block">
                      {formatDate(endDate)}
                      <br />
                      ↑<br />
                      {formatDate(startDate)}
                    </div>
                  </div>
                </li>
              </Fragment>
            );
          })}
        </ol>
      </Card.Content>
    </Card>
  );
};
