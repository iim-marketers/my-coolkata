import Image from "next/image";
import { photos, type PhotoId } from "@/lib/kolkata/photos";
import type { SceneName } from "@/lib/kolkata/types";
import { cn } from "@/lib/utils";
import { sceneInfo } from "./scene-info";

export { sceneInfo };

/** A specific photograph wins; the scene is the generic fallback for it. */
type Source =
  | { name: SceneName; photo?: PhotoId }
  | { name?: undefined; photo: PhotoId };

/**
 * One photograph of the city, cropped to fill its container.
 *
 * The files are statically imported in `@/lib/kolkata/photos`, so Next.js
 * knows their dimensions, generates a blur placeholder, and serves a resized
 * srcset rather than the original.
 */
export function CityScene({
  className,
  detail = "full",
  sizes,
  preload = false,
  focus = "center",
  imgClassName,
  ...source
}: Source & {
  className?: string;
  /** Extra classes for the image itself, e.g. a per-breakpoint object position. */
  imgClassName?: string;
  /**
   * `card` tells the browser the frame is a thumbnail in a grid, so it picks
   * a smaller file. Leave it as `full` for anything that spans the viewport.
   */
  detail?: "full" | "card";
  /** Overrides `detail` for layouts that fit neither, e.g. half a split row. */
  sizes?: string;
  /** Only for the frame that is the page's largest paint, i.e. the hero. */
  preload?: boolean;
  /** `top` keeps faces in frame when a portrait is cropped. */
  focus?: "center" | "top";
}) {
  const photo = photos[source.photo ?? sceneInfo[source.name as SceneName].photo];
  return (
    <div className={cn("scene-frame relative overflow-hidden", className)}>
      <Image
        src={photo.image}
        alt={photo.alt}
        fill
        preload={preload}
        placeholder="blur"
        sizes={
          sizes ??
          (detail === "card"
            ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            : "100vw")
        }
        className={cn(
          "object-cover",
          focus === "top" && "object-[50%_22%]",
          imgClassName,
        )}
      />
    </div>
  );
}
