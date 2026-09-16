import type { PhotoId } from "@/lib/kolkata/photos";
import type { SceneName } from "@/lib/kolkata/types";

/**
 * The nine generic frames. Anything with a specific subject should carry its
 * own `photo`; these are what it falls back to, and what the hero cycles.
 */
export const sceneInfo: Record<
  SceneName,
  { label: string; caption: string; photo: PhotoId }
> = {
  howrah: {
    label: "Howrah Bridge",
    caption: "705 metres of riveted steel, and no bolts",
    photo: "hero-howrah",
  },
  tram: {
    label: "The last routes",
    caption: "Asia's oldest electric tramway, 1902",
    photo: "hero-tram",
  },
  kumartuli: {
    label: "Kumartuli",
    caption: "River clay, straw, and the eyes painted last",
    photo: "hero-kumartuli",
  },
  pujo: {
    label: "Durga Puja",
    caption: "The largest public art event on earth",
    photo: "hero-pujo",
  },
  victoria: {
    label: "Victoria Memorial",
    caption: "Makrana marble, finished after the empire moved on",
    photo: "hero-victoria",
  },
  streetfood: {
    label: "Street food",
    caption: "Fried in the open, eaten standing up",
    photo: "hero-streetfood",
  },
  collegestreet: {
    label: "Boi Para",
    caption: "A mile and a half of secondhand books",
    photo: "hero-collegestreet",
  },
  river: {
    label: "The Hooghly",
    caption: "The river that made the city and keeps trying to leave",
    photo: "hooghly-sunset",
  },
  rooftops: {
    label: "North Kolkata",
    caption: "A rajbari courtyard in Shobhabazar, and the brickwork around it",
    photo: "sovabazar-rajbari",
  },
  pandalqueue: {
    label: "Pandal Queue",
    caption: "The queue of people waiting to witness the pandal",
    photo: "puja-crowd",
  },
  immersion: {
    label: "The Immersion",
    caption: "Dashami. The clay goes back into the river.",
    photo: "immersion",
  },
};
