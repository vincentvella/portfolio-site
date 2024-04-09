import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/outstatic/",
    },
    sitemap: "https://vincevella.com/sitemap.xml",
  };
}
