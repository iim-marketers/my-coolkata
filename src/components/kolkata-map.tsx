import { cn } from "@/lib/utils";

/**
 * The base plate: the Hooghly, the wetlands, the Maidan and the built-up
 * area, drawn in the same 0–100 projected space that `project()` returns
 * from `CITY_BOUNDS`. Deliberately a drawing rather than a tile layer, so
 * the page makes no third-party requests.
 *
 * `preserveAspectRatio="none"` stretches the plate to the container, which
 * is also what the percentage-positioned pins do, so the two stay aligned.
 */
export function KolkataMap({
  className,
  id = "km",
}: {
  className?: string;
  id?: string;
}) {
  // Traced from the real channel: Dakshineswar down past Howrah, then the
  // south-west bend below Kidderpore.
  const hooghly =
    "M 52 -4 C 46 4, 41 14, 40 23 C 38 34, 35 45, 33 52 C 30 58, 26 63, 22 69 C 17 76, 12 82, 8 90 C 5 96, 2 100, 0 106";

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn("absolute inset-0 h-full w-full", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-land`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--secondary)" />
          <stop offset="100%" stopColor="var(--muted)" />
        </linearGradient>
        <pattern
          id={`${id}-wet`}
          width="2.6"
          height="2.6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(38)"
        >
          <line x1="0" y1="0" x2="0" y2="2.6" stroke="var(--verdigris)" strokeWidth="0.4" opacity="0.55" />
        </pattern>
      </defs>

      {/* Land. The river is stroked over it rather than cut out of it,
          which avoids a seam where the two paths fail to meet. */}
      <rect x="-2" y="-2" width="104" height="104" fill={`url(#${id}-land)`} />
      {/* Howrah, on the west bank, reads a shade cooler. */}
      <path
        d="M -2 -2 L 46 -2 C 36 22, 30 46, 20 68 C 12 84, 6 94, 1 102 L -2 102 Z"
        fill="var(--hooghly)"
        opacity="0.1"
      />

      {/* East Kolkata Wetlands: a Ramsar site that treats the city's sewage. */}
      <path
        d="M 78 42 L 99 39 L 99 76 L 82 82 Z"
        fill={`url(#${id}-wet)`}
        stroke="var(--verdigris)"
        strokeWidth="0.3"
        opacity="0.8"
      />

      {/* The Maidan: cleared in 1758 and never built on. */}
      <path d="M 27 63 L 38 62 L 39 76 L 28 77 Z" fill="var(--verdigris)" opacity="0.24" />

      {/* The Hooghly. */}
      <path d={hooghly} fill="none" stroke="var(--hooghly)" strokeWidth="4.6" strokeLinecap="round" opacity="0.4" />
      <path d={hooghly} fill="none" stroke="var(--verdigris)" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />

      {/* Adi Ganga, the old channel past Kalighat. */}
      <path
        d="M 30 76 C 27 84, 24 92, 18 102"
        fill="none"
        stroke="var(--hooghly)"
        strokeWidth="1"
        opacity="0.5"
        strokeDasharray="2.2 1.8"
      />

      {/* Metro Line 1, Dum Dum down to the south. */}
      <path
        d="M 92 18 C 66 34, 46 50, 38 64 C 33 74, 31 84, 30 96"
        fill="none"
        stroke="var(--terracotta)"
        strokeWidth="0.45"
        opacity="0.3"
        strokeDasharray="1.2 1.8"
      />
    </svg>
  );
}
