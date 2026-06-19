import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/site.config";

/**
 * Closing call-to-action band — the page-level conversion close on pages that
 * don't otherwise end in a CTA (Home, Reviews). Config-driven copy; primary
 * action routes to the contact page, secondary is click-to-call.
 */
export default function CtaBand() {
  const { cta, business } = site;

  return (
    <section className="relative overflow-hidden bg-pine py-16 sm:py-20">
      <div className="field-rule absolute inset-x-0 top-0" />
      <div className="container-page relative text-center">
        <h2 className="h-display text-3xl text-birch sm:text-4xl">
          {cta.band.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-birch/75">
          {cta.band.sub}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={cta.href} className="btn-primary px-7 py-4 text-base">
            {cta.label}
          </Link>
          <a
            href={business.phoneHref}
            className="btn-ghost px-7 py-4 text-base"
            aria-label={`Call ${business.name} at ${business.phoneDisplay}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {business.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
