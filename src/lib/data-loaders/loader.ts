import { load } from "outstatic/server";

export type DB<TSchema extends {} = {}> = Awaited<
  ReturnType<typeof load<TSchema>>
>;
