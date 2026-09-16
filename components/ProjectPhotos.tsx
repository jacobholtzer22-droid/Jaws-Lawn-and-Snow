import Image from "next/image";
import Section from "./Section";
import Reveal from "./Reveal";

type Photo = {
  readonly src: string;
  readonly alt: string;
  readonly service: string;
  readonly city: string;
};

/** "<service> in <city>" once a real town is recorded; service alone otherwise. */
export function projectCaption(p: Photo) {
  return p.city ? `${p.service} in ${p.city}` : p.service;
}

/** Grid of real project photos. Renders nothing when there are none. */
export default function ProjectPhotos({
  heading,
  photos,
}: {
  heading: string;
  photos: readonly Photo[];
}) {
  if (photos.length === 0) return null;
  return (
    <Section tone="cream">
      <Reveal>
        <p className="eyebrow mb-4">Project examples</p>
        <h2 className="h-display text-3xl text-pine sm:text-4xl">{heading}</h2>
      </Reveal>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, i) => (
          <Reveal as="li" key={photo.src} delay={Math.min(i, 4) * 60}>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-pine/10 bg-pine">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm font-semibold text-pine">
                {projectCaption(photo)}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
