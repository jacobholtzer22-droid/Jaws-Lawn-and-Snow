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
  Layers,
  Trees,
  Axe,
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
  /** Optional service video (mp4). Renders the photo as a poster + click-to-play. */
  video?: string;
  /** Optional highlight bullets — shown in the featured service block. */
  points?: string[];
};

export type ServiceCategory = {
  key: string;
  label: string;
  blurb: string;
  icon: LucideIcon;
  /** Representative photo for the Home category card. */
  image: SiteImage;
  /** Render as a large featured block (e.g. a single service with a video) instead of a card grid. */
  featured?: boolean;
  services: Service[];
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
    // Brand logo (square lockup). Set to "" to fall back to the text wordmark.
    logo: "/images/logo.png",
    logoAlt: "Jaws Lawn & Snow — Michigan",
  },

  /* --- Shared microcopy (buttons used in more than one place) --- */
  cta: {
    label: "Get a free quote", // header, services, etc.
    callShort: "Call", // mobile header button
    href: "/contact", // where every primary CTA points
    band: {
      // Closing call-to-action band (Home + Reviews pages).
      heading: "Ready to hand it off?",
      sub: "Get a fast, free quote — lawn, snow, or both. No pressure, no obligation.",
    },
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
        eyebrow: "Lawn care & snow removal · Southeast Michigan",
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
    rating: 5.0 as number | null, // all visible Google reviews are 5★ — confirm exact figure
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
  serviceCategories: [
    {
      key: "lawn",
      label: "Lawn Care",
      blurb:
        "Weekly mowing, crisp edges, and seasonal cleanups that keep your yard sharp.",
      icon: Sprout,
      image: {
        src: "/images/service-mowing.jpg",
        alt: "A large lawn with fresh mowing stripes",
        placeholderLabel: "Lawn care — striped lawn",
      },
      services: [
        {
          title: "Lawn Mowing",
          description:
            "Sharp, even cuts on a schedule that fits your yard. We mow, handle the clippings, and leave clean lines every single visit.",
          icon: Sprout,
          image: {
            src: "/images/service-mowing.jpg",
            alt: "View across a large lawn with fresh mowing stripes from behind the mower",
            placeholderLabel: "Lawn mowing — striped, freshly cut lawn",
          },
        },
        {
          title: "Trimming & Edging",
          description:
            "Crisp edges along walks, drives, and beds, plus trimming around fences and trees — the details that make a yard look finished.",
          icon: Scissors,
          image: {
            src: "/images/service-edging.jpg",
            alt: "A front lawn cut in clean stripes with crisp edges along the driveway and walkway",
            placeholderLabel: "Trimming & edging — crisp lawn border",
          },
        },
        {
          title: "Spring & Fall Cleanups",
          description:
            "Leaves, sticks, and winter mess cleared out so your lawn starts the season healthy and your beds look ready, not buried.",
          icon: Leaf,
          image: {
            src: "/images/service-cleanup.jpg",
            alt: "A freshly cut lawn in autumn with fallen leaves scattered along the edges",
            placeholderLabel: "Cleanups — clearing fall leaves",
          },
        },
      ],
    },
    {
      key: "landscaping",
      label: "Landscaping",
      blurb:
        "Beds, walls, and plantings that give the whole property structure and curb appeal.",
      icon: Flower2,
      image: {
        src: "/images/service-mulch.jpg",
        alt: "A freshly mulched bed with a river-rock border and shaped shrubs at a wooded property",
        placeholderLabel: "Landscaping — beds & borders",
      },
      services: [
        {
          title: "Mulch & Rock Beds",
          description:
            "Fresh mulch or decorative rock, weeded and edged clean — beds that lock in moisture, hold back weeds, and make the whole yard pop.",
          icon: Flower2,
          image: {
            src: "/images/service-mulch.jpg",
            alt: "A dark mulch bed edged with river rock and round shrubs beneath tall trees",
            placeholderLabel: "Mulch & rock beds — fresh mulched bed",
          },
        },
        {
          title: "Retaining Walls",
          description:
            "Block and stone retaining walls that hold back slopes, define beds, and add lasting structure to your yard.",
          icon: Layers,
          image: {
            src: "", // TODO -> /images/service-walls.jpg
            alt: "A block retaining wall edging a landscaped bed",
            placeholderLabel: "Retaining walls — block / stone wall",
          },
        },
        {
          title: "Plantings & Beds",
          description:
            "Shrubs, perennials, and fresh planting beds laid out and planted to add color and curb appeal around your home.",
          icon: Trees,
          image: {
            src: "", // TODO -> /images/service-plantings.jpg
            alt: "Freshly planted shrubs and flower beds along a home",
            placeholderLabel: "Plantings — shrubs & beds",
          },
        },
      ],
    },
    {
      key: "snow",
      label: "Snow Removal",
      blurb:
        "Plowing, shoveling, and salting so you get out on time no matter what fell overnight.",
      icon: Snowflake,
      image: {
        src: "/images/service-plowing.jpg",
        alt: "Clearing a snow-covered driveway with a two-stage snowblower on a winter evening",
        placeholderLabel: "Snow removal — plowed driveway",
      },
      services: [
        {
          title: "Snow Plowing",
          description:
            "Driveways and lots plowed fast after every storm, with markers set ahead of time so we protect your grass and your concrete.",
          icon: Truck,
          image: {
            src: "/images/service-plowing.jpg",
            alt: "A snow-covered residential driveway being cleared with a snowblower",
            placeholderLabel: "Snow plowing — cleared driveway",
          },
        },
        {
          title: "Shoveling & Salting",
          description:
            "Walkways, steps, and entries cleared by hand and salted down, so no one slips on the way to the door.",
          icon: Shovel,
          image: {
            src: "", // -> /images/service-salting.jpg
            alt: "A shoveled and salted front walkway in winter",
            placeholderLabel: "Shoveling & salting — cleared walkway",
          },
        },
      ],
    },
    {
      key: "stump",
      label: "Stump Grinding",
      blurb:
        "Old stumps ground down below grade and hauled away — watch the grinder go.",
      icon: Axe,
      featured: true,
      image: {
        src: "/images/service-stump.jpg",
        alt: "A stump grinder removing a tree stump beside the Jaws work truck",
        placeholderLabel: "Stump grinding — grinder at a stump",
      },
      services: [
        {
          title: "Stump Grinding",
          description:
            "Got an old stump in the way? We grind it down below grade and clear out the chips, so you get your yard back and stop mowing around it. Here's our grinder in action.",
          icon: Axe,
          image: {
            src: "/images/service-stump.jpg",
            alt: "A stump grinder removing a tree stump beside the Jaws work truck",
            placeholderLabel: "Stump grinding — grinder at a stump",
          },
          video: "/videos/stump-grinding.mp4",
          points: [
            "Ground down below grade",
            "Chips & debris cleared away",
            "No more mowing around it",
          ],
        },
      ],
    },
  ] satisfies ServiceCategory[],

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

  /* --- Recent work gallery (Home page) ---
   * Finished-job photos. Drop files in /public/images and list them here.
   */
  work: {
    eyebrow: "Recent work",
    heading: "Stripes we're proud of.",
    sub: "A few recent lawns and properties we keep looking sharp across Southeast Michigan.",
    photos: [
      {
        src: "/images/work-1.jpg",
        alt: "A backyard lawn freshly mowed in clean stripes at dusk, framed by tall trees and blooming hydrangeas",
      },
      {
        src: "/images/work-2.jpg",
        alt: "A red zero-turn mower on a freshly striped lawn under a bright blue summer sky",
      },
      {
        src: "/images/work-4.jpg",
        alt: "A fenced backyard mowed in crisp green stripes",
      },
      {
        src: "/images/work-3.jpg",
        alt: "A wide striped lawn seen from behind a riding mower",
      },
      {
        src: "/images/work-5.jpg",
        alt: "A rural property with a white rail fence and freshly cut grass",
      },
      {
        src: "/images/work-6.jpg",
        alt: "A backyard with a stone fire pit and a tidy, maintained lawn",
      },
      {
        src: "/images/work-7.jpg",
        alt: "A red brick home with a freshly striped front lawn",
      },
      {
        src: "/images/work-8.jpg",
        alt: "A neatly striped lawn under a clear blue sky",
      },
      {
        src: "/images/work-10.jpg",
        alt: "A freshly mowed commercial lot bordered by black fencing",
      },
      {
        src: "/images/work-11.jpg",
        alt: "A neatly striped residential lawn along a chain-link fence",
      },
      {
        src: "/images/work-12.jpg",
        alt: "A crisply mowed front lawn on a quiet residential street",
      },
    ],
  },

  /* --- Aerial video showcase (home page centerpiece) --- */
  showcase: {
    eyebrow: "From above",
    heading: "A bird's-eye look at the work.",
    sub: "Striped lawns and clean lines across Southeast Michigan — the whole property, start to finish.",
    poster: "/images/home-aerial-poster.jpg",
    label: "Aerial drone flyover of a property with freshly striped lawns",
    // HEVC first: Safari picks it (lighter on iPhones); other browsers fall back to H.264.
    sources: [
      { src: "/videos/home-aerial-hevc.mp4", type: 'video/mp4; codecs="hvc1"' },
      { src: "/videos/home-aerial.mp4", type: "video/mp4" },
    ],
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
    // TODO: confirm exact Google rating (5.0 inferred — all visible reviews are 5★).
    rating: 5.0 as number | null,
    reviewCount: 18,
    source: "Google",
    // "Leave a review" link → Joey's Google listing (built from his place CID).
    // For a true one-click write-review flow, swap in his GBP short link (g.page/r/.../review).
    reviewUrl: "https://www.google.com/maps?cid=5948580125521396404",
    reviewCtaLabel: "Leave us a review",
    eyebrow: "Reviews",
    heading: "Word gets around.",
    sub: "We let the work — and our customers — do the talking.",
    placeholderLabel: "Review coming soon",
    placeholderHint: "Paste a real Google review in site.config.ts",
    // Real Google reviews (from jawslawnandsnow.com). All 5★. Do not invent more.
    quotes: [
      {
        quote:
          "Jaws Lawn and Snow did a terrific job for me. Joey worked for 2 days to remove all the leaves our former lawn care left me with.",
        author: "Carol Burki",
        context: "Google review",
      },
      {
        quote:
          "Excellent service and communication. Kept us updated when we moved around multiple storms.",
        author: "Ben Samuel",
        context: "Google review",
      },
      {
        quote:
          "Jaws Lawn and Snow is very professional and Joey went above and beyond to make sure we were taken care of. Highly recommended.",
        author: "Michael Toth",
        context: "Google review",
      },
      {
        quote:
          "Joey gave me a quote and came out the same day. He did an excellent job.",
        author: "Teri Davis",
        context: "Google review",
      },
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
      src: "/images/hero-lawn.jpg",
      alt: "A wide, freshly striped lawn sweeping up toward a row of evergreen trees",
      placeholderLabel: "Hero (summer) — striped green lawn, the strongest shot",
    },
    heroWinter: {
      src: "", // TODO: no snow photo yet -> /images/hero-snow.jpg
      alt: "A residential driveway plowed clear of snow on a bright winter morning",
      placeholderLabel: "Hero (winter) — freshly plowed driveway",
    },
    about: {
      src: "/images/crew.jpg",
      alt: "The Jaws work truck parked at a home with a freshly striped front lawn",
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
    businessSlug: process.env.NEXT_PUBLIC_BUSINESS_SLUG || "jaws-lawn-snow",
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

  /* --- Nav (one entry per page/route) --- */
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],

  /* --- SEO ---
   * `pages` holds per-route title/description (used by lib/seo.ts pageMetadata).
   * `title`/`description` are the site defaults / home fallback.
   */
  seo: {
    title:
      "Jaws Lawn & Snow — Lawn Care & Snow Removal in Southeast Michigan",
    description:
      "Lawn care in summer, snow removal in winter — one local, insured crew for your whole property in Southeast Michigan. Mowing, cleanups, plowing, and salting. Get a free quote.",
    url: "https://jawslawnandsnow.com", // TODO: confirm final domain
    pages: {
      home: {
        title:
          "Jaws Lawn & Snow — Lawn Care & Snow Removal in Southeast Michigan",
        description:
          "Lawn care in summer, snow removal in winter — one local, insured crew for your whole property in Southeast Michigan. Get a free quote.",
      },
      services: {
        title: "Services — Lawn Care & Snow Removal | Jaws Lawn & Snow",
        description:
          "Mowing, edging, spring & fall cleanups, mulch, snow plowing, shoveling and salting — one local crew for your whole property, all year.",
      },
      about: {
        title: "About — Local, Insured Lawn & Snow Crew | Jaws Lawn & Snow",
        description:
          "A local, owner-run crew that treats your property like our own — and shows up in January, not just July. Serving Southeast Michigan year-round.",
      },
      reviews: {
        title: "Reviews — Jaws Lawn & Snow",
        description:
          "See what Southeast Michigan homeowners say about Jaws Lawn & Snow's lawn care and snow removal.",
      },
      contact: {
        title: "Get a Free Quote — Jaws Lawn & Snow",
        description:
          "Tell us about your property and get a fast, free quote for lawn care, snow removal, or both. We'll text you back quickly.",
      },
    },
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
