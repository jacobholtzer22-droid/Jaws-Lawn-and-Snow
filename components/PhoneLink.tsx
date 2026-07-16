"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { CONVERSIONS, reportConversion } from "@/lib/gtag-conversions";

type Props = ComponentPropsWithoutRef<"a"> & { href: string };

/**
 * A `tel:` link that reports the Google Ads phone-click conversion.
 *
 * Renders a plain <a> with whatever props it's given, so markup and styling are
 * identical to a hand-written anchor. The click is never intercepted — the
 * conversion is fire-and-forget and the tel: navigation proceeds as normal.
 *
 * This exists as a small client island so server components (SeasonHero,
 * CtaBand, Contact, Footer) can keep a tracked phone link without themselves
 * becoming client components.
 */
export default function PhoneLink({ href, onClick, children, ...rest }: Props) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    reportConversion(CONVERSIONS.phoneClick);
    onClick?.(e);
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
