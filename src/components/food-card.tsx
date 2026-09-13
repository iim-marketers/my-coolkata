import Link from "next/link";
import { CityScene } from "@/components/scenes/city-scene";
import type { Dish } from "@/lib/kolkata/types";

export function FoodCard({ dish }: { dish: Dish }) {
  return (
    <Link
      href={`/food/${dish.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-terracotta/60"
    >
      <CityScene
        name={dish.scene}
        photo={dish.photo}
        detail="card"
        className="aspect-[16/10] w-full [&_img]:transition-transform [&_img]:duration-[1400ms] [&_img]:ease-out group-hover:[&_img]:scale-[1.06]"
      />
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-xl leading-tight font-semibold">
                {dish.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground" lang="bn">
                {dish.bengali}
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-border px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.16em] text-muted-foreground uppercase">
              {dish.category}
            </span>
          </div>
          <p className="mt-4 text-[0.9rem] leading-relaxed text-muted-foreground">
            {dish.summary}
          </p>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-border pt-4 text-[0.78rem]">
          <div>
            <dt className="font-mono text-[0.58rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
              Price
            </dt>
            <dd className="mt-0.5 font-medium">{dish.price}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.58rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
              {dish.season ? "Season" : "Best in"}
            </dt>
            <dd className="mt-0.5 font-medium">{dish.season ?? dish.bestIn}</dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}
