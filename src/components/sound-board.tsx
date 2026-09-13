"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { KolkataMap } from "@/components/kolkata-map";
import { project } from "@/lib/kolkata";
import { citySounds, type SoundId } from "@/lib/kolkata/sounds";
import { playSound } from "@/lib/sound-engine";
import { cn } from "@/lib/utils";

/**
 * Eleven sounds, all synthesised. Several can run at once, and each one
 * lights its own point on the map.
 */
export function SoundBoard({ className }: { className?: string }) {
  const [playing, setPlaying] = useState<Set<SoundId>>(new Set());
  const [hover, setHover] = useState<SoundId | null>(null);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [levels, setLevels] = useState<number[]>(() => Array(40).fill(0));

  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const stopsRef = useRef<Map<SoundId, () => void>>(new Map());
  const rafRef = useRef<number | null>(null);

  const stopAll = useCallback(() => {
    stopsRef.current.forEach((s) => s());
    stopsRef.current.clear();
    setPlaying(new Set());
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setLevels(Array(40).fill(0));
  }, []);

  useEffect(() => () => stopAll(), [stopAll]);

  useEffect(() => {
    if (gainRef.current && ctxRef.current) {
      gainRef.current.gain.setTargetAtTime(
        muted ? 0 : volume * 0.85,
        ctxRef.current.currentTime,
        0.05,
      );
    }
  }, [volume, muted]);

  const ensureContext = () => {
    let ctx = ctxRef.current;
    if (!ctx) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      ctx = new Ctor();
      ctxRef.current = ctx;
      const gain = ctx.createGain();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      gain.gain.value = muted ? 0 : volume * 0.85;
      gain.connect(analyser);
      analyser.connect(ctx.destination);
      gainRef.current = gain;
      analyserRef.current = analyser;

      const bins = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        analyser.getByteFrequencyData(bins);
        setLevels(Array.from(bins.slice(0, 40), (v) => v / 255));
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
    }
    void ctx.resume();
    return ctx;
  };

  const toggle = (id: SoundId) => {
    const existing = stopsRef.current.get(id);
    if (existing) {
      existing();
      stopsRef.current.delete(id);
      setPlaying((p) => {
        const next = new Set(p);
        next.delete(id);
        return next;
      });
      return;
    }
    const ctx = ensureContext();
    stopsRef.current.set(id, playSound(id, ctx, gainRef.current!));
    setPlaying((p) => new Set(p).add(id));
  };

  const focused = hover ?? [...playing][playing.size - 1] ?? null;
  const focusedSound = citySounds.find((s) => s.id === focused);

  return (
    <div className={className}>
      {/* Level meter, running across the top. */}
      <div className="flex h-16 items-end gap-[3px]" aria-hidden>
        {levels.map((v, i) => (
          <span
            key={i}
            className={cn(
              "flex-1 rounded-sm transition-[height] duration-75",
              playing.size ? "bg-terracotta" : "bg-border",
            )}
            style={{ height: `${Math.max(3, v * 100)}%` }}
          />
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-y border-border py-3">
        <p className="font-mono text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase">
          {playing.size === 0
            ? "Nothing playing"
            : `${playing.size} playing at once`}
        </p>
        <div className="flex items-center gap-3">
          {playing.size > 0 ? (
            <button
              type="button"
              onClick={stopAll}
              className="rounded-full border border-border px-3 py-1 font-mono text-[0.56rem] tracking-[0.16em] uppercase transition-colors hover:border-terracotta"
            >
              Stop all
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute" : "Mute"}
            className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Volume"
            className="h-1 w-28 cursor-pointer appearance-none rounded-full bg-border [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-terracotta [&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-terracotta"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {citySounds.map((s) => {
            const on = playing.has(s.id);
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => toggle(s.id)}
                  onMouseEnter={() => setHover(s.id)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(s.id)}
                  onBlur={() => setHover(null)}
                  aria-pressed={on}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-md border p-3.5 text-left transition-colors",
                    on
                      ? "border-terracotta/60 bg-terracotta/8"
                      : "border-border hover:border-foreground/25",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border",
                      on
                        ? "border-terracotta text-terracotta"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    {on ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{s.name}</span>
                    <span className="mt-0.5 block font-mono text-[0.54rem] tracking-[0.14em] text-muted-foreground/70 uppercase">
                      {s.where}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-border bg-background">
            <KolkataMap id="soundmap" />
            {citySounds.map((s) => {
              const { x, y } = project(s.coords);
              const on = playing.has(s.id);
              const lit = on || focused === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onClick={() => toggle(s.id)}
                  onMouseEnter={() => setHover(s.id)}
                  onMouseLeave={() => setHover(null)}
                  aria-label={s.name}
                  className="absolute -translate-x-1/2 -translate-y-1/2 p-2 focus:outline-none"
                >
                  <span
                    className={cn(
                      "block rounded-full ring-2 ring-background transition-all duration-200",
                      lit ? "size-3.5 bg-terracotta" : "size-2 bg-muted-foreground/50",
                    )}
                  />
                  {on ? (
                    <span className="absolute inset-0 -z-10 m-auto size-9 animate-ping rounded-full bg-terracotta opacity-25" />
                  ) : null}
                </button>
              );
            })}
          </div>

          {focusedSound ? (
            <div className="mt-4 rounded-lg border border-border bg-card p-5">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-display text-lg font-semibold">
                  {focusedSound.name}
                </p>
                {focusedSound.bengali ? (
                  <p className="text-sm text-muted-foreground" lang="bn">
                    {focusedSound.bengali}
                  </p>
                ) : null}
              </div>
              <p className="mt-1 font-mono text-[0.56rem] tracking-[0.16em] text-terracotta uppercase">
                {focusedSound.where} · {focusedSound.when}
              </p>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-muted-foreground">
                {focusedSound.note}
              </p>
              {focusedSound.href ? (
                <Link
                  href={focusedSound.href}
                  className="mt-3 inline-block font-mono text-[0.58rem] tracking-[0.16em] text-primary uppercase hover:underline"
                >
                  Read more →
                </Link>
              ) : null}
            </div>
          ) : (
            <p className="mt-4 rounded-lg border border-dashed border-border p-5 text-[0.86rem] leading-relaxed text-muted-foreground">
              Press any of them. Several can run at once, and each lights its
              own point on the map. Everything is synthesised in your browser;
              nothing is downloaded.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
