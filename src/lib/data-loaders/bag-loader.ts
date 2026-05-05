import { OstDocument } from "outstatic";
import { DB } from "./loader";

export type BagItem = {
  name: string;
  note?: string;
  href?: string;
};

export type BagCategory = {
  title: string;
  items: BagItem[];
};

type BagFields = OstDocument<{
  year: number;
  tagline?: string;
}>;

type BagData = Pick<BagFields, (typeof BagLoader.pickedFields)[number]>;

export type Bag = {
  slug: string;
  year: number;
  title: string;
  tagline?: string;
  intro: string;
  categories: BagCategory[];
};

const ITEM_LINE = /^[-*]\s+(.+)$/;
const BOLD_PREFIX = /^\*\*(.+?)\*\*\s*(.*)$/;
const MD_LINK = /\[(.+?)\]\((.+?)\)/;

function parseItem(line: string): BagItem | null {
  const match = line.match(ITEM_LINE);
  if (!match) return null;
  const body = match[1].trim();

  const bold = body.match(BOLD_PREFIX);
  if (bold) {
    const name = bold[1].trim();
    const rest = bold[2].replace(/^[\s—–-]+/, "").trim();
    return parseLinkable(name, rest || undefined);
  }

  return parseLinkable(body);
}

function parseLinkable(name: string, note?: string): BagItem {
  const link = name.match(MD_LINK);
  if (link) {
    return { name: link[1], href: link[2], ...(note ? { note } : {}) };
  }
  return { name, ...(note ? { note } : {}) };
}

export function parseBagContent(content: string): {
  intro: string;
  categories: BagCategory[];
} {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const intro: string[] = [];
  const categories: BagCategory[] = [];
  let current: BagCategory | null = null;
  let seenHeading = false;

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.startsWith("## ")) {
      seenHeading = true;
      if (current) categories.push(current);
      current = { title: line.slice(3).trim(), items: [] };
      continue;
    }
    if (!seenHeading) {
      intro.push(line);
      continue;
    }
    if (!current) continue;
    const item = parseItem(line);
    if (item) current.items.push(item);
  }
  if (current) categories.push(current);

  return {
    intro: intro.join("\n").trim(),
    categories,
  };
}

export class BagLoader {
  db: DB<BagFields>;
  static pickedFields = [
    "title",
    "content",
    "slug",
    "year",
    "tagline",
  ] as const;
  selectedFields = BagLoader.pickedFields.map((f) => f) as string[];

  constructor(db: unknown) {
    this.db = db as DB<BagFields>;
  }

  private getAll(): Promise<BagData[]> {
    return this.db.find({ collection: "bags" }, this.selectedFields).toArray();
  }

  private toBag(entry: BagData): Bag {
    const { intro, categories } = parseBagContent(entry.content ?? "");
    return {
      slug: entry.slug,
      year: Number(entry.year),
      title: entry.title,
      tagline: entry.tagline,
      intro,
      categories,
    };
  }

  async loadAll(): Promise<Bag[]> {
    const data = await this.getAll();
    return data.map((d) => this.toBag(d)).sort((a, b) => b.year - a.year);
  }

  async loadLatest(): Promise<Bag | null> {
    const all = await this.loadAll();
    return all[0] ?? null;
  }

  async loadByYear(year: number): Promise<Bag | null> {
    const all = await this.loadAll();
    return all.find((b) => b.year === year) ?? null;
  }
}
