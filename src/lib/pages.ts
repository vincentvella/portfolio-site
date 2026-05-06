import { MetadataRoute } from "next";
import { load } from "outstatic/server";
import { ProjectLoader } from "@/lib/data-loaders/project-loader";
import { BagLoader } from "@/lib/data-loaders/bag-loader";

type Domain = "vincevella.com" | "vincentvella.me";

export default async function generateSitemap(
  domain: Domain,
): Promise<MetadataRoute.Sitemap> {
  const base = `https://${domain}`;
  const now = new Date();

  const db = await load();
  const [projects, bags] = await Promise.all([
    new ProjectLoader(db).load(),
    new BagLoader(db).loadAll(),
  ]);

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/resume`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${base}/bag`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    ...bags.map((bag) => ({
      url: `${base}/bag/${bag.year}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];
}
