import Link from "next/link";
import { Star, GitFork, Code2 } from "lucide-react";
import type { Repo } from "@/lib/github";

export default function ProjectCard({ repo }: { repo: Repo }) {
  return (
    <article className="relative border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 hover:border-blue-500 dark:hover:border-blue-500 transition-colors h-full flex flex-col">
      <header>
        <h3 className="text-lg font-semibold leading-tight">
          <Link href={`/projects/${repo.slug}/`} className="hover:text-blue-600 after:absolute after:inset-0">
            {repo.name}
          </Link>
        </h3>
      </header>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 grow">
        {repo.description || repo.readmeSummary.slice(0, 140) || "ยังไม่มีคำอธิบาย"}
      </p>
      <footer className="mt-4 flex items-center gap-4 text-xs text-neutral-500">
        {repo.language && (
          <span className="inline-flex items-center gap-1">
            <Code2 className="h-3.5 w-3.5" aria-hidden /> {repo.language}
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Star className="h-3.5 w-3.5" aria-hidden /> {repo.stars}
        </span>
        <span className="inline-flex items-center gap-1">
          <GitFork className="h-3.5 w-3.5" aria-hidden /> {repo.forks}
        </span>
      </footer>
    </article>
  );
}
