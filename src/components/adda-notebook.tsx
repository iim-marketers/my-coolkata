"use client";

import Link from "next/link";
import { useState } from "react";
import { addaTopics } from "@/lib/kolkata/adda";
import { cn } from "@/lib/utils";

/**
 * The notebook. Ruled paper, a coffee ring, and six topics that will each
 * take two hours and settle nothing.
 */
export function AddaNotebook({ className }: { className?: string }) {
  const [id, setId] = useState(addaTopics[0].id);
  const topic = addaTopics.find((t) => t.id === id)!;

  return (
    <div className={className}>
      <p className="font-display text-[clamp(1.3rem,3.4vw,2rem)] leading-snug">
        What&rsquo;s your adda topic?
      </p>

      <ul className="mt-6 flex flex-wrap gap-2.5">
        {addaTopics.map((t) => {
          const on = t.id === id;
          return (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => setId(t.id)}
                aria-pressed={on}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.86rem] transition-colors",
                  on
                    ? "border-terracotta bg-terracotta/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                )}
              >
                <span aria-hidden className="text-base">
                  {t.icon}
                </span>
                {t.label}
              </button>
            </li>
          );
        })}
      </ul>

      {/* The page. Ruled lines, a margin, and a stain. */}
      <div
        key={topic.id}
        className="relative mt-8 overflow-hidden rounded-lg border border-border bg-[oklch(0.97_0.022_88)] text-[oklch(0.24_0.03_58)] shadow-sm dark:bg-[oklch(0.22_0.02_70)] dark:text-[oklch(0.9_0.02_82)]"
        style={{ animation: "rise-in 450ms ease both" }}
      >
        {/* Ruled lines. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-45"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0 31px, color-mix(in oklch, currentColor 22%, transparent) 31px 32px)",
          }}
        />
        {/* Margin rule. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-10 w-px bg-alta/40 sm:left-16"
        />
        {/* Coffee ring. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-8 -right-10 size-44 rounded-full border-[10px] border-[oklch(0.45_0.07_58/0.14)] blur-[1px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-24 right-24 size-24 rounded-full border-[7px] border-[oklch(0.45_0.07_58/0.1)]"
        />

        <div className="relative px-6 py-8 pl-14 sm:px-10 sm:py-12 sm:pl-24">
          <p className="font-mono text-[0.58rem] tracking-[0.24em] text-alta uppercase">
            {topic.label}
            {topic.bengali ? (
              <span className="ml-3 tracking-normal normal-case" lang="bn">
                {topic.bengali}
              </span>
            ) : null}
          </p>
          <p className="mt-4 max-w-2xl font-display text-[clamp(1.15rem,3vw,1.6rem)] leading-snug">
            {topic.opener}
          </p>

          <ol className="mt-9 space-y-8">
            {topic.positions.map((pos, i) => (
              <li key={pos.claim}>
                <div className="flex gap-4">
                  <span className="mt-1 font-mono text-[0.6rem] opacity-50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="max-w-2xl">
                    <p className="font-display text-[1.1rem] leading-snug font-semibold">
                      &ldquo;{pos.claim}&rdquo;
                    </p>
                    <p className="mt-2 text-[0.94rem] leading-[1.7] opacity-80">
                      {pos.counter}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-current/15 pt-6">
            <div>
              <p className="font-mono text-[0.54rem] tracking-[0.18em] uppercase opacity-60">
                Where this gets argued
              </p>
              <ul className="mt-2 space-y-1">
                {topic.venues.map((v) => (
                  <li key={v} className="text-[0.88rem] opacity-85">
                    {v}
                  </li>
                ))}
              </ul>
            </div>
            {topic.seeAlso ? (
              <Link
                href={topic.seeAlso.href}
                className="font-mono text-[0.6rem] tracking-[0.18em] text-alta uppercase hover:underline"
              >
                {topic.seeAlso.label} →
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
