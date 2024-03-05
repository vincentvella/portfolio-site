import { Document } from "outstatic";
import { markdownToArray } from "../transformers";
import { DB } from "./loader";

type SelectedFields = (typeof ProjectLoader.pickedFields)[number];
interface ProjectFields extends Document {
  location: string;
}
type ProjectData = Pick<ProjectFields, SelectedFields>;
export interface Position extends Omit<ProjectData, "content"> {
  content: string[];
}

export class ProjectLoader {
  db: DB<ProjectFields>;
  static pickedFields = [
    "title",
    "content",
    "description",
    "location",
  ] as const;
  selectedFields = ProjectLoader.pickedFields.map((f) => f) as string[];

  constructor(db: unknown) {
    this.db = db as DB<ProjectFields>;
  }

  getData(): Promise<ProjectData[]> {
    return this.db
      .find({ collection: "projects" }, this.selectedFields)
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
