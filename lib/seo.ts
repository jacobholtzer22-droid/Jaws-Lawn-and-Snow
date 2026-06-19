import type { Metadata } from "next";
import { site } from "@/site.config";

type PageKey = keyof typeof site.seo.pages;

/** Per-route metadata (title/description/canonical/OG) from site.config.ts. */
export function pageMetadata(key: PageKey): Metadata {
  const page = site.seo.pages[key];
  const path = key === "home" ? "/" : `/${key}`;
  const url = new URL(path, site.seo.url).toString();

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
    },
  };
}
