import Link from "next/link";
import { Phone, Star } from "lucide-react";
import { site } from "@/site.config";
import ImagePlaceholder from "./ImagePlaceholder";

/**
 * Hero — a single static hero. (The summer/winter season switch was removed per
 * the client; the year-round story now lives in the "Two seasons" band below.)
 */
export default function SeasonHero() {
  const { hero, business, trust } = site;
  const active = hero.seasons[hero.defaultSeason];
  const heroImage = site.images[active.imageKey];

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-pine"
    >
      {/* Full-bleed hero photo + legibility scrim (weighted to the bottom-left). */}
      <div className="absolute inset-0 -z-10">
        <ImagePlaceholder image={heroImage} sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-loam/95 via-loam/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-loam/55 via-transparent to-transparent" />
      </div>

      <div className="container-page w-full pb-16 pt-28 sm:pb-24">
        <div className="max-w-2xl animate-fade-up">
          <p className="eyebrow mb-5 text-birch">{active.eyebrow}</p>

          <h1 className="h-display text-4xl text-birch sm:text-6xl lg:text-7xl">
            {active.headline.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-xl text-base text-birch/85 sm:text-lg">
            {active.sub}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={site.cta.href} className="btn-primary px-7 py-4 text-base">
              {active.primaryCta}
            </Link>
            <a
              href={business.phoneHref}
              className="btn-ghost px-7 py-4 text-base"
              aria-label={`Call ${business.name} at ${business.phoneDisplay}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {business.phoneDisplay}
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-birch/75">
            {trust.rating != null && (
              <span className="inline-flex items-center gap-1.5 font-semibold text-birch">
                <span className="flex" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-marigold text-marigold"
                    />
                  ))}
                </span>
                {trust.rating.toFixed(1)} on {trust.ratingSource}
              </span>
            )}
            {trust.points.map((p) => (
              <span key={p} className="inline-flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-sap"
                  aria-hidden="true"
                />
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
