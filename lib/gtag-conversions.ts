/**
 * Google Ads conversion tracking.
 *
 * The tag itself is loaded once, sitewide, in app/layout.tsx. Everything here is
 * client-side only and degrades safely: if gtag never loads (SSR, an ad blocker,
 * a slow network) `reportConversion` quietly no-ops and still runs the callback,
 * so it can never block navigation or a form submit.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Google Ads tag ID (the gtag.js loader + config target). */
export const GOOGLE_ADS_ID = "AW-16904298088";

/** Conversion labels — the `send_to` value for each tracked action. */
export const CONVERSIONS = {
  quoteForm: "AW-16904298088/xDtACOrK8bUaEOi8zPw-",
  phoneClick: "AW-16904298088/QTMMCPj496QcEOi8zPw-",
} as const;

export type ConversionSendTo = (typeof CONVERSIONS)[keyof typeof CONVERSIONS];

/**
 * Report a Google Ads conversion. Fire-and-forget.
 *
 * @param sendTo   a value from CONVERSIONS
 * @param callback optional — run after the hit is sent (via gtag's
 *                 `event_callback`). Also invoked immediately when gtag is
 *                 unavailable, so callers that navigate afterwards never hang.
 */
export function reportConversion(sendTo: string, callback?: () => void): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    callback?.();
    return;
  }

  window.gtag("event", "conversion", {
    send_to: sendTo,
    ...(callback ? { event_callback: callback } : {}),
  });
}
