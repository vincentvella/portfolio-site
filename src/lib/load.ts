import { load as loadOutstaticContent } from "outstatic/server";
import { cache } from "react";

export const load = cache(async () => {
  return await loadOutstaticContent();
});
