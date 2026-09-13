import Link from "next/link";
import { MapPin } from "lucide-react";
import { FoodCutout } from "@/components/food/food-cutout";
import { CityScene } from "@/components/scenes/city-scene";
import type { Dish } from "@/lib/kolkata/types";
import { cn } from "@/lib/utils";

/** The glow under each dish, so a card reads its category before its words. */
const HALO: Record<Dish["category"], string> = {
  breakfast: "bg-shorshe/50",
  street: "bg-marigold/45",
  meal: "bg-kansa/55",
  sweet: "bg-alta/25",
  drink: "bg-terracotta/30",
};

/**
 * A kantha-stitched card: the dish, its name, and where to find it. The dish
 * is a cutout that sits above the card and breaks out of its top.
 */
export function FoodCard({ dish }: { dish: Dish }) {
  return (
    <Link
      href={`/food/${dish.slug}`}
      className="group relative flex h-full flex-col pt-28 focus-visible:outline-none sm:pt-32"
    >
      <div className="kantha relative flex flex-1 flex-col rounded-[1.4rem] bg-khadi px-6 pt-28 pb-6 shadow-[0_1px_0_oklch(0.3_0.05_50/0.08),0_22px_44px_-30px_oklch(0.3_0.05_50/0.5)] transition-transform duration-500 group-hover:-translate-y-1.5 group-focus-visible:ring-2 group-focus-visible:ring-alta">
        <p lang="bn" className="font-bangla-display text-[2rem] leading-[1.15] text-alta">
          {dish.bengali}
        </p>
        <h3 className="font-display text-xl leading-tight font-semibold">{dish.name}</h3>

        <div className="mt-4 flex-1 border-t border-dashed border-alta/30 pt-4">
          <p className="font-mono text-[0.56rem] tracking-[0.18em] text-muted-foreground/80 uppercase">
            Find it at
          </p>
          <ul className="mt-2 space-y-1.5">
            {dish.eatItAt.slice(0, 2).map((e) => (
              <li key={e.place} className="flex items-start gap-2 text-[0.86rem] leading-snug">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-alta" />
                <span>
                  <span className="font-medium">{e.place}</span>
                  <span className="text-muted-foreground"> · {e.where}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 flex h-52 justify-center sm:h-56"
      >
        <span
          className={cn(
            "absolute top-1/2 left-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl",
            HALO[dish.category],
          )}
        />
        {dish.cutout ? (
          <FoodCutout
            id={dish.cutout}
            sizes="(max-width: 640px) 80vw, 300px"
            className="relative h-full w-auto max-w-[88%] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.07] group-hover:rotate-[-5deg]"
          />
        ) : (
          <CityScene
            name={dish.scene}
            photo={dish.photo}
            detail="card"
            className="relative size-48 rounded-full border-4 border-khadi"
          />
        )}
      </div>
    </Link>
  );
}
