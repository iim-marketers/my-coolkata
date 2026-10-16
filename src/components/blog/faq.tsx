"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();

  return (
    <div className="border-t border-border">
      {items.map((item, i) => {
        const on = open === i;
        return (
          <Reveal key={item.q} delay={i * 50} className="border-b border-border">
            <h3>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={on}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(on ? null : i)}
                className="group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
              >
                <span
                  className={cn(
                    "font-display text-[1.12rem] leading-snug font-semibold transition-colors duration-300 sm:text-[1.24rem]",
                    on ? "text-terracotta" : "group-hover:text-terracotta",
                  )}
                >
                  {item.q}
                </span>
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none",
                    on
                      ? "rotate-135 border-terracotta bg-terracotta text-cream"
                      : "border-border bg-card group-hover:border-terracotta/50",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-a${i}`}
              role="region"
              aria-labelledby={`${id}-q${i}`}
              data-faq-panel=""
              inert={!on}
              className={cn(
                "grid transition-[grid-template-rows] duration-500 motion-reduce:transition-none",
                ease,
                on ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p
                  className={cn(
                    "pr-12 pb-6 text-[1rem] leading-relaxed text-muted-foreground transition-[opacity,transform] duration-500 motion-reduce:transition-none",
                    ease,
                    on ? "translate-y-0 opacity-100 delay-100" : "-translate-y-2 opacity-0",
                  )}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
