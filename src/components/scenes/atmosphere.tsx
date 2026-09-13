import type { ScenePalette } from "./palettes";

/**
 * Gradients, glows and grain shared by every frame. IDs are namespaced by
 * scene because the hero mounts all seven frames into one document.
 */
export function SceneDefs({ id, p }: { id: string; p: ScenePalette }) {
  return (
    <defs>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={p.sky[0]} />
        <stop offset="42%" stopColor={p.sky[1]} />
        <stop offset="76%" stopColor={p.sky[2]} />
        <stop offset="100%" stopColor={p.sky[3]} />
      </linearGradient>

      {/* Light pooling on the horizon, where the city itself glows. */}
      <radialGradient id={`${id}-glow`} cx="50%" cy="100%" r="72%">
        <stop offset="0%" stopColor={p.haze} stopOpacity="0.85" />
        <stop offset="55%" stopColor={p.haze} stopOpacity="0.22" />
        <stop offset="100%" stopColor={p.haze} stopOpacity="0" />
      </radialGradient>

      <radialGradient id={`${id}-lamp`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={p.lamp} stopOpacity="0.95" />
        <stop offset="35%" stopColor={p.lampSoft} stopOpacity="0.42" />
        <stop offset="100%" stopColor={p.lampSoft} stopOpacity="0" />
      </radialGradient>

      <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={p.water ?? p.mid} stopOpacity="0.95" />
        <stop offset="100%" stopColor={p.near} stopOpacity="1" />
      </linearGradient>

      {/* Aerial perspective: distant planes wash out towards the haze. */}
      <linearGradient id={`${id}-far`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={p.far} stopOpacity="0.55" />
        <stop offset="100%" stopColor={p.far} stopOpacity="0.95" />
      </linearGradient>

      <filter id={`${id}-blur`} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="18" />
      </filter>
      <filter id={`${id}-soft`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" />
      </filter>
    </defs>
  );
}

export function Sky({ id }: { id: string }) {
  return (
    <>
      <rect width="1600" height="900" fill={`url(#${id}-sky)`} />
      <rect width="1600" height="900" fill={`url(#${id}-glow)`} />
    </>
  );
}

/** A sodium lamp: the bulb, and the cone of dust it lights. */
export function Lamp({
  id,
  x,
  y,
  r = 150,
  opacity = 1,
}: {
  id: string;
  x: number;
  y: number;
  r?: number;
  opacity?: number;
}) {
  return (
    <g opacity={opacity} style={{ animation: "lamp-flicker 5.5s infinite" }}>
      <circle cx={x} cy={y} r={r} fill={`url(#${id}-lamp)`} />
      <circle cx={x} cy={y} r={4} fill="#fff3d6" opacity="0.9" />
    </g>
  );
}

/** Low haze band sitting on the horizon line. */
export function Haze({
  id,
  y,
  height = 120,
  opacity = 0.5,
}: {
  id: string;
  y: number;
  height?: number;
  opacity?: number;
}) {
  return (
    <rect
      x="-40"
      y={y}
      width="1680"
      height={height}
      fill={`url(#${id}-glow)`}
      opacity={opacity}
      filter={`url(#${id}-blur)`}
    />
  );
}

/**
 * Deterministic pseudo-random, so the server and client draw the same stars.
 * Math.sin may differ in the last bit between Node and the browser, and the
 * 43758 multiplier magnifies that into a hydration mismatch, so round it off.
 */
export function seeded(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return Math.round((x - Math.floor(x)) * 1e6) / 1e6;
}

export function Stars({ count = 60, maxY = 320 }: { count?: number; maxY?: number }) {
  return (
    <g opacity="0.5">
      {Array.from({ length: count }, (_, i) => (
        <circle
          key={i}
          cx={seeded(i + 1) * 1600}
          cy={seeded(i + 91) * maxY}
          r={seeded(i + 41) * 1.4 + 0.3}
          fill="#fff6e2"
          opacity={0.25 + seeded(i + 7) * 0.6}
        />
      ))}
    </g>
  );
}

/** Crows. There are always crows. */
export function Birds({ x = 1100, y = 190, scale = 1 }: { x?: number; y?: number; scale?: number }) {
  const marks: [number, number, number][] = [
    [0, 0, 1],
    [46, 22, 0.8],
    [88, -14, 0.65],
    [132, 30, 0.55],
    [176, 6, 0.45],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity="0.65">
      {marks.map(([dx, dy, s], i) => (
        <path
          key={i}
          d={`M ${dx} ${dy} q ${7 * s} ${-6 * s} ${14 * s} 0 q ${7 * s} ${-6 * s} ${14 * s} 0`}
          fill="none"
          stroke="#0d0a0a"
          strokeWidth={2 * s}
          strokeLinecap="round"
        />
      ))}
    </g>
  );
}
