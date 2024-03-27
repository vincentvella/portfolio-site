import Image from "next/image";
import Card from "./Card";
import { PositionSummary } from "@/lib/data-loaders/position-loader";

type ProfessionalTLDRProps = {
  summaries: [string, PositionSummary][];
};

export const ProfessionalTLDR: React.FC<ProfessionalTLDRProps> = ({
  summaries,
}) => {
  return (
    <Card className="p-4 mt-12 dark:bg-zinc-900">
      <Card.Header>
        <h2 className="text-2xl font-semibold leading-none tracking-tight mb-3">
          💼 Professional TLDR;
        </h2>
      </Card.Header>
      <Card.Content>
        {summaries.map(([name, position], i) => {
          const { titles, endDate, startDate, avatar, brandColor } = position;
          return (
            <>
              {i !== 0 && <hr className="my-3" />}
              <div key={name} className="flex justify-between pt-2">
                <div className="flex flex-row">
                  <div
                    className={`rounded-full content-center p-2 h-16 w-16 mr-2 bg-[${brandColor}]`}
                    style={{ backgroundColor: brandColor }}
                  >
                    <Image
                      src={avatar ?? ""}
                      alt={`${name} Logo`}
                      width={64}
                      height={64}
                      style={{
                        width: 64,
                        height: "auto",
                      }}
                      priority
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">{name}</h3>
                    <p>{titles.join(" -> ")}</p>
                  </div>
                </div>
                <div>
                  {startDate} - {endDate}
                </div>
              </div>
            </>
          );
        })}
      </Card.Content>
    </Card>
  );
};
