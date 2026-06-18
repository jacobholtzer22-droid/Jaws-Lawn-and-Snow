import { Star, Quote } from "lucide-react";
import { site } from "@/site.config";

export default function Reviews() {
  const { reviews } = site;
  const hasRating = reviews.rating != null;

  return (
    <section id="reviews" className="bg-loam py-20 text-birch sm:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4 text-sap-light">{reviews.eyebrow}</p>
          <h2 className="h-display text-3xl text-birch sm:text-4xl">
            {hasRating
              ? `Rated ${reviews.rating!.toFixed(1)} on ${reviews.source}.`
              : reviews.heading}
          </h2>
          {hasRating ? (
            <div
              className="mt-5 flex items-center justify-center gap-1"
              aria-label={`${reviews.rating!.toFixed(1)} out of 5 stars`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 fill-marigold text-marigold"
                  aria-hidden="true"
                />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-base text-birch/70">{reviews.sub}</p>
          )}
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {reviews.quotes.map((review, i) => {
            const hasQuote = review.quote.trim().length > 0;
            return (
              <figure
                key={i}
                className="flex flex-col rounded-2xl border border-white/10 bg-pine/40 p-7"
              >
                <Quote className="h-7 w-7 text-sap/70" aria-hidden="true" />
                {hasQuote ? (
                  <>
                    <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-birch">
                      “{review.quote}”
                    </blockquote>
                    <figcaption className="mt-5 text-sm font-semibold text-birch/80">
                      {review.author}
                      {review.context ? (
                        <span className="font-normal text-birch/55">
                          {" "}
                          · {review.context}
                        </span>
                      ) : null}
                    </figcaption>
                  </>
                ) : (
                  /* Placeholder — paste a real review in site.config.ts, never invent. */
                  <div className="mt-4 flex flex-1 flex-col justify-center rounded-xl border border-dashed border-birch/25 p-6 text-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-birch/70">
                      {reviews.placeholderLabel} {i + 1}
                    </span>
                    <span className="mt-1 text-xs text-birch/55">
                      {reviews.placeholderHint}
                    </span>
                  </div>
                )}
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
