import type { MetadataRoute } from "next";
import { getAllRepos } from "@/lib/github";
import { siteConfig } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteConfig.url;
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/about/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/projects/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];
  const repoPages: MetadataRoute.Sitemap = getAllRepos().map((r) => ({
    url: `${base}/projects/${r.slug}/`,
    lastModified: r.pushedAt ? new Date(r.pushedAt) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...staticPages, ...repoPages];
}
