import Link from "next/link";
import { Check } from "lucide-react";
import { site } from "@/site.config";
import StumpVideo from "./StumpVideo";

/**
 * Large featured service block (video + copy) — renders the config category
 * flagged `featured`. Gives a video-led service (Stump Grinding) its own
 * prominent showcase. The video is kept to a modest portrait size and the copy
 * carries highlight bullets so the two columns stay balanced.
 */
export default function FeaturedService() {
  const cat = site.serviceCategories.find((c) => c.featured);
  if (!cat) return null;
  const service = cat.services[0];
  if (!service) return null;
  const Icon = cat.icon;
  // `video`/`points` only exist on the stump service literal under `as const`.
  const video = "video" in service ? service.video : undefined;
  const points = "points" in service ? service.points : undefined;

  return (
    <section id={cat.key} className="scroll-mt-24 bg-birch">
      <div className="container-page pb-20 sm:pb-28">
        <div className="overflow-hidden rounded-3xl bg-pine text-birch shadow-xl shadow-pine/10">
          <div className="grid items-center gap-8 p-6 sm:gap-10 sm:p-8 lg:grid-cols-[auto_1fr] lg:gap-12 lg:p-12">
            {/* Video — modest portrait so the block stays balanced. */}
            {video ? (
              <div className="mx-auto w-full max-w-[240px] overflow-hidden rounded-2xl bg-black ring-1 ring-white/10 lg:mx-0">
                <StumpVideo
                  src={video}
                  poster={service.image?.src}
                  label={service.image?.alt || service.title}
                  className="block aspect-[9/16] w-full object-cover"
                />
              </div>
            ) : null}

            {/* Copy */}
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sap text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <p className="eyebrow text-birch">Featured service</p>
              </div>

              <h2 className="h-display mt-5 text-3xl text-birch sm:text-4xl">
                {cat.label}
              </h2>

              <p className="mt-4 text-base leading-relaxed text-birch/80">
                {service.description}
              </p>

              {points && points.length > 0 && (
                <ul className="mt-6 space-y-3">
                  {points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-3 text-[15px] text-birch/90"
                    >
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sap text-white">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8">
                <Link href={site.cta.href} className="btn-primary px-7 py-4 text-base">
                  {site.cta.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
