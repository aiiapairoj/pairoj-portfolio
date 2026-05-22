/**
 * Static accessor for cached GitHub repo data (build-time fetched).
 * See scripts/sync-repos.ts for the producer.
 */
import reposData from "@/data/repos.json";

export type Repo = (typeof reposData)[number];

export function getAllRepos(): Repo[] {
  return reposData as Repo[];
}

export function getRepoBySlug(slug: string): Repo | undefined {
  return getAllRepos().find((r) => r.slug === slug);
}

export function getFeaturedRepos(limit = 6): Repo[] {
  return getAllRepos()
    .filter((r) => !r.fork && !r.archived)
    .sort((a, b) => {
      // Prefer repos with stars, then most recently pushed.
      if (b.stars !== a.stars) return b.stars - a.stars;
      return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime();
    })
    .slice(0, limit);
}

export function getRepoSlugs(): string[] {
  return getAllRepos().map((r) => r.slug);
}

export function getLanguageStats(): { language: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const r of getAllRepos()) {
    if (!r.language) continue;
    counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count);
}
