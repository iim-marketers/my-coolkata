"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { people } from "@/lib/kolkata";
import { personGroups } from "@/lib/kolkata/types";
import type { Person, PersonGroup } from "@/lib/kolkata/types";
import { cn } from "@/lib/utils";

/** Initials stand in for a portrait; there are no photographs here. */
function initials(name: string) {
  const words = name.split(" ").filter((w) => w.length > 2);
  return (words[0]?.[0] ?? "") + (words[words.length - 1]?.[0] ?? "");
}

/** A deterministic tint per person, so the wall reads as a wall. */
function tint(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) % 360;
  return h;
}

export function PortraitWall({ className }: { className?: string }) {
  const [group, setGroup] = useState<PersonGroup | "all">("all");

  const shown = useMemo(
    () => (group === "all" ? people : people.filter((p) => p.group === group)),
    [group],
  );

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setGroup("all")}
          aria-pressed={group === "all"}
          className={cn(
            "rounded-full border px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.16em] uppercase transition-colors",
            group === "all"
              ? "border-foreground/25 bg-secondary text-foreground"
              : "border-border text-muted-foreground hover:text-foreground",
          )}
        >
          All {people.length}
        </button>
        {personGroups.map((g) => {
          const n = people.filter((p) => p.group === g.id).length;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => setGroup(g.id)}
              aria-pressed={group === g.id}
              className={cn(
                "rounded-full border px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.16em] uppercase transition-colors",
                group === g.id
                  ? "border-foreground/25 bg-secondary text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {g.label}
              <span className="ml-2 text-muted-foreground/50">{n}</span>
            </button>
          );
        })}
      </div>

      {group !== "all" ? (
        <p className="mt-5 max-w-2xl text-[0.94rem] leading-relaxed text-muted-foreground">
          {personGroups.find((g) => g.id === group)?.line}
        </p>
      ) : null}

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {shown.map((person) => (
          <li key={person.slug}>
            <PortraitTile person={person} />
          </li>
        ))}
      </ul>

      <p className="mt-6 font-mono text-[0.58rem] tracking-[0.14em] text-muted-foreground/60 uppercase">
        {shown.length} of {people.length} · ordered by year of birth
      </p>
    </div>
  );
}

export function PortraitTile({ person }: { person: Person }) {
  const h = tint(person.slug);
  return (
    <Link
      href={`/people/${person.slug}`}
      className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-lg border border-border p-4 transition-colors hover:border-terracotta/60"
      style={{
        background: `linear-gradient(160deg, oklch(0.42 0.07 ${h} / 0.22), oklch(0.3 0.05 ${(h + 40) % 360} / 0.1))`,
      }}
    >
      {/* The initials sit behind the name, very large and very faint. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-3 text-center font-display text-[clamp(3.5rem,11vw,5.5rem)] leading-none font-semibold text-foreground/10 transition-transform duration-700 group-hover:scale-110"
      >
        {initials(person.name)}
      </span>
      <span className="relative">
        <span className="block font-display text-[0.98rem] leading-tight font-semibold">
          {person.name}
        </span>
        <span className="mt-1 block font-mono text-[0.54rem] tracking-[0.12em] tabular-nums text-muted-foreground">
          {person.died ? `${person.born}–${person.died}` : `b. ${person.born}`}
        </span>
        <span className="mt-1.5 block text-[0.74rem] leading-snug text-muted-foreground">
          {person.field}
        </span>
      </span>
    </Link>
  );
}
