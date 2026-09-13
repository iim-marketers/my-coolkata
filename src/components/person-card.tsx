import Link from "next/link";
import type { Person } from "@/lib/kolkata/types";

/** Initials stand in for a portrait. */
function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export function PersonCard({ person }: { person: Person }) {
  return (
    <Link
      href={`/people/${person.slug}`}
      className="group flex h-full gap-5 rounded-lg border border-border bg-card p-5 transition-colors hover:border-terracotta/60"
    >
      <div
        aria-hidden
        className="flex size-14 shrink-0 items-center justify-center rounded-full border border-terracotta/30 bg-gradient-to-br from-terracotta/15 to-marigold/10 font-display text-lg font-semibold text-terracotta"
      >
        {initials(person.name)}
      </div>
      <div className="min-w-0">
        <h3 className="font-display text-lg leading-tight font-semibold">
          {person.name}
        </h3>
        <p className="mt-1 font-mono text-[0.62rem] tracking-[0.18em] text-muted-foreground uppercase">
          {person.died ? `${person.born}–${person.died}` : `b. ${person.born}`}
          <span className="mx-2 text-border">/</span>
          {person.field}
        </p>
        <p className="mt-3 text-[0.88rem] leading-relaxed text-muted-foreground">
          {person.summary}
        </p>
      </div>
    </Link>
  );
}
