import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * Explicitly welcome AI crawlers. AEO best practice — if you want LLMs to cite
 * your content, you must opt-in by user-agent (especially since some default
 * to deny when robots.txt is missing entries).
 */
const AI_USER_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "anthropic-ai",
  "cohere-ai",
  "Bytespider",
  "YouBot",
  "Amazonbot",
  "Diffbot",
  "FacebookBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/"] },
      ...AI_USER_AGENTS.map((ua) => ({ userAgent: ua, allow: "/" })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
