"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";
import { searchCity } from "@/lib/search-index";
import { cn } from "@/lib/utils";

const SUGGESTIONS = ["Tagore", "Ray", "Partition", "Vidyasagar", "rosogolla", "tram"];

/**
 * Type a name and get back the places in the city attached to it. Runs on
 * the same index as the site search, filtered to things you can stand in
 * front of.
 */
const PLACE_KINDS = new Set([
  "Heritage",
  "Neighbourhood",
  "Where to eat",
  "People",
  "Food",
]);

export function FindABook({ className }: { className?: string }) {
  const [q, setQ] = useState("Tagore");

  const results = useMemo(() => {
    const all = searchCity(q, 40);
    const places = all.filter((r) => PLACE_KINDS.has(r.kind));
    return { places: places.slice(0, 8), other: all.filter((r) => !PLACE_KINDS.has(r.kind)).slice(0, 4) };
  }, [q]);

  return (
    <div className={cn("rounded-lg border border-border bg-card p-6 sm:p-8", className)}>
      <p className="font-mono text-[0.6rem] tracking-[0.26em] text-primary uppercase">
        Find a book
      </p>
      <h3 className="mt-3 font-display text-[clamp(1.5rem,3.6vw,2.2rem)] font-semibold">
        Name a writer. Get the addresses.
      </h3>
      <p className="mt-3 max-w-xl text-[0.92rem] leading-relaxed text-muted-foreground">
        The stallholders on College Street do this from memory. This does it
        from an index, and gives you the places in the city attached to
        whatever you type.
      </p>

      <div className="mt-6 flex items-center gap-3 rounded-md border border-border bg-background px-4">
        <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tagore, Ray, Partition, hilsa…"
          aria-label="Find a book"
          className="w-full bg-transparent py-3.5 text-[0.95rem] outline-none placeholder:text-muted-foreground/60"
        />
      </div>

      <ul className="mt-3 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <li key={s}>
            <button
              type="button"
              onClick={() => setQ(s)}
              className={cn(
                "rounded-full border px-3 py-1 font-mono text-[0.56rem] tracking-[0.14em] uppercase transition-colors",
                q === s
                  ? "border-terracotta text-terracotta"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {s}
            </button>
          </li>
        ))}
      </ul>

      {q.trim().length < 2 ? (
        <p className="mt-8 text-[0.88rem] text-muted-foreground">
          Type at least two letters.
        </p>
      ) : results.places.length === 0 && results.other.length === 0 ? (
        <p className="mt-8 text-[0.88rem] text-muted-foreground">
          Nothing for &ldquo;{q}&rdquo;. The stallholder would have found
          something.
        </p>
      ) : (
        <div className="mt-8 space-y-6">
          {results.places.length > 0 ? (
            <div>
              <p className="font-mono text-[0.54rem] tracking-[0.18em] text-muted-foreground/70 uppercase">
                Places in the city
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {results.places.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={r.href}
                      className="block rounded-md border border-border p-3 transition-colors hover:border-terracotta/60 hover:bg-terracotta/5"
                    >
                      <span className="block text-[0.88rem] font-medium">
                        {r.title}
                      </span>
                      <span className="mt-0.5 block font-mono text-[0.52rem] tracking-[0.14em] text-terracotta uppercase">
                        {r.kind}
                      </span>
                      <span className="mt-1 line-clamp-2 block text-[0.8rem] leading-snug text-muted-foreground">
                        {r.blurb}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {results.other.length > 0 ? (
            <div>
              <p className="font-mono text-[0.54rem] tracking-[0.18em] text-muted-foreground/70 uppercase">
                And elsewhere on the site
              </p>
              <ul className="mt-3 space-y-1.5">
                {results.other.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={r.href}
                      className="text-[0.88rem] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {r.title}
                      <span className="ml-2 font-mono text-[0.52rem] tracking-[0.14em] text-muted-foreground/50 uppercase">
                        {r.kind}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
