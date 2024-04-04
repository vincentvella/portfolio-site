import { Document } from "outstatic";
import { markdownToArray } from "../transformers";
import { DB } from "./loader";

type Tag = {
  value: string;
  label: string;
};
type SelectedFields = (typeof ProjectLoader.pickedFields)[number];
interface ProjectFields extends Document {
  stack: Tag[];
  bullets: string;
}
type ProjectData = Pick<ProjectFields, SelectedFields>;
export interface Position extends Omit<ProjectData, "bullets"> {
  bullets: string[];
}

export class ProjectLoader {
  db: DB<ProjectFields>;
  static pickedFields = [
    "title",
    "content",
    "description",
    "stack",
    "bullets",
    "slug",
    "coverImage",
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

  async findProject(slug: string): Promise<ProjectData | null> {
    try {
      const projectArray = await this.db
        .find({ collection: "projects", slug }, this.selectedFields)
        .toArray();
      return projectArray[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  formatEntry(entry: ProjectData): Position {
    return {
      ...entry,
      bullets: markdownToArray(entry.bullets),
    };
  }

  async format(): Promise<Position[]> {
    const data = await this.getData();
    return data.map(this.formatEntry);
  }

  async load(): Promise<Position[]> {
    const data = await this.getData();
    return data.map(this.formatEntry);
  }

  async loadProject(slug: string): Promise<Position> {
    const project = await this.findProject(slug);
    if (!project) {
      throw new NotFoundError();
    }
    return this.formatEntry(project);
  }
}

class NotFoundError extends Error {
  constructor() {
    super();
    this.name = "NotFoundError";
    this.message = "Project not found";
  }
}
