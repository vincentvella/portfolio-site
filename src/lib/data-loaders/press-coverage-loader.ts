import { Document } from "outstatic";
import { DB } from "./loader";

type SelectedFields = (typeof PressCoverageLoader.pickedFields)[number];
interface PressCoverageFields extends Document {}
type PressCoverageData = Pick<PressCoverageFields, SelectedFields>;

export class PressCoverageLoader {
  db: DB<PressCoverageFields>;
  static pickedFields = [
    "title",
    "content",
    "description",
    "slug",
    "coverImage",
    "publishedAt",
  ] as const;
  selectedFields = PressCoverageLoader.pickedFields.map((f) => f) as string[];
  data: PressCoverageData[] = [];

  constructor(db: unknown) {
    this.db = db as DB<PressCoverageFields>;
  }

  getData(): Promise<PressCoverageData[]> {
    return this.db
      .find({ collection: "press-coverage" }, this.selectedFields)
      .sort({ publishedAt: -1 })
      .toArray();
  }

  trimContent() {
    this.data = this.data.map((entry) => ({
      ...entry,
      content: entry.content.trim(),
    }));
    return this;
  }

  async load(): Promise<PressCoverageData[]> {
    this.data = await this.getData();
    this.trimContent();
    return this.data;
  }
}
