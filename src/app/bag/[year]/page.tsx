import Layout from "@/components/Layout";
import { BagLoader } from "@/lib/data-loaders/bag-loader";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { load } from "outstatic/server";
import { BagBody } from "../BagBody";
import { BagHero } from "../BagHero";

export async function generateMetadata(props: BagYearProps): Promise<Metadata> {
  const { year } = await props.params;
  const yearNum = Number(year);
  if (!Number.isInteger(yearNum)) return {};
  const db = await load();
  const bag = await new BagLoader(db).loadByYear(yearNum);
  if (!bag) return {};
  const description =
    bag.tagline ??
    `What I was actually using in ${bag.year} — languages, tools, infra, and hardware.`;
  return {
    title: `What's in my bag — ${bag.year}`,
    description,
    alternates: { canonical: `/bag/${bag.year}` },
    openGraph: {
      title: `What's in my bag — ${bag.year}`,
      description,
      url: `/bag/${bag.year}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `What's in my bag — ${bag.year}`,
      description,
    },
  };
}

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
  const bagLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `What's in my bag — ${bag.year}`,
    description:
      bag.tagline ?? `What I was actually using in ${bag.year}.`,
    url: `https://vincevella.com/bag/${bag.year}`,
    datePublished: `${bag.year}-01-01`,
    author: {
      "@type": "Person",
      name: "Vincent Vella",
      url: "https://vincevella.com",
    },
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bagLd) }}
      />
      <main id="main" className="flex min-h-screen flex-col items-center pb-4">
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
