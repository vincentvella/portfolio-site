import { Document, OstDocument } from "outstatic";
import { markdownToArray } from "../transformers";
import { DB } from "./loader";

type SelectedFields = (typeof LanguageLoader.pickedFields)[number];
type LanguageFields = OstDocument<{}>;
type LanguageData = Pick<LanguageFields, SelectedFields>;
export interface Language extends Omit<LanguageData, "content"> {
  content: string[];
}

export class LanguageLoader {
  db: DB<LanguageFields>;
  static pickedFields = ["title", "content"] as const;
  selectedFields = LanguageLoader.pickedFields.map((f) => f) as string[];

  constructor(db: unknown) {
    this.db = db as DB<LanguageFields>;
  }

  getData(): Promise<LanguageData[]> {
    return this.db
      .find({ collection: "languages" }, this.selectedFields)
      .toArray();
  }

  async format(): Promise<Language[]> {
    const data = await this.getData();
    return data.map((entry) => ({
      ...entry,
      content: markdownToArray(entry.content),
    }));
  }

  async load(): Promise<Language[]> {
    return this.format();
  }
}
