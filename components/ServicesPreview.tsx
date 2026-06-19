import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "./Section";
import ImagePlaceholder from "./ImagePlaceholder";
import { site } from "@/site.config";

/** Home-page services overview — one card per category, linking into /services. */
export default function ServicesPreview() {
  const { servicesIntro, serviceCategories } = site;

  return (
    <Section id="services-preview" tone="birch" className="stripe-wash">
      <div className="max-w-2xl">
        <p className="eyebrow mb-4">{servicesIntro.eyebrow}</p>
        <h2 className="h-display text-3xl text-pine sm:text-4xl">
          {servicesIntro.heading}
        </h2>
        <p className="mt-4 text-base text-loam/65">{servicesIntro.sub}</p>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {serviceCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <li key={cat.key}>
              <Link
                href={`/services#${cat.key}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-pine/10 bg-birch transition-colors hover:border-pine/25"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-pine">
                  <ImagePlaceholder
                    image={cat.image}
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-3 left-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-pine text-sap ring-2 ring-birch/90">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-bold text-pine">
                    {cat.label}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-loam/65">
                    {cat.blurb}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {cat.services.map((s) => (
                      <li
                        key={s.title}
                        className="flex items-center gap-2 text-sm text-loam/75"
                      >
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-sap"
                          aria-hidden="true"
                        />
                        {s.title}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sap-dark">
                    View {cat.label}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-10">
        <Link href="/services" className="btn-dark px-7 py-4 text-base">
          See all services
        </Link>
      </div>
    </Section>
  );
}
