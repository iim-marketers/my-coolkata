"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades and lifts its children the first time they enter the viewport.
 * The city is meant to arrive gradually rather than all at once.
 *
 * Reduced motion is handled in CSS rather than by branching on
 * `matchMedia`, and the `data-reveal` hook lets the `<noscript>` rule in
 * the root layout force everything visible when JavaScript never runs.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  id,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Set when the block is a link target, so `#slug` scrolls to it. */
  id?: string;
  as?: "div" | "li" | "section" | "article" | "header";
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      id={id}
      data-reveal=""
      className={cn(
        "transition-[opacity,transform] duration-[900ms] ease-out",
        "motion-reduce:translate-y-0! motion-reduce:opacity-100! motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
