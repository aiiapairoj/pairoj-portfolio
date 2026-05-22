import Link from "next/link";
import { siteConfig } from "@/lib/seo";

const links = [
  { href: "/", label: "หน้าแรก" },
  { href: "/about/", label: "เกี่ยวกับ" },
  { href: "/projects/", label: "โปรเจกต์" },
];

export default function Nav() {
  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur sticky top-0 z-40">
      <nav aria-label="หลัก" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight hover:opacity-80">
          {siteConfig.shortName}
          <span className="sr-only">— กลับหน้าแรก</span>
        </Link>
        <ul className="flex items-center gap-6 text-sm font-medium">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-blue-600 transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={siteConfig.author.github}
              target="_blank"
              rel="me noopener"
              className="hover:text-blue-600 transition-colors"
              aria-label="GitHub ของ Pairoj"
            >
              GitHub
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
