"use client";

import { useEffect, useState } from "react";
import { pujoPhase, type PujoPhase } from "@/lib/kolkata/pujo";

// In development `?pujoNow=2026-10-19T20:00` (Kolkata time) shifts the clock.
function clockOffset() {
  if (process.env.NODE_ENV === "production") return 0;
  const raw = new URLSearchParams(window.location.search).get("pujoNow");
  if (!raw) return 0;
  const at = new Date(/[zZ]|[+-]\d\d:?\d\d$/.test(raw) ? raw : `${raw}+05:30`);
  return Number.isNaN(at.getTime()) ? 0 : at.getTime() - Date.now();
}

/**
 * The current moment and Puja phase, or `null` until mounted so the server
 * markup matches. Pass `tick` to keep it moving.
 */
export function usePujoPhase(tick?: number) {
  const [state, setState] = useState<{ now: Date; phase: PujoPhase } | null>(null);

  useEffect(() => {
    const offset = clockOffset();
    const update = () => {
      const now = new Date(Date.now() + offset);
      setState({ now, phase: pujoPhase(now) });
    };
    update();
    if (!tick) return;
    const id = setInterval(update, tick);
    return () => clearInterval(id);
  }, [tick]);

  return state;
}
