import type { MetadataRoute } from "next";
import { site } from "@/site.config";
import { locationHasProjects } from "@/lib/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.seo.url.replace(/\/$/, "");
  // /thanks is deliberately absent — it's noindexed.
  const routes = [
    "",
    "/services",
    ...site.serviceCategories.map((c) => `/services/${c.slug}`),
    "/about",
    "/reviews",
    "/contact",
    // Location pages join the sitemap only once they're indexable.
    ...site.locations
      .filter(locationHasProjects)
      .map((l) => `/service-areas/${l.slug}`),
  ];

  return routes.map((route) => ({
    url: `${base}${route || "/"}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
