import Link from "next/link";
import Section from "./Section";
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
        } grid gap-px overflow-hidden rounded-2xl border border-pine/10 bg-pine/10 sm:grid-cols-2 lg:grid-cols-3`}
      >
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <li
              key={service.title}
              className="group flex flex-col gap-4 bg-birch p-7 transition-colors hover:bg-birch-dark"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-pine text-sap">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-bold tracking-tight text-pine">
                {service.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-loam/65">
                {service.description}
              </p>
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
