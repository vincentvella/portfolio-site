import { Document } from "outstatic";
import { markdownToArray } from "../transformers";
import { DB } from "./loader";

type SelectedFields = (typeof ResumeSectionLoader.pickedFields)[number];
interface ResumeSectionFields extends Document {
  location: string;
}
type ResumeSectionData = Pick<ResumeSectionFields, SelectedFields>;
export type ResumeSection = string | string[];

export class ResumeSectionLoader {
  db: DB<ResumeSectionFields>;
  static pickedFields = ["title", "content"] as const;
  selectedFields = ResumeSectionLoader.pickedFields.map((f) => f) as string[];

  constructor(db: unknown) {
    this.db = db as DB<ResumeSectionFields>;
  }

  getData(): Promise<ResumeSectionData[]> {
    return this.db
      .find({ collection: "resume-sections" }, this.selectedFields)
      .toArray();
  }

  async format(): Promise<Record<string, ResumeSection>> {
    const data = await this.getData();

    return data.reduce(
      (acc, entry) => {
        acc[entry.title] = markdownToArray(entry.content);
        return acc;
      },
      {} as Record<string, string | string[]>,
    );
  }

  async load(): Promise<Record<string, ResumeSection>> {
    return this.format();
  }
}
