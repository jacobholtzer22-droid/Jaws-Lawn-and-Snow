"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  /** Render as a different element (e.g. "li", "figure"). Default "div". */
  as?: ElementType;
  /** Stagger delay in ms (applied to the reveal transition only). */
  delay?: number;
  className?: string;
};

/**
 * Progressive-enhancement scroll reveal — transform/opacity only.
 *
 * - Server / no-JS / reduced-motion: renders children fully visible with NO
 *   transform, so content is never hidden without JavaScript.
 * - After mount, JS hides ONLY elements that are below the fold, then fades +
 *   lifts them in once they scroll into view. Anything already in (or above)
 *   the viewport at mount is left visible and untouched.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [armed, setArmed] = useState(false); // JS took control of this element
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // stay fully visible — no animation
    }

    // Never hide an element that is already in (or above) the viewport.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setArmed(true); // now in the hidden pre-reveal state
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const anim = armed
    ? `transition-[opacity,transform] duration-500 ease-out will-change-[opacity,transform] ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`
    : ""; // not armed → fully visible, no transform

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={`${anim} ${className}`.trim()}
      style={armed && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
