import Link from "next/link";
import Section from "./Section";
import ImagePlaceholder from "./ImagePlaceholder";
import { site } from "@/site.config";

/** `hideHeading` drops the intro block when a PageHeader already provides the page title. */
export default function Services({ hideHeading = false }: { hideHeading?: boolean }) {
  const { servicesIntro, services, cta } = site;

  return (
    <Section id="services" tone="birch" className="stripe-wash">
      {!hideHeading && (
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">{servicesIntro.eyebrow}</p>
          <h2 className="h-display text-3xl text-pine sm:text-4xl">
            {servicesIntro.heading}
          </h2>
          <p className="mt-4 text-base text-loam/65">{servicesIntro.sub}</p>
        </div>
      )}

      <ul
        className={`${
          hideHeading ? "" : "mt-12"
        } grid gap-6 sm:grid-cols-2 lg:grid-cols-3`}
      >
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <li
              key={service.title}
              className="group overflow-hidden rounded-2xl border border-pine/10 bg-birch transition-colors hover:border-pine/25"
            >
              {/* Photo banner — labeled placeholder until the real photo lands. */}
              <div className="relative aspect-[16/10] overflow-hidden bg-pine">
                {service.image && (
                  <ImagePlaceholder
                    image={service.image}
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                )}
                {/* Brand icon badge, overlaid bottom-left. */}
                <span className="absolute bottom-3 left-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-pine text-sap ring-2 ring-birch/90">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-display text-lg font-bold tracking-tight text-pine">
                  {service.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-loam/65">
                  {service.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-10">
        <Link href={cta.href} className="btn-dark px-7 py-4 text-base">
          {cta.label}
        </Link>
      </div>
    </Section>
  );
}
