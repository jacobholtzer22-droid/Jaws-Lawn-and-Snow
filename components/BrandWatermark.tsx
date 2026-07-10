import Image from "next/image";
import { site } from "@/site.config";

type Props = {
  /** cream = for dark bands, navy = for light bands. */
  tone?: "cream" | "navy";
  /** Positioning + size + opacity utilities (the element is absolutely positioned). */
  className?: string;
};

/**
 * Decorative shark-mark watermark from the Jaws logo. Purely visual (aria-hidden),
 * absolutely positioned and non-interactive — drop it into a `relative
 * overflow-hidden` container and set placement/size/opacity via className.
 */
export default function BrandWatermark({ tone = "cream", className = "" }: Props) {
  const src = tone === "cream" ? site.business.markCream : site.business.markNavy;
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={640}
      height={338}
      className={`pointer-events-none absolute -z-10 select-none ${className}`}
      style={{ height: "auto" }}
    />
  );
}
