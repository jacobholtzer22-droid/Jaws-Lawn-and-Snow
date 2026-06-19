import { Check } from "lucide-react";
import Section from "./Section";
import { site } from "@/site.config";
import ImagePlaceholder from "./ImagePlaceholder";

/** `hideHeading` drops the eyebrow + title when a PageHeader already provides the page title. */
export default function WhyUs({ hideHeading = false }: { hideHeading?: boolean }) {
  const { whyUs, images } = site;

  return (
    <Section id="why-us" tone="birch">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Photo */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-pine/10">
          <ImagePlaceholder
            image={images[whyUs.imageKey]}
            sizes="(min-width: 1024px) 560px, 100vw"
          />
          {/* Mowing-stripe seam along the bottom edge — the brand motif. */}
          <div className="field-rule absolute inset-x-0 bottom-0" />
        </div>

        {/* Copy */}
        <div>
          {!hideHeading && (
            <>
              <p className="eyebrow mb-4">{whyUs.eyebrow}</p>
              <h2 className="h-display text-3xl text-pine sm:text-4xl">
                {whyUs.heading}
              </h2>
            </>
          )}
          <p className={`${hideHeading ? "" : "mt-4"} text-base text-loam/70`}>
            {whyUs.body}
          </p>

          <ul className="mt-7 space-y-3">
            {whyUs.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-center gap-3 text-[15px] font-medium text-loam"
              >
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sap/20 text-sap-dark">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                {bullet}
              </li>
            ))}
          </ul>

          <dl className="mt-9 grid grid-cols-3 gap-4 border-t border-pine/10 pt-7">
            {whyUs.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-xl font-extrabold text-pine sm:text-2xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-loam/55">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
