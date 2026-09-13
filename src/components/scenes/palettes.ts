import type { SceneName } from "@/lib/kolkata/types";

/**
 * Each scene is graded like a film frame rather than coloured literally.
 * `sky` runs top to horizon, `near`/`mid`/`far` are the silhouette planes,
 * and `lamp` is whatever light source the frame is actually lit by.
 */
export interface ScenePalette {
  sky: [string, string, string, string];
  far: string;
  mid: string;
  near: string;
  water?: string;
  lamp: string;
  lampSoft: string;
  haze: string;
  label: string;
  caption: string;
}

export const scenePalettes: Record<SceneName, ScenePalette> = {
  howrah: {
    sky: ["#151228", "#3a2540", "#8f4029", "#e08a34"],
    far: "#2a1d27",
    mid: "#1b1319",
    near: "#0e0a0c",
    water: "#241a22",
    lamp: "#ffc86b",
    lampSoft: "#f2a044",
    haze: "#d9772f",
    label: "Howrah Bridge",
    caption: "705 metres of riveted steel, and no bolts",
  },
  tram: {
    sky: ["#0d0f18", "#1b1a26", "#3d2b26", "#7a4a22"],
    far: "#20191c",
    mid: "#151013",
    near: "#0a0708",
    lamp: "#ffb84d",
    lampSoft: "#e08c2a",
    haze: "#c07a2a",
    label: "The last routes",
    caption: "Asia's oldest electric tramway, 1902",
  },
  kumartuli: {
    sky: ["#120d14", "#251519", "#4a2318", "#8f4a1e"],
    far: "#2c1a16",
    mid: "#1a100e",
    near: "#0c0707",
    lamp: "#ffd089",
    lampSoft: "#f0a04a",
    haze: "#b06a2c",
    label: "Kumartuli",
    caption: "Straw, river clay, and the eyes painted last",
  },
  pujo: {
    sky: ["#170a16", "#3a0f22", "#7a1d24", "#d4562b"],
    far: "#33121d",
    mid: "#1d0a12",
    near: "#0d0509",
    lamp: "#ffd24a",
    lampSoft: "#ff8a3c",
    haze: "#e0603a",
    label: "Durga Puja",
    caption: "The largest public art event on earth",
  },
  victoria: {
    sky: ["#0e1424", "#1d2842", "#3c4463", "#8a7f8e"],
    far: "#2b2f45",
    mid: "#191b28",
    near: "#0b0c12",
    lamp: "#ffe6b0",
    lampSoft: "#cfa96a",
    haze: "#6d7594",
    label: "Victoria Memorial",
    caption: "Makrana marble, finished after the empire moved on",
  },
  streetfood: {
    sky: ["#100b10", "#241318", "#4d2317", "#93481d"],
    far: "#2a1a17",
    mid: "#180f0f",
    near: "#0a0606",
    lamp: "#ffbe5c",
    lampSoft: "#ef8b2c",
    haze: "#b56a2a",
    label: "After dark",
    caption: "Kathi rolls, phuchka, and cha in a clay cup",
  },
  collegestreet: {
    sky: ["#1a1a16", "#33301f", "#5d5029", "#a08a45"],
    far: "#332d20",
    mid: "#1f1a13",
    near: "#0f0c09",
    lamp: "#ffe0a0",
    lampSoft: "#c9a35c",
    haze: "#8a7540",
    label: "Boi Para",
    caption: "A mile and a half of secondhand books",
  },
  river: {
    sky: ["#1d2230", "#3d4150", "#7d6f6a", "#d3a184"],
    far: "#454653",
    mid: "#2a2831",
    near: "#141317",
    water: "#4a4652",
    lamp: "#ffe9cf",
    lampSoft: "#d9b58e",
    haze: "#b0a094",
    label: "The Hooghly",
    caption: "The river that made the city and keeps trying to leave",
  },
  rooftops: {
    sky: ["#1b1420", "#3c2431", "#8a4a33", "#dd9548"],
    far: "#3a2529",
    mid: "#20161a",
    near: "#100b0d",
    lamp: "#ffd08a",
    lampSoft: "#e59a4c",
    haze: "#c07c3e",
    label: "North Kolkata",
    caption: "Courtyards, terraces, and 1830s brickwork",
  },
};
