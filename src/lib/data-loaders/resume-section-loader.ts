import { OstDocument } from "outstatic";
import { markdownToArray } from "../transformers";
import { DB } from "./loader";

type SelectedFields = (typeof ResumeSectionLoader.pickedFields)[number];
type ResumeSectionFields = OstDocument<{
  location: string;
}>;
type ResumeSectionData = Pick<ResumeSectionFields, SelectedFields>;
export type ResumeSection = string | string[];
type LoadedResumeSections = {
  content: ResumeSection;
  description: ResumeSection;
};

export class ResumeSectionLoader {
  db: DB<ResumeSectionFields>;
  static pickedFields = ["title", "content", "description"] as const;
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

  async format(): Promise<Record<string, LoadedResumeSections>> {
    const data = await this.getData();

    return data.reduce(
      (acc, entry) => {
        const { content, description } = entry;
        const title = entry.title
          .toLowerCase()
          .replace("&", "and")
          .replaceAll(" ", "_");
        if (this.stringifiedFields.has(title.toLowerCase())) {
          acc[title] = {
            content: content.trim(),
            description: (description ?? "").trim(),
          };
          return acc;
        }
        acc[title] = {
          content: markdownToArray(content),
          description: (description ?? "").trim(),
        };
        return acc;
      },
      {} as Record<string, LoadedResumeSections>,
    );
  }

  stringify(field: string) {
    this.stringifiedFields.add(field.toLowerCase());
    return this;
  }

  async load(): Promise<Record<string, LoadedResumeSections>> {
    return this.format();
  }
}
