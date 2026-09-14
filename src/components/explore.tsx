"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Compass, SearchIcon, X } from "lucide-react";
import { currentSeason } from "@/lib/kolkata/contest";
import { smartExamples, smartSearch } from "@/lib/smart-search";
import { cn } from "@/lib/utils";

/** The things people actually arrive wanting. */
const INTENTS = [
  {
    id: "place",
    icon: "📍",
    label: "Places",
    links: [
      { label: "Neighbourhoods", href: "/neighbourhoods" },
      { label: "Heritage", href: "/heritage" },
      { label: "The Hooghly", href: "/river" },
    ],
  },
  {
    id: "food",
    icon: "🍛",
    label: "Food",
    links: [
      { label: "Taste Kolkata", href: "/food" },
      { label: "Food map", href: "/food#map" },
      { label: "Sweets", href: "/food/rosogolla" },
    ],
  },
  {
    id: "story",
    icon: "📖",
    label: "Stories",
    links: [
      { label: "Stories", href: "/stories" },
      { label: "Literature", href: "/literature" },
      { label: "Cinema", href: "/cinema" },
    ],
  },
  {
    id: "hangouts",
    icon: "✨",
    label: "Hangouts",
    links: [
      { label: "Adda", href: "/adda" },
      { label: "The Tram", href: "/tram" },
      { label: "Football", href: "/football" },
      { label: "By mood", href: "/mood" },
    ],
  },
  {
    id: "do",
    icon: "📅",
    label: "Events",
    links: [
      {
        label: currentSeason.status === "soon" ? "Photo contest · soon" : "Photo contest",
        href: "/events",
      },
      { label: "Durga Puja", href: "/durga-puja" },
    ],
  },
];

/**
 * The Explore button and its search panel. The panel is portalled to
 * <body>: the nav bar uses backdrop-filter once the page scrolls, which
 * would otherwise trap a fixed overlay inside the 64px bar.
 */
export function ExploreButton({
  className,
  shortcut = true,
  block = false,
}: {
  className?: string;
  /** Only one instance on the page should own ⌘K. */
  shortcut?: boolean;
  /** Full-width, filled call to action (the mobile menu). */
  block?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const answer = useMemo(() => smartSearch(q), [q]);
  const searching = q.trim().length >= 2;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (shortcut && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shortcut]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setQ("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border transition-colors",
          block
            ? "h-12 w-full justify-center gap-2.5 border-foreground bg-foreground px-5 text-background shadow-[0_10px_24px_-14px_oklch(0.2_0.02_265/0.6)] hover:bg-foreground/90 active:scale-[0.99]"
            : "px-3.5 py-1.5",
          className,
        )}
      >
        <Compass className={block ? "size-4" : "size-3.5"} />
        <span
          className={cn(
            "font-mono tracking-[0.16em] uppercase",
            block ? "text-[0.74rem] font-medium" : "text-[0.62rem]",
          )}
        >
          {block ? "Explore Kolkata" : "Explore"}
        </span>
        {shortcut ? (
          <kbd className="ml-1 hidden rounded border border-current/25 px-1.5 py-0.5 font-mono text-[0.54rem] opacity-70 sm:inline">
            ⌘K
          </kbd>
        ) : null}
      </button>

      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-85 bg-[oklch(0.1_0.014_50/0.6)] px-3 pt-[10vh] backdrop-blur-sm sm:px-6"
              onClick={close}
            >
              <div
                role="dialog"
                aria-modal
                aria-label="Explore Kolkata"
                className="mx-auto flex max-h-[76vh] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Search first: it is the fastest way anywhere. */}
                <div className="flex items-center gap-3 border-b border-border px-4">
                  <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
                  <input
                    ref={inputRef}
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search places, food, events…"
                    className="w-full bg-transparent py-4 text-[0.95rem] outline-none placeholder:text-muted-foreground/60"
                  />
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                <div className="overflow-y-auto overscroll-contain p-2">
                  {searching ? (
                    <div className="p-2">
                      <p className="px-1 font-mono text-[0.56rem] tracking-[0.18em] text-terracotta uppercase">
                        {answer.reading}
                      </p>
                      {answer.note ? (
                        <p className="mt-1 px-1 text-[0.8rem] text-muted-foreground">
                          {answer.note}
                        </p>
                      ) : null}
                      {answer.results.length === 0 ? (
                        <p className="mt-3 px-1 text-[0.86rem] text-muted-foreground">
                          Nothing for that. Try a place, a dish or a name.
                        </p>
                      ) : (
                        <ul className="mt-2 space-y-0.5">
                          {answer.results.map((r) => (
                            <li key={r.id}>
                              <Link
                                href={r.href}
                                onClick={close}
                                className="flex items-baseline gap-3 rounded-lg px-2.5 py-2 transition-colors hover:bg-secondary"
                              >
                                {/* <span className="w-20 shrink-0 truncate font-mono text-[0.52rem] tracking-[0.12em] text-muted-foreground/70 uppercase">
                                  {r.kind}
                                </span> */}
                                <span className="min-w-0">
                                  <span className="block truncate text-[0.88rem] font-medium">
                                    {r.title}
                                  </span>
                                  <span className="block truncate text-[0.78rem] text-muted-foreground">
                                    {r.blurb}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <>
                      <ul>
                        {INTENTS.map((intent) => (
                          <li
                            key={intent.id}
                            className="flex items-start gap-3 rounded-lg px-2.5 py-2"
                          >
                            <span className="mt-0.5 text-base" aria-hidden>
                              {intent.icon}
                            </span>
                            <div className="min-w-0">
                              <p className="text-[0.8rem] font-semibold">
                                {intent.label}
                              </p>
                              <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5">
                                {intent.links.map((l) => (
                                  <Link
                                    key={l.href}
                                    href={l.href}
                                    onClick={close}
                                    className="text-[0.82rem] text-muted-foreground transition-colors hover:text-terracotta"
                                  >
                                    {l.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-1 border-t border-border px-2.5 pt-3 pb-2">
                        <p className="font-mono text-[0.54rem] tracking-[0.18em] text-muted-foreground/70 uppercase">
                          Try asking
                        </p>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {smartExamples.map((ex) => (
                            <li key={ex}>
                              <button
                                type="button"
                                onClick={() => setQ(ex)}
                                className="rounded-full border border-border px-2.5 py-0.5 text-[0.72rem] text-muted-foreground transition-colors hover:border-terracotta hover:text-foreground"
                              >
                                {ex}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
