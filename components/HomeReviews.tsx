import Link from "next/link";
import { Star, Quote } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { site } from "@/site.config";

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="inline-flex" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${className} fill-marigold text-marigold`} />
      ))}
    </span>
  );
}

/**
 * Home-page social proof: a few real Google reviews sitting directly above the
 * quote CTA, where the decision actually gets made. Quotes come from
 * site.reviews.quotes — the same verified set the Reviews page uses. Nothing is
 * written here; a review that isn't in the config doesn't exist.
 */
export default function HomeReviews() {
  const { reviews, cta } = site;
  const featured = reviews.home.featured
    .map((i) => reviews.quotes[i])
    .filter((r) => r && r.quote.trim().length > 0);

  if (featured.length === 0) return null;

  const hasRating = reviews.rating != null;

  return (
    <Section id="reviews" tone="birch">
      <Reveal className="max-w-2xl">
        <p className="eyebrow mb-4">{reviews.home.eyebrow}</p>
        <h2 className="h-display text-3xl text-pine sm:text-4xl">
          {reviews.home.heading}
        </h2>

        {hasRating && (
          <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-base text-loam/70">
            <Stars className="h-5 w-5" />
            {/* The rating itself is the link — people click the stars. */}
            <a
              href={reviews.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-pine underline decoration-sap decoration-2 underline-offset-4 transition-colors hover:text-sap-dark"
            >
              {reviews.rating!.toFixed(1)} on {reviews.source}
            </a>
            <span className="text-loam/55">· {reviews.reviewCount} reviews</span>
          </p>
        )}
      </Reveal>

      <ul className="mt-10 grid gap-6 lg:grid-cols-3">
        {featured.map((review, i) => (
          <Reveal
            as="li"
            key={review.author}
            delay={Math.min(i, 4) * 70}
            className="flex flex-col rounded-2xl border border-pine/10 bg-birch p-7 shadow-card"
          >
            <div className="flex items-center justify-between">
              <Stars />
              <Quote className="h-6 w-6 text-sap/60" aria-hidden="true" />
            </div>
            <blockquote className="mt-4 flex-1 text-[17px] leading-relaxed text-loam">
              “{review.quote}”
            </blockquote>
            <p className="mt-5 text-sm font-semibold text-pine">
              {review.author}
              {review.context ? (
                <span className="font-normal text-loam/55"> · {review.context}</span>
              ) : null}
            </p>
          </Reveal>
        ))}
      </ul>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link href={cta.href} className="btn-primary px-7 py-4 text-base">
          {cta.label}
        </Link>
        <a
          href={reviews.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-dark px-7 py-4 text-base"
        >
          {reviews.readAllLabel}
        </a>
      </div>
    </Section>
  );
}
