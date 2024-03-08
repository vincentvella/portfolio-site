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

  stringifiedFields = new Set();

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
        const { content } = entry;
        const title = entry.title
          .toLowerCase()
          .replace("&", "and")
          .replaceAll(" ", "_");
        if (this.stringifiedFields.has(title.toLowerCase())) {
          acc[title] = content.trim();
          return acc;
        }
        acc[title] = markdownToArray(content);
        return acc;
      },
      {} as Record<string, string | string[]>,
    );
  }

  stringify(field: string) {
    this.stringifiedFields.add(field.toLowerCase());
    return this;
  }

  async load(): Promise<Record<string, ResumeSection>> {
    return this.format();
  }
}
