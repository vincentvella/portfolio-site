import generateSitemap from "@/lib/pages";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return generateSitemap("vincentvella.me");
}
