import Image from "next/image";
import { ImageOff } from "lucide-react";
import type { SiteImage } from "@/site.config";

type Props = {
  image: SiteImage;
  /** Use fill layout (parent must be relative + sized). Default true. */
  fill?: boolean;
  /** Passed to next/image when fill. */
  sizes?: string;
  /** Prioritize loading (use for the hero only). */
  priority?: boolean;
  /** Extra classes on the <img> / placeholder root. */
  className?: string;
  /**
   * Where the placeholder label sits.
   * 'center' (default) for self-contained image boxes.
   * 'top' for full-bleed heroes — keeps the label out of the headline/copy zone.
   */
  align?: "center" | "top";
};

/**
 * Renders the real photo once `image.src` is set in the config manifest.
 * Until then, renders a labeled placeholder so it's obvious which photo goes
 * where — drop the file in /public/images, set the src in site.config.ts, done.
 */
export default function ImagePlaceholder({
  image,
  fill = true,
  sizes = "100vw",
  priority = false,
  className = "",
  align = "center",
}: Props) {
  if (image.src) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }

  const isTop = align === "top";

  return (
    <div
      role="img"
      aria-label={image.alt}
      className={`flex h-full w-full flex-col items-center gap-2 bg-pine p-6 text-center ${
        isTop ? "justify-start pt-24" : "justify-center"
      } ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(118deg, rgba(244,241,232,0.05) 0 14px, transparent 14px 28px)",
      }}
    >
      {isTop ? (
        /* Compact pill near the top — never overlaps the bottom-anchored hero copy. */
        <span className="inline-flex items-center gap-2 rounded-full bg-loam/55 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-birch/70 backdrop-blur-sm">
          <ImageOff className="h-4 w-4 shrink-0" aria-hidden="true" />
          {image.placeholderLabel}
        </span>
      ) : (
        <>
          <ImageOff className="h-6 w-6 text-birch/55" aria-hidden="true" />
          <span className="max-w-[26ch] text-xs font-medium uppercase tracking-wider text-birch/70">
            {image.placeholderLabel}
          </span>
        </>
      )}
    </div>
  );
}
