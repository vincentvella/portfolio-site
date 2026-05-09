import { OstDocument } from "outstatic";
import { markdownToArray } from "../transformers";
import { getPublicImageDims, type ImageDims } from "../image-dims";
import { DB } from "./loader";

type Tag = {
  value: string;
  label: string;
};
type SelectedFields = (typeof ProjectLoader.pickedFields)[number];
export type AccentColor = "primary" | "accent" | "secondary" | "brand-violet";

type ProjectFields = OstDocument<{
  description?: string;
  stack: Tag[];
  bullets: string;
  accentColor?: AccentColor;
}>;
type ProjectData = Pick<ProjectFields, SelectedFields>;
export interface Position extends Omit<ProjectData, "bullets"> {
  bullets: string[];
  imageDims?: ImageDims;
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
    "accentColor",
    "publishedAt",
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
      imageDims: getPublicImageDims(entry.coverImage),
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
