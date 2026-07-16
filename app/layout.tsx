import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import Script from "next/script";
import { site } from "@/site.config";
import { GOOGLE_ADS_ID } from "@/lib/gtag-conversions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";
import "./globals.css";

/* Display: Bricolage Grotesque — an expressive, slightly characterful grotesque.
 * Loaded variable (wght axis) so headings can run extra-bold. Not the trades default. */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-display",
  display: "swap",
});

/* Body: Figtree — a warm, round, highly legible humanist sans. Not Inter. */
const body = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: {
    default: site.seo.title,
    template: "%s",
  },
  description: site.seo.description,
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#103257",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-birch font-body text-loam antialiased">
        {/* Google tag (gtag.js) — loaded once, sitewide, for Google Ads
         * conversion tracking. Conversions are reported via lib/gtag-conversions. */}
        <Script
          id="gtag-loader"
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config','${GOOGLE_ADS_ID}');
          `}
        </Script>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-pine focus:px-4 focus:py-2 focus:font-semibold focus:text-birch"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
