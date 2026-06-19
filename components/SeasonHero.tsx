"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Star } from "lucide-react";
import { site } from "@/site.config";
import type { SeasonKey } from "@/site.config";
import ImagePlaceholder from "./ImagePlaceholder";

/**
 * THE signature element: a season switch.
 * One accessible toggle flips the hero photo, headline, copy, accent, and CTA
 * between Summer (lawn) and Winter (snow) — stating the year-round promise in a
 * single interaction. Toggle buttons (aria-pressed), keyboard-operable, and the
 * crossfade is killed under prefers-reduced-motion (see globals.css).
 */
export default function SeasonHero() {
  const { hero, business, trust } = site;
  const [season, setSeason] = useState<SeasonKey>(hero.defaultSeason);

  const seasonKeys = Object.keys(hero.seasons) as SeasonKey[];
  const active = hero.seasons[season];
  const isWinter = season === "winter";

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-pine"
    >
      {/* Both season photos stacked; the active one crossfades in. */}
      <div className="absolute inset-0 -z-10">
        {seasonKeys.map((key) => {
          const isActive = key === season;
          return (
            <div
              key={key}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-500 ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              <ImagePlaceholder
                image={site.images[hero.seasons[key].imageKey]}
                sizes="100vw"
                priority={key === hero.defaultSeason}
                align="top"
              />
            </div>
          );
        })}

        {/* Legibility scrim — deep green pooling up from the bottom + left. */}
        <div className="absolute inset-0 bg-gradient-to-t from-loam via-loam/70 to-loam/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-loam/80 via-transparent to-transparent" />
        {/* Seasonal color cast (sap = summer, glacier = winter). */}
        <div
          className={`absolute inset-0 mix-blend-soft-light transition-colors duration-500 ${
            isWinter ? "bg-glacier/30" : "bg-sap/20"
          }`}
        />
        {/* Mowing-stripe texture, very subtle. */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(118deg, #ffffff 0 18px, transparent 18px 36px)",
          }}
        />
      </div>

      <div className="container-page w-full pb-16 pt-28 sm:pb-24">
        <div className="max-w-2xl">
          {/* The season switch */}
          <div
            role="group"
            aria-label={hero.switchLabel}
            className="mb-7 inline-flex items-center gap-1 rounded-full bg-loam/65 p-1 ring-1 ring-white/15 backdrop-blur"
          >
            {seasonKeys.map((key) => {
              const s = hero.seasons[key];
              const Icon = s.icon;
              const isActive = key === season;
              const activeClass =
                key === "winter"
                  ? "bg-glacier text-white"
                  : "bg-sap text-sap-deep";
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSeason(key)}
                  className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                    isActive
                      ? activeClass
                      : "text-birch/70 hover:text-birch"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {s.tabLabel}
                </button>
              );
            })}
          </div>

          {/* Copy re-animates on season change (disabled under reduced-motion). */}
          <div key={season} className="animate-fade-up">
            <p className="eyebrow mb-5 text-sap-light">{active.eyebrow}</p>

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
              <Link
                href={site.cta.href}
                className={`${isWinter ? "btn-snow" : "btn-primary"} px-7 py-4 text-base`}
              >
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
