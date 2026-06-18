import { Phone } from "lucide-react";
import { site } from "@/site.config";

/**
 * Mobile-only sticky bottom bar so the two highest-intent actions — call and
 * request a quote — are always within thumb reach (the sticky header only shows
 * Call). Hidden on lg+ where the header CTA + phone are persistently visible.
 * Config-driven: all labels come from site.config.ts. No CRM involvement.
 */
export default function MobileCtaBar() {
  return (
    <>
      {/* Reserve flow height so the fixed bar never covers the footer's last row.
       * Slightly taller than the bar and includes the safe-area inset so it clears
       * on notched phones too. */}
      <div
        aria-hidden="true"
        className="lg:hidden"
        style={{ height: "calc(76px + env(safe-area-inset-bottom))" }}
      />

      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-pine/95 backdrop-blur lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="container-page flex items-center gap-3 py-3">
          <a
            href={site.business.phoneHref}
            className="btn-ghost min-h-[48px] flex-1 px-4 py-3"
            aria-label={`Call ${site.business.name} at ${site.business.phoneDisplay}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.cta.callShort}
          </a>
          <a
            href="#contact"
            className="btn-primary min-h-[48px] flex-1 px-4 py-3"
          >
            {site.cta.label}
          </a>
        </div>
      </div>
    </>
  );
}
