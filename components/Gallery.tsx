import Image from "next/image";
import Section from "./Section";
import Reveal from "./Reveal";
import { site } from "@/site.config";

/** Recent-work photo grid. Config-driven from site.work. */
export default function Gallery() {
  const { work } = site;

  return (
    <Section id="work" tone="cream">
      <Reveal className="max-w-2xl">
        <p className="eyebrow mb-4">{work.eyebrow}</p>
        <h2 className="h-display text-3xl text-pine sm:text-4xl">
          {work.heading}
        </h2>
        <p className="mt-4 text-base text-loam/65">{work.sub}</p>
      </Reveal>

      <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
        {work.photos.map((photo, i) => (
          <Reveal
            as="li"
            key={photo.src}
            delay={Math.min(i, 4) * 60}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-pine/10 bg-pine"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 380px, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
