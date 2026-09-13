import Link from "next/link";
import { CityScene } from "@/components/scenes/city-scene";
import type { Neighbourhood } from "@/lib/kolkata/types";

export function NeighbourhoodCard({ area }: { area: Neighbourhood }) {
  return (
    <Link
      href={`/neighbourhoods/${area.slug}`}
      className="group relative block h-full overflow-hidden rounded-lg border border-border transition-colors hover:border-terracotta/60"
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <CityScene
          name={area.scene}
          instance={`nb-${area.slug}`}
          detail="card"
          className="h-full w-full transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="scrim-bottom absolute inset-0" />
        <p className="absolute top-3 left-4 font-mono text-[0.58rem] tracking-[0.24em] text-cream/60 uppercase">
          {area.zone}
        </p>
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3 className="font-display text-xl leading-tight font-semibold text-cream">
            {area.name}
          </h3>
          <p className="mt-0.5 text-sm text-cream/60" lang="bn">
            {area.bengali}
          </p>
          <p className="mt-2 font-mono text-[0.6rem] tracking-[0.18em] text-marigold/85 uppercase">
            {area.knownFor}
          </p>
        </div>
      </div>
    </Link>
  );
}
