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
  Wind,
  Wheat,
  Shrub,
  TreeDeciduous,
  Trash2,
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
  /** In-page anchor id. */
  key: string;
  /** URL segment for this category's own page: /services/<slug>. */
  slug: string;
  label: string;
  /** One-line intro for the category's own page + its metadata description. */
  intro: string;
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
    tagline: "Belleville-based lawn care & snow removal",
    // TODO: confirm Joey's number for the lawn+snow line (reused from Jaws Detailing for now).
    phoneDisplay: "(734) 262-2365",
    phoneHref: "tel:+17342622365",
    // Physical base (service-area business). Canton is a target market, NOT our
    // location — see Google's business-representation guidelines.
    region: "Belleville, MI",
    servingLine:
      "Belleville-based, proudly serving Canton, Belleville, Van Buren Township, Ypsilanti, Ann Arbor, Saline, and select surrounding areas.",
    email: "", // optional — add a public contact email if Joey wants one shown
    // Brand logo (square lockup). Set to "" to fall back to the text wordmark.
    logo: "/images/logo.png",
    logoAlt: "Jaws Lawn & Snow — Michigan",
    // Reversed lockup (red + cream on transparent) for dark backgrounds.
    logoReverse: "/images/logo-reverse.png",
    // Shark-mark only (no wordmark) — used as a decorative watermark/accent.
    markNavy: "/images/mark-navy.png", // for light backgrounds
    markCream: "/images/mark-cream.png", // for dark backgrounds
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
        eyebrow: "Lawn care & snow removal · Canton & Belleville, MI",
        headline: "A lawn the\nneighbors notice.",
        sub: "Reliable mowing, detailed trimming, and a clean finish — handled on schedule, so your yard always looks like someone takes care of it. Because someone does.",
        primaryCta: "Get a free quote",
        imageKey: "heroSummer",
      },
      winter: {
        tabLabel: "Winter",
        icon: Snowflake,
        eyebrow: "Snow removal · Canton & Belleville, MI",
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
      slug: "lawn-care",
      label: "Lawn Care",
      intro:
        "Mowing, trimming, seeding, aeration and seasonal cleanups — the routine work that keeps a property looking cared for from spring through fall.",
      blurb:
        "Mowing, crisp edges, seeding and seasonal cleanups that keep your yard sharp.",
      icon: Sprout,
      image: {
        src: "/images/service-mowing.jpg",
        alt: "A large lawn with fresh mowing stripes",
        placeholderLabel: "Lawn care — striped lawn",
      },
      services: [
        {
          title: "Lawn Mowing",
          // Client-supplied wording (verbatim). Do not paraphrase — it sets the
          // scope of the standard service vs. the paid add-ons.
          description:
            "Standard mowing service includes mowing, string trimming along sidewalks, driveways, landscape beds, fences and other obstacles, plus blowing clippings from hard surfaces. Mechanical edging and bagging are available as additional services.",
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
          title: "Aeration & Overseeding",
          description:
            "Core aeration to open up compacted soil, followed by overseeding so new grass has somewhere to take hold. Best done in the fall.",
          icon: Wind,
        },
        {
          title: "Topsoil & Grass Seeding",
          description:
            "Topsoil brought in to level low spots and bare patches, then seeded so the thin areas fill back in instead of turning to mud.",
          icon: Wheat,
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
      slug: "landscaping",
      label: "Landscaping",
      intro:
        "Mulch and rock, hedge and shrub work, bed weeding, and brush removal — the jobs that clean up everything the mower doesn't touch.",
      blurb:
        "Mulch, hedges, beds and brush removal — everything the mower doesn't touch.",
      icon: Flower2,
      image: {
        src: "/images/service-mulch.jpg",
        alt: "A freshly mulched bed with a river-rock border and shaped shrubs at a wooded property",
        placeholderLabel: "Landscaping — beds & borders",
      },
      services: [
        {
          title: "Mulch & Rock Installation",
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
          title: "Hedge & Shrub Trimming",
          description:
            "Hedges and shrubs cut back into shape and the trimmings hauled off, so the front of the house stops looking overgrown.",
          icon: Shrub,
        },
        {
          title: "Bed Weeding & Cleanup",
          description:
            "Weeds pulled out of the beds, edges re-cut, and the debris cleared — the reset that makes fresh mulch actually look fresh.",
          icon: Trash2,
        },
        {
          title: "Bush & Brush Removal",
          description:
            "Overgrown bushes, volunteer saplings, and brush piles taken out and hauled away so you get the space back.",
          icon: TreeDeciduous,
        },
        /* Retaining walls and plantings stay listed but sit last — they're
         * offered, not the work we lead with. */
        {
          title: "Retaining Walls",
          description:
            "Block and stone retaining walls that hold back slopes, define beds, and add lasting structure to your yard.",
          icon: Layers,
          image: {
            src: "/images/service-walls.jpg",
            alt: "A striped lawn edged with a boulder-and-stone border at a wooded home",
            placeholderLabel: "Retaining walls — block / stone wall",
          },
        },
        {
          title: "Plantings & Beds",
          description:
            "Shrubs, perennials, and fresh planting beds laid out and planted to add color and curb appeal around your home.",
          icon: Trees,
          image: {
            src: "/images/service-plantings.jpg",
            alt: "Foundation plantings and mulched beds framing a freshly striped front lawn",
            placeholderLabel: "Plantings — shrubs & beds",
          },
        },
      ],
    },
    {
      key: "snow",
      slug: "snow-removal",
      label: "Snow Removal",
      intro:
        "Plowing, hand-shoveling and salting on a storm-priority route, so the driveway is open before you need it.",
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
            // Reuses the snow-clearing photo — the only winter photo on hand.
            // Swap in a dedicated shoveling/salting shot when Joey sends one.
            src: "/images/service-plowing.jpg",
            alt: "Clearing snow from a residential driveway on a winter evening",
            placeholderLabel: "Shoveling & salting — cleared walkway",
          },
        },
      ],
    },
    {
      key: "stump",
      slug: "stump-grinding",
      label: "Stump Grinding",
      intro:
        "Old stumps ground down below grade and the chips cleared away, so you get the yard back and stop mowing around it.",
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
    sub: "A few recent lawns and properties we keep looking sharp around Canton, Belleville, and nearby.",
    /* Captions read "<service> · <city>". `city` is intentionally "" on every
     * photo — the town each job was in is a business fact we don't have. Fill
     * them in and the city appears automatically; leave them blank and only the
     * service shows. Never guess a town.
     *
     * Trimmed from 11 to 6 frames: work-3 and work-7 were shot over the mower
     * deck / truck hood, work-10 was cluttered and patchy, and work-8 / work-12
     * duplicated stronger frames. */
    photos: [
      {
        src: "/images/work-1.jpg",
        alt: "A backyard lawn freshly mowed in clean stripes at dusk, framed by tall trees and blooming hydrangeas",
        service: "Lawn mowing",
        city: "",
      },
      {
        src: "/images/work-2.jpg",
        alt: "A red zero-turn mower on a freshly striped lawn under a bright blue summer sky",
        service: "Lawn mowing",
        city: "",
      },
      {
        src: "/images/work-4.jpg",
        alt: "A fenced backyard mowed in crisp green stripes",
        service: "Lawn mowing",
        city: "",
      },
      {
        src: "/images/work-5.jpg",
        alt: "A rural property with a white rail fence and freshly cut grass",
        service: "Lawn mowing",
        city: "",
      },
      {
        src: "/images/work-6.jpg",
        alt: "A backyard with a stone fire pit and a tidy, maintained lawn",
        service: "Lawn mowing",
        city: "",
      },
      {
        src: "/images/work-11.jpg",
        alt: "A neatly striped residential lawn along a chain-link fence",
        service: "Lawn mowing",
        city: "",
      },
    ],
  },

  /* --- Aerial video showcase (home page centerpiece) --- */
  showcase: {
    eyebrow: "From above",
    heading: "A bird's-eye look at the work.",
    sub: "Striped lawns and clean lines around Canton, Belleville, and nearby — the whole property, start to finish.",
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
      "An owner-led local crew that learns your property",
    ],
    imageKey: "about" as const,
    stats: [
      { value: "Year-round", label: "Lawn + snow, one crew" },
      { value: "Insured", label: "Fully covered, every job" },
      { value: "Local", label: "Owner-run, not a franchise" },
    ] satisfies Stat[],
  },

  /* --- Meet the owner (About page) ---
   * Renders ONLY when `body` is non-empty AND `photo.src` is set. Both are
   * blank because Joey's bio and a photo of him are facts we don't have —
   * nothing here is invented, and the section stays off the page until he
   * sends them. Fill both in and the section appears; no code change needed.
   */
  meetOwner: {
    eyebrow: "Meet the owner",
    heading: "Meet Joey.",
    name: "Joey",
    body: "",
    photo: {
      src: "",
      alt: "",
      placeholderLabel: "Meet Joey — portrait of the owner, on a job site",
    } satisfies SiteImage,
  },

  /* --- Service area ---
   * Belleville-based service-area business. Canton is the biggest target market
   * but is NOT our physical location. Town list confirmed by the client.
   */
  serviceArea: {
    eyebrow: "Service area",
    heading: "Belleville-based,\nserving Canton and nearby.",
    note: "Belleville-based, proudly serving Canton, Belleville, Van Buren Township, Ypsilanti, Ann Arbor, Saline, and select surrounding areas. Don't see yours? Ask anyway.",
    cta: "See if we cover you",
    towns: [
      "Canton",
      "Belleville",
      "Van Buren Township",
      "Ypsilanti",
      "Ann Arbor",
      "Saline",
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
    readAllLabel: "Read all Google reviews",
    /* Home-page strip: a short proof block sitting directly above the quote CTA. */
    home: {
      eyebrow: "What customers say",
      heading: "Real reviews from real neighbors.",
      /* Which of `quotes` to surface on the home page, by index. */
      featured: [0, 2, 3],
    },
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
      // Not currently rendered (the hero season switch was removed). Points at the
      // shared snow photo so no placeholder can surface; swap for a real winter
      // hero if the season switch ever returns.
      src: "/images/service-plowing.jpg",
      alt: "A residential driveway being cleared of snow on a winter evening",
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
    callLabel: "Call us",
    textLabel: "Text us",
    /* sms: link. iOS and Android both accept a bare sms:<number>; no body is
     * prefilled so nothing the customer didn't type gets sent. */
    smsHref: "sms:+17342622365",
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
      addressLabel: "Service address",
      addressPlaceholder: "123 Main St",
      cityZipLabel: "City & ZIP",
      cityZipPlaceholder: "Belleville, 48111",
      serviceLabel: "What do you need?",
      servicePlaceholder: "Choose a service",
      /* Mirrors the service categories. Kept as plain strings so the option the
       * customer picked lands in the CRM message verbatim. */
      serviceOptions: [
        "Lawn mowing",
        "Trimming & edging",
        "Aeration & overseeding",
        "Topsoil & grass seeding",
        "Spring or fall cleanup",
        "Mulch & rock installation",
        "Hedge & shrub trimming",
        "Bed weeding & cleanup",
        "Bush & brush removal",
        "Retaining wall or plantings",
        "Snow removal",
        "Stump grinding",
        "Something else",
      ],
      frequencyLabel: "Mowing frequency",
      frequencyOptions: ["Weekly", "Every other week", "One-time", "Not sure yet"],
      contactMethodLabel: "Best way to reach you",
      contactMethodOptions: ["Text", "Call", "Email"],
      optionalLabel: "(optional)",
      /* The CRM endpoint takes JSON, not multipart — there is no file upload
       * here. Photos come in by text instead, which is where this customer
       * base already sends them. */
      photoHint:
        "Have photos of the property? Text them to (734) 262-2365 and we'll match them to your quote.",
      messageLabel: "Anything else?",
      messagePlaceholder:
        "Gate code, dogs in the yard, problem areas — anything we should know.",
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
      "Jaws Lawn & Snow — Lawn Care & Snow Removal | Canton & Belleville, MI",
    description:
      "Belleville-based lawn care and snow removal serving Canton, Belleville, Van Buren Township, Ypsilanti, Ann Arbor and Saline. Mowing, cleanups, plowing, and salting. Get a free quote.",
    url: "https://www.jawslawnandsnow.com", // canonical host = www (matches the live redirect)
    pages: {
      home: {
        title:
          "Jaws Lawn & Snow — Lawn Care & Snow Removal | Canton & Belleville, MI",
        description:
          "Belleville-based lawn care and snow removal serving Canton, Belleville, Ypsilanti, Ann Arbor and nearby. Mowing, cleanups, plowing, and salting. Get a free quote.",
      },
      services: {
        title: "Services — Lawn Care & Snow Removal | Jaws Lawn & Snow",
        description:
          "Mowing, edging, spring & fall cleanups, mulch, snow plowing, shoveling and salting — one local crew for your whole property, all year.",
      },
      about: {
        title: "About — Local, Insured Lawn & Snow Crew | Jaws Lawn & Snow",
        description:
          "A Belleville-based, owner-led crew that treats your property like our own — and shows up in January, not just July. Serving Canton and nearby year-round.",
      },
      reviews: {
        title: "Reviews — Jaws Lawn & Snow",
        description:
          "See what homeowners around Canton, Belleville and Ypsilanti say about Jaws Lawn & Snow's lawn care and snow removal.",
      },
      "lawn-care": {
        title: "Lawn Care — Mowing, Seeding & Cleanups | Jaws Lawn & Snow",
        description:
          "Mowing, string trimming, aeration and overseeding, topsoil and grass seeding, and spring and fall cleanups across Canton, Belleville, Ypsilanti and nearby.",
      },
      landscaping: {
        title: "Landscaping — Mulch, Hedges & Brush Removal | Jaws Lawn & Snow",
        description:
          "Mulch and rock installation, hedge and shrub trimming, bed weeding, and bush and brush removal across Canton, Belleville, Ypsilanti and nearby.",
      },
      "snow-removal": {
        title: "Snow Removal — Plowing, Shoveling & Salting | Jaws Lawn & Snow",
        description:
          "Driveway and lot plowing, hand-shoveled walkways, and salting on a storm-priority route across Canton, Belleville, Ypsilanti and nearby.",
      },
      "stump-grinding": {
        title: "Stump Grinding — Stumps Ground Below Grade | Jaws Lawn & Snow",
        description:
          "Old stumps ground down below grade and the chips cleared away, across Canton, Belleville, Ypsilanti and nearby. Free quotes.",
      },
      thanks: {
        title: "Thanks — Jaws Lawn & Snow",
        description:
          "Thanks for reaching out. We'll be in touch shortly with your free quote.",
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
