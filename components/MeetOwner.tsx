import Image from "next/image";
import Section from "./Section";
import Reveal from "./Reveal";
import { site } from "@/site.config";

/**
 * "Meet Joey" — a short owner intro on the About page.
 *
 * Renders NOTHING until both the bio and a real photo exist in site.config.ts.
 * A bio and a portrait are facts about a person; neither is invented here, and
 * no stock photo stands in for him. See PHOTOS.md.
 */
export default function MeetOwner() {
  const { meetOwner } = site;
  const hasBody = meetOwner.body.trim().length > 0;
  const hasPhoto = meetOwner.photo.src.length > 0;
  if (!hasBody || !hasPhoto) return null;

  return (
    <Section id="meet-owner" tone="cream">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-center lg:gap-16">
        <Reveal className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-pine/10 shadow-card">
          <Image
            src={meetOwner.photo.src}
            alt={meetOwner.photo.alt}
            fill
            sizes="(min-width: 1024px) 420px, 100vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal delay={90}>
          <p className="eyebrow mb-4">{meetOwner.eyebrow}</p>
          <h2 className="h-display text-3xl text-pine sm:text-4xl">
            {meetOwner.heading}
          </h2>
          <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-loam/70">
            {meetOwner.body}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
