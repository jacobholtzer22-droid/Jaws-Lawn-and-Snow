import Link from "next/link";
import { site } from "@/site.config";
import StumpVideo from "./StumpVideo";

/**
 * Large featured service block (video + copy) — renders the config category
 * flagged `featured`. Gives a video-led service (Stump Grinding) its own
 * prominent, full-width showcase so the clip is clearly visible.
 */
export default function FeaturedService() {
  const cat = site.serviceCategories.find((c) => c.featured);
  if (!cat) return null;
  const service = cat.services[0];
  if (!service) return null;
  const Icon = cat.icon;
  // `video` only exists on the stump service literal under `as const` — narrow it.
  const video = "video" in service ? service.video : undefined;

  return (
    <section id={cat.key} className="scroll-mt-24 bg-birch">
      <div className="container-page pb-20 sm:pb-28">
        <div className="overflow-hidden rounded-3xl bg-pine text-birch shadow-xl shadow-pine/10">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_1.15fr]">
            {/* Video — large, in its native vertical aspect so nothing is cropped. */}
            <div className="flex items-center justify-center bg-loam p-6 sm:p-8">
              <div className="w-full max-w-[340px] overflow-hidden rounded-2xl bg-black ring-1 ring-white/10">
                {video ? (
                  <StumpVideo
                    src={video}
                    poster={service.image?.src}
                    label={service.image?.alt || service.title}
                    className="block aspect-[9/16] w-full bg-black object-cover"
                  />
                ) : null}
              </div>
            </div>

            {/* Copy */}
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sap text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <p className="eyebrow text-birch">Featured service</p>
              </div>
              <h2 className="h-display mt-5 text-3xl text-birch sm:text-4xl">
                {cat.label}
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-birch/80">
                {service.description}
              </p>
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
