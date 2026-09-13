"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { smartSearch } from "@/lib/smart-search";
import { cn } from "@/lib/utils";

/**
 * Each category narrows results to the routes it covers, and is where an
 * empty search lands.
 */
const CATEGORIES = [
  { id: "all", label: "Everything", href: "/neighbourhoods", prefixes: [] },
  { id: "food", label: "Food & drinks", href: "/food", prefixes: ["/food", "/famous-for"] },
  {
    id: "places",
    label: "Places",
    href: "/neighbourhoods",
    prefixes: ["/neighbourhoods", "/heritage", "/river", "/tram", "/map", "/college-street", "/kumartuli"],
  },
  { id: "events", label: "Events & Puja", href: "/events", prefixes: ["/events", "/durga-puja", "/today"] },
  {
    id: "culture",
    label: "Culture",
    href: "/culture",
    prefixes: ["/culture", "/cinema", "/literature", "/football", "/adda", "/stories", "/gallery", "/mood"],
  },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

/** The hero's search bar: a query, a category, and live suggestions under it. */
export function HeroSearch({ className }: { className?: string }) {
  const router = useRouter();
  const listId = useId();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CategoryId>("all");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const category = CATEGORIES.find((c) => c.id === cat) ?? CATEGORIES[0];

  const results = useMemo(() => {
    if (q.trim().length < 2) return [];
    const prefixes: readonly string[] = category.prefixes;
    return smartSearch(q)
      .results.filter(
        (r) => prefixes.length === 0 || prefixes.some((p) => r.href.startsWith(p)),
      )
      .slice(0, 6);
  }, [q, category]);

  const showList = open && q.trim().length >= 2;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pick = results[active] ?? results[0];
    setOpen(false);
    router.push(pick ? pick.href : category.href);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.max(0, Math.min(i + 1, results.length - 1)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <form role="search" onSubmit={onSubmit} className={cn("relative", className)}>
      <div className="flex flex-col gap-1 rounded-3xl border border-border bg-card p-2 shadow-[0_22px_60px_-24px_oklch(0.25_0.04_265/0.35)] sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:p-1.5">
        <label className="flex min-w-0 flex-1 items-center gap-3 px-3 sm:pl-5">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <span className="sr-only">Search Cool-kata</span>
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onKeyDown={onKeyDown}
            role="combobox"
            aria-expanded={showList}
            aria-controls={listId}
            aria-autocomplete="list"
            placeholder="Phuchka, pandals, sunset spots…"
            className="h-11 w-full min-w-0 bg-transparent text-[0.95rem] outline-none placeholder:text-muted-foreground/70"
          />
        </label>

        <span aria-hidden className="hidden h-7 w-px bg-border sm:block" />

        <label className="flex items-center border-t border-border px-3 sm:w-44 sm:border-t-0 sm:px-4">
          <span className="sr-only">Category</span>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value as CategoryId)}
            className="h-11 w-full cursor-pointer bg-transparent text-[0.9rem] text-foreground outline-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-[0.92rem] font-semibold text-primary-foreground transition-[background-color,transform] hover:bg-primary/90 active:scale-[0.98] sm:rounded-full"
        >
          <Search className="size-4" />
          Search
        </button>
      </div>

      {showList ? (
        <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-xl">
          {results.length === 0 ? (
            <p className="px-5 py-4 text-[0.88rem] text-muted-foreground">
              Nothing yet for “{q.trim()}”. Try a dish, a para or a festival.
            </p>
          ) : (
            <ul id={listId} role="listbox" className="py-1.5">
              {results.map((r, i) => (
                <li key={r.id} role="option" aria-selected={i === active}>
                  <Link
                    href={r.href}
                    // Keep focus in the input so the click lands before blur closes the list.
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setOpen(false)}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      "flex items-center gap-3 px-5 py-2.5 transition-colors",
                      i === active && "bg-secondary",
                    )}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.92rem] font-medium">
                        {r.title}
                      </span>
                      <span className="block truncate text-[0.78rem] text-muted-foreground">
                        {r.blurb}
                      </span>
                    </span>
                    <span className="hidden max-w-32 shrink-0 truncate rounded-full bg-accent px-2.5 py-0.5 text-[0.68rem] font-medium text-accent-foreground sm:inline">
                      {r.kind}
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </form>
  );
}
