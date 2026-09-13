import { cn } from "@/lib/utils";
import type { SceneName } from "@/lib/kolkata/types";
import { scenePalettes } from "./palettes";
import { sceneFrames } from "./frames";

export { scenePalettes };

/**
 * One hand-drawn frame of the city, filling its container.
 *
 * There are no photographs in this project. Every frame is vector art
 * generated at render time, which keeps the hero at a few kilobytes and
 * lets the whole sequence be graded consistently.
 */
export function CityScene({
  name,
  className,
  instance,
  detail = "full",
}: {
  name: SceneName;
  className?: string;
  /** Namespaces the SVG gradient ids when a page mounts the same frame twice. */
  instance?: string;
  /**
   * `card` draws roughly a third of the elements. Use it anywhere the
   * frame is a thumbnail: a page with twelve full-detail scenes on it
   * ships several hundred kilobytes of markup for no visible gain.
   */
  detail?: "full" | "card";
}) {
  const Frame = sceneFrames[name];
  const id = `sc-${name}${instance ? `-${instance}` : ""}`;
  return (
    <div className={cn("scene-frame relative overflow-hidden", className)}>
      <Frame
        id={id}
        p={scenePalettes[name]}
        q={detail === "card" ? 0.34 : 1}
      />
    </div>
  );
}
