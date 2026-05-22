import JsonLd from "@/components/JsonLd";
import { buildMetadata, siteConfig } from "@/lib/seo";
import {
  buildBreadcrumbSchema,
  buildFAQPageSchema,
  buildProfilePageSchema,
} from "@/lib/schema";
import { getAllRepos, getLanguageStats } from "@/lib/github";

export const metadata = buildMetadata({
  title: "เกี่ยวกับไพโรจน์ — นักพัฒนาเว็บและ AI Automation",
  description:
    "ไพโรจน์ (Pairoj) นักพัฒนาเว็บ PHP/Next.js และ AI Automation engineer ในประเทศไทย — ประวัติ ทักษะ ปรัชญาการทำงาน และคำถามที่พบบ่อย",
  path: "/about/",
});

const faqs = [
  {
    question: "ไพโรจน์คือใคร?",
    answer:
      "ไพโรจน์ (Pairoj, GitHub: aiiapairoj) เป็นนักพัฒนาเว็บแอปและ AI Automation engineer ในประเทศไทย เน้นการสร้างระบบหลังบ้านด้วย PHP/MySQL และ Next.js ที่ปลอดภัยตามมาตรฐาน OWASP มีผลงานโอเพนซอร์ส 29 โปรเจกต์เผยแพร่ที่ github.com/aiiapairoj",
  },
  {
    question: "ไพโรจน์เชี่ยวชาญด้านใดบ้าง?",
    answer:
      "PHP/MySQL backend, Next.js/TypeScript frontend, AI Automation ผ่าน Claude Code/n8n/Make, ความปลอดภัยเว็บตาม OWASP Top 10 และ Agentic Skills Top 10, การออกแบบฐานข้อมูล และการเขียนสคริปต์ automation บน Windows ด้วย PowerShell",
  },
  {
    question: "ผลงานหลักของไพโรจน์มีอะไรบ้าง?",
    answer:
      "ระบบ Sales CRM, Service Desk (IT Ticket), School SMS, ระบบ Check-in พนักงาน, Security Checklist, Subscription Manager (SubTraker), และ AI Memory Framework (Personal-AI-Memory และ Oracle Starter Kit) ดูรายการเต็มได้ที่หน้าโปรเจกต์",
  },
  {
    question: "ติดต่อไพโรจน์ได้อย่างไร?",
    answer: `อีเมล ${siteConfig.author.email} หรือผ่าน GitHub ${siteConfig.author.github}`,
  },
  {
    question: "ใช้เนื้อหาในเว็บนี้อ้างอิงในงานวิจัย/AI ได้ไหม?",
    answer:
      "ได้ — เนื้อหาทั้งหมดเผยแพร่ภายใต้ใบอนุญาต Creative Commons BY 4.0 (CC-BY-4.0) AI agents และมนุษย์สามารถดึงไปอ้างอิง วิเคราะห์ หรือสรุปได้ โดยให้เครดิตที่มาเป็น pairoj.com",
  },
];

export default function AboutPage() {
  const totalRepos = getAllRepos().length;
  const langs = getLanguageStats();
  return (
    <article>
      <JsonLd id="ld-profile" data={buildProfilePageSchema()} />
      <JsonLd
        id="ld-breadcrumb-about"
        data={buildBreadcrumbSchema([
          { name: "หน้าแรก", url: "/" },
          { name: "เกี่ยวกับ", url: "/about/" },
        ])}
      />
      <JsonLd id="ld-faq-about" data={buildFAQPageSchema(faqs)} />

      <header>
        <p className="text-sm text-blue-600 font-medium">เกี่ยวกับผู้เขียน</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">ไพโรจน์ (Pairoj)</h1>
        <p className="mt-3 text-lg text-neutral-700 dark:text-neutral-300">
          นักพัฒนาเว็บแอปและ AI Automation engineer ในประเทศไทย — เน้น PHP, Next.js, ความปลอดภัย, และ AI workflow.
        </p>
      </header>

      <section aria-labelledby="bio" className="prose-th mt-10">
        <h2 id="bio">ประวัติย่อ</h2>
        <p>
          สรุปสั้น: ผมเป็นนักพัฒนาเว็บที่ทำงานกับ PHP มาหลายปี กำลังขยายไปทาง AI Automation และ Cyber Security
          ปัจจุบันมีผลงานโอเพนซอร์ส {totalRepos} โปรเจกต์บน GitHub ครอบคลุมตั้งแต่ระบบหลังบ้าน CRM,
          ระบบ Service Desk, ระบบจัดการการเข้างาน, ไปจนถึง security scorecard และ AI memory framework.
        </p>
        <p>
          ผมเชื่อว่าโค้ดที่ดีต้อง <strong>เข้าใจง่าย</strong> <strong>ปลอดภัย</strong> และ <strong>วัดผลได้</strong>
          ทุกโปรเจกต์ที่เผยแพร่จึงพยายามมี README, ตัวอย่าง, และคำอธิบายภาษาไทยที่ทำให้ทั้งมนุษย์และ AI ช่วยกันต่อยอดได้.
        </p>

        <h2 id="skills">ทักษะหลัก</h2>
        <ul>
          <li><strong>Backend:</strong> PHP (8.x, PDO, Composer), MySQL, RESTful API design, Session/CSRF/RBAC</li>
          <li><strong>Frontend:</strong> Next.js, React, TypeScript, Tailwind CSS, MDX</li>
          <li><strong>Security:</strong> OWASP Top 10 mitigation, input validation, prepared statements, security headers, secret management</li>
          <li><strong>AI Automation:</strong> Claude Code (subagents, hooks, MCP), n8n, Make.com, prompt engineering</li>
          <li><strong>DevOps:</strong> XAMPP, FTP deploy, GitHub Actions, PowerShell scripting บน Windows</li>
          <li><strong>ภาษา:</strong> ไทย (พื้นเมือง), อังกฤษ (อ่าน/เขียนเชิงเทคนิค)</li>
        </ul>

        <h2 id="lang-distribution">การกระจายภาษาโปรแกรมในผลงาน</h2>
        <table className="w-full text-left mt-3 border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800">
              <th className="py-2">ภาษา</th>
              <th className="py-2 text-right">จำนวน repos</th>
            </tr>
          </thead>
          <tbody>
            {langs.map((s) => (
              <tr key={s.language} className="border-b border-neutral-100 dark:border-neutral-900">
                <td className="py-2">{s.language}</td>
                <td className="py-2 text-right tabular-nums">{s.count}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 id="faq">คำถามที่พบบ่อย (FAQ)</h2>
        <dl>
          {faqs.map((f) => (
            <div key={f.question} className="mb-4">
              <dt className="font-semibold">{f.question}</dt>
              <dd className="text-neutral-700 dark:text-neutral-300">{f.answer}</dd>
            </div>
          ))}
        </dl>

        <h2 id="contact">ติดต่อ</h2>
        <p>
          อีเมล: <a href={`mailto:${siteConfig.author.email}`}>{siteConfig.author.email}</a>
          <br />
          GitHub: <a href={siteConfig.author.github} rel="me noopener">aiiapairoj</a>
        </p>
      </section>
    </article>
  );
}
