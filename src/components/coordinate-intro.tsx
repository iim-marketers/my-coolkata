"use client";

import { useCallback, useEffect, useState } from "react";
import { CITY_COORDS_DISPLAY } from "@/lib/kolkata";

type Phase = "typing" | "entering" | "lifting" | "done";

const TYPE_MS = 62;
const HOLD_AFTER_TYPE = 520;
const HOLD_ENTERING = 1750;
const LIFT_MS = 950;
const SEEN_KEY = "kolkata:entered";

/**
 * The threshold. Coordinates type themselves out, the city is announced,
 * then the panel lifts and the hero is underneath it.
 *
 * Shown once per browser session so that navigating home again cuts
 * straight to the film.
 */
export function CoordinateIntro() {
  const [phase, setPhase] = useState<Phase>("typing");
  const [chars, setChars] = useState(0);

  const skip = useCallback(() => setPhase("done"), []);

  // Anything the visitor does is taken as "yes, I have arrived".
  useEffect(() => {
    if (phase === "done") return;
    const onInput = () => setPhase((p) => (p === "lifting" || p === "done" ? p : "lifting"));
    window.addEventListener("keydown", onInput);
    window.addEventListener("wheel", onInput, { passive: true });
    window.addEventListener("touchstart", onInput, { passive: true });
    return () => {
      window.removeEventListener("keydown", onInput);
      window.removeEventListener("wheel", onInput);
      window.removeEventListener("touchstart", onInput);
    };
  }, [phase]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // Private mode. Play the intro; it is only four seconds.
    }
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (seen || reduced) {
      // Cut straight through on the next tick rather than re-rendering
      // synchronously from inside this effect.
      timers.push(setTimeout(skip, 0));
      return () => timers.forEach(clearTimeout);
    }
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}

    const total = CITY_COORDS_DISPLAY.length;
    for (let i = 1; i <= total; i++) {
      timers.push(setTimeout(() => setChars(i), i * TYPE_MS));
    }
    const typedAt = total * TYPE_MS;
    timers.push(setTimeout(() => setPhase("entering"), typedAt + HOLD_AFTER_TYPE));
    timers.push(
      setTimeout(() => setPhase("lifting"), typedAt + HOLD_AFTER_TYPE + HOLD_ENTERING),
    );
    timers.push(
      setTimeout(
        () => setPhase("done"),
        typedAt + HOLD_AFTER_TYPE + HOLD_ENTERING + LIFT_MS,
      ),
    );
    return () => timers.forEach(clearTimeout);
  }, [skip]);

  // Hold the page still while the panel is down.
  useEffect(() => {
    if (phase === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "done") return null;

  const lifting = phase === "lifting";

  return (
    <div
      aria-hidden
      onClick={() => setPhase("lifting")}
      className="fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-[oklch(0.09_0.012_50)]"
      style={{
        transform: lifting ? "translateY(-100%)" : "translateY(0)",
        transition: `transform ${LIFT_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
      }}
    >
      <div className="film-grain absolute inset-0" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
        <p
          className="font-mono text-[clamp(0.85rem,2.6vw,1.35rem)] tracking-[0.42em] text-[#f0b055]"
          style={{
            transition: "opacity 700ms ease, transform 700ms ease",
            opacity: phase === "entering" ? 0.45 : 1,
            transform: phase === "entering" ? "translateY(-14px) scale(0.9)" : "none",
          }}
        >
          {CITY_COORDS_DISPLAY.slice(0, chars)}
          <span
            className="ml-0.5 inline-block"
            style={{ animation: "caret-blink 1s steps(1) infinite" }}
          >
            _
          </span>
        </p>

        <p
          className="font-display text-[clamp(1.35rem,5vw,3rem)] leading-tight text-[#f6ecdc]"
          style={{
            transition: "opacity 900ms ease 120ms, transform 900ms ease 120ms",
            opacity: phase === "entering" || lifting ? 1 : 0,
            transform:
              phase === "entering" || lifting ? "none" : "translateY(18px)",
          }}
        >
          You are entering Kolkata.
        </p>
      </div>

      <p className="absolute inset-x-0 bottom-8 text-center font-mono text-[0.62rem] tracking-[0.3em] text-[#f6ecdc]/35 uppercase">
        Press any key to skip
      </p>
    </div>
  );
}
