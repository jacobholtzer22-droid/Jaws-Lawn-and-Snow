import Link from "next/link";
import { MapPin } from "lucide-react";
import Section from "./Section";
import { site } from "@/site.config";

export default function ServiceArea() {
  const { serviceArea, cta } = site;

  return (
    <Section id="service-area" tone="cream">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
        <div>
          <p className="eyebrow mb-4">{serviceArea.eyebrow}</p>
          <h2 className="h-display text-3xl text-pine sm:text-4xl">
            {serviceArea.heading.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-4 max-w-md text-base text-loam/65">
            {serviceArea.note}
          </p>
          <Link href={cta.href} className="btn-dark mt-7 px-7 py-4 text-base">
            {serviceArea.cta}
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {serviceArea.towns.map((town) => (
            <li
              key={town}
              className="flex items-center gap-2.5 rounded-xl border border-pine/10 bg-white/50 px-4 py-3.5 text-[15px] font-medium text-loam"
            >
              <MapPin
                className="h-4 w-4 shrink-0 text-sap-dark"
                aria-hidden="true"
              />
              {town}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
