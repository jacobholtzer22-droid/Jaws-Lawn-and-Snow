"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster?: string;
  label: string;
  className?: string;
};

/**
 * Service video. Plays muted + loops while it's on screen (paused otherwise) for
 * engagement without wasting bandwidth; native controls stay available so the
 * user can pause/unmute/scrub. Autoplay is skipped under prefers-reduced-motion.
 */
export default function StumpVideo({ src, poster, label, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            v.muted = true;
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      controls
      playsInline
      loop
      preload="metadata"
      aria-label={label}
      className={className}
    />
  );
}
