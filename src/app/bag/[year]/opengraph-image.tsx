import { BagLoader } from "@/lib/data-loaders/bag-loader";
import { load } from "outstatic/server";
import { renderBagOg, size, contentType } from "../opengraph-image";

export const alt = "What's in my bag — Vince Vella";
export { size, contentType };

type Props = { params: Promise<{ year: string }> };

export default async function BagYearOg(props: Props) {
  const { year } = await props.params;
  const yearNum = Number(year);
  const db = await load();
  const bag = await new BagLoader(db).loadByYear(yearNum);
  return renderBagOg(
    bag?.year ?? yearNum,
    bag?.tagline ?? `What I was actually using in ${yearNum}.`,
  );
}
