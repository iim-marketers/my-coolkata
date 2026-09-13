"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Compass, SearchIcon, X } from "lucide-react";
import { smartExamples, smartSearch } from "@/lib/smart-search";
import { cn } from "@/lib/utils";

/** The six things people actually arrive wanting. */
const INTENTS = [
  {
    id: "place",
    icon: "📍",
    label: "A place",
    line: "Twenty-seven quarters and twenty-two buildings.",
    links: [
      { label: "Neighbourhoods", href: "/neighbourhoods" },
      { label: "Heritage", href: "/heritage" },
      { label: "Hidden Kolkata", href: "/hidden" },
      { label: "The map", href: "/map" },
    ],
  },
  {
    id: "story",
    icon: "📖",
    label: "A story",
    line: "Thirteen longer reads, about people as much as places.",
    links: [
      { label: "Stories", href: "/stories" },
      { label: "The City of Words", href: "/literature" },
      { label: "Kolkata in cinema", href: "/cinema" },
      { label: "Adda", href: "/adda" },
    ],
  },
  {
    id: "food",
    icon: "🍛",
    label: "Food",
    line: "A plate, a map of thirty-five places, and a trail built for you.",
    links: [
      { label: "Taste Kolkata", href: "/food" },
      { label: "The food map", href: "/food#map" },
      { label: "Sweets", href: "/food/rosogolla" },
      { label: "Where to eat tonight", href: "/build-my-day" },
    ],
  },
  {
    id: "history",
    icon: "🏛️",
    label: "History",
    line: "1495 to now, and a year slider that regrades the whole site.",
    links: [
      { label: "Timeline", href: "/timeline" },
      { label: "Through Time", href: "/through-time" },
      { label: "Then and now", href: "/then-and-now" },
      { label: "Architecture", href: "/architecture" },
    ],
  },
  {
    id: "people",
    icon: "👤",
    label: "People",
    line: "Twenty-five lives, on one wall.",
    links: [
      { label: "The portrait wall", href: "/people" },
      { label: "Football Kolkata", href: "/football" },
      { label: "Kolkata Sounds", href: "/sounds" },
      { label: "Faces of Kolkata", href: "/gallery" },
    ],
  },
  {
    id: "do",
    icon: "🧭",
    label: "Things to do",
    line: "By mood, by hour, or by how long you have.",
    links: [
      { label: "Kolkata by mood", href: "/mood" },
      { label: "Build my day", href: "/build-my-day" },
      { label: "A day in Kolkata", href: "/a-day-in-kolkata" },
      { label: "Kolkata Today", href: "/today" },
    ],
  },
];

/**
 * The persistent Explore button. It answers "what are you looking for?"
 * with six doors, and takes a question in plain language underneath.
 */
export function ExploreButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const answer = useMemo(() => smartSearch(q), [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 60);
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
          "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 transition-colors",
          className,
        )}
      >
        <Compass className="size-3.5" />
        <span className="font-mono text-[0.62rem] tracking-[0.16em] uppercase">
          Explore
        </span>
        <kbd className="ml-1 hidden rounded border border-current/25 px-1.5 py-0.5 font-mono text-[0.54rem] opacity-70 sm:inline">
          ⌘K
        </kbd>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[85] overflow-y-auto bg-[oklch(0.1_0.014_50/0.78)] p-4 backdrop-blur-sm sm:p-8"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal
            aria-label="Explore Kolkata"
            className="mx-auto mt-[4vh] mb-16 max-w-3xl overflow-hidden rounded-lg border border-border bg-popover shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6 border-b border-border p-6 sm:p-8">
              <div>
                <p className="font-mono text-[0.6rem] tracking-[0.26em] text-primary uppercase">
                  Explore Kolkata
                </p>
                <h2 className="mt-3 font-display text-[clamp(1.4rem,3.6vw,2rem)] font-semibold">
                  What are you looking for?
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Six doors. */}
            <ul className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {INTENTS.map((intent) => (
                <li key={intent.id} className="bg-popover p-5">
                  <p className="text-xl" aria-hidden>
                    {intent.icon}
                  </p>
                  <p className="mt-2 font-display text-[1.05rem] font-semibold">
                    {intent.label}
                  </p>
                  <p className="mt-1 text-[0.82rem] leading-snug text-muted-foreground">
                    {intent.line}
                  </p>
                  <ul className="mt-3 space-y-1">
                    {intent.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          onClick={close}
                          className="text-[0.84rem] text-muted-foreground transition-colors hover:text-terracotta"
                        >
                          {l.label} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            {/* Or ask it a question. */}
            <div className="border-t border-border p-6 sm:p-8">
              <p className="font-mono text-[0.58rem] tracking-[0.22em] text-muted-foreground uppercase">
                Or ask in plain language
              </p>
              <div className="mt-4 flex items-center gap-3 rounded-md border border-border bg-background px-4">
                <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="old buildings near College Street"
                  className="w-full bg-transparent py-3.5 text-[0.95rem] outline-none placeholder:text-muted-foreground/60"
                />
              </div>

              <ul className="mt-3 flex flex-wrap gap-2">
                {smartExamples.map((ex) => (
                  <li key={ex}>
                    <button
                      type="button"
                      onClick={() => setQ(ex)}
                      className="rounded-full border border-border px-3 py-1 text-[0.74rem] text-muted-foreground transition-colors hover:border-terracotta hover:text-foreground"
                    >
                      {ex}
                    </button>
                  </li>
                ))}
              </ul>

              {q.trim().length >= 2 ? (
                <div className="mt-6">
                  <p className="font-mono text-[0.56rem] tracking-[0.18em] text-terracotta uppercase">
                    {answer.reading}
                  </p>
                  {answer.note ? (
                    <p className="mt-1.5 text-[0.8rem] text-muted-foreground">
                      {answer.note}
                    </p>
                  ) : null}
                  {answer.results.length === 0 ? (
                    <p className="mt-4 text-[0.86rem] text-muted-foreground">
                      Nothing for that. Try one of the examples above.
                    </p>
                  ) : (
                    <ul className="mt-4 max-h-[40vh] space-y-1.5 overflow-y-auto">
                      {answer.results.map((r) => (
                        <li key={r.id}>
                          <Link
                            href={r.href}
                            onClick={close}
                            className="flex gap-4 rounded-md p-2.5 transition-colors hover:bg-secondary"
                          >
                            <span className="w-28 shrink-0 font-mono text-[0.54rem] tracking-[0.14em] text-muted-foreground/70 uppercase">
                              {r.kind}
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[0.88rem] font-medium">
                                {r.title}
                              </span>
                              <span className="mt-0.5 line-clamp-1 block text-[0.8rem] text-muted-foreground">
                                {r.blurb}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
