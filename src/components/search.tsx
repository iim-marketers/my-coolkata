"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SearchIcon } from "lucide-react";
import { searchCity } from "@/lib/search-index";
import { cn } from "@/lib/utils";

/** Cmd-K anywhere, or click the field. Everything is indexed client-side. */
export function Search({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchCity(q), [q]);

  const close = useCallback(() => {
    setOpen(false);
    setQ("");
    setCursor(0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 40);
    return () => clearTimeout(t);
  }, [open]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(results.length - 1, c + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    }
    if (e.key === "Enter" && results[cursor]) {
      window.location.href = results[cursor].href;
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground",
          className,
        )}
      >
        <SearchIcon className="size-3.5" />
        <span className="font-mono text-[0.62rem] tracking-[0.16em] uppercase">
          Search
        </span>
        <kbd className="ml-1 hidden rounded border border-border px-1.5 py-0.5 font-mono text-[0.56rem] sm:inline">
          ⌘K
        </kbd>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[80] bg-[oklch(0.1_0.014_50/0.72)] p-4 backdrop-blur-sm sm:p-10"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal
            aria-label="Search Kolkata"
            className="mx-auto mt-[6vh] max-w-2xl overflow-hidden rounded-lg border border-border bg-popover shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setCursor(0);
                }}
                onKeyDown={onListKey}
                placeholder="Bridges, biryani, Bagbazar…"
                className="w-full bg-transparent py-4 text-[0.95rem] outline-none placeholder:text-muted-foreground/60"
              />
              <kbd className="shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[0.56rem] text-muted-foreground">
                Esc
              </kbd>
            </div>

            {q.trim().length < 2 ? (
              <p className="px-4 py-8 text-center text-[0.86rem] text-muted-foreground">
                Search landmarks, food, neighbourhoods, events and stories.
              </p>
            ) : results.length === 0 ? (
              <p className="px-4 py-8 text-center text-[0.86rem] text-muted-foreground">
                Nothing for “{q}”.
              </p>
            ) : (
              <ul className="max-h-[54vh] overflow-y-auto py-2">
                {results.map((r, i) => (
                  <li key={r.id}>
                    <Link
                      href={r.href}
                      onClick={close}
                      onMouseEnter={() => setCursor(i)}
                      className={cn(
                        "flex gap-4 px-4 py-3 transition-colors",
                        i === cursor ? "bg-secondary" : "",
                      )}
                    >
                      <span className="mt-0.5 w-24 shrink-0 font-mono text-[0.56rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
                        {r.kind}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium">{r.title}</span>
                        <span className="mt-0.5 line-clamp-2 block text-[0.8rem] leading-snug text-muted-foreground">
                          {r.blurb}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
