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

These live on each service in `site.config.ts` under `services[].image` (not the top-level
`images` manifest). Same rule: set `src` and the placeholder is replaced.

| Service (`site.config.ts`) | What goes here | Suggested file |
|---|---|---|
| Lawn Mowing | A striped, freshly cut lawn. | `/images/service-mowing.jpg` |
| Trimming & Edging | A crisp lawn edge along a walk or drive. | `/images/service-edging.jpg` |
| Spring & Fall Cleanups | Clearing leaves / seasonal debris. | `/images/service-cleanup.jpg` |
| Mulch & Bed Care | A garden bed with fresh dark mulch. | `/images/service-mulch.jpg` |
| Snow Plowing | A plowed, cleared driveway. | `/images/service-plowing.jpg` |
| Shoveling & Salting | A shoveled, salted walkway. | `/images/service-salting.jpg` |

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
