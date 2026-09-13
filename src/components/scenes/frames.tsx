import { Birds, Haze, Lamp, SceneDefs, Sky, Stars, seeded } from "./atmosphere";
import { scenePalettes, type ScenePalette } from "./palettes";
import type { SceneName } from "@/lib/kolkata/types";
import { round2 } from "@/lib/utils";

const W = 1600;
const H = 900;

/**
 * `q` is a detail multiplier. Card-sized frames draw a fraction of the
 * elements a full-bleed one does, which is the difference between a
 * readable page weight and an unreadable one.
 */
type FrameProps = { id: string; p: ScenePalette; q?: number };

/** Scale a generator's element count by the frame's detail level. */
const step = (count: number, q: number, floor = 3) =>
  Math.max(floor, Math.round(count * q));

function Frame({
  id,
  name,
  children,
}: {
  id: string;
  name: SceneName;
  children: React.ReactNode;
}) {
  const p = scenePalettes[name];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label={`${p.label}. ${p.caption}.`}
    >
      <SceneDefs id={id} p={p} />
      {/* The sky always fills the frame; only the drawing scales. */}
      <Sky id={id} />
      <g className="scene-body">{children}</g>
    </svg>
  );
}

/** A skyline of flat-roofed blocks, drawn from a seed so it never reflows. */
function Skyline({
  seed,
  baseY,
  minH,
  maxH,
  fill,
  opacity = 1,
  count = 34,
  lit = 0,
}: {
  seed: number;
  baseY: number;
  minH: number;
  maxH: number;
  fill: string;
  opacity?: number;
  count?: number;
  lit?: number;
}) {
  const step = W / count;
  return (
    <g opacity={opacity}>
      {Array.from({ length: count }, (_, i) => {
        const r = seeded(seed + i);
        const h = minH + r * (maxH - minH);
        const x = i * step - 4;
        const w = step + 8;
        return (
          <g key={i}>
            <rect x={x} y={baseY - h} width={w} height={h + 4} fill={fill} />
            {/* Water tanks and stair huts break the roofline. */}
            {r > 0.62 && (
              <rect
                x={x + w * 0.55}
                y={baseY - h - 16}
                width={w * 0.3}
                height={16}
                fill={fill}
              />
            )}
            {lit > 0 &&
              Array.from({ length: 3 }, (_, k) =>
                seeded(seed + i * 7 + k) > 1 - lit ? (
                  <rect
                    key={k}
                    x={x + 6 + k * (w / 3.4)}
                    y={baseY - h + 14 + seeded(seed + i + k) * (h - 40)}
                    width={5}
                    height={7}
                    fill="#ffcf87"
                    opacity={0.5 + seeded(seed + i * k + 3) * 0.4}
                  />
                ) : null,
              )}
          </g>
        );
      })}
    </g>
  );
}

/** Foreground crowd, back-lit and featureless. */
function Crowd({
  seed,
  baseY,
  fill,
  count = 26,
  scale = 1,
}: {
  seed: number;
  baseY: number;
  fill: string;
  count?: number;
  scale?: number;
}) {
  return (
    <g fill={fill}>
      {Array.from({ length: count }, (_, i) => {
        const r = seeded(seed + i);
        const x = seeded(seed + i * 3) * (W + 120) - 60;
        const s = (0.8 + r * 0.5) * scale;
        const h = 150 * s;
        return (
          <g key={i} transform={`translate(${x} ${baseY}) scale(${s})`}>
            <circle cx="0" cy={-h / s + 18} r="17" />
            <path
              d={`M -24 0 q 2 -${h / s - 46} 24 -${h / s - 46} q 22 0 24 ${h / s - 46} Z`}
            />
          </g>
        );
      })}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Howrah Bridge                                                    */
/* ------------------------------------------------------------------ */

function HowrahFrame({ id, p, q = 1 }: FrameProps) {
  const n = (v: number, floor = 3) => step(v, q, floor);
  const deck = 566;
  const towerTop = 128;
  const towerA = 340;
  const towerB = 1260;
  const centre = (towerA + towerB) / 2;

  // Cantilever arm: parabolic drop from tower top to mid-span. Fractional
  // powers can differ in the last bit between Node and the browser, so the
  // heights are rounded to keep the server and client paths identical.
  const armChord = (x: number) => {
    const t = Math.abs(centre - x) / (centre - towerA);
    return round2(330 - 202 * Math.pow(t, 1.7));
  };
  // Anchor arm: tower top down to the bank.
  const anchorChord = (x: number, tower: number, bank: number) => {
    const t = Math.abs(x - bank) / Math.abs(tower - bank);
    return round2(512 - 384 * Math.pow(t, 1.5));
  };

  const panels = (
    from: number,
    to: number,
    chord: (x: number) => number,
    n: number,
  ) => {
    const step = (to - from) / n;
    const els: React.ReactElement[] = [];
    for (let i = 0; i <= n; i++) {
      const x = from + i * step;
      els.push(
        <line key={`v${i}`} x1={x} y1={chord(x)} x2={x} y2={deck} stroke="#0d090b" strokeWidth="3.5" />,
      );
      if (i < n) {
        const x2 = x + step;
        const up = i % 2 === 0;
        els.push(
          <line
            key={`d${i}`}
            x1={x}
            y1={up ? chord(x) : deck}
            x2={x2}
            y2={up ? deck : chord(x2)}
            stroke="#0d090b"
            strokeWidth="3"
          />,
        );
      }
    }
    return els;
  };

  const chordPath = (from: number, to: number, chord: (x: number) => number) => {
    let d = `M ${from} ${chord(from)}`;
    for (let x = from; x <= to; x += 12) d += ` L ${x} ${chord(x)}`;
    return d + ` L ${to} ${chord(to)}`;
  };

  return (
    <Frame id={id} name="howrah">
      <Stars count={n(70, 12)} maxY={280} />
      <Birds x={1080} y={168} scale={1.1} />

      {/* Howrah bank, hazy and far. */}
      <Skyline seed={11} baseY={600} minH={40} maxH={130} fill={`url(#${id}-far)`} count={n(40, 10)} lit={q > 0.6 ? 0.28 : 0} />
      <Haze id={id} y={520} height={150} opacity={0.65} />

      {/* River. */}
      <rect x="0" y="606" width={W} height={H - 606} fill={`url(#${id}-water)`} />
      {Array.from({ length: n(16, 5) }, (_, i) => (
        <rect
          key={i}
          x={seeded(i + 200) * W - 120}
          y={620 + i * 17}
          width={140 + seeded(i + 300) * 340}
          height={2.5}
          rx="1"
          fill={p.haze}
          opacity={0.06 + seeded(i + 400) * 0.14}
          style={{
            animation: `river-shimmer ${9 + (i % 5) * 2}s ease-in-out ${i * 0.3}s infinite alternate`,
          }}
        />
      ))}

      {/* Two country boats. */}
      {[
        { x: 300, s: 1 },
        { x: 1180, s: 0.72 },
      ].map((b, i) => (
        <g key={i} transform={`translate(${b.x} ${712 + i * 46}) scale(${b.s})`} fill="#0b0708">
          <path d="M -70 0 q 70 26 140 0 q -14 14 -70 14 q -56 0 -70 -14 Z" />
          <rect x="-6" y="-56" width="4" height="56" />
          <path d="M -2 -56 q 40 26 4 52 Z" opacity="0.85" />
        </g>
      ))}

      {/* The bridge. */}
      <g>
        <path d={chordPath(60, towerA, (x) => anchorChord(x, towerA, 60))} fill="none" stroke="#0d090b" strokeWidth="7" />
        <path d={chordPath(towerB, 1540, (x) => anchorChord(x, towerB, 1540))} fill="none" stroke="#0d090b" strokeWidth="7" />
        <path d={chordPath(towerA, towerB, armChord)} fill="none" stroke="#0d090b" strokeWidth="7" />

        {panels(60, towerA, (x) => anchorChord(x, towerA, 60), n(8, 4))}
        {panels(towerB, 1540, (x) => anchorChord(x, towerB, 1540), n(8, 4))}
        {panels(towerA, towerB, armChord, n(20, 8))}

        {/* Deck. */}
        <rect x="0" y={deck} width={W} height="16" fill="#0b0709" />
        <rect x="0" y={deck + 16} width={W} height="7" fill="#080506" />

        {/* Portal towers. */}
        {[towerA, towerB].map((tx) => (
          <g key={tx}>
            <rect x={tx - 46} y={towerTop} width="17" height={deck - towerTop} fill="#0b0709" />
            <rect x={tx + 29} y={towerTop} width="17" height={deck - towerTop} fill="#0b0709" />
            {Array.from({ length: 9 }, (_, i) => {
              const y = towerTop + 22 + i * ((deck - towerTop - 30) / 9);
              return <rect key={i} x={tx - 46} y={y} width="92" height="5" fill="#0b0709" />;
            })}
            {Array.from({ length: 9 }, (_, i) => {
              const y0 = towerTop + 22 + i * ((deck - towerTop - 30) / 9);
              const y1 = y0 + (deck - towerTop - 30) / 9;
              return (
                <line
                  key={i}
                  x1={tx - 40}
                  y1={i % 2 ? y0 : y1}
                  x2={tx + 40}
                  y2={i % 2 ? y1 : y0}
                  stroke="#0b0709"
                  strokeWidth="3.5"
                />
              );
            })}
            <rect x={tx - 54} y={towerTop - 14} width="108" height="16" fill="#0b0709" />
            <circle cx={tx} cy={towerTop - 26} r="5" fill="#ff6a4a" opacity="0.9" />
          </g>
        ))}
      </g>

      {/* Deck lamps and their pools on the water. */}
      {[120, 400, 700, 1000, 1300, 1520].map((x, i) => (
        <g key={x}>
          <Lamp id={id} x={x} y={deck - 34} r={92} opacity={0.85} />
          <ellipse cx={x} cy={700 + i * 8} rx="34" ry="70" fill={p.lamp} opacity="0.07" filter={`url(#${id}-blur)`} />
        </g>
      ))}

      {/* Near bank in silhouette. */}
      <path
        d={`M 0 ${H} L 0 800 Q 220 764 470 792 L 470 ${H} Z`}
        fill={p.near}
      />
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Tram                                                             */
/* ------------------------------------------------------------------ */

function TramFrame({ id, p, q = 1 }: FrameProps) {
  const n = (v: number, floor = 3) => step(v, q, floor);
  const road = 660;
  return (
    <Frame id={id} name="tram">
      <Stars count={n(40, 8)} maxY={200} />
      <Skyline seed={31} baseY={road} minH={190} maxH={430} fill={p.far} count={n(16, 7)} lit={q > 0.6 ? 0.34 : 0} opacity={0.75} />
      <Skyline seed={57} baseY={road + 20} minH={120} maxH={300} fill={p.mid} count={n(11, 5)} lit={q > 0.6 ? 0.22 : 0} />
      <Haze id={id} y={520} height={200} opacity={0.5} />

      {/* Overhead wire and its poles. */}
      <line x1="0" y1="228" x2={W} y2="252" stroke="#120d0e" strokeWidth="2.5" />
      <line x1="0" y1="268" x2={W} y2="290" stroke="#120d0e" strokeWidth="1.5" opacity="0.7" />
      {[90, 430, 780, 1130, 1480].map((x, i) => (
        <g key={x}>
          <rect x={x} y="212" width="9" height={road - 200} fill="#120d0e" />
          <path d={`M ${x + 9} 240 q 56 -8 92 26`} fill="none" stroke="#120d0e" strokeWidth="4" />
          <Lamp id={id} x={x + 104} y={268} r={168} opacity={0.9 - i * 0.05} />
        </g>
      ))}

      {/* Wet road. */}
      <rect x="0" y={road} width={W} height={H - road} fill={p.near} />
      <rect x="0" y={road} width={W} height="3" fill={p.lampSoft} opacity="0.25" />
      {[90, 430, 780, 1130, 1480].map((x) => (
        <ellipse key={x} cx={x + 104} cy={road + 150} rx="52" ry="150" fill={p.lamp} opacity="0.1" filter={`url(#${id}-blur)`} />
      ))}

      {/* Rails, converging slightly. */}
      {[
        [200, 1220],
        [330, 1290],
      ].map(([x0, x1], i) => (
        <line key={i} x1={x0} y1={H} x2={x1} y2={road + 8} stroke={p.lampSoft} strokeWidth="3" opacity="0.32" />
      ))}

      {/* The tram itself. */}
      <g transform="translate(560 350)">
        <rect x="0" y="0" width="470" height="212" rx="16" fill="#141013" />
        <rect x="0" y="0" width="470" height="212" rx="16" fill="none" stroke="#2a2024" strokeWidth="3" />
        <rect x="0" y="0" width="470" height="30" rx="14" fill="#1c1519" />
        {/* Windows, lit from inside. */}
        {Array.from({ length: 6 }, (_, i) => (
          <rect
            key={i}
            x={26 + i * 72}
            y="48"
            width="56"
            height="72"
            rx="4"
            fill={p.lamp}
            opacity={0.5 + seeded(i + 5) * 0.35}
          />
        ))}
        {/* Passengers as blots against the glass. */}
        {Array.from({ length: 6 }, (_, i) =>
          seeded(i + 60) > 0.4 ? (
            <circle key={i} cx={54 + i * 72} cy="92" r="14" fill="#3a2618" opacity="0.65" />
          ) : null,
        )}
        <rect x="26" y="140" width="418" height="42" rx="5" fill="#1a1418" />
        <rect x="180" y="-34" width="110" height="34" rx="6" fill="#1c1519" />
        <text x="235" y="-11" textAnchor="middle" fill={p.lamp} fontSize="19" fontFamily="monospace" opacity="0.85">
          24
        </text>
        {/* Pantograph. */}
        <path d="M 210 -34 L 236 -96 L 262 -34" fill="none" stroke="#2a2024" strokeWidth="4" />
        <line x1="196" y1="-96" x2="276" y2="-96" stroke="#2a2024" strokeWidth="4" />
        {/* Headlamp. */}
        <circle cx="440" cy="196" r="13" fill="#fff0cc" />
        <circle cx="440" cy="196" r="46" fill={`url(#${id}-lamp)`} opacity="0.75" />
        <rect x="30" y="212" width="410" height="14" fill="#0c0809" />
        <circle cx="112" cy="230" r="17" fill="#0c0809" />
        <circle cx="368" cy="230" r="17" fill="#0c0809" />
      </g>

      {/* Reflection of the tram, stretched and broken. */}
      <g opacity="0.16" transform="translate(560 1152) scale(1 -1)">
        <rect x="0" y="0" width="470" height="212" rx="16" fill={p.lamp} filter={`url(#${id}-blur)`} />
      </g>

      <Crowd seed={77} baseY={H + 24} fill={p.near} count={n(7, 3)} scale={1.5} />
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Kumartuli                                                        */
/* ------------------------------------------------------------------ */

/**
 * Durga in silhouette: ten arms, the chalchitra halo behind her.
 * The arms fan from the shoulders and drop at the wrists, which is what
 * separates a figure from a starburst at small sizes.
 */
function IdolSilhouette({
  x,
  y,
  s,
  fill,
  halo,
  haloColor,
}: {
  x: number;
  y: number;
  s: number;
  fill: string;
  halo?: boolean;
  haloColor?: string;
}) {
  const shoulder = -150;
  // Five pairs, fanning up and out, the outer ones shorter.
  const arms = Array.from({ length: 5 }, (_, i) => ({
    angle: 0.16 + i * 0.3,
    len: 84 - i * 9,
  }));

  const arm = (dir: 1 | -1, angle: number, len: number, key: number) => {
    const ex = round2(dir * len * Math.cos(angle) * 1.35);
    const ey = round2(shoulder - len * Math.sin(angle) * 1.05);
    const cx = dir * len * 0.6;
    const cy = round2(shoulder - len * Math.sin(angle) * 0.35);
    return (
      <g key={`${dir}-${key}`}>
        <path
          d={`M ${dir * 12} ${shoulder + 6} Q ${cx} ${cy} ${ex} ${ey}`}
          stroke={fill}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        {/* What the hand is holding, reduced to a mark. */}
        <circle cx={ex} cy={ey} r="5" fill={fill} />
      </g>
    );
  };

  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {halo && (
        <path
          d="M -150 -70 A 150 150 0 0 1 150 -70 L 150 6 L -150 6 Z"
          fill={haloColor}
          opacity="0.9"
        />
      )}
      <g fill={fill}>
        {arms.map((a, i) => arm(-1, a.angle, a.len, i))}
        {arms.map((a, i) => arm(1, a.angle, a.len, i))}
        {/* Crown, head, torso, and the flare of the sari. */}
        <path d="M -26 -196 L -17 -232 L -9 -204 L 0 -246 L 9 -204 L 17 -232 L 26 -196 Z" />
        <circle cx="0" cy="-178" r="26" />
        <path d="M -32 -158 q 32 -13 64 0 l 11 92 q -43 15 -86 0 Z" />
        <path d="M -44 -62 q 44 -15 88 0 l 28 128 q -72 21 -144 0 Z" />
      </g>
    </g>
  );
}

function KumartuliFrame({ id, p, q = 1 }: FrameProps) {
  const n = (v: number, floor = 3) => step(v, q, floor);
  const floor = 700;
  return (
    <Frame id={id} name="kumartuli">
      {/* The lane: two walls closing in, sky only as a slot overhead. */}
      <path d={`M 0 0 L 0 ${H} L 300 ${H} L 380 120 L 0 0 Z`} fill={p.mid} />
      <path d={`M ${W} 0 L ${W} ${H} L 1300 ${H} L 1220 120 L ${W} 0 Z`} fill={p.mid} />
      <rect x="380" y="0" width="840" height="150" fill={p.far} opacity="0.6" />

      {/* Strung bulbs on a sagging wire. */}
      <path d="M 300 132 Q 800 236 1300 132" fill="none" stroke="#1a1210" strokeWidth="3" />
      {Array.from({ length: n(11, 5) }, (_, i) => {
        const t = i / 10;
        const x = 300 + t * 1000;
        const y = round2(132 + Math.sin(Math.PI * t) * 104);
        return (
          <g key={i}>
            <circle cx={x} cy={y + 14} r="7" fill="#fff2cf" />
            <circle cx={x} cy={y + 14} r="70" fill={`url(#${id}-lamp)`} opacity="0.55" />
          </g>
        );
      })}

      <Haze id={id} y={300} height={280} opacity={0.42} />

      {/* Idols in progress, ranked back to front. */}
      <IdolSilhouette x={470} y={floor - 30} s={0.72} fill={p.mid} />
      <IdolSilhouette x={1140} y={floor - 34} s={0.68} fill={p.mid} />
      <IdolSilhouette x={800} y={floor + 40} s={1.18} fill={p.near} halo haloColor={p.lampSoft} />
      <IdolSilhouette x={330} y={floor + 96} s={1} fill={p.near} />
      <IdolSilhouette x={1290} y={floor + 104} s={1.04} fill={p.near} />

      {/* Straw armatures waiting for clay. */}
      {[620, 990].map((x, i) => (
        <g key={x} transform={`translate(${x} ${floor + 20})`} opacity="0.85">
          <rect x="-5" y="-190" width="10" height="190" fill={p.near} />
          <path d="M -40 -156 q 40 -22 80 0 l 6 92 q -46 18 -92 0 Z" fill={p.mid} opacity={0.75 + i * 0.1} />
          {Array.from({ length: n(9, 3) }, (_, k) => (
            <line
              key={k}
              x1={-40 + k * 10}
              y1={-160}
              x2={-34 + k * 10}
              y2={-56}
              stroke={p.lampSoft}
              strokeWidth="1.2"
              opacity="0.25"
            />
          ))}
        </g>
      ))}

      {/* An artisan, crouched, working at the base of the big idol. */}
      <g transform="translate(940 858)" fill={p.near}>
        <circle cx="0" cy="-104" r="21" />
        <path d="M -30 0 q -6 -76 30 -80 q 36 4 30 80 Z" />
        <path d="M 26 -66 q 52 -12 66 18" stroke={p.near} strokeWidth="13" fill="none" strokeLinecap="round" />
      </g>

      {/* Lane floor. */}
      <rect x="0" y={floor + 190} width={W} height={H} fill={p.near} />
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Durga Puja                                                       */
/* ------------------------------------------------------------------ */

function PujoFrame({ id, p, q = 1 }: FrameProps) {
  const n = (v: number, floor = 3) => step(v, q, floor);
  return (
    <Frame id={id} name="pujo">
      {/* Pandal facade: a tiered bamboo-and-cloth arch. */}
      <path d={`M 250 ${H} L 250 320 Q 800 -20 1350 320 L 1350 ${H} Z`} fill={p.far} />
      <path d={`M 330 ${H} L 330 372 Q 800 74 1270 372 L 1270 ${H} Z`} fill={p.mid} />

      {/* Bulb strings following the arch. */}
      {[0, 1, 2].map((ring) => (
        <g key={ring}>
          {Array.from({ length: n(26, 9) }, (_, i) => {
            const t = i / 25;
            const spread = 520 - ring * 54;
            const x = 800 + (t - 0.5) * 2 * spread;
            const lift = 300 + ring * 60;
            const y = lift + Math.pow((t - 0.5) * 2, 2) * (250 - ring * 26);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={4.5}
                fill="#ffeab0"
                opacity={0.55 + seeded(i + ring * 30) * 0.45}
                style={{ animation: `lamp-flicker ${3 + (i % 4)}s infinite ${i * 0.11}s` }}
              />
            );
          })}
        </g>
      ))}

      {/* The garbhagriha, glowing, with the idol inside it. */}
      <path d={`M 560 ${H} L 560 430 Q 800 250 1040 430 L 1040 ${H} Z`} fill={p.lampSoft} opacity="0.32" />
      <ellipse cx="800" cy="560" rx="300" ry="290" fill={`url(#${id}-lamp)`} opacity="0.65" />
      <IdolSilhouette x={800} y={720} s={1.5} fill="#1a0a0d" halo haloColor="#f6c04a" />

      <Haze id={id} y={480} height={240} opacity={0.4} />

      {/* Dhaakis at the side, drums slung. */}
      {[
        { x: 400, s: 1 },
        { x: 1210, s: 0.94 },
      ].map((d) => (
        <g key={d.x} transform={`translate(${d.x} 852) scale(${d.s})`} fill="#140609">
          <circle cx="0" cy="-138" r="22" />
          <path d="M -28 -32 q -8 -84 28 -86 q 36 2 28 86 Z" />
          <ellipse cx="0" cy="-40" rx="52" ry="30" transform="rotate(-12)" />
          <path d="M -46 -96 l -30 -46" stroke="#140609" strokeWidth="7" strokeLinecap="round" />
          <path d="M 46 -96 l 30 -50" stroke="#140609" strokeWidth="7" strokeLinecap="round" />
        </g>
      ))}

      {/* The crowd, three deep. */}
      <Crowd seed={303} baseY={880} fill="#170709" count={n(16, 6)} scale={0.9} />
      <Crowd seed={404} baseY={H + 40} fill="#0d0406" count={n(13, 5)} scale={1.35} />
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Victoria Memorial                                                */
/* ------------------------------------------------------------------ */

function VictoriaFrame({ id, p, q = 1 }: FrameProps) {
  const n = (v: number, floor = 3) => step(v, q, floor);
  const ground = 660;
  const marble = "#e8dcc9";
  return (
    <Frame id={id} name="victoria">
      <Stars count={n(54, 10)} maxY={300} />
      <Birds x={280} y={190} scale={0.9} />
      <Haze id={id} y={520} height={220} opacity={0.55} />

      {/* Tree line behind. */}
      {Array.from({ length: n(22, 8) }, (_, i) => {
        const x = seeded(i + 500) * W;
        const r = 40 + seeded(i + 600) * 40;
        return <circle key={i} cx={x} cy={ground - r * 0.5} r={r} fill={p.far} opacity="0.85" />;
      })}

      {/* The building, floodlit against a blue hour sky. */}
      <g>
        <rect x="440" y="452" width="720" height="210" fill={marble} opacity="0.93" />
        <rect x="360" y="510" width="880" height="152" fill={marble} opacity="0.86" />
        {/* Corner pavilions. */}
        {[392, 1140].map((x) => (
          <g key={x}>
            <rect x={x} y="430" width="68" height="232" fill={marble} opacity="0.9" />
            <path d={`M ${x - 6} 430 q 40 -54 80 0 Z`} fill={marble} opacity="0.9" />
            <circle cx={x + 34} cy="392" r="13" fill={marble} opacity="0.9" />
          </g>
        ))}
        {/* Central dome and drum. */}
        <rect x="694" y="392" width="212" height="66" fill={marble} opacity="0.95" />
        <path d="M 686 392 Q 800 152 914 392 Z" fill={marble} />
        <path d="M 686 392 Q 800 152 914 392 Z" fill="#000" opacity="0.1" />
        <ellipse cx="800" cy="392" rx="114" ry="14" fill={marble} />
        <rect x="782" y="150" width="36" height="34" rx="6" fill={marble} />
        {/* The Angel of Victory, on her bearings. */}
        <g fill={marble}>
          <circle cx="800" cy="126" r="11" />
          <path d="M 792 116 l 8 -34 l 8 34 Z" />
          <path d="M 800 116 q -48 -22 -62 -60 q 40 12 62 44 q 22 -32 62 -44 q -14 38 -62 60 Z" opacity="0.92" />
        </g>
        {/* Colonnade. */}
        {Array.from({ length: n(24, 10) }, (_, i) => (
          <rect
            key={i}
            x={372 + i * (864 / n(24, 10))}
            y="530"
            width="12"
            height="128"
            fill="#b9ab95"
            opacity="0.55"
          />
        ))}
        {/* Warm wash from the floodlights at the base. */}
        <rect x="340" y="560" width="920" height="102" fill={p.lamp} opacity="0.11" />
      </g>

      {[420, 800, 1180].map((x) => (
        <Lamp key={x} id={id} x={x} y={ground + 6} r={190} opacity={0.55} />
      ))}

      {/* Lawn, then the reflecting pool. */}
      <rect x="0" y={ground} width={W} height={H - ground} fill={p.mid} />
      <ellipse cx="800" cy="806" rx="620" ry="94" fill={p.far} opacity="0.9" />
      <g opacity="0.3" transform="translate(0 1608) scale(1 -1)" filter={`url(#${id}-soft)`}>
        <path d="M 686 392 Q 800 152 914 392 Z" fill={marble} />
        <rect x="440" y="452" width="720" height="210" fill={marble} />
      </g>

      {/* A couple under one umbrella, which is the actual Maidan. */}
      <g transform="translate(1290 862)" fill={p.near}>
        <circle cx="-16" cy="-116" r="17" />
        <circle cx="18" cy="-110" r="17" />
        <path d="M -40 0 q -4 -84 24 -84 q 28 0 24 84 Z" />
        <path d="M -6 0 q -4 -80 26 -80 q 30 0 26 80 Z" />
        <path d="M -76 -140 q 76 -46 152 0 Z" />
        <line x1="0" y1="-140" x2="0" y2="-96" stroke={p.near} strokeWidth="4" />
      </g>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Street food                                                      */
/* ------------------------------------------------------------------ */

function StreetFoodFrame({ id, p, q = 1 }: FrameProps) {
  const n = (v: number, floor = 3) => step(v, q, floor);
  const road = 736;
  return (
    <Frame id={id} name="streetfood">
      <Skyline seed={91} baseY={road - 60} minH={200} maxH={430} fill={p.far} count={n(13, 6)} lit={q > 0.6 ? 0.3 : 0} opacity={0.8} />
      <Haze id={id} y={480} height={260} opacity={0.45} />

      {/* Shutters and shopfronts behind the cart. */}
      <rect x="0" y="400" width={W} height={road - 400} fill={p.mid} />
      {Array.from({ length: n(8, 4) }, (_, i) => (
        <g key={i}>
          <rect x={40 + i * 196} y="452" width="150" height="220" fill={p.near} opacity="0.7" />
          {seeded(i + 12) > 0.45 && (
            <rect x={48 + i * 196} y="470" width="134" height="118" fill={p.lampSoft} opacity="0.22" />
          )}
        </g>
      ))}

      {/* The cart: tarpaulin, karai, flame, bulb. */}
      <g transform="translate(560 300)">
        <path d="M -40 130 L 620 130 L 654 176 L -74 176 Z" fill="#241612" />
        <rect x="-16" y="176" width="10" height="300" fill="#1a100e" />
        <rect x="596" y="176" width="10" height="300" fill="#1a100e" />
        <rect x="-40" y="418" width="660" height="26" rx="4" fill="#1c1210" />
        <rect x="-40" y="444" width="660" height="180" fill="#150d0c" />

        {/* Hanging bulb over the counter. */}
        <line x1="290" y1="176" x2="290" y2="268" stroke="#1a100e" strokeWidth="2.5" />
        <circle cx="290" cy="278" r="12" fill="#fff2cd" />
        <circle cx="290" cy="278" r="230" fill={`url(#${id}-lamp)`} opacity="0.85" />

        {/* Karai with oil, and the flame under it. */}
        <ellipse cx="130" cy="418" rx="98" ry="26" fill="#0e0908" />
        <path d="M 32 418 q 98 88 196 0 Z" fill="#120b0a" />
        <ellipse cx="130" cy="416" rx="88" ry="20" fill="#8a5320" opacity="0.65" />
        <ellipse cx="130" cy="414" rx="60" ry="12" fill="#ffbe62" opacity="0.32" />
        <g style={{ animation: "lamp-flicker 1.6s infinite" }}>
          <path d="M 96 470 q 34 -56 68 0 q -34 34 -68 0 Z" fill="#ff8a2e" opacity="0.8" />
          <path d="M 112 468 q 18 -34 36 0 q -18 20 -36 0 Z" fill="#ffd76a" opacity="0.9" />
        </g>
        {/* Steam. */}
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M ${104 + i * 30} 388 q 18 -50 0 -96 q -18 -46 0 -84`}
            fill="none"
            stroke="#fff0d4"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.1"
            style={{ animation: `drift-up ${5 + i}s linear ${i * 1.4}s infinite` }}
          />
        ))}

        {/* Stacked bhaars and a tray of rolls. */}
        {Array.from({ length: n(7, 3) }, (_, i) => (
          <path
            key={i}
            d={`M ${400 + (i % 4) * 34} ${418 - Math.floor(i / 4) * 30} l 26 0 l -4 -26 l -18 0 Z`}
            fill="#7a4526"
            opacity="0.9"
          />
        ))}
        <rect x="440" y="404" width="150" height="14" rx="3" fill="#2a1a14" />

        {/* The vendor, behind the karai. */}
        <g fill="#0d0706" transform="translate(230 418)">
          <circle cx="0" cy="-146" r="23" />
          <path d="M -34 0 q -8 -110 34 -112 q 42 2 34 112 Z" />
          <path d="M -30 -96 q -46 22 -66 -6" stroke="#0d0706" strokeWidth="14" fill="none" strokeLinecap="round" />
        </g>
      </g>

      {/* Road and the pool of light on it. */}
      <rect x="0" y={road} width={W} height={H - road} fill={p.near} />
      <ellipse cx="850" cy={road + 80} rx="420" ry="90" fill={p.lamp} opacity="0.09" filter={`url(#${id}-blur)`} />

      {/* Customers, seen from behind. */}
      <Crowd seed={555} baseY={H + 30} fill="#0a0505" count={n(6, 3)} scale={1.5} />
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 7. College Street                                                   */
/* ------------------------------------------------------------------ */

function CollegeStreetFrame({ id, p, q = 1 }: FrameProps) {
  const n = (v: number, floor = 3) => step(v, q, floor);
  const pavement = 720;
  return (
    <Frame id={id} name="collegestreet">
      <Haze id={id} y={340} height={300} opacity={0.5} />

      {/* Facades: shuttered windows and iron balconies. */}
      <rect x="0" y="0" width={W} height={480} fill={p.far} />
      {Array.from({ length: n(12, 5) }, (_, i) => (
        <g key={i}>
          <rect x={30 + i * 132} y="70" width="76" height="130" rx="4" fill={p.mid} />
          <rect x={30 + i * 132} y="252" width="76" height="130" rx="4" fill={p.mid} />
          <rect x={22 + i * 132} y="200" width="92" height="9" fill={p.mid} opacity="0.9" />
          {seeded(i + 21) > 0.5 && (
            <rect x={38 + i * 132} y="264" width="60" height="106" fill={p.lampSoft} opacity="0.2" />
          )}
        </g>
      ))}
      <rect x="0" y="470" width={W} height="22" fill={p.mid} />

      {/* Blue tarpaulins over the stalls. */}
      {[
        { x: -20, w: 460 },
        { x: 470, w: 400 },
        { x: 900, w: 420 },
        { x: 1350, w: 320 },
      ].map((t, i) => (
        <path
          key={i}
          d={`M ${t.x} 492 L ${t.x + t.w} 492 L ${t.x + t.w - 26} 566 Q ${t.x + t.w / 2} 596 ${t.x + 26} 566 Z`}
          fill={i % 2 ? "#2b3a3f" : "#31434a"}
          opacity="0.92"
        />
      ))}

      {/* Walls of books: spines, stacked and leaning. */}
      {Array.from({ length: n(130, 34) }, (_, i) => {
        const cols = n(26, 12);
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = 26 + col * (1548 / cols) + seeded(i) * 8;
        const y = pavement - 24 - row * 30;
        const w = 34 + seeded(i + 9) * 20;
        const h = 22 + seeded(i + 19) * 6;
        const tones = ["#8a6a3a", "#6d4b2c", "#a58445", "#4f4630", "#7d5330", "#93763f"];
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={h}
            rx="1.5"
            fill={tones[i % tones.length]}
            opacity={0.55 + seeded(i + 31) * 0.4}
            transform={seeded(i + 41) > 0.9 ? `rotate(${-6 + seeded(i) * 12} ${x + w / 2} ${y + h / 2})` : undefined}
          />
        );
      })}

      {/* Pavement and a cycle-van of paper. */}
      <rect x="0" y={pavement} width={W} height={H - pavement} fill={p.near} />
      <g transform="translate(1130 830)" fill="#0f0c08">
        <rect x="-130" y="-96" width="230" height="70" rx="6" opacity="0.95" />
        <rect x="-118" y="-152" width="200" height="60" rx="4" fill="#6d4b2c" opacity="0.8" />
        <circle cx="-86" cy="-8" r="26" />
        <circle cx="60" cy="-8" r="26" />
        <path d="M 100 -100 l 42 -56" stroke="#0f0c08" strokeWidth="8" strokeLinecap="round" />
      </g>

      {/* A reader, absorbed, which is the whole street. */}
      <g transform="translate(390 862)" fill={p.near}>
        <circle cx="0" cy="-134" r="21" />
        <path d="M -32 0 q -6 -100 32 -102 q 38 2 32 102 Z" />
        <path d="M -40 -84 l 80 0 l 0 32 l -80 0 Z" fill="#c9a35c" opacity="0.5" />
      </g>

      <Birds x={1200} y={130} scale={0.8} />
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 8. The river at dawn                                                */
/* ------------------------------------------------------------------ */

function RiverFrame({ id, p, q = 1 }: FrameProps) {
  const n = (v: number, floor = 3) => step(v, q, floor);
  const waterline = 592;
  return (
    <Frame id={id} name="river">
      <circle cx="1140" cy="470" r="66" fill="#ffd9a8" opacity="0.55" filter={`url(#${id}-soft)`} />
      <Birds x={300} y={210} scale={1.2} />

      {/* Far bank, almost lost in mist. */}
      <Skyline seed={71} baseY={waterline} minH={30} maxH={110} fill={p.far} count={n(30, 10)} opacity={0.4} />
      {/* The second bridge, cable-stayed, in outline only. */}
      <g opacity="0.28" stroke={p.far} strokeWidth="3" fill="none">
        <path d="M 120 560 L 1480 560" />
        <path d="M 480 560 L 480 348" />
        <path d="M 1080 560 L 1080 348" />
        {Array.from({ length: n(9, 4) }, (_, i) => (
          <g key={i}>
            <line x1="480" y1="352" x2={480 - 40 - i * 36} y2="558" />
            <line x1="480" y1="352" x2={480 + 40 + i * 36} y2="558" />
            <line x1="1080" y1="352" x2={1080 - 40 - i * 36} y2="558" />
            <line x1="1080" y1="352" x2={1080 + 40 + i * 36} y2="558" />
          </g>
        ))}
      </g>
      <Haze id={id} y={470} height={220} opacity={0.85} />

      {/* Water. */}
      <rect x="0" y={waterline} width={W} height={H - waterline} fill={`url(#${id}-water)`} />
      {Array.from({ length: n(22, 6) }, (_, i) => (
        <rect
          key={i}
          x={seeded(i + 800) * W - 160}
          y={waterline + 14 + i * 13}
          width={180 + seeded(i + 900) * 400}
          height={2}
          fill="#fff0dc"
          opacity={0.05 + seeded(i + 950) * 0.09}
          style={{ animation: `river-shimmer ${11 + (i % 6) * 2}s ease-in-out ${i * 0.25}s infinite alternate` }}
        />
      ))}
      <ellipse cx="1140" cy={waterline + 130} rx="70" ry="130" fill="#ffd9a8" opacity="0.12" filter={`url(#${id}-blur)`} />

      {/* Ghat steps down into the water, in the foreground. */}
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x="-20" y={730 + i * 22} width={520 - i * 44} height="22" fill={p.near} opacity={0.88 + i * 0.012} />
      ))}

      {/* A ferry, and a bather. */}
      <g transform="translate(880 660)" fill={p.mid}>
        <path d="M -110 0 q 110 34 220 0 l -18 30 q -92 18 -184 0 Z" />
        <rect x="-70" y="-52" width="140" height="52" rx="5" />
        <rect x="-56" y="-42" width="112" height="24" fill={p.lampSoft} opacity="0.3" />
        <rect x="-6" y="-84" width="7" height="32" />
      </g>
      <g transform="translate(430 792)" fill={p.near}>
        <circle cx="0" cy="-40" r="15" />
        <path d="M -22 6 q -4 -50 22 -52 q 26 2 22 52 Z" />
        <path d="M -60 6 q 60 22 120 0" stroke="#fff0dc" strokeWidth="2" fill="none" opacity="0.2" />
      </g>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 9. Rooftops                                                         */
/* ------------------------------------------------------------------ */

function RooftopsFrame({ id, p, q = 1 }: FrameProps) {
  const n = (v: number, floor = 3) => step(v, q, floor);
  return (
    <Frame id={id} name="rooftops">
      <circle cx="1290" cy="330" r="78" fill="#ffca86" opacity="0.35" filter={`url(#${id}-soft)`} />
      <Birds x={200} y={170} scale={1} />
      <Skyline seed={121} baseY={520} minH={60} maxH={190} fill={p.far} count={n(26, 9)} opacity={0.6} />
      <Haze id={id} y={420} height={220} opacity={0.5} />

      {/* Kites: the autumn sky over north Kolkata. */}
      {[
        { x: 420, y: 190, s: 1, r: -18 },
        { x: 760, y: 118, s: 0.7, r: 12 },
        { x: 1060, y: 226, s: 0.85, r: -8 },
      ].map((k, i) => (
        <g key={i} transform={`translate(${k.x} ${k.y}) rotate(${k.r}) scale(${k.s})`}>
          <path d="M 0 -26 L 24 0 L 0 34 L -24 0 Z" fill={i % 2 ? "#d8632f" : "#e0a233"} opacity="0.9" />
          <path d="M 0 -26 L 0 34 M -24 0 L 24 0" stroke="#2a1a12" strokeWidth="1.2" opacity="0.5" />
          <path d="M 0 34 q 16 34 -8 62 q -22 26 -4 58" fill="none" stroke="#2a1a12" strokeWidth="1.6" opacity="0.55" />
        </g>
      ))}

      {/* Terraces, stepping forward. */}
      {[
        { y: 560, h: 340, fill: p.mid, seed: 5, n: 7 },
        { y: 690, h: 300, fill: p.near, seed: 15, n: 5 },
      ].map((band, bi) => (
        <g key={bi}>
          {Array.from({ length: band.n }, (_, i) => {
            const w = W / band.n;
            const x = i * w;
            const lift = seeded(band.seed + i) * 70;
            return (
              <g key={i}>
                <rect x={x} y={band.y - lift} width={w + 2} height={band.h + lift} fill={band.fill} />
                {/* Parapet. */}
                <rect x={x} y={band.y - lift - 16} width={w + 2} height={16} fill={band.fill} />
                {Array.from({ length: n(7, 3) }, (_, k) => (
                  <rect
                    key={k}
                    x={x + 12 + k * (w / n(7, 3))}
                    y={band.y - lift - 30}
                    width={9}
                    height={16}
                    fill={band.fill}
                  />
                ))}
                {/* Water tank on legs. */}
                {seeded(band.seed + i + 40) > 0.4 && (
                  <g fill={band.fill}>
                    <rect x={x + w * 0.62} y={band.y - lift - 78} width={54} height={44} rx="5" />
                    <rect x={x + w * 0.65} y={band.y - lift - 34} width={7} height={22} />
                    <rect x={x + w * 0.62 + 40} y={band.y - lift - 34} width={7} height={22} />
                  </g>
                )}
                {/* Dish. */}
                {seeded(band.seed + i + 70) > 0.6 && (
                  <ellipse
                    cx={x + w * 0.26}
                    cy={band.y - lift - 40}
                    rx="22"
                    ry="11"
                    fill={band.fill}
                    transform={`rotate(-28 ${x + w * 0.26} ${band.y - lift - 40})`}
                  />
                )}
              </g>
            );
          })}
        </g>
      ))}

      {/* Washing line, which is on every terrace in the city. */}
      <path d="M 210 700 Q 470 742 730 704" fill="none" stroke={p.near} strokeWidth="2.5" />
      {Array.from({ length: n(6, 3) }, (_, i) => {
        const t = (i + 0.5) / n(6, 3);
        const x = 210 + t * 520;
        const y = round2(700 + Math.sin(Math.PI * t) * 40);
        const tones = ["#c46a34", "#d8a24f", "#7f9a86", "#c9b07a", "#a8543a", "#d6c7a4"];
        return (
          <path
            key={i}
            d={`M ${x - 22} ${y} l 44 0 l -6 76 q -16 8 -32 0 Z`}
            fill={tones[i % tones.length]}
            opacity="0.55"
          />
        );
      })}

      {/* Someone flying a kite from the near parapet. */}
      <g transform="translate(1240 760)" fill={p.near}>
        <circle cx="0" cy="-120" r="20" />
        <path d="M -30 0 q -6 -96 30 -98 q 36 2 30 98 Z" />
        <path d="M -22 -86 q -50 -34 -70 -74" stroke={p.near} strokeWidth="12" fill="none" strokeLinecap="round" />
      </g>
    </Frame>
  );
}

export const sceneFrames: Record<
  SceneName,
  (props: FrameProps) => React.ReactElement
> = {
  howrah: HowrahFrame,
  tram: TramFrame,
  kumartuli: KumartuliFrame,
  pujo: PujoFrame,
  victoria: VictoriaFrame,
  streetfood: StreetFoodFrame,
  collegestreet: CollegeStreetFrame,
  river: RiverFrame,
  rooftops: RooftopsFrame,
};
