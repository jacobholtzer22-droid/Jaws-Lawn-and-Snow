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

  return (
    <div
      role="img"
      aria-label={image.alt}
      className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-pine p-6 text-center ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(118deg, rgba(244,241,232,0.05) 0 14px, transparent 14px 28px)",
      }}
    >
      <ImageOff className="h-6 w-6 text-birch/55" aria-hidden="true" />
      <span className="max-w-[26ch] text-xs font-medium uppercase tracking-wider text-birch/70">
        {image.placeholderLabel}
      </span>
    </div>
  );
}
