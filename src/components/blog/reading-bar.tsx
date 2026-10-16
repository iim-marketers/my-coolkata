"use client";

import { useEffect, useRef, useState } from "react";
import { onEnter } from "@/lib/enter";
import { cn } from "@/lib/utils";

export function ReadingBar({
  chapters,
  steps,
}: {
  chapters: { id: string; label: string }[];
  steps: { id: string; label: string }[];
}) {
  const [active, setActive] = useState(chapters[0]?.id);
  const [step, setStep] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const rail = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const article = document.getElementById("article");
    if (!article) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const { top, height } = article.getBoundingClientRect();
      const span = height - window.innerHeight;
      setProgress(span > 0 ? Math.min(1, Math.max(0, -top / span)) : 1);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const band = { rootMargin: "-40% 0px -55% 0px" };
    const sections = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
    }, band);
    const stepWatch = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) setStep(steps.findIndex((s) => s.id === e.target.id));
      }
    }, band);
    for (const c of chapters) {
      const el = document.getElementById(c.id);
      if (el) sections.observe(el);
    }
    for (const s of steps) {
      const el = document.getElementById(s.id);
      if (el) stepWatch.observe(el);
    }
    return () => {
      sections.disconnect();
      stepWatch.disconnect();
    };
  }, [chapters, steps]);

  useEffect(() => {
    let io: IntersectionObserver | undefined;
    const cancel = onEnter(() => {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            e.target.setAttribute("data-on", "");
            io?.unobserve(e.target);
          }
        },
        { rootMargin: "0px 0px -18% 0px", threshold: 1 },
      );
      document.querySelectorAll("#article mark[data-hl]").forEach((m) => io?.observe(m));
    });
    return () => {
      cancel();
      io?.disconnect();
    };
  }, []);

  useEffect(() => {
    const chip = rail.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    const list = rail.current;
    if (!chip || !list) return;
    list.scrollTo({
      left: chip.offsetLeft - list.clientWidth / 2 + chip.clientWidth / 2,
      behavior: "smooth",
    });
  }, [active]);

  const inProcess = active === "how-durga-idols-are-made" && step !== null && step >= 0;

  return (
    <div className="sticky top-16 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <nav
        aria-label="In this article"
        className="mx-auto flex h-12 w-full max-w-352 items-center gap-3 px-5 sm:px-8"
      >
        <ul
          ref={rail}
          className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {chapters.map((c) => {
            const on = c.id === active;
            return (
              <li key={c.id} data-id={c.id} className="shrink-0">
                <a
                  href={`#${c.id}`}
                  aria-current={on ? "location" : undefined}
                  className={cn(
                    "block rounded-full px-3 py-1 text-[0.8rem] font-medium whitespace-nowrap transition-colors",
                    on
                      ? "bg-ink text-cream"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {c.label}
                </a>
              </li>
            );
          })}
        </ul>

        <p
          aria-live="polite"
          className={cn(
            "hidden shrink-0 items-center gap-2 rounded-full border border-terracotta/30 bg-terracotta/5 px-3 py-1 text-[0.72rem] font-semibold text-terracotta transition-opacity duration-300 md:flex",
            inProcess ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <span className="font-mono tracking-wider">
            {String((step ?? 0) + 1).padStart(2, "0")}/{String(steps.length).padStart(2, "0")}
          </span>
          <span className="max-w-56 truncate">{steps[step ?? 0]?.label}</span>
        </p>
      </nav>

      <div
        aria-hidden
        className="absolute inset-x-0 -bottom-px h-0.75 origin-left bg-linear-to-r from-marigold via-terracotta to-alta"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
