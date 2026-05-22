import ProjectCard from "@/components/ProjectCard";
import JsonLd from "@/components/JsonLd";
import { getAllRepos } from "@/lib/github";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema, buildItemListSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "โปรเจกต์โอเพนซอร์สทั้งหมดของไพโรจน์",
  description:
    "รวมโปรเจกต์โอเพนซอร์ส 29 รายการจาก GitHub aiiapairoj — เว็บแอป PHP, เครื่องมือ AI Automation, security checklist และอื่น ๆ",
  path: "/projects/",
});

export default function ProjectsPage() {
  const repos = [...getAllRepos()].sort(
    (a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime()
  );

  return (
    <article>
      <JsonLd id="ld-itemlist" data={buildItemListSchema(repos)} />
      <JsonLd
        id="ld-breadcrumb-projects"
        data={buildBreadcrumbSchema([
          { name: "หน้าแรก", url: "/" },
          { name: "โปรเจกต์", url: "/projects/" },
        ])}
      />

      <header>
        <p className="text-sm text-blue-600 font-medium">ผลงานทั้งหมด</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          โปรเจกต์โอเพนซอร์ส ({repos.length})
        </h1>
        <p className="mt-3 text-lg text-neutral-700 dark:text-neutral-300 max-w-3xl">
          โปรเจกต์ทั้งหมดอัปเดตจาก GitHub <code>aiiapairoj</code> เรียงจากที่ push ล่าสุด — ดู source code, ดาว, และคำอธิบายสั้น
          กดที่ชื่อโปรเจกต์เพื่อดูรายละเอียดเต็ม.
        </p>
      </header>

      <section aria-labelledby="all-projects" className="mt-10">
        <h2 id="all-projects" className="sr-only">รายการทั้งหมด</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0">
          {repos.map((repo) => (
            <li key={repo.slug}>
              <ProjectCard repo={repo} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
