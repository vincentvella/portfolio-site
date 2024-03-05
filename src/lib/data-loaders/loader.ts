import { load } from "outstatic/dist/utils/server";

export type DB<TSchema extends {} = {}> = Awaited<
  ReturnType<typeof load<TSchema>>
>;
