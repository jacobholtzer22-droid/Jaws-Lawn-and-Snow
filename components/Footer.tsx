import { Phone, MapPin } from "lucide-react";
import { site } from "@/site.config";
import { DAY_ORDER, dayLabel, formatDayHours } from "@/lib/format";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-loam-deep text-birch">
      <div className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand + contact */}
          <div className="lg:col-span-2">
            <div className="h-display text-2xl text-birch">
              {site.business.name}
              <span className="text-sap">.</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-birch/60">
              {site.business.tagline}.
            </p>
            <a
              href={site.business.phoneHref}
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 font-display text-lg font-bold text-birch transition-colors hover:text-sap"
            >
              <Phone className="h-5 w-5 text-sap" aria-hidden="true" />
              {site.business.phoneDisplay}
            </a>
            <p className="mt-3 flex items-center gap-2 text-sm text-birch/60">
              <MapPin className="h-4 w-4 text-sap" aria-hidden="true" />
              {site.business.region}
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-birch/55">
              {site.footer.exploreLabel}
            </h2>
            <ul className="mt-2 space-y-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-birch/75 transition-colors hover:text-birch"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hours */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-birch/55">
              {site.footer.hoursLabel}
            </h2>
            <ul className="mt-4 space-y-1.5 text-sm">
              {DAY_ORDER.map((key) => (
                <li
                  key={key}
                  className="flex justify-between gap-4 text-birch/75"
                >
                  <span>{dayLabel(key)}</span>
                  <span className="text-birch/55">
                    {formatDayHours(site.hours[key])}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-birch/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.business.name}. {site.footer.rightsText}
          </p>
          <p>{site.footer.credit}</p>
        </div>
      </div>
    </footer>
  );
}
