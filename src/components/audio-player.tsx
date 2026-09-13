"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * There are no field recordings in this project, so the sounds are
 * synthesised in the browser with the Web Audio API: a struck bell, a
 * conch, a dhaak pattern, rain on a tin roof. Nothing is downloaded.
 */
type TextureId = "tram-bell" | "conch" | "dhaak" | "monsoon";

interface Texture {
  id: TextureId;
  name: string;
  where: string;
  note: string;
  build: (ctx: AudioContext, out: GainNode) => () => void;
}

/** Inharmonic partials with fast decay: a small bell, struck. */
function tramBell(ctx: AudioContext, out: GainNode) {
  const partials = [1, 2.02, 2.98, 4.16, 5.43, 6.79];
  let stopped = false;
  let timer: ReturnType<typeof setTimeout>;

  const strike = (at: number) => {
    partials.forEach((ratio, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 660 * ratio;
      const peak = 0.22 / (i + 1.5);
      g.gain.setValueAtTime(0, at);
      g.gain.linearRampToValueAtTime(peak, at + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, at + 1.9 / (1 + i * 0.5));
      osc.connect(g).connect(out);
      osc.start(at);
      osc.stop(at + 2.2);
    });
  };

  const loop = () => {
    if (stopped) return;
    const now = ctx.currentTime;
    strike(now);
    strike(now + 0.34);
    timer = setTimeout(loop, 2600);
  };
  loop();

  return () => {
    stopped = true;
    clearTimeout(timer);
  };
}

/** A conch: a low reedy tone that swells, plus breath noise over it. */
function conch(ctx: AudioContext, out: GainNode) {
  let stopped = false;
  let timer: ReturnType<typeof setTimeout>;

  const blow = () => {
    if (stopped) return;
    const t = ctx.currentTime;
    const dur = 3.4;

    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const g = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 620;
    filter.Q.value = 3.2;

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(228, t);
    osc.frequency.linearRampToValueAtTime(244, t + 0.5);
    osc.frequency.linearRampToValueAtTime(238, t + dur);
    osc2.type = "sine";
    osc2.frequency.value = 116;

    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.2, t + 0.45);
    g.gain.setValueAtTime(0.2, t + dur - 0.7);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(g).connect(out);
    osc.start(t);
    osc2.start(t);
    osc.stop(t + dur);
    osc2.stop(t + dur);

    // Breath.
    const noise = whiteNoise(ctx, dur);
    const nf = ctx.createBiquadFilter();
    nf.type = "bandpass";
    nf.frequency.value = 1400;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0, t);
    ng.gain.linearRampToValueAtTime(0.035, t + 0.4);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    noise.connect(nf).connect(ng).connect(out);
    noise.start(t);

    timer = setTimeout(blow, 4600);
  };
  blow();

  return () => {
    stopped = true;
    clearTimeout(timer);
  };
}

/** Two-headed drum: a low thump and a bright slap, in a Puja pattern. */
function dhaak(ctx: AudioContext, out: GainNode) {
  let stopped = false;
  let timer: ReturnType<typeof setTimeout>;

  const hit = (at: number, low: boolean, level: number) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(low ? 128 : 240, at);
    osc.frequency.exponentialRampToValueAtTime(low ? 52 : 130, at + 0.18);
    g.gain.setValueAtTime(level, at);
    g.gain.exponentialRampToValueAtTime(0.0001, at + (low ? 0.42 : 0.2));
    osc.connect(g).connect(out);
    osc.start(at);
    osc.stop(at + 0.5);

    const noise = whiteNoise(ctx, 0.16);
    const nf = ctx.createBiquadFilter();
    nf.type = low ? "lowpass" : "highpass";
    nf.frequency.value = low ? 900 : 2200;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(level * 0.5, at);
    ng.gain.exponentialRampToValueAtTime(0.0001, at + 0.13);
    noise.connect(nf).connect(ng).connect(out);
    noise.start(at);
  };

  // dha - dha - dhin - na, roughly.
  const pattern: [number, boolean, number][] = [
    [0, true, 0.3],
    [0.26, false, 0.16],
    [0.5, true, 0.26],
    [0.76, false, 0.2],
    [0.9, false, 0.12],
    [1.14, true, 0.3],
    [1.4, false, 0.15],
  ];

  const loop = () => {
    if (stopped) return;
    const now = ctx.currentTime + 0.05;
    pattern.forEach(([off, low, lvl]) => hit(now + off, low, lvl));
    timer = setTimeout(loop, 1650);
  };
  loop();

  return () => {
    stopped = true;
    clearTimeout(timer);
  };
}

/** Rain: a filtered noise bed, with individual drops landing on tin. */
function monsoon(ctx: AudioContext, out: GainNode) {
  let stopped = false;
  const bed = whiteNoise(ctx, 8, true);
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 5200;
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 420;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, ctx.currentTime);
  g.gain.linearRampToValueAtTime(0.13, ctx.currentTime + 1.2);
  bed.connect(hp).connect(lp).connect(g).connect(out);
  bed.start();

  let timer: ReturnType<typeof setTimeout>;
  const drop = () => {
    if (stopped) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const dg = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(1800 + Math.random() * 2600, t);
    dg.gain.setValueAtTime(0.025 + Math.random() * 0.02, t);
    dg.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    osc.connect(dg).connect(out);
    osc.start(t);
    osc.stop(t + 0.07);
    timer = setTimeout(drop, 60 + Math.random() * 190);
  };
  drop();

  return () => {
    stopped = true;
    clearTimeout(timer);
    try {
      bed.stop();
    } catch {}
  };
}

function whiteNoise(ctx: AudioContext, seconds: number, loop = false) {
  const frames = Math.max(1, Math.floor(ctx.sampleRate * seconds));
  const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.loop = loop;
  return src;
}

const TEXTURES: Texture[] = [
  {
    id: "tram-bell",
    name: "Tram bell",
    where: "Esplanade depot",
    note: "Two strikes, which is how a driver clears the track.",
    build: tramBell,
  },
  {
    id: "conch",
    name: "Shankha",
    where: "Any north Kolkata house at dusk",
    note: "Blown at sunset, and at the moment of an arrival or a death.",
    build: conch,
  },
  {
    id: "dhaak",
    name: "Dhaak",
    where: "A pandal, from Shashthi onwards",
    note: "Slung from the shoulder and played with two sticks.",
    build: dhaak,
  },
  {
    id: "monsoon",
    name: "Rain on tin",
    where: "June to September",
    note: "Four hours of it, and the whole city eats fried food.",
    build: monsoon,
  },
];

export function AudioPlayer({ className }: { className?: string }) {
  const [playing, setPlaying] = useState<TextureId | null>(null);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [level, setLevel] = useState<number[]>(() => Array(28).fill(0));

  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const stopRef = useRef<(() => void) | null>(null);
  const rafRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    stopRef.current?.();
    stopRef.current = null;
    setPlaying(null);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setLevel(Array(28).fill(0));
  }, []);

  useEffect(() => () => stop(), [stop]);

  useEffect(() => {
    if (gainRef.current && ctxRef.current) {
      gainRef.current.gain.setTargetAtTime(
        muted ? 0 : volume * 0.9,
        ctxRef.current.currentTime,
        0.05,
      );
    }
  }, [volume, muted]);

  const play = (texture: Texture) => {
    if (playing === texture.id) {
      stop();
      return;
    }
    stopRef.current?.();

    // Browsers require the context to be created inside a gesture.
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
      analyser.fftSize = 64;
      gain.gain.value = muted ? 0 : volume * 0.9;
      gain.connect(analyser);
      analyser.connect(ctx.destination);
      gainRef.current = gain;
      analyserRef.current = analyser;
    }
    void ctx.resume();

    stopRef.current = texture.build(ctx, gainRef.current!);
    setPlaying(texture.id);

    const analyser = analyserRef.current!;
    const bins = new Uint8Array(analyser.frequencyBinCount);
    const tick = () => {
      analyser.getByteFrequencyData(bins);
      setLevel(Array.from(bins.slice(0, 28), (v) => v / 255));
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();
  };

  return (
    <div className={cn("rounded-lg border border-border bg-card p-5 sm:p-7", className)}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.6rem] tracking-[0.26em] text-primary uppercase">
            Listen
          </p>
          <h3 className="mt-2 font-display text-xl font-semibold">
            Four sounds of the city
          </h3>
        </div>
        <div className="flex items-center gap-3">
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
            className="h-1 w-24 cursor-pointer appearance-none rounded-full bg-border [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-terracotta [&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-terracotta"
          />
        </div>
      </div>

      {/* Spectrum, so there is something to look at while it plays. */}
      <div className="mt-5 flex h-14 items-end gap-1" aria-hidden>
        {level.map((v, i) => (
          <span
            key={i}
            className={cn(
              "flex-1 rounded-sm transition-[height] duration-75",
              playing ? "bg-terracotta" : "bg-border",
            )}
            style={{ height: `${Math.max(3, v * 100)}%` }}
          />
        ))}
      </div>

      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {TEXTURES.map((t) => {
          const on = playing === t.id;
          return (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => play(t)}
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
                    on ? "border-terracotta text-terracotta" : "border-border text-muted-foreground",
                  )}
                >
                  {on ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{t.name}</span>
                  <span className="mt-0.5 block font-mono text-[0.58rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
                    {t.where}
                  </span>
                  <span className="mt-1.5 block text-[0.8rem] leading-snug text-muted-foreground">
                    {t.note}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 border-t border-border pt-4 text-[0.76rem] leading-relaxed text-muted-foreground/70">
        Synthesised in your browser with the Web Audio API. No recordings are
        loaded, and nothing is sent anywhere.
      </p>
    </div>
  );
}
