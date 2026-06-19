"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import { site } from "@/site.config";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-pine/95 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        {/* Brand → home */}
        <Link
          href="/"
          className="flex items-center"
          aria-label={`${site.business.name} — home`}
        >
          {site.business.logo ? (
            <Image
              src={site.business.logo}
              alt={site.business.logoAlt}
              width={48}
              height={48}
              priority
              className="h-12 w-12 rounded-lg"
            />
          ) : (
            <span className="h-display text-xl text-birch sm:text-2xl">
              {site.business.shortName}
              <span className="text-sap">.</span>
            </span>
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {site.nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? "text-birch underline decoration-sap decoration-2 underline-offset-[10px]"
                    : "text-birch/75 hover:text-birch"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={site.business.phoneHref}
            className="hidden items-center gap-2 text-sm font-semibold text-birch transition-colors hover:text-sap sm:inline-flex"
          >
            <Phone className="h-4 w-4 text-sap" aria-hidden="true" />
            {site.business.phoneDisplay}
          </a>
          <Link href={site.cta.href} className="btn-primary hidden sm:inline-flex">
            {site.cta.label}
          </Link>

          {/* Mobile: call + menu */}
          <a
            href={site.business.phoneHref}
            className="btn-primary min-h-[44px] px-4 py-3 sm:hidden"
            aria-label={`Call ${site.business.name}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.cta.callShort}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-birch lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-t border-white/10 bg-pine/97 backdrop-blur lg:hidden"
        >
          <div className="container-page flex flex-col py-3">
            {site.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`border-b border-white/5 py-3 text-base font-medium transition-colors ${
                    active ? "text-sap" : "text-birch/80 hover:text-birch"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href={site.cta.href} className="btn-primary mt-4">
              {site.cta.label}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
