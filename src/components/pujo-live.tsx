"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePujoPhase } from "@/components/use-pujo-phase";
import { cn } from "@/lib/utils";

/** The Puja call to action; points at the pandal map while the festival runs. */
export function PujoCta({ className }: { className?: string }) {
  const live = usePujoPhase(60000)?.phase.kind === "festival";

  return (
    <Link
      href={live ? "/durga-puja#pandals" : "/durga-puja"}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full bg-marigold px-6 py-3 text-[0.92rem] font-semibold text-ink transition-transform hover:-translate-y-0.5",
        className,
      )}
    >
      {live ? "Find a pandal tonight" : "Enter the Puja"}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

/** Marks the row of the day timeline that is today. */
export function PujoTodayBadge({ offset }: { offset: number }) {
  const phase = usePujoPhase(60000)?.phase;
  const today =
    phase?.kind === "festival"
      ? phase.today.offset
      : phase?.kind === "countdown"
        ? phase.today?.offset
        : undefined;
  if (today !== offset) return null;

  return (
    <span className="rounded-full bg-terracotta px-2 py-0.5 font-mono text-[0.54rem] tracking-[0.16em] text-white uppercase">
      Today
    </span>
  );
}
