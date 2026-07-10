"use client";

import { useEffect, useRef } from "react";

type Source = { src: string; type: string };

type Props = {
  /** Ordered sources — HEVC first (Safari picks it, lighter on iPhones), H.264 fallback. */
  sources: readonly Source[];
  poster: string;
  label: string;
  className?: string;
};

/**
 * Showcase video (e.g. the aerial home flyover). Muted, looping, plays only while
 * on screen to save bandwidth; native controls stay available so the user can
 * pause/unmute/scrub. Autoplay is skipped under prefers-reduced-motion — the
 * poster stays put and the user presses play if they want it.
 */
export default function ShowcaseVideo({
  sources,
  poster,
  label,
  className = "",
}: Props) {
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
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      poster={poster}
      controls
      muted
      playsInline
      loop
      preload="none"
      aria-label={label}
      className={className}
    >
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
