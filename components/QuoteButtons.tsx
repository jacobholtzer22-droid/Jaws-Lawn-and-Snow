import Link from "next/link";
import { Phone } from "lucide-react";
import PhoneLink from "./PhoneLink";
import { site } from "@/site.config";

/** Primary quote CTA + tracked call link, for use directly under a page header. */
export default function QuoteButtons({ className = "" }: { className?: string }) {
  const { cta, business } = site;
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <Link href={cta.href} className="btn-primary px-7 py-4 text-base">
        {cta.label}
      </Link>
      <PhoneLink
        href={business.phoneHref}
        className="btn-ghost px-7 py-4 text-base"
        aria-label={`Call ${business.name} at ${business.phoneDisplay}`}
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        {business.phoneDisplay}
      </PhoneLink>
    </div>
  );
}
