import { MetadataRoute } from "next";

type Domain = "vincevella.com" | "vincentvella.me";

export default function generateSitemap(domain: Domain): MetadataRoute.Sitemap {
  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `https://${domain}/resume`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `https://${domain}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}
