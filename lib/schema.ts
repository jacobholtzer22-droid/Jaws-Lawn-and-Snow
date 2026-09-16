import { site } from "@/site.config";
import { DAY_ORDER } from "@/lib/format";

/**
 * Schema builders.
 *
 * RULE: every property here must be traceable to a value in site.config.ts.
 * Anything unconfirmed is OMITTED, never placeholdered. In particular there is
 * NO `address` or `geo` (Jaws is a service-area business with no public street
 * address), NO `aggregateRating` and NO `review` — Google's guidelines don't
 * allow a business to mark up its own reviews, and the visible review section
 * already carries them honestly.
 */

const ORIGIN = site.seo.url.replace(/\/$/, "");
const BUSINESS_ID = `${ORIGIN}/#business`;

const SCHEMA_DAY: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

function openingHours() {
  return DAY_ORDER.filter((key) => !site.hours[key].closed).map((key) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: SCHEMA_DAY[key],
    opens: site.hours[key].open,
    closes: site.hours[key].close,
  }));
}

/**
 * LandscapingBusiness — a real schema.org type:
 * Thing > Organization > LocalBusiness > HomeAndConstructionBusiness > LandscapingBusiness
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    "@id": BUSINESS_ID,
    name: site.business.name,
    url: `${ORIGIN}/`,
    telephone: site.business.phoneHref.replace("tel:", ""),
    description: site.seo.description,
    image: `${ORIGIN}${site.business.logo}`,
    logo: `${ORIGIN}${site.business.logo}`,
    // Service-area business: the towns served, NOT a physical address.
    areaServed: site.serviceArea.towns.map((town) => ({
      "@type": "City",
      name: town,
      containedInPlace: { "@type": "State", name: "Michigan" },
    })),
    openingHoursSpecification: openingHours(),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${site.business.name} services`,
      itemListElement: site.serviceCategories.map((cat) => ({
        "@type": "OfferCatalog",
        name: cat.label,
        url: `${ORIGIN}/services/${cat.slug}`,
        itemListElement: cat.services.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: service.title },
        })),
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${ORIGIN}/#website`,
    url: `${ORIGIN}/`,
    name: site.business.name,
    publisher: { "@id": BUSINESS_ID },
  };
}

type CategoryLike = {
  slug: string;
  label: string;
  intro: string;
  services: readonly { readonly title: string }[];
};

export function serviceSchema(cat: CategoryLike) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: cat.label,
    description: cat.intro,
    url: `${ORIGIN}/services/${cat.slug}`,
    provider: { "@id": BUSINESS_ID },
    areaServed: site.serviceArea.towns.map((town) => ({
      "@type": "City",
      name: town,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: cat.label,
      itemListElement: cat.services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.title },
      })),
    },
  };
}

type FaqLike = readonly { readonly q: string; readonly a: string }[];

/** FAQPage node. Feed it the exact array the page renders. */
export function faqSchema(items: FaqLike) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${ORIGIN}${c.path}`,
    })),
  };
}
