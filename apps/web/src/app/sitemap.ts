import type { MetadataRoute } from "next";
import { news } from "@/lib/data/site-content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/news",
    "/support",
    "/contact",
    "/careers",
  ].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const newsRoutes = news.map((post) => ({
    url: `${site.url}/news/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...newsRoutes];
}
