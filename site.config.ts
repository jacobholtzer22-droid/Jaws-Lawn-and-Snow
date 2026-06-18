/* =============================================================================
 * site.config.ts — SINGLE SOURCE OF TRUTH
 * -----------------------------------------------------------------------------
 * This is the ONLY file with business-specific content. Every component reads
 * from here — no business detail is hardcoded anywhere else. To spin up a
 * different client site on this exact codebase:
 *   1. Replace the values in this file.
 *   2. Drop new photos in /public/images and update `images` below.
 *   3. Swap the brand colors in tailwind.config.ts + the fonts in app/layout.tsx.
 * That's it — zero component edits.
 * ========================================================================== */

import type { LucideIcon } from "lucide-react";
import {
  Sprout,
  Scissors,
  Leaf,
  Flower2,
  Truck,
  Shovel,
  Sun,
  Snowflake,
} from "lucide-react";

/* ---- Types ----------------------------------------------------------------- */

export type SeasonKey = "summer" | "winter";

export type SiteImage = {
  /** Path under /public. Leave "" to render the role placeholder until the real photo lands. */
  src: string;
  /** Real, specific alt text — required for every image. */
  alt: string;
  /** Shown inside the placeholder box so it's obvious which photo goes here. */
  placeholderLabel: string;
};

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  /** Optional per-service photo. Unused by default (cards are icon-led). */
  image?: SiteImage;
};

export type Review = {
  /** Leave quote empty ("") to render a clearly-marked placeholder slot — never invent. */
  quote: string;
  author: string;
  /** e.g. "Google review" — shown under the author. */
  context?: string;
};

export type Stat = { value: string; label: string };

export type SeasonColumn = {
  key: SeasonKey;
  label: string;
  icon: LucideIcon;
  items: string[];
};

export type HeroSeason = {
  /** Label on the season switch. */
  tabLabel: string;
  icon: LucideIcon;
  eyebrow: string;
  /** Use "\n" to control line breaks. */
  headline: string;
  sub: string;
  primaryCta: string;
  /** Which key in `images` is the full-bleed hero for this season. */
  imageKey: "heroSummer" | "heroWinter";
};

export type DayHours = {
  /** 24h "HH:MM", or null when closed. */
  open: string | null;
  close: string | null;
  closed: boolean;
};

export type NavItem = { label: string; href: string };

/* ---- Config ---------------------------------------------------------------- */

export const site = {
  /* --- Identity --- */
  business: {
    name: "Jaws Lawn & Snow",
    shortName: "Jaws",
    tagline: "Lawn care & snow removal in Southeast Michigan",
    // TODO: confirm Joey's number for the lawn+snow line (reused from Jaws Detailing for now).
    phoneDisplay: "(734) 262-2365",
    phoneHref: "tel:+17342622365",
    region: "Southeast Michigan",
    email: "", // optional — add a public contact email if Joey wants one shown
  },

  /* --- Shared microcopy (buttons used in more than one place) --- */
  cta: {
    label: "Get a free quote", // header, services, etc.
    callShort: "Call", // mobile header button
  },

  /* --- Hero (THE signature: a season switch flips everything below) ---------
   * Two copy sets keyed to season. The active one is chosen in SeasonHero.tsx.
   * ----------------------------------------------------------------------- */
  hero: {
    defaultSeason: "summer" as SeasonKey,
    switchLabel: "Choose a season",
    seasons: {
      summer: {
        tabLabel: "Summer",
        icon: Sun,
        eyebrow: "Lawn care · Southeast Michigan",
        headline: "A lawn the\nneighbors notice.",
        sub: "Weekly mowing, clean edges, and tidy beds — handled on schedule, so your yard always looks like someone takes care of it. Because someone does.",
        primaryCta: "Get a free quote",
        imageKey: "heroSummer",
      },
      winter: {
        tabLabel: "Winter",
        icon: Snowflake,
        eyebrow: "Snow removal · Southeast Michigan",
        headline: "Plowed before\nyou're awake.",
        sub: "When the snow stops, we start. Driveways cleared, walkways shoveled, and salt down — so you get out on time no matter what fell overnight.",
        primaryCta: "Get on the snow list",
        imageKey: "heroWinter",
      },
    } satisfies Record<SeasonKey, HeroSeason>,
  },

  /* --- Trust strip (under the hero) ---
   * rating = null hides the star number entirely (honest until Joey's real
   * Google rating is confirmed). Set a number to show stars + "X.X on Google".
   */
  trust: {
    rating: null as number | null, // TODO: set Joey's real Google rating, or leave null
    ratingSource: "Google",
    points: [
      "Locally owned & fully insured",
      "Free, no-pressure quotes",
      "Lawn in summer, snow in winter",
    ],
  },

  /* --- Services intro + cards ---
   * Plain-language, customer's-side descriptions: what they GET, not jargon.
   */
  servicesIntro: {
    eyebrow: "What we do",
    heading: "Everything your property needs, all year.",
    sub: "Pick the services you want or hand us the whole property. Either way, it gets done right and on time.",
  },
  services: [
    {
      title: "Lawn Mowing",
      description:
        "Sharp, even cuts on a schedule that fits your yard. We mow, handle the clippings, and leave clean lines every single visit.",
      icon: Sprout,
    },
    {
      title: "Trimming & Edging",
      description:
        "Crisp edges along walks, drives, and beds, plus trimming around fences and trees — the details that make a yard look finished.",
      icon: Scissors,
    },
    {
      title: "Spring & Fall Cleanups",
      description:
        "Leaves, sticks, and winter mess cleared out so your lawn starts the season healthy and your beds look ready, not buried.",
      icon: Leaf,
    },
    {
      title: "Mulch & Bed Care",
      description:
        "Fresh mulch, weeded beds, and tidy borders that lock in moisture, hold back weeds, and make the whole yard pop.",
      icon: Flower2,
    },
    {
      title: "Snow Plowing",
      description:
        "Driveways and lots plowed fast after every storm, with markers set ahead of time so we protect your grass and your concrete.",
      icon: Truck,
    },
    {
      title: "Shoveling & Salting",
      description:
        "Walkways, steps, and entries cleared by hand and salted down, so no one slips on the way to the door.",
      icon: Shovel,
    },
  ] satisfies Service[],

  /* --- Two-season band (reinforces the year-round identity) --- */
  seasons: {
    eyebrow: "All year, one call",
    heading: "Two seasons. One crew you can count on.",
    sub: "The same trucks that keep your lawn sharp all summer clear your driveway all winter. Set it up once — we handle the rest, season after season.",
    columns: [
      {
        key: "summer",
        label: "Spring & Summer",
        icon: Sun,
        items: [
          "Weekly & biweekly mowing",
          "Edging, trimming & blowing",
          "Spring & fall cleanups",
          "Mulch & garden beds",
        ],
      },
      {
        key: "winter",
        label: "Fall & Winter",
        icon: Snowflake,
        items: [
          "Driveway & lot plowing",
          "Hand-shoveled walkways",
          "Salting & de-icing",
          "Storm-priority service",
        ],
      },
    ] satisfies SeasonColumn[],
  },

  /* --- Why us / about --- */
  whyUs: {
    eyebrow: "Why Jaws",
    heading: "Showing up is half the job. We do both halves.",
    body: "Plenty of crews will quote you. Fewer come back every week, answer the phone, and actually finish the edges. We're a local, owner-run crew that treats your property like our own — and we're here in January, not just July.",
    bullets: [
      "We show up when we say we will",
      "Locally owned and fully insured",
      "Flat, upfront pricing — no surprise add-ons",
      "The same crew that knows your property",
    ],
    imageKey: "about" as const,
    stats: [
      { value: "Year-round", label: "Lawn + snow, one crew" },
      { value: "Insured", label: "Fully covered, every job" },
      { value: "Local", label: "Owner-run, not a franchise" },
    ] satisfies Stat[],
  },

  /* --- Service area ---
   * TODO: replace with Joey's actual towns. These are SE-Michigan placeholders
   * near the 734 area so previews look populated — confirm before launch.
   */
  serviceArea: {
    eyebrow: "Service area",
    heading: "Proudly serving\nSoutheast Michigan.",
    note: "Don't see your town? Ask anyway — we cover most of Southeast Michigan and we're always adding stops.",
    cta: "See if we cover you",
    towns: [
      "Ann Arbor",
      "Ypsilanti",
      "Saline",
      "Canton",
      "Plymouth",
      "Belleville",
      "Dexter",
      "Chelsea",
      "Milan",
    ],
  },

  /* --- Reviews / social proof ---
   * Quotes are intentionally EMPTY placeholders — do not invent. Paste 2 real
   * review quotes + author first names when Joey provides them. rating = null
   * keeps the section honest (no star number) until a real rating is confirmed.
   */
  reviews: {
    rating: null as number | null, // TODO: set Joey's real Google rating, or leave null
    source: "Google",
    eyebrow: "Reviews",
    heading: "Word gets around.",
    sub: "We let the work — and our customers — do the talking.",
    placeholderLabel: "Review coming soon",
    placeholderHint: "Paste a real Google review in site.config.ts",
    quotes: [
      { quote: "", author: "", context: "Google review" },
      { quote: "", author: "", context: "Google review" },
    ] satisfies Review[],
  },

  /* --- Hours ---
   * TODO: confirm Joey's real hours. Seeded with typical lawn/snow hours.
   * (Winter storms are handled outside posted hours — see contact copy.)
   */
  hours: {
    monday: { open: "07:00", close: "18:00", closed: false },
    tuesday: { open: "07:00", close: "18:00", closed: false },
    wednesday: { open: "07:00", close: "18:00", closed: false },
    thursday: { open: "07:00", close: "18:00", closed: false },
    friday: { open: "07:00", close: "18:00", closed: false },
    saturday: { open: "08:00", close: "15:00", closed: false },
    sunday: { open: null, close: null, closed: true },
  } as Record<string, DayHours>,

  /* --- Photo manifest ---
   * Maps each photo to a role. Set `src` once the real file is in /public/images.
   * While `src` is "", the site shows a labeled placeholder — no component edits
   * needed to swap photos in. See PHOTOS.md.
   */
  images: {
    heroSummer: {
      src: "", // -> /images/hero-lawn.jpg
      alt: "Freshly mowed green lawn with clean mowing stripes in front of a Southeast Michigan home",
      placeholderLabel: "Hero (summer) — striped green lawn, the strongest shot",
    },
    heroWinter: {
      src: "", // -> /images/hero-snow.jpg
      alt: "A residential driveway plowed clear of snow on a bright winter morning",
      placeholderLabel: "Hero (winter) — freshly plowed driveway",
    },
    about: {
      src: "", // -> /images/crew.jpg
      alt: "Jaws crew member mowing a tidy residential lawn beside the work truck",
      placeholderLabel: "About — the crew / truck at work",
    },
  } satisfies Record<string, SiteImage>,

  /* --- CRM wiring (do not improvise — see ContactForm.tsx) ---
   * Values come from env so a different deploy = different tenant, no code change.
   */
  crm: {
    url:
      process.env.NEXT_PUBLIC_CRM_URL ||
      "https://www.alignandacquire.com/api/contact",
    businessSlug: process.env.NEXT_PUBLIC_BUSINESS_SLUG || "REPLACE_ME_FRIDAY",
  },

  /* --- Contact section + form copy --- */
  contact: {
    eyebrow: "Get a quote",
    heading: "Get your free quote.",
    sub: "Tell us your address and what you need — lawn, snow, or both. We'll text you back fast with a price and the next open slot.",
    callOrTextLabel: "Call or text",
    infoLines: [
      "Prefer to type? Fill out the form and we'll text you right back.",
      "Booking snow now for the season — get on the route before the first storm.",
    ],
    form: {
      nameLabel: "Name",
      namePlaceholder: "Your name",
      phoneLabel: "Phone",
      phonePlaceholder: "(734) 000-0000",
      emailLabel: "Email",
      emailOptionalLabel: "(optional)",
      emailPlaceholder: "you@email.com",
      messageLabel: "What do you need?",
      messagePlaceholder:
        "Your address, the service you want (lawn, snow, or both), and anything we should know.",
      submitLabel: "Get my free quote",
      submittingLabel: "Sending…",
    },
    consentLabel:
      "I agree to receive text messages from Jaws Lawn & Snow about my request. Message and data rates may apply. Reply STOP to opt out.",
    successHeading: "Got it — thanks!",
    successBody:
      "We'll reach out shortly with your quote and the next open slot. Need it sooner? Call or text us directly.",
    errorLead: "Something went wrong sending that. Please call or text us at",
  },

  /* --- Nav (anchor links on a single page) --- */
  nav: [
    { label: "Services", href: "#services" },
    { label: "Year-round", href: "#seasons" },
    { label: "Why us", href: "#why-us" },
    { label: "Service area", href: "#service-area" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavItem[],

  /* --- SEO --- */
  seo: {
    title:
      "Jaws Lawn & Snow — Lawn Care & Snow Removal in Southeast Michigan",
    description:
      "Lawn care in summer, snow removal in winter — one local, insured crew for your whole property in Southeast Michigan. Mowing, cleanups, plowing, and salting. Get a free quote.",
    url: "https://jawslawnandsnow.com", // TODO: confirm final domain
  },

  /* --- Footer --- */
  footer: {
    credit: "Site by Align and Acquire",
    exploreLabel: "Explore",
    hoursLabel: "Hours",
    rightsText: "All rights reserved.",
  },
} as const;

export type Site = typeof site;
