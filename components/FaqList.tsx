import Section from "./Section";
import Reveal from "./Reveal";

type Item = { readonly q: string; readonly a: string };

/**
 * Native <details> accordion: keyboard and screen-reader friendly, and works
 * with JavaScript off. Pair with faqSchema() fed the SAME array so the visible
 * copy and the FAQPage markup can never drift.
 */
export default function FaqList({
  heading,
  items,
}: {
  heading: string;
  items: readonly Item[];
}) {
  if (items.length === 0) return null;
  return (
    <Section tone="birch">
      <Reveal className="max-w-3xl">
        <p className="eyebrow mb-4">Common questions</p>
        <h2 className="h-display text-3xl text-pine sm:text-4xl">{heading}</h2>
        <div className="mt-8 divide-y divide-pine/10 rounded-2xl border border-pine/10 bg-white/60">
          {items.map((item) => (
            <details key={item.q} className="group px-5 sm:px-6">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-base font-bold text-pine [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="text-xl leading-none text-sap-dark transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-5 text-[15px] leading-relaxed text-loam/70">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
