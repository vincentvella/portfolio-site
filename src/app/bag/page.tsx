import Layout from "@/components/Layout";
import { BagLoader } from "@/lib/data-loaders/bag-loader";
import Link from "next/link";
import { load } from "outstatic/server";
import { BagBody } from "./BagBody";
import { BagHero } from "./BagHero";

export default async function BagPage() {
  const db = await load();
  const loader = new BagLoader(db);
  const all = await loader.loadAll();
  const latest = all[0] ?? null;
  const archive = all.slice(1);

  if (!latest) {
    return (
      <Layout>
        <main className="flex min-h-screen flex-col items-center pb-4">
          <div className="max-w-(--breakpoint-md) w-full px-4">
            <BagHero year={new Date().getFullYear()} tagline="Coming soon." />
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center pb-4">
        <div className="max-w-(--breakpoint-md) w-full px-4">
          <BagHero year={latest.year} tagline={latest.tagline} />
          <BagBody bag={latest} />
          {archive.length > 0 && (
            <section className="mt-16 mb-4 border-t-2 border-foreground pt-6">
              <h3 className="font-display text-xl font-bold">Archive</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {archive.map((bag) => (
                  <li key={bag.year}>
                    <Link
                      href={`/bag/${bag.year}`}
                      className="neo-border neo-shadow-sm neo-press bg-card inline-flex items-center rounded-md px-3 py-1.5 text-sm font-bold"
                    >
                      {bag.year}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
    </Layout>
  );
}
