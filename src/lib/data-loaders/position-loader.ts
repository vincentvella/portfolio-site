import { Document } from "outstatic";
import { markdownToArray } from "../transformers";
import { DB } from "./loader";

type SelectedFields = (typeof PositionLoader.pickedFields)[number];
interface PositionFields extends Document {
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  brandColor?: string;
  companyWebsite?: string;
  avatar?: string;
  badges?: { value: string; label: string }[];
}
type PositionData = Pick<PositionFields, SelectedFields>;
export interface Position extends Omit<PositionData, "content"> {
  content: string[];
}

export type PositionSummary = Pick<
  PositionFields,
  "startDate" | "endDate" | "avatar" | "brandColor"
> & {
  titles: string[];
};

function compareDates(positionA: PositionData, positionB: PositionData) {
  const [monthA, yearA] = positionA.startDate.split("/");
  const [monthB, yearB] = positionB.startDate.split("/");

  // Compare years first
  if (yearA !== yearB) {
    return parseInt(yearB) - parseInt(yearA);
  } else {
    // If years are the same, compare months
    return parseInt(monthB) - parseInt(monthA);
  }
}

export class PositionLoader {
  db: DB<PositionFields>;
  static pickedFields = [
    "title",
    "content",
    "company",
    "location",
    "startDate",
    "endDate",
    "badges",
    "avatar",
    "brandColor",
    "companyWebsite",
  ] as const;
  selectedFields = PositionLoader.pickedFields.map((f) => f) as string[];
  positionData: PositionData[] = [];
  formattedData: [string, Position[]][] = [];

  constructor(db: unknown) {
    this.db = db as DB<PositionFields>;
  }

  getData(): Promise<PositionData[]> {
    return this.db
      .find({ collection: "positions" }, this.selectedFields)
      .toArray();
  }

  condenseByConsecutiveCompanyRoles(): [string, Position[]][] {
    return this.positionData.reduce(
      (acc, entry) => {
        const position = {
          ...entry,
          content: markdownToArray(entry.content),
        };
        if (acc.at(-1)?.[0] === position.company) {
          acc.at(-1)?.[1].push(position);
        } else {
          acc.push([position.company, [position]]);
        }
        return acc;
      },
      [] as [string, Position[]][],
    );
  }

  sortByDate() {
    //  Sorts dates by mm/yyyy
    this.positionData.sort(compareDates);
    return this;
  }

  get data() {
    return this.sortByDate().condenseByConsecutiveCompanyRoles();
  }

  async load(): Promise<[string, Position[]][]> {
    this.positionData = await this.getData();
    return this.data;
  }

  async loadPositionSummaries(): Promise<[string, PositionSummary][]> {
    await this.load();
    const positionData = this.data;
    return positionData.map(([company, positions]) => {
      const reversedPositions = [...positions].reverse();
      const startDate = reversedPositions[0].startDate;
      const endDate = reversedPositions.at(-1)?.endDate || "Present";
      const avatar = reversedPositions[0].avatar;
      const titles = reversedPositions.map(({ title }) => title);
      const brandColor = reversedPositions[0].brandColor;
      return [company, { startDate, endDate, avatar, titles, brandColor }];
    });
  }
}
