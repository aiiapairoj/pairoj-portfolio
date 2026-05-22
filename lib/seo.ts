/**
 * Site-wide SEO/AEO/GEO constants and metadata factory.
 * Update `siteConfig.url` before deploying to production.
 */
export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pairoj.com",
  shortName: "Pairoj",
  title: "ไพโรจน์ (Pairoj) — นักพัฒนา PHP, AI Automation & Security",
  description:
    "พอร์ตโฟลิโอส่วนตัวของไพโรจน์ — นักพัฒนาเว็บ PHP, AI Automation, และความปลอดภัยไซเบอร์ในประเทศไทย รวม 29 โปรเจกต์โอเพนซอร์สจาก GitHub",
  keywords: [
    "Pairoj",
    "ไพโรจน์",
    "นักพัฒนา PHP",
    "AI Automation",
    "Security",
    "พอร์ตโฟลิโอ",
    "portfolio",
    "Thai developer",
    "GitHub aiiapairoj",
    "Next.js",
    "Cyber Security",
    "Web Development",
  ],
  author: {
    name: "ไพโรจน์ (Pairoj)",
    email: "pairoj.vrh@gmail.com",
    github: "https://github.com/aiiapairoj",
  },
  contentLicense: "CC-BY-4.0",
} as const;

import type { Metadata } from "next";

export function buildMetadata(input: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const url = `${siteConfig.url}${input.path.startsWith("/") ? input.path : `/${input.path}`}`;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: {
      type: "article",
      locale: "th_TH",
      url,
      siteName: siteConfig.shortName,
      title: input.title,
      description: input.description,
      images: [{ url: input.ogImage ?? "/og-default.png", width: 1200, height: 630, alt: input.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [input.ogImage ?? "/og-default.png"],
    },
  };
}
