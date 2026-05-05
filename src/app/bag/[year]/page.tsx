import Layout from "@/components/Layout";
import { BagLoader } from "@/lib/data-loaders/bag-loader";
import Link from "next/link";
import { notFound } from "next/navigation";
import { load } from "outstatic/server";
import { BagBody } from "../BagBody";
import { BagHero } from "../BagHero";

type BagYearProps = {
  params: Promise<{ year: string }>;
};

export default async function BagYearPage(props: BagYearProps) {
  const { year } = await props.params;
  const yearNum = Number(year);
  if (!Number.isInteger(yearNum)) notFound();

  const db = await load();
  const loader = new BagLoader(db);
  const bag = await loader.loadByYear(yearNum);
  if (!bag) notFound();

  const all = await loader.loadAll();
  const isLatest = all[0]?.year === bag.year;

  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center pb-4">
        <div className="max-w-(--breakpoint-md) w-full px-4">
          <BagHero year={bag.year} tagline={bag.tagline} />
          {!isLatest && (
            <p className="text-muted-foreground mb-6 text-sm">
              This is an archived edition.{" "}
              <Link
                href="/bag"
                className="font-bold underline decoration-2 underline-offset-2"
              >
                See the current bag →
              </Link>
            </p>
          )}
          <BagBody bag={bag} />
        </div>
      </main>
    </Layout>
  );
}

export async function generateStaticParams() {
  const db = await load();
  const all = await new BagLoader(db).loadAll();
  return all.map((bag) => ({ year: String(bag.year) }));
}
