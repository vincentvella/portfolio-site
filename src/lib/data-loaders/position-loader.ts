import { Document } from "outstatic";
import { markdownToArray } from "../transformers";
import { DB } from "./loader";

type SelectedFields = (typeof PositionLoader.pickedFields)[number];
interface PositionFields extends Document {
  company: string;
  location: string;
  startDate: string;
  endDate: string;
}
type PositionData = Pick<PositionFields, SelectedFields>;
export interface Position extends Omit<PositionData, "content"> {
  content: string[];
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
  ] as const;
  selectedFields = PositionLoader.pickedFields.map((f) => f) as string[];

  constructor(db: unknown) {
    this.db = db as DB<PositionFields>;
  }

  getData(): Promise<PositionData[]> {
    return this.db
      .find({ collection: "positions" }, this.selectedFields)
      .toArray();
  }

  async format(): Promise<Position[]> {
    const data = await this.getData();
    return data.map((entry) => ({
      ...entry,
      content: markdownToArray(entry.content),
    }));
  }

  async load(): Promise<Position[]> {
    return this.format();
  }
}
