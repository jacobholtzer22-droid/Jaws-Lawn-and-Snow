import type { MetadataRoute } from "next";
import { site } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.seo.url.replace(/\/$/, "");
  const routes = ["", "/services", "/about", "/reviews", "/contact"];

  return routes.map((route) => ({
    url: `${base}${route || "/"}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
