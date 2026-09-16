"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X, PaintRoller, Car, ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";

/**
 * Cross-promo popup for the owner's sister companies (Jaws Painting, Jaws Auto
 * Detailing). Tuned so it never gets between a lawn/snow visitor and the offer
 * they came for:
 *
 * - Waits 25s, or until the visitor has scrolled halfway down the page. Desktop
 *   (fine pointer) can also trigger on exit intent. Whichever comes first.
 * - Shows at most once every 30 days per browser.
 * - Never on the quote form (/contact) or the thank-you page (/thanks).
 * - Never for paid Google Ads visitors: a gclid/gbraid/wbraid or a paid
 *   utm_medium on the landing URL suppresses it for 30 days, so the visitor
 *   keeps seeing it hidden as they browse to other pages.
 */
const SEEN_KEY = "jaws-sister-sites-seen-at";
const PAID_KEY = "jaws-paid-visitor-at";
const SUPPRESS_MS = 30 * 24 * 60 * 60 * 1000;
const SHOW_DELAY_MS = 25_000;
const SCROLL_TRIGGER = 0.5; // fraction of the scrollable page
const EXCLUDED_PATHS = ["/contact", "/thanks"];
const PAID_PARAMS = ["gclid", "gbraid", "wbraid"];
const PAID_MEDIUMS = ["cpc", "ppc", "paid", "paidsearch", "paid_search"];
const ICONS = [PaintRoller, Car] as const;

function readTime(key: string): number {
  try {
    const v = Number(window.localStorage.getItem(key));
    return Number.isFinite(v) ? v : 0;
  } catch {
    return 0;
  }
}

function writeNow(key: string) {
  try {
    window.localStorage.setItem(key, String(Date.now()));
  } catch {
    /* storage blocked — the in-memory guard still prevents repeats this page */
  }
}

function isPaidLanding(): boolean {
  const params = new URLSearchParams(window.location.search);
  if (PAID_PARAMS.some((p) => params.has(p))) return true;
  const medium = (params.get("utm_medium") || "").toLowerCase();
  return PAID_MEDIUMS.includes(medium);
}

function isExcluded(path: string | null): boolean {
  if (!path) return false;
  const clean = path.replace(/\/$/, "") || "/";
  return EXCLUDED_PATHS.includes(clean);
}

export default function SisterSitesPopup() {
  const { sisterSites } = site;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const shownRef = useRef(false); // once per page load, even if storage is blocked

  const reveal = useCallback(() => {
    if (shownRef.current) return;
    shownRef.current = true;
    writeNow(SEEN_KEY); // start the 30-day window the moment it's shown
    setOpen(true);
  }, []);

  const dismiss = useCallback(() => {
    shownRef.current = true;
    setOpen(false);
  }, []);

  // Navigating to an excluded page closes it if it's somehow open.
  useEffect(() => {
    if (isExcluded(pathname)) setOpen(false);
  }, [pathname]);

  // Arm the triggers on each page, only when the visitor is eligible.
  useEffect(() => {
    if (typeof window === "undefined" || shownRef.current) return;

    // Visitors who dismissed the old once-ever version keep that dismissal,
    // re-dated so it now expires after 30 days like everyone else's.
    try {
      if (window.localStorage.getItem("jaws-sister-sites-seen-v1") === "1") {
        window.localStorage.removeItem("jaws-sister-sites-seen-v1");
        writeNow(SEEN_KEY);
      }
    } catch {
      /* ignore */
    }

    if (isPaidLanding()) writeNow(PAID_KEY);
    const now = Date.now();
    if (now - readTime(PAID_KEY) < SUPPRESS_MS) return;
    if (now - readTime(SEEN_KEY) < SUPPRESS_MS) return;
    if (isExcluded(pathname)) return;

    const timer = window.setTimeout(reveal, SHOW_DELAY_MS);

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= SCROLL_TRIGGER) reveal();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Exit intent only makes sense with a mouse; touch devices never fire it
    // meaningfully and would otherwise get false triggers.
    const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) reveal();
    };
    if (hasMouse) document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [pathname, reveal]);

  // While open: Esc to close + lock background scroll.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, dismiss]);

  if (!open || isExcluded(pathname)) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sister-sites-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={dismiss}
        className="absolute inset-0 cursor-default bg-loam/60 backdrop-blur-sm motion-safe:animate-fade-in"
      />

      {/* Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-birch shadow-panel motion-safe:animate-fade-up">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full text-loam/50 transition-colors hover:bg-loam/5 hover:text-loam focus-visible:outline-offset-4"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="p-6 sm:p-8">
          <p className="eyebrow mb-2">Also from the Jaws crew</p>
          <h2
            id="sister-sites-title"
            className="h-display text-2xl text-pine sm:text-3xl"
          >
            {sisterSites.heading}
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-loam/65">
            {sisterSites.sub}
          </p>

          <div className="mt-6 space-y-3">
            {sisterSites.items.map((s, i) => {
              const Icon = ICONS[i] ?? ArrowUpRight;
              return (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-pine/10 bg-birch-deep px-4 py-4 shadow-card transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-pine/25 hover:shadow-card-hover active:scale-[0.99]"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pine text-sap">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5 font-display text-base font-bold text-pine">
                      {s.name}
                      <ArrowUpRight
                        className="h-4 w-4 text-sap transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-0.5 block text-sm text-loam/60">
                      {s.service}
                    </span>
                  </span>
                </a>
              );
            })}
          </div>

          <button
            type="button"
            onClick={dismiss}
            className="mt-5 w-full text-center text-sm font-semibold text-loam/45 transition-colors hover:text-loam"
          >
            No thanks — I&apos;m here for lawn &amp; snow
          </button>
        </div>
      </div>
    </div>
  );
}
