import { cn } from "@/lib/utils";

/** A teardrop petal from the origin to `len` up the y axis. */
function petal(len: number, w: number) {
  return `M0 0C${w} ${-len * 0.35} ${w * 0.6} ${-len * 0.8} 0 ${-len}C${-w * 0.6} ${-len * 0.8} ${-w} ${-len * 0.35} 0 0Z`;
}

function ring(count: number, offset = 0) {
  return Array.from({ length: count }, (_, i) => (i * 360) / count + offset);
}

/**
 * An alpana: the rice-paste floor drawing made for pujo and weddings,
 * traced by fingertip in rings around a lotus. Drawn in `currentColor`.
 */
export function Alpana({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-200 -200 400 400"
      className={cn("pointer-events-none", className)}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* The lotus. */}
      {ring(8).map((a) => (
        <path key={`l${a}`} d={petal(46, 18)} transform={`rotate(${a})`} />
      ))}
      {ring(8, 22.5).map((a) => (
        <path key={`s${a}`} d={petal(30, 9)} transform={`rotate(${a})`} />
      ))}
      <circle r={9} fill="currentColor" stroke="none" />
      <circle r={58} />
      {ring(24).map((a) => (
        <circle key={`d${a}`} cy={-66} r={2.6} fill="currentColor" stroke="none" transform={`rotate(${a})`} />
      ))}
      <circle r={74} />

      {/* Petals, big and small, alternating. */}
      {ring(16).map((a) => (
        <path key={`p${a}`} d={petal(42, 14)} transform={`rotate(${a}) translate(0 -76)`} />
      ))}
      {ring(16, 11.25).map((a) => (
        <path key={`q${a}`} d={petal(22, 7)} transform={`rotate(${a}) translate(0 -80)`} />
      ))}
      <circle r={126} strokeDasharray="0.1 8" strokeWidth={3.4} />
      <circle r={136} />

      {/* Scallops, a dot in each gap, then the conch-shell curls. */}
      {ring(32).map((a) => (
        <path key={`c${a}`} d="M-12 0A12 12 0 0 1 12 0" transform={`rotate(${a}) translate(0 -136)`} />
      ))}
      {ring(32, 5.625).map((a) => (
        <circle key={`e${a}`} cy={-154} r={2.2} fill="currentColor" stroke="none" transform={`rotate(${a})`} />
      ))}
      {ring(12).map((a) => (
        <path
          key={`k${a}`}
          d="M0 0c6-12 22-12 22 0c0 9-12 11-14 3c-1-5 5-6 6-2"
          transform={`rotate(${a}) translate(-11 -166)`}
        />
      ))}
      <circle r={188} strokeWidth={1.6} />
    </svg>
  );
}
