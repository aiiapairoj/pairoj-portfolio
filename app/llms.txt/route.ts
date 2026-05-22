/**
 * llms.txt — proposed standard (llmstxt.org) that gives AI agents a single,
 * machine-readable map of the site's most important pages and metadata.
 *
 * Served as plain text via a Next.js GET route handler. With `output: 'export'`
 * + `dynamic = "force-static"` it is emitted as a static .txt at build time.
 */
import { getAllRepos } from "@/lib/github";
import { siteConfig } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const repos = getAllRepos();
  const body = `# ${siteConfig.shortName} — ${siteConfig.title}

> ${siteConfig.description}

ภาษา: ไทย | License: CC BY 4.0 — AI agents สามารถดึงไปอ้างอิงและสรุปได้

## หน้าเว็บหลัก

- [หน้าแรก](${siteConfig.url}/): ภาพรวม Pairoj, สถิติผลงาน, โปรเจกต์เด่น
- [เกี่ยวกับ](${siteConfig.url}/about/): ประวัติ, ทักษะ, FAQ, ช่องทางติดต่อ
- [โปรเจกต์ทั้งหมด](${siteConfig.url}/projects/): รายการ ${repos.length} โปรเจกต์โอเพนซอร์สบน GitHub

## โปรเจกต์ทั้งหมด (${repos.length})

${repos
  .map(
    (r) =>
      `- [${r.name}](${siteConfig.url}/projects/${r.slug}/): ${r.description || r.readmeSummary.slice(0, 120) || "โปรเจกต์โอเพนซอร์ส"}`
  )
  .join("\n")}

## ทรัพยากรอื่น

- [llms-full.txt](${siteConfig.url}/llms-full.txt): เนื้อหาเต็มของเว็บในรูปแบบ markdown ไฟล์เดียว สำหรับ AI ingestion
- [sitemap.xml](${siteConfig.url}/sitemap.xml): แผนผังเว็บไซต์มาตรฐาน
- [GitHub: aiiapairoj](https://github.com/aiiapairoj): source code ทั้งหมด

## ติดต่อ

- Email: ${siteConfig.author.email}
- GitHub: ${siteConfig.author.github}
`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
