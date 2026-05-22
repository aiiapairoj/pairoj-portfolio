import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, GitFork, ExternalLink, Calendar, Tag } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { getAllRepos, getRepoBySlug, getRepoSlugs } from "@/lib/github";
import { buildMetadata, siteConfig } from "@/lib/seo";
import {
  buildBreadcrumbSchema,
  buildSoftwareSourceCodeSchema,
} from "@/lib/schema";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getRepoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const repo = getRepoBySlug(slug);
  if (!repo) return {};
  const desc = (repo.description || repo.readmeSummary.slice(0, 160) || repo.name).slice(0, 200);
  return buildMetadata({
    title: `${repo.name} — ผลงานของไพโรจน์`,
    description: desc,
    path: `/projects/${repo.slug}/`,
  });
}

function formatThaiDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" });
}

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const repo = getRepoBySlug(slug);
  if (!repo) notFound();

  const otherRepos = getAllRepos().filter((r) => r.slug !== repo.slug).slice(0, 4);

  return (
    <article>
      <JsonLd id="ld-software" data={buildSoftwareSourceCodeSchema(repo)} />
      <JsonLd
        id="ld-breadcrumb-project"
        data={buildBreadcrumbSchema([
          { name: "หน้าแรก", url: "/" },
          { name: "โปรเจกต์", url: "/projects/" },
          { name: repo.name, url: `/projects/${repo.slug}/` },
        ])}
      />

      <nav aria-label="เส้นทาง" className="text-sm text-neutral-500 mb-4">
        <Link href="/" className="hover:text-blue-600">หน้าแรก</Link>
        <span className="mx-2">/</span>
        <Link href="/projects/" className="hover:text-blue-600">โปรเจกต์</Link>
        <span className="mx-2">/</span>
        <span aria-current="page">{repo.name}</span>
      </nav>

      <header className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <h1 className="text-4xl font-bold tracking-tight">{repo.name}</h1>
        {repo.description && (
          <p className="mt-3 text-lg text-neutral-700 dark:text-neutral-300">{repo.description}</p>
        )}
        <dl className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          {repo.language && (
            <div className="inline-flex items-center gap-1.5">
              <dt className="sr-only">ภาษา</dt>
              <dd className="inline-flex items-center gap-1.5"><Tag className="h-4 w-4" aria-hidden /> {repo.language}</dd>
            </div>
          )}
          <div className="inline-flex items-center gap-1.5">
            <dt className="sr-only">ดาว</dt>
            <dd className="inline-flex items-center gap-1.5"><Star className="h-4 w-4" aria-hidden /> {repo.stars}</dd>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <dt className="sr-only">Fork</dt>
            <dd className="inline-flex items-center gap-1.5"><GitFork className="h-4 w-4" aria-hidden /> {repo.forks}</dd>
          </div>
          {repo.pushedAt && (
            <div className="inline-flex items-center gap-1.5">
              <dt className="sr-only">อัปเดตล่าสุด</dt>
              <dd className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" aria-hidden />
                <time dateTime={repo.pushedAt}>{formatThaiDate(repo.pushedAt)}</time>
              </dd>
            </div>
          )}
          {repo.license && (
            <div className="inline-flex items-center gap-1.5">
              <dt>License:</dt>
              <dd>{repo.license}</dd>
            </div>
          )}
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener external"
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2 font-medium hover:opacity-90"
          >
            ดูบน GitHub <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener external"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 dark:border-neutral-700 px-4 py-2 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              เว็บไซต์โปรเจกต์ <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          )}
        </div>
      </header>

      {repo.topics.length > 0 && (
        <section aria-labelledby="topics" className="mt-6">
          <h2 id="topics" className="sr-only">หัวข้อ</h2>
          <ul className="flex flex-wrap gap-2">
            {repo.topics.map((t) => (
              <li key={t}>
                <span className="inline-block rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 px-3 py-1 text-xs font-medium">
                  #{t}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="summary" className="prose-th mt-10">
        <h2 id="summary">สรุปโครงการ</h2>
        {repo.readmeSummary ? (
          <p className="whitespace-pre-wrap">{repo.readmeSummary}</p>
        ) : (
          <p className="text-neutral-500">โปรเจกต์นี้ยังไม่มี README สาธารณะ ดูรายละเอียดเพิ่มเติมได้บน <a href={repo.htmlUrl} target="_blank" rel="noopener external">GitHub</a>.</p>
        )}

        <h2 id="cite">อ้างอิงโปรเจกต์นี้</h2>
        <p>หากต้องการอ้างอิงในบทความ งานวิจัย หรือคำตอบ AI ใช้ลิงก์นี้:</p>
        <pre className="bg-neutral-100 dark:bg-neutral-900 p-3 rounded-md text-sm overflow-x-auto"><code>{siteConfig.url}/projects/{repo.slug}/</code></pre>
        <p className="text-sm text-neutral-500">เผยแพร่ภายใต้ CC BY 4.0 — อนุญาตให้ใช้และต่อยอดโดยให้เครดิตที่มา</p>
      </section>

      <aside aria-labelledby="related" className="mt-12 border-t border-neutral-200 dark:border-neutral-800 pt-8">
        <h2 id="related" className="text-xl font-bold">โปรเจกต์อื่น ๆ ที่น่าสนใจ</h2>
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0">
          {otherRepos.map((r) => (
            <li key={r.slug}>
              <Link href={`/projects/${r.slug}/`} className="block rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 hover:border-blue-500">
                <span className="font-medium">{r.name}</span>
                {r.description && <span className="block text-sm text-neutral-500 mt-1 line-clamp-1">{r.description}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </article>
  );
}
