/**
 * Schema.org JSON-LD builders. These power the AEO (Answer Engine Optimization) layer:
 * AI assistants prefer structured data over scraped HTML when summarizing or citing.
 */
import { siteConfig } from "./seo";
import type { Repo } from "./github";

const ID = {
  person: `${siteConfig.url}/#person`,
  website: `${siteConfig.url}/#website`,
};

export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": ID.person,
    name: "ไพโรจน์",
    alternateName: ["Pairoj", "aiiapairoj"],
    url: siteConfig.url,
    email: `mailto:${siteConfig.author.email}`,
    jobTitle: "นักพัฒนาเว็บ และ AI Automation Engineer",
    description: siteConfig.description,
    nationality: { "@type": "Country", name: "Thailand" },
    knowsLanguage: ["th", "en"],
    knowsAbout: [
      "PHP",
      "MySQL",
      "Next.js",
      "TypeScript",
      "AI Automation",
      "Claude Code",
      "Cyber Security",
      "OWASP",
      "Web Development",
    ],
    sameAs: [
      siteConfig.author.github,
      "https://github.com/aiiapairoj",
    ],
    image: `${siteConfig.url}/og-default.png`,
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ID.website,
    url: siteConfig.url,
    name: siteConfig.shortName,
    inLanguage: "th-TH",
    description: siteConfig.description,
    publisher: { "@id": ID.person },
    license: `https://creativecommons.org/licenses/by/4.0/`,
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteConfig.url}${item.url}`,
    })),
  };
}

export function buildItemListSchema(repos: Repo[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "โปรเจกต์ทั้งหมดของ ไพโรจน์",
    numberOfItems: repos.length,
    itemListElement: repos.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteConfig.url}/projects/${r.slug}/`,
      name: r.name,
    })),
  };
}

export function buildSoftwareSourceCodeSchema(repo: Repo) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: repo.name,
    description: repo.description || repo.readmeSummary.slice(0, 200) || repo.name,
    codeRepository: repo.htmlUrl,
    url: `${siteConfig.url}/projects/${repo.slug}/`,
    programmingLanguage: repo.language ?? undefined,
    keywords: repo.topics.length ? repo.topics.join(", ") : undefined,
    license: repo.license ? `https://spdx.org/licenses/${repo.license}.html` : undefined,
    dateCreated: repo.createdAt,
    dateModified: repo.pushedAt,
    author: { "@id": ID.person },
    isAccessibleForFree: true,
  };
}

export function buildFAQPageSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };
}

export function buildProfilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: { "@id": ID.person },
    inLanguage: "th-TH",
    url: `${siteConfig.url}/about/`,
  };
}
