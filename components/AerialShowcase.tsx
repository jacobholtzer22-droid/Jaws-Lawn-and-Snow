import { site } from "@/site.config";
import ShowcaseVideo from "./ShowcaseVideo";
import Reveal from "./Reveal";

/**
 * Aerial video showcase — the home-page centerpiece. The heading sits on a deep
 * navy band; the drone flyover runs full-bleed (edge to edge, no frame) below it
 * so it's big and easy to watch. The video is muted, loops, and only plays while
 * on screen (see ShowcaseVideo); the poster carries first paint so there's no
 * layout shift.
 */
export default function AerialShowcase() {
  const { showcase } = site;

  return (
    <section className="bg-gradient-to-b from-pine to-pine-dark pt-20 text-birch sm:pt-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4 text-birch">{showcase.eyebrow}</p>
          <h2 className="h-display text-3xl text-birch sm:text-4xl">
            {showcase.heading}
          </h2>
          <p className="mt-4 text-base text-birch/75">{showcase.sub}</p>
        </Reveal>
      </div>

      {/* Full-bleed video — no border, capped height so it stays reasonable on wide screens. */}
      <Reveal className="mt-10 bg-black sm:mt-14">
        <ShowcaseVideo
          sources={showcase.sources}
          poster={showcase.poster}
          label={showcase.label}
          className="block aspect-video max-h-[85vh] w-full object-cover"
        />
      </Reveal>
    </section>
  );
}
