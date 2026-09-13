import Image from "next/image";
import { cutouts, type CutoutId } from "@/lib/kolkata/cutouts";
import { cn } from "@/lib/utils";

/**
 * A dish with its background lifted off, so it can sit on a plate, a leaf or
 * a floor instead of inside a rectangle. The shadow is what keeps it from
 * looking pasted on.
 */
export function FoodCutout({
  id,
  className,
  sizes = "240px",
  preload = false,
  shadow = true,
}: {
  id: CutoutId;
  /** Replaces the default full-width sizing, so pass sizing classes with it. */
  className?: string;
  sizes?: string;
  /** Only for the cutout that is the page's largest paint. */
  preload?: boolean;
  shadow?: boolean;
}) {
  const cutout = cutouts[id];
  return (
    <Image
      src={cutout.image}
      alt={cutout.alt}
      sizes={sizes}
      preload={preload}
      draggable={false}
      className={cn("select-none", className ?? "h-auto w-full", shadow && "cutout-shadow")}
    />
  );
}
