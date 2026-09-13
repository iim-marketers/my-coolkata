"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DEFAULT_ERA, eraStops, getEra } from "@/lib/kolkata/eras";
import type { EraId } from "@/lib/kolkata/types";

const STORAGE_KEY = "kolkata:era";
const NIGHT_KEY = "kolkata:night";

interface EraContextValue {
  era: EraId;
  setEra: (id: EraId) => void;
  index: number;
  stop: (typeof eraStops)[number];
  isPast: boolean;
  /** Night Kolkata: a third axis, alongside theme and era. */
  night: boolean;
  setNight: (on: boolean) => void;
}

const EraContext = createContext<EraContextValue | null>(null);

/**
 * Holds the year the visitor is looking at. Writing `data-era` on the
 * document lets the palette, the scene grading and any era-aware copy
 * change together, rather than the year only affecting one page.
 */
export function EraProvider({ children }: { children: React.ReactNode }) {
  const [era, setEraState] = useState<EraId>(DEFAULT_ERA);
  const [night, setNightState] = useState(false);

  const setEra = useCallback((id: EraId) => {
    setEraState(id);
    const stop = getEra(id);
    document.documentElement.dataset.era = stop?.mood ?? "now";
    document.documentElement.dataset.eraYear = String(stop?.year ?? "");
    try {
      if (id === DEFAULT_ERA) localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // Private mode. The era simply will not persist.
    }
  }, []);

  const setNight = useCallback((on: boolean) => {
    setNightState(on);
    if (on) document.documentElement.dataset.night = "on";
    else delete document.documentElement.dataset.night;
    try {
      if (on) localStorage.setItem(NIGHT_KEY, "1");
      else localStorage.removeItem(NIGHT_KEY);
    } catch {}
  }, []);

  // Pick up whatever the inline head script already applied. Deferred by a
  // tick so this is a callback rather than a synchronous effect render.
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {}
    let wasNight = false;
    try {
      wasNight = localStorage.getItem(NIGHT_KEY) === "1";
    } catch {}
    const valid = stored && stored !== DEFAULT_ERA && getEra(stored);
    if (!valid && !wasNight) return;
    const id = setTimeout(() => {
      if (valid) setEra(stored as EraId);
      if (wasNight) setNight(true);
    }, 0);
    return () => clearTimeout(id);
  }, [setEra, setNight]);

  const value = useMemo<EraContextValue>(() => {
    const index = Math.max(
      0,
      eraStops.findIndex((e) => e.id === era),
    );
    return {
      era,
      setEra,
      index,
      stop: eraStops[index],
      isPast: era !== DEFAULT_ERA,
      night,
      setNight,
    };
  }, [era, setEra, night, setNight]);

  return <EraContext.Provider value={value}>{children}</EraContext.Provider>;
}

export function useEra() {
  const ctx = useContext(EraContext);
  if (!ctx) throw new Error("useEra must be used inside EraProvider");
  return ctx;
}

/**
 * Applies the stored era before first paint, so the page never flashes
 * the present day and then jump-cuts to 1900.
 */
export const eraBootScript = `
try {
  if (localStorage.getItem(${JSON.stringify(NIGHT_KEY)}) === '1') {
    document.documentElement.dataset.night = 'on';
  }
  var s = localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
  var m = ${JSON.stringify(
    Object.fromEntries(eraStops.map((e) => [e.id, e.mood])),
  )};
  if (s && m[s]) {
    document.documentElement.dataset.era = m[s];
  }
} catch (e) {}
`.trim();
