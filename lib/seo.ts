import type { Metadata } from "next";
import { site } from "@/site.config";

type PageKey = keyof typeof site.seo.pages;

/** Service-category keys live under /services/<slug>; everything else is /<key>. */
const CATEGORY_SLUGS = new Set(site.serviceCategories.map((c) => c.slug as string));

export function pagePath(key: PageKey): string {
  if (key === "home") return "/";
  if (CATEGORY_SLUGS.has(key)) return `/services/${key}`;
  return `/${key}`;
}

/* Sitewide share image. Repeated on every page because Next replaces the whole
 * `openGraph` object rather than merging it with the layout's. */
const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: `${site.business.name} — lawn care and snow removal`,
};

/** Per-route metadata (title/description/canonical/OG/Twitter) from site.config.ts. */
export function pageMetadata(key: PageKey): Metadata {
  const page = site.seo.pages[key];
  const url = new URL(pagePath(key), site.seo.url).toString();

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: site.business.name,
      type: "website",
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [OG_IMAGE.url],
    },
  };
}
