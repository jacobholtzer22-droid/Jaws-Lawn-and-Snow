"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, PaintRoller, Car, ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";

/**
 * One-time, dismissible cross-promo popup for the owner's sister companies
 * (Jaws Painting, Jaws Auto Detailing). Shows once per visitor — after a short
 * delay or on exit intent, whichever comes first — then never again (localStorage).
 * Purely additive UI: no effect on forms, tracking, SEO, or business data.
 */
const STORAGE_KEY = "jaws-sister-sites-seen-v1";
const SHOW_DELAY_MS = 7000;
const ICONS = [PaintRoller, Car] as const;

export default function SisterSitesPopup() {
  const { sisterSites } = site;
  const [open, setOpen] = useState(false);
  const shownRef = useRef(false); // ensures we only ever open once per session

  const reveal = useCallback(() => {
    if (shownRef.current) return;
    shownRef.current = true;
    setOpen(true);
  }, []);

  const dismiss = useCallback(() => {
    shownRef.current = true; // block any late exit-intent re-open
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* private mode / storage blocked — fine, it just may show again next visit */
    }
  }, []);

  // Arm the triggers once, only for visitors who haven't seen it.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let seen = false;
    try {
      seen = window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (seen) return;

    const timer = window.setTimeout(reveal, SHOW_DELAY_MS);
    // Desktop exit intent: cursor leaves through the top of the viewport.
    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) reveal();
    };
    document.addEventListener("mouseout", onMouseOut);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [reveal]);

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

  if (!open) return null;

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
