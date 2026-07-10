import { site } from "@/site.config";
import ShowcaseVideo from "./ShowcaseVideo";
import Reveal from "./Reveal";

/**
 * Aerial video showcase — the home-page centerpiece. A wide framed drone flyover
 * on a deep navy band. The video is muted, loops, and only plays while on screen
 * (see ShowcaseVideo); the poster carries first paint so there's no layout shift.
 */
export default function AerialShowcase() {
  const { showcase } = site;

  return (
    <section className="bg-gradient-to-b from-pine to-pine-dark py-20 text-birch sm:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4 text-birch">{showcase.eyebrow}</p>
          <h2 className="h-display text-3xl text-birch sm:text-4xl">
            {showcase.heading}
          </h2>
          <p className="mt-4 text-base text-birch/75">{showcase.sub}</p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl bg-black shadow-panel ring-1 ring-white/10">
          <ShowcaseVideo
            sources={showcase.sources}
            poster={showcase.poster}
            label={showcase.label}
            className="block aspect-video w-full object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
