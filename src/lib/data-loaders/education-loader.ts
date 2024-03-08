import { Document } from "outstatic";
import { markdownToArray } from "../transformers";
import { DB } from "./loader";

type SelectedFields = (typeof EducationLoader.pickedFields)[number];
interface EducationFields extends Document {
  location: string;
}
type EducationData = Pick<EducationFields, SelectedFields>;
export interface Education extends Omit<EducationData, "content"> {
  content: string[];
}

export class EducationLoader {
  db: DB<EducationFields>;
  static pickedFields = ["title", "content", "location"] as const;
  selectedFields = EducationLoader.pickedFields.map((f) => f) as string[];

  constructor(db: unknown) {
    this.db = db as DB<EducationFields>;
  }

  getData(): Promise<EducationData[]> {
    return this.db
      .find({ collection: "education" }, this.selectedFields)
      .toArray();
  }

  async format(): Promise<Education[]> {
    const data = await this.getData();
    return data.map((entry) => ({
      ...entry,
      content: markdownToArray(entry.content),
    }));
  }

  async load(): Promise<Education[]> {
    return this.format();
  }
}
