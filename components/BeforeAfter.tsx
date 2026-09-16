import Image from "next/image";
import Section from "./Section";
import Reveal from "./Reveal";
import { site } from "@/site.config";

type Pair = (typeof site.beforeAfter)[number];

/**
 * Before-and-after sets from site.beforeAfter. Each pair must be the SAME
 * property. Renders nothing when there are no pairs — no mock-ups, no stock.
 */
export default function BeforeAfter({
  pairs = site.beforeAfter,
  heading = "Before and after.",
}: {
  pairs?: readonly Pair[];
  heading?: string;
}) {
  if (pairs.length === 0) return null;
  return (
    <Section tone="birch">
      <Reveal>
        <p className="eyebrow mb-4">Before &amp; after</p>
        <h2 className="h-display text-3xl text-pine sm:text-4xl">{heading}</h2>
      </Reveal>
      <ul className="mt-10 space-y-10">
        {pairs.map((pair, i) => (
          <Reveal as="li" key={pair.after.src} delay={Math.min(i, 4) * 60}>
            <div className="grid gap-4 sm:grid-cols-2">
              {(["before", "after"] as const).map((side) => (
                <figure key={side} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-pine/10 bg-pine">
                  <Image
                    src={pair[side].src}
                    alt={pair[side].alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-pine/90 px-3 py-1 text-xs font-semibold capitalize text-birch">
                    {side}
                  </span>
                </figure>
              ))}
            </div>
            <p className="mt-3 text-sm font-semibold text-pine">
              {pair.city ? `${pair.service} in ${pair.city}` : pair.service}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
