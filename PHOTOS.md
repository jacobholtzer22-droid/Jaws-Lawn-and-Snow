# Photos — Jaws Lawn & Snow

Every image on the site is mapped to a **role** in `site.config.ts` under `images`.
Until a role has a real `src`, the site shows a clearly-labeled placeholder. To swap
in a real photo, drop the file in `/public/images` and set its `src` — **no component
edits, ever.**

## Roles to fill

| Role (in `site.config.ts`) | What goes here | Suggested file |
|---|---|---|
| `images.heroSummer` | The strongest **lawn** shot — a freshly mowed, striped green yard. Full-bleed hero (Summer). | `/images/hero-lawn.jpg` |
| `images.heroWinter` | The strongest **snow** shot — a cleanly plowed driveway. Full-bleed hero (Winter). | `/images/hero-snow.jpg` |
| `images.about` | The crew / truck at work — proof there's a real local crew behind it. | `/images/crew.jpg` |

## Service photos (one per card on the Services page)

These live on each service in `site.config.ts` under `serviceCategories[].services[].image`
(not the top-level `images` manifest). Same rule: set `src` and the placeholder is replaced.

| Category / Service (`site.config.ts`) | What goes here | Suggested file |
|---|---|---|
| Lawn Care › Lawn Mowing | A striped, freshly cut lawn. | `/images/service-mowing.jpg` ✓ |
| Lawn Care › Trimming & Edging | A crisp lawn edge along a walk or drive. | `/images/service-edging.jpg` ✓ |
| Lawn Care › Spring & Fall Cleanups | Clearing leaves / seasonal debris. | `/images/service-cleanup.jpg` ✓ |
| Landscaping › Mulch & Rock Beds | A garden bed with fresh dark mulch or rock. | `/images/service-mulch.jpg` ✓ |
| Landscaping › Retaining Walls | A block/stone retaining wall (NEEDED). | `/images/service-walls.jpg` |
| Landscaping › Plantings & Beds | Newly planted shrubs / flower beds (NEEDED). | `/images/service-plantings.jpg` |
| Snow Removal › Snow Plowing | A plowed, cleared driveway (NEEDED). | `/images/service-plowing.jpg` |
| Snow Removal › Shoveling & Salting | A shoveled, salted walkway (NEEDED). | `/images/service-salting.jpg` |

A "✓" means the photo is already in place; the rest still show labeled placeholders.

### Stump Grinding (video)

`Landscaping › Stump Grinding` shows a **video** (`services[].video`) with a poster image
(`image.src`). The video lives at `/public/videos/stump-grinding.mp4` (compressed from the
original ~50 MB clip to ~3 MB) and the poster is `/images/service-stump.jpg` (a frame pulled
from the video). The card shows the poster + a native play button; the clip loads only when played.

### Gallery (Recent work)

`work-1`…`work-12` in `site.work.photos`. `work-9`/`work-10` are commercial-property work;
all `work-*` files are in `/public/images`.

Set each one by editing that service's `image.src` (e.g. `src: "/images/service-mowing.jpg"`).
Service-card photos read best as **landscape** (the card crops to 16:10).

## How to swap one in

1. Save the photo into `/public/images/` (e.g. `hero-lawn.jpg`).
2. Open `site.config.ts`, find the matching role, set `src: "/images/hero-lawn.jpg"`.
3. Confirm the `alt` text still describes the actual photo (it should — written per role).

## Tips

- Both hero shots read best as **landscape** crops — the hero is full-bleed and the
  season switch crossfades between them, so frame them similarly.
- The **summer** hero sells the stripes — shoot a mowed lawn in good light. The
  **winter** hero sells the result — a driveway plowed down to clean pavement.
- The `about` shot works in landscape (4:3). A person + mower + truck reads as "real
  local crew."
- Keep files reasonably sized (long edge ~2000px, JPG/WebP). `next/image` handles the rest.

---

## Still needed (added Sept 2026, client feedback pass)

Every item below renders **nothing** today — no stock photo, no placeholder box,
no invented copy. Send the asset and the section turns on with no code change.

| # | Needed | What it unblocks | Where it goes |
|---|---|---|---|
| 1 | **Photo of Joey** (portrait or on a job site, roughly 4:5) **plus 2–4 sentences of bio in writing** | The "Meet Joey" section on `/about` — built and mounted, currently returns `null` | `site.config.ts` → `meetOwner.photo.src`, `meetOwner.photo.alt`, `meetOwner.body` |
| 2 | **The town each gallery photo was taken in** (6 photos, listed below) | Gallery captions read `"<service> · <city>"`. Written and wired, but the caption stays hidden while `city` is `""` — a guessed town is a fabricated fact | `site.config.ts` → `work.photos[].city` |
| 3 | **Hedge / shrub trimming** photo | Photo band on that service card (renders icon-only today) | new `image` on that service |
| 4 | **Bed weeding & cleanup** photo | Same | Same |
| 5 | **Bush / brush removal** photo | Same | Same |
| 6 | **Aeration & overseeding** photo | Same | Same |
| 7 | **Topsoil & grass seeding** photo | Same | Same |
| 8 | **Before / after pairs** (same property, both states) | A before-and-after section — not built, because no genuine pairs exist | — |
| 9 | A dedicated **shoveling / salting** shot | `Snow Removal › Shoveling & Salting` currently reuses the plowing photo | that service's `image.src` |

### Gallery photos awaiting a town

`work-1`, `work-2`, `work-4`, `work-5`, `work-6`, `work-11`.

### Gallery photos removed this pass

Trimmed from 11 frames to 6. Removed: `work-3` and `work-7` (shot over the mower
deck / truck hood — the equipment fills the frame), `work-10` (cluttered, patchy
turf), `work-8` and `work-12` (near-duplicates of stronger frames). The files are
still in `/public/images`; only the `work.photos` list changed, so restoring one
is a single config entry.

### Social share image

`/public/og.jpg` (1200×630) is generated from `hero-lawn.jpg` — a real Jaws
photo — with the brand lockup and a wash in the brand navy. No stock imagery.
It is referenced sitewide from `app/layout.tsx` and per page from `lib/seo.ts`.
