import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import FaqList from "@/components/FaqList";
import ProjectPhotos from "@/components/ProjectPhotos";
import BeforeAfter from "@/components/BeforeAfter";
import QuoteButtons from "@/components/QuoteButtons";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { locationHasProjects, locationPhotos, locationPairs } from "@/lib/locations";
import { site } from "@/site.config";

type Params = { location: string };

export function generateStaticParams(): Params[] {
  return site.locations.map((l) => ({ location: l.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const loc = site.locations.find((l) => l.slug === params.location);
  if (!loc) return {};
  const title = `${loc.heading} | Jaws Lawn & Snow`;
  const description = loc.intro;
  const url = new URL(`/service-areas/${loc.slug}`, site.seo.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    // Held out of the index until real local proof exists — see site.locations.
    robots: locationHasProjects(loc)
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: site.business.name,
      type: "website",
      locale: "en_US",
      images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  };
}

export default function LocationPage({ params }: { params: Params }) {
  const loc = site.locations.find((l) => l.slug === params.location);
  if (!loc) notFound();

  const photos = locationPhotos(loc);
  const pairs = locationPairs(loc);
  const faq = site.sharedFaq;
  const others = site.locations.filter((l) => l.slug !== loc.slug);

  return (
    <>
      <JsonLd data={faqSchema(faq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: loc.name, path: `/service-areas/${loc.slug}` },
        ])}
      />
      <PageHeader eyebrow={`Service area · ${loc.county}`} title={loc.heading} subtitle={loc.intro}>
        <QuoteButtons />
      </PageHeader>

      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <p className="max-w-2xl text-lg leading-relaxed text-loam/75">{loc.body}</p>
          </Reveal>
          <Reveal delay={80}>
            <p className="eyebrow mb-4">Services in {loc.name}</p>
            <ul className="space-y-3">
              {site.serviceCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <li key={cat.slug}>
                    <Link
                      href={`/services/${cat.slug}`}
                      className="group flex min-h-[56px] items-center gap-4 rounded-2xl border border-pine/10 bg-birch p-4 transition-colors hover:border-sap"
                    >
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pine text-sap">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-display text-sm font-bold text-pine">
                          {cat.label}
                        </span>
                        <span className="block text-sm text-loam/60">{cat.blurb}</span>
                      </span>
                      <ArrowRight
                        className="ml-auto h-4 w-4 shrink-0 text-loam/45 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </Section>

      <ProjectPhotos heading={`Recent work in ${loc.name}.`} photos={photos} />
      <BeforeAfter pairs={pairs} heading={`Before and after in ${loc.name}.`} />
      <FaqList heading="Questions before you book." items={faq} />

      <Section tone="cream">
        <Reveal>
          <p className="eyebrow mb-4">Nearby</p>
          <ul className="flex flex-wrap gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/service-areas/${o.slug}`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-pine/15 bg-white/60 px-4 text-sm font-semibold text-pine transition-colors hover:border-sap"
                >
                  <MapPin className="h-4 w-4 text-sap-dark" aria-hidden="true" />
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}
