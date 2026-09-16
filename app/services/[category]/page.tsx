import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import FaqList from "@/components/FaqList";
import ProjectPhotos from "@/components/ProjectPhotos";
import BeforeAfter from "@/components/BeforeAfter";
import QuoteButtons from "@/components/QuoteButtons";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { site } from "@/site.config";
import { pageMetadata } from "@/lib/seo";

type Params = { category: string };

export function generateStaticParams(): Params[] {
  return site.serviceCategories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const cat = site.serviceCategories.find((c) => c.slug === params.category);
  // `cat.slug` is one of the literal category slugs, which are exactly the
  // category keys in site.seo.pages — the find() just widens it to string.
  if (!cat) return {};
  return pageMetadata(cat.slug as Parameters<typeof pageMetadata>[0]);
}

export default function ServiceCategoryPage({ params }: { params: Params }) {
  const cat = site.serviceCategories.find((c) => c.slug === params.category);
  if (!cat) notFound();

  const others = site.serviceCategories.filter((c) => c.slug !== cat.slug);
  // One array feeds both the visible FAQ and the FAQPage schema.
  const faq = [...cat.faq, ...site.sharedFaq];
  const photos = cat.projectPhotos
    .map((src) => site.work.photos.find((p) => p.src === src))
    .filter((p): p is (typeof site.work.photos)[number] => Boolean(p));
  const pairs = site.beforeAfter.filter((p) => p.category === cat.slug);

  return (
    <>
      <JsonLd data={serviceSchema(cat)} />
      <JsonLd data={faqSchema(faq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: cat.label, path: `/services/${cat.slug}` },
        ])}
      />
      <PageHeader eyebrow="Services" title={cat.label} subtitle={cat.intro}>
        <QuoteButtons />
      </PageHeader>

      {/* What's included */}
      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-4">What&apos;s included</p>
            <h2 className="h-display text-3xl text-pine sm:text-4xl">
              {cat.label}, start to finish.
            </h2>
            <p className="mt-4 max-w-md text-base text-loam/65">
              {site.business.servingLine}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <ul className="space-y-3 rounded-2xl border border-pine/10 bg-white/60 p-6 sm:p-8">
              {cat.included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-loam">
                  <span
                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sap/20 text-sap-dark"
                    aria-hidden="true"
                  >
                    <Check className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="birch" className="stripe-wash">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cat.services.map((service, i) => {
            const Icon = service.icon;
            const image = "image" in service ? service.image : undefined;
            return (
              <Reveal
                as="li"
                key={service.title}
                delay={Math.min(i, 4) * 70}
                className="group flex flex-col overflow-hidden rounded-2xl border border-pine/10 bg-birch shadow-card transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-pine/20 hover:shadow-card-hover"
              >
                {/* No photo band at all when no real photo exists — never a
                    stock image, never an empty coloured box. */}
                {image ? (
                  <div className="relative aspect-[16/10] overflow-hidden bg-pine">
                    <ImagePlaceholder
                      image={image}
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      className="transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute bottom-3 left-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-pine text-sap ring-2 ring-birch/90">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                ) : null}

                <div className="flex flex-1 flex-col p-6">
                  {!image && (
                    <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-pine text-sap">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                  <h2 className="font-display text-lg font-bold tracking-tight text-pine">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-loam/65">
                    {service.description}
                  </p>
                  {"points" in service && service.points ? (
                    <ul className="mt-4 space-y-2">
                      {service.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-sm text-loam/75"
                        >
                          <span
                            className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sap/20 text-sap-dark"
                            aria-hidden="true"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link href={site.cta.href} className="btn-primary px-7 py-4 text-base">
            {site.cta.label}
          </Link>
          <Link href="/services" className="btn-dark px-7 py-4 text-base">
            See all services
          </Link>
        </div>
      </Section>

      <ProjectPhotos heading={`Recent ${cat.label.toLowerCase()} projects.`} photos={photos} />
      <BeforeAfter pairs={pairs} />
      <FaqList heading={`${cat.label} questions.`} items={faq} />

      {/* Service area */}
      <Section tone="cream">
        <Reveal>
          <p className="eyebrow mb-4">Service area</p>
          <h2 className="h-display text-3xl text-pine sm:text-4xl">
            {cat.label} near you.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-loam/65">
            {site.business.servingLine}
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {site.locations.map((loc) => (
              <li key={loc.slug}>
                <Link
                  href={`/service-areas/${loc.slug}`}
                  className="inline-flex min-h-[44px] items-center rounded-full border border-pine/15 bg-white/60 px-4 text-sm font-semibold text-pine transition-colors hover:border-sap"
                >
                  {loc.name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Other categories */}
      <Section tone="cream">
        <Reveal>
          <p className="eyebrow mb-6">More from Jaws</p>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((other, i) => {
            const OIcon = other.icon;
            return (
              <Reveal as="li" key={other.slug} delay={Math.min(i, 4) * 60}>
                <Link
                  href={`/services/${other.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-pine/10 bg-birch p-5 transition-[transform,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-sap"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pine text-sap">
                    <OIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm font-bold tracking-tight text-pine">
                    {other.label}
                  </span>
                  <ArrowRight
                    className="ml-auto h-4 w-4 text-loam/45 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
