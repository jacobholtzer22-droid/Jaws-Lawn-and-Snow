import Link from "next/link";
import { Check, Phone, MessageSquare } from "lucide-react";
import type { Metadata } from "next";
import Section from "@/components/Section";
import PhoneLink from "@/components/PhoneLink";
import { site } from "@/site.config";

/**
 * Conversion landing page. The Google Ads conversion is reported by
 * ContactForm the moment the CRM accepts the lead — this page is where the
 * customer lands afterwards, and gives Analytics a distinct URL to key on.
 * Noindexed: it should never appear in search, and no submitted detail is ever
 * put in the URL.
 */
export const metadata: Metadata = {
  ...(() => {
    const page = site.seo.pages.thanks;
    return { title: page.title, description: page.description };
  })(),
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  const { contact, business } = site;

  return (
    <Section tone="birch" className="pt-32 sm:pt-40">
      <div className="mx-auto max-w-xl text-center">
        <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-sap/20 text-sap-dark">
          <Check className="h-8 w-8" aria-hidden="true" />
        </span>
        <h1 className="h-display mt-7 text-4xl text-pine sm:text-5xl">
          {contact.successHeading}
        </h1>
        <p className="mt-4 text-base text-loam/70 sm:text-lg">
          {contact.successBody}
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <PhoneLink
            href={business.phoneHref}
            className="btn-primary px-7 py-4 text-base"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {business.phoneDisplay}
          </PhoneLink>
          <a href={contact.smsHref} className="btn-dark px-7 py-4 text-base">
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            {contact.textLabel}
          </a>
        </div>

        <p className="mt-8 text-sm text-loam/55">
          <Link
            href="/"
            className="font-semibold text-pine underline decoration-sap decoration-2 underline-offset-4"
          >
            Back to the home page
          </Link>
        </p>
      </div>
    </Section>
  );
}
