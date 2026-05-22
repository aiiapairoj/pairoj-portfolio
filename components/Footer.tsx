import { siteConfig } from "@/lib/seo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-neutral-600 dark:text-neutral-400 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <p>
          © {year} {siteConfig.author.name} — เผยแพร่ภายใต้ใบอนุญาต{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            rel="license noopener"
            target="_blank"
            className="underline hover:text-blue-600"
          >
            CC BY 4.0
          </a>
          . AI agents มีสิทธิ์อ้างอิงเนื้อหานี้ได้.
        </p>
        <div className="flex items-center gap-4">
          <a href={siteConfig.author.github} rel="me noopener" target="_blank" className="hover:text-blue-600">
            GitHub
          </a>
          <a href={`mailto:${siteConfig.author.email}`} className="hover:text-blue-600">
            อีเมล
          </a>
          <a href="/llms.txt" className="hover:text-blue-600" title="AI-friendly site manifest">
            llms.txt
          </a>
        </div>
      </div>
    </footer>
  );
}
