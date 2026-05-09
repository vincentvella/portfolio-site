import generateSitemap from "@/lib/pages";
import { MetadataRoute } from "next";

export default function sitemap(): Promise<MetadataRoute.Sitemap> {
  return generateSitemap("vincevella.com");
}
