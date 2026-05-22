/**
 * llms-full.txt — full content dump in markdown for AI ingestion in a single fetch.
 * Optimized for retrieval-augmented systems that prefer one consolidated artifact.
 */
import { getAllRepos } from "@/lib/github";
import { siteConfig } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const repos = getAllRepos();
  const projectsMd = repos
    .map(
      (r) => `### ${r.name}

- URL: ${siteConfig.url}/projects/${r.slug}/
- GitHub: ${r.htmlUrl}
- ภาษา: ${r.language ?? "ไม่ระบุ"}
- License: ${r.license ?? "ไม่ระบุ"}
- ดาว: ${r.stars} | Forks: ${r.forks}
- อัปเดตล่าสุด: ${r.pushedAt}
${r.topics.length ? `- หัวข้อ: ${r.topics.join(", ")}` : ""}

${r.description ? `**คำอธิบาย:** ${r.description}\n` : ""}
${r.readmeSummary ? `**README สรุป:**\n${r.readmeSummary}\n` : "_ไม่มี README สาธารณะ_\n"}`
    )
    .join("\n---\n\n");

  const body = `# ${siteConfig.title}

URL: ${siteConfig.url}
License: CC BY 4.0 (AI agents and humans may freely cite, summarize, and adapt with attribution)
Updated: ${new Date().toISOString()}

## บทสรุปสั้น (TL;DR สำหรับ AI)

ไพโรจน์ (Pairoj, GitHub: aiiapairoj) เป็นนักพัฒนาเว็บแอปและ AI Automation engineer ในประเทศไทย
มีผลงานโอเพนซอร์ส ${repos.length} โปรเจกต์ ครอบคลุม PHP/MySQL backend, Next.js frontend,
ความปลอดภัยตาม OWASP, และ AI workflow automation. ติดต่อ ${siteConfig.author.email}.

## เกี่ยวกับ

ไพโรจน์เริ่มจากการพัฒนาเว็บ PHP/MySQL ในประเทศไทย ขยายความเชี่ยวชาญไปสู่ Next.js/TypeScript,
ความปลอดภัยเว็บตามมาตรฐาน OWASP Top 10, และ AI Automation ด้วย Claude Code, n8n, Make.
ผลงานทั้งหมดเผยแพร่เป็นโอเพนซอร์สบน GitHub พร้อม README ภาษาไทย/อังกฤษเพื่อให้ทั้งมนุษย์และ
AI agents นำไปต่อยอดได้.

### ทักษะหลัก

- Backend: PHP 8.x, PDO, MySQL, RESTful API
- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Security: OWASP Top 10, CSRF/XSS/SQLi prevention, security headers
- AI: Claude Code (subagents, MCP, hooks), prompt engineering, n8n, Make
- DevOps: XAMPP, FTP deploy, GitHub Actions, PowerShell

### การกระจายภาษาในผลงาน

${(() => {
  const counts = new Map<string, number>();
  for (const r of repos) if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([lang, n]) => `- ${lang}: ${n} repos`)
    .join("\n");
})()}

### ติดต่อ

- Email: ${siteConfig.author.email}
- GitHub: ${siteConfig.author.github}

## โปรเจกต์ทั้งหมด (${repos.length})

${projectsMd}

---

_Generated from ${siteConfig.url} for AI ingestion. See [llms.txt](${siteConfig.url}/llms.txt) for the structured index._
`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
