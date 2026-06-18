# Jaws Lawn & Snow — marketing site

A high-conversion, single-page marketing site for a local lawn-care + snow-removal
business. Built **config-driven**: every business-specific string, service, photo, and
brand value lives in one place. Swap that, swap the images, swap the brand tokens, and
you get a completely different-looking site with **zero component edits**.

Design: **"Field & Frost"** — warm birch paper over deep evergreen, with a seasonal
accent system (Sap green for lawn, Glacier blue for snow) and a Marigold spark.
Type: Bricolage Grotesque (display) × Figtree (body). Signature element: a **season
switch** in the hero that flips the whole hero between Summer and Winter.

## Stack

- Next.js 14 (App Router) · TypeScript · Tailwind CSS · lucide-react
- No database. Leads POST straight to the Align & Acquire CRM (see below).
- Deploy target: Vercel.

## The one file that matters

`site.config.ts` is the single source of truth. It holds:

- `business` — name, phone (click-to-call), region, email
- `hero` — the two season copy sets + which photo each uses
- `trust`, `servicesIntro`, `services`, `seasons`, `whyUs`, `serviceArea`, `reviews`, `hours`
- `images` — the photo manifest (role → src/alt/placeholder). See `PHOTOS.md`.
- `crm` — where leads go (from env)
- `contact` — all contact + form copy, incl. TCPA consent text
- `nav`, `seo`, `footer`

Brand colors live in `tailwind.config.ts` (semantic tokens), fonts in `app/layout.tsx`.

## CRM wiring (do not improvise)

The contact form POSTs **directly** (client-side `fetch`) to the CRM endpoint with a
body of **exactly**:

```json
{ "name": "", "phone": "", "email": "", "message": "", "smsConsent": false, "businessSlug": "" }
```

Configured via two public env vars (see `.env.local.example`):

```
NEXT_PUBLIC_CRM_URL=https://www.alignandacquire.com/api/contact
NEXT_PUBLIC_BUSINESS_SLUG=REPLACE_ME_FRIDAY   # ← paste the real Neon Business.slug
```

`smsConsent` is a real, default-unchecked checkbox with TCPA-compliant language.
On success the form is replaced with a confirmation; on failure the user keeps their
typed input and is told to call the number.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Open TODOs before launch

- [ ] `NEXT_PUBLIC_BUSINESS_SLUG` — paste the real Neon `Business.slug`.
- [ ] Confirm the phone number for the lawn+snow line (reused from Jaws Detailing for now).
- [ ] Add 3 real photos (`heroSummer`, `heroWinter`, `about`) — see `PHOTOS.md`.
- [ ] Confirm service-area towns (SE-Michigan placeholders for now).
- [ ] Confirm business hours.
- [ ] Add 2 real Google reviews + set `reviews.rating` / `trust.rating` (left `null` — no invented numbers).
- [ ] Confirm final domain in `seo.url`.

## Cloning to another business

1. Replace the values in `site.config.ts`.
2. Replace `/public/images` + update the `images` manifest.
3. Swap the palette in `tailwind.config.ts` and the fonts in `app/layout.tsx`.

No component edits. That's the whole point.

---

Site by Align and Acquire.
