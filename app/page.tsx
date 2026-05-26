import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { getFeaturedRepos, getAllRepos, getLanguageStats } from "@/lib/github";
import { buildMetadata, siteConfig } from "@/lib/seo";

export const metadata = buildMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  const featured = getFeaturedRepos(6);
  const total = getAllRepos().length;
  const stats = getLanguageStats();

  return (
    <>
      <Hero />

      <section aria-labelledby="stats-heading" className="py-12 border-b border-neutral-200 dark:border-neutral-800">
        <h2 id="stats-heading" className="text-2xl font-bold">สรุปผลงานโดยย่อ</h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          ตัวเลขจาก GitHub สาธารณะ <code className="text-sm">aiiapairoj</code> ที่ดึงตอน build เว็บไซต์.
        </p>
        <dl className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
            <dt className="text-xs uppercase text-neutral-500">โปรเจกต์โอเพนซอร์ส</dt>
            <dd className="mt-1 text-3xl font-bold">{total}</dd>
          </div>
          {stats.slice(0, 3).map((s) => (
            <div key={s.language} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
              <dt className="text-xs uppercase text-neutral-500">ภาษา {s.language}</dt>
              <dd className="mt-1 text-3xl font-bold">{s.count}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="featured-heading" className="py-12">
        <div className="flex items-baseline justify-between">
          <h2 id="featured-heading" className="text-2xl font-bold">โปรเจกต์เด่น</h2>
          <Link href="/projects/" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            ดูทั้งหมด ({total}) →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((repo) => (
            <ProjectCard key={repo.slug} repo={repo} />
          ))}
        </div>
      </section>

      <section aria-labelledby="about-quick" className="py-12 border-t border-neutral-200 dark:border-neutral-800">
        <h2 id="about-quick" className="text-2xl font-bold">ไพโรจน์ทำอะไรบ้าง?</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 prose-th">
          <article>
            <h3>พัฒนาเว็บแอป PHP/MySQL</h3>
            <p>สร้างระบบหลังบ้าน เช่น CRM, Service Desk, School SMS — เน้นความปลอดภัย (CSRF, XSS, SQL Injection prevention).</p>
          </article>
          <article>
            <h3>AI Automation</h3>
            <p>ใช้ Claude Code, n8n, และ Make เชื่อม AI เข้ากับ workflow จริง ลดเวลางาน manual ลง 60-80%.</p>
          </article>
          <article>
            <h3>Cyber Security</h3>
            <p>ตรวจประเมินช่องโหว่ตาม OWASP Top 10 และ Agentic Skills Top 10 — มี security checklist เป็นโอเพนซอร์ส.</p>
          </article>
        </div>
      </section>
    </>
  );
}
