import { Check } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { site } from "@/site.config";

/**
 * The two-season band — the year-round identity, stated plainly.
 * Summer column accents in Sap (lawn), winter column in Glacier (snow).
 */
export default function Seasons() {
  const { seasons } = site;

  return (
    <Section id="seasons" tone="pine">
      <Reveal className="max-w-2xl">
        <p className="eyebrow mb-4 text-birch">{seasons.eyebrow}</p>
        <h2 className="h-display text-3xl text-birch sm:text-4xl">
          {seasons.heading}
        </h2>
        <p className="mt-4 text-base text-birch/75">{seasons.sub}</p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {seasons.columns.map((col, i) => {
          const Icon = col.icon;
          const isWinter = col.key === "winter";
          const accentText = isWinter ? "text-glacier-light" : "text-sap-light";
          const chipBg = isWinter ? "bg-glacier/20" : "bg-sap/20";
          const chipText = isWinter ? "text-glacier-light" : "text-sap-light";
          return (
            <Reveal
              key={col.key}
              delay={i * 90}
              className="rounded-2xl border border-white/10 bg-loam/40 p-7 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${chipBg} ${chipText}`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className={`font-display text-xl font-bold ${accentText}`}>
                  {col.label}
                </h3>
              </div>
              <ul className="mt-6 space-y-3">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-[15px] text-birch/90"
                  >
                    <Check
                      className={`h-5 w-5 shrink-0 ${accentText}`}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
