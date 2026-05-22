/**
 * Fetch all public GitHub repos for the configured user and write them to data/repos.json.
 *
 * Usage:
 *   npm run sync                      # uses GITHUB_USERNAME env or default
 *   GITHUB_TOKEN=ghp_xxx npm run sync # higher rate limit + private repo access
 *
 * Why static cache:
 *   Hostinger shared hosting cannot run Node at request-time. We fetch at build time
 *   and commit data/repos.json so production builds are reproducible and offline-safe.
 */
import { Octokit } from "@octokit/rest";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const USERNAME = process.env.GITHUB_USERNAME ?? "aiiapairoj";
const TOKEN = process.env.GITHUB_TOKEN;
const OUT_PATH = resolve(process.cwd(), "data", "repos.json");
const README_MAX_CHARS = 1200;

type RepoOut = {
  slug: string;
  name: string;
  description: string;
  htmlUrl: string;
  homepage: string | null;
  stars: number;
  forks: number;
  watchers: number;
  language: string | null;
  topics: string[];
  license: string | null;
  archived: boolean;
  fork: boolean;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  readmeSummary: string;
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/[*_~]+/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{2,}/g, "\n\n")
    .trim();
}

async function fetchReadme(octokit: Octokit, owner: string, repo: string): Promise<string> {
  try {
    const res = await octokit.repos.getReadme({ owner, repo, mediaType: { format: "raw" } });
    const raw = res.data as unknown as string;
    return stripMarkdown(raw).slice(0, README_MAX_CHARS);
  } catch {
    return "";
  }
}

async function main() {
  const octokit = new Octokit({ auth: TOKEN, userAgent: `${USERNAME}-portfolio-sync` });
  console.log(`[sync] Fetching public repos for ${USERNAME}...`);

  const repos = await octokit.paginate(octokit.repos.listForUser, {
    username: USERNAME,
    type: "owner",
    per_page: 100,
    sort: "updated",
  });

  const publicRepos = repos.filter((r) => !r.private);
  console.log(`[sync] Found ${publicRepos.length} public repos. Fetching READMEs...`);

  const out: RepoOut[] = [];
  for (const r of publicRepos) {
    const readmeSummary = await fetchReadme(octokit, USERNAME, r.name);
    out.push({
      slug: slugify(r.name),
      name: r.name,
      description: r.description ?? "",
      htmlUrl: r.html_url,
      homepage: r.homepage || null,
      stars: r.stargazers_count ?? 0,
      forks: r.forks_count ?? 0,
      watchers: r.watchers_count ?? 0,
      language: r.language ?? null,
      topics: r.topics ?? [],
      license: r.license?.spdx_id ?? null,
      archived: r.archived ?? false,
      fork: r.fork ?? false,
      createdAt: r.created_at ?? "",
      updatedAt: r.updated_at ?? "",
      pushedAt: r.pushed_at ?? "",
      readmeSummary,
    });
    process.stdout.write(".");
  }
  process.stdout.write("\n");

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(out, null, 2), "utf8");
  console.log(`[sync] Wrote ${out.length} repos -> ${OUT_PATH}`);
}

main().catch((err) => {
  console.error("[sync] FAILED:", err);
  process.exit(1);
});
