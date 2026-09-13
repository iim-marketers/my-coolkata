import type { Neighbourhood, Zone } from "./types";
import { zones } from "./types";
import { north } from "./quarters/north";
import { central } from "./quarters/central";
import { south } from "./quarters/south";
import { riverside } from "./quarters/riverside";
import { east } from "./quarters/east";
import { quarterMoods } from "./quarters/moods";

export const neighbourhoods: Neighbourhood[] = [
  ...north,
  ...central,
  ...south,
  ...riverside,
  ...east,
].map((n) => ({ ...n, ...quarterMoods[n.slug] }));

export function getNeighbourhood(slug: string) {
  return neighbourhoods.find((n) => n.slug === slug);
}

export function quartersInZone(zone: Zone) {
  return neighbourhoods.filter((n) => n.zone === zone);
}

export const zonesWithQuarters = zones.map((z) => ({
  ...z,
  quarters: neighbourhoods.filter((n) => n.zone === z.id),
}));
