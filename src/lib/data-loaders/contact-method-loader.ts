import { Document } from "outstatic";
import { DB } from "./loader";

type SelectedFields = (typeof ContactMethodLoader.pickedFields)[number];
interface ContactMethodFields extends Document {
  type: string;
}
type ContactMethodData = Pick<ContactMethodFields, SelectedFields>;
export interface ContactMethod extends Omit<ContactMethodData, "content"> {
  content: string;
}

export class ContactMethodLoader {
  db: DB<ContactMethodFields>;
  static pickedFields = ["title", "content", "type"] as const;
  selectedFields = ContactMethodLoader.pickedFields.map((f) => f) as string[];

  constructor(db: unknown) {
    this.db = db as DB<ContactMethodFields>;
  }

  getData(): Promise<ContactMethodData[]> {
    return this.db
      .find({ collection: "contact-methods" }, this.selectedFields)
      .toArray();
  }

  async format(): Promise<ContactMethod[]> {
    const data = await this.getData();
    return data.map((entry) => {
      return {
        ...entry,
        content: entry.content.trim(),
      };
    });
  }

  async load(): Promise<ContactMethod[]> {
    return this.format();
  }
}
