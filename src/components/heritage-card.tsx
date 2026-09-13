import Link from "next/link";
import { CityScene } from "@/components/scenes/city-scene";
import type { HeritageSite } from "@/lib/kolkata/types";
import { cn } from "@/lib/utils";

export function HeritageCard({
  site,
  size = "md",
  index,
}: {
  site: HeritageSite;
  size?: "sm" | "md" | "lg";
  index?: number;
}) {
  return (
    <Link
      href={`/heritage/${site.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-terracotta/60"
    >
      <div
        className={cn(
          "relative overflow-hidden",
          size === "lg" ? "aspect-[16/10]" : size === "sm" ? "aspect-[3/2]" : "aspect-[4/3]",
        )}
      >
        <CityScene
          name={site.scene} photo={site.photo}
          detail="card"
          className="h-full w-full transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="scrim-bottom absolute inset-0" />
        <p className="absolute top-3 left-4 font-mono text-[0.6rem] tracking-[0.26em] text-cream/70">
          {site.builtYear}
        </p>
        {index !== undefined ? (
          <p className="absolute top-3 right-4 font-mono text-[0.6rem] text-cream/45">
            {String(index + 1).padStart(2, "0")}
          </p>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3 className="font-display text-xl leading-tight font-semibold text-cream sm:text-2xl">
            {site.name}
          </h3>
          <p className="mt-1 font-mono text-[0.62rem] tracking-[0.2em] text-marigold/85 uppercase">
            {site.neighbourhood}
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="flex-1 text-[0.9rem] leading-relaxed text-muted-foreground">
          {site.summary}
        </p>
        <p className="mt-3 font-mono text-[0.62rem] tracking-[0.18em] text-muted-foreground/70 uppercase">
          {site.style}
        </p>
      </div>
    </Link>
  );
}
