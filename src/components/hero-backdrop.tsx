import { cn } from "@/lib/utils";

export function HeroBackdrop({ size = "full" }: { size?: "full" | "mini" }) {
  const mini = size === "mini";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="hero-dots absolute inset-0" />
      <div
        className={cn(
          "absolute rounded-full bg-primary/10 blur-3xl",
          mini ? "-top-40 -left-32 size-112" : "-top-48 -left-40 size-144",
        )}
      />
      <div
        className={cn(
          "absolute rounded-full bg-marigold/20 blur-3xl",
          mini ? "top-16 -right-40 size-96" : "top-24 -right-48 size-128",
        )}
      />
      {/* The skyline drifts right to left, forever. */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 overflow-hidden text-foreground/[0.07]",
          mini ? "h-16 sm:h-20" : "h-24 sm:h-32",
        )}
      >
        <div className="skyline-marquee flex h-full w-max">
          {Array.from({ length: 8 }, (_, i) => (
            <Skyline
              key={i}
              className="aspect-1440/140 h-full w-auto shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** A marker-pen underline that draws itself in. */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 20"
      preserveAspectRatio="none"
      aria-hidden
      className={`hero-draw ${className ?? ""}`}
    >
      <path
        d="M3 13C30 4 55 18 82 10s53-7 78 1 30 3 37-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Howrah Bridge, Shaheed Minar, Victoria Memorial and a tram, in one line. */
function Skyline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 140"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      fill="currentColor"
    >
      <rect x="0" y="128" width="1440" height="12" />
      <rect x="0" y="100" width="36" height="28" />
      <rect x="40" y="86" width="30" height="42" />
      <g
        stroke="currentColor"
        strokeWidth="5"
        fill="none"
        strokeLinejoin="round"
      >
        <path d="M80 100 185 40l45 60M185 40v60M425 40l-55 60M425 40l95 60M185 40q120 55 240 0" />
      </g>
      <rect x="80" y="98" width="440" height="7" />
      <rect x="180" y="38" width="10" height="90" />
      <rect x="420" y="38" width="10" height="90" />
      <rect x="540" y="92" width="34" height="36" />
      <path d="M596 128V54l5-14 5 14v74Z" />
      <circle cx="601" cy="38" r="4" />
      <rect x="624" y="104" width="46" height="24" />
      <rect x="700" y="96" width="280" height="32" />
      <rect x="790" y="76" width="100" height="20" />
      <path d="M800 77q40-58 80 0Z" />
      <rect x="836" y="16" width="8" height="16" />
      <circle cx="840" cy="12" r="4" />
      <path d="M708 97q17-24 34 0ZM938 97q17-24 34 0Z" />
      <rect x="1000" y="108" width="24" height="20" />
      <path d="M990 68h450" stroke="currentColor" strokeWidth="2" />
      <path d="M1098 96l20-28" stroke="currentColor" strokeWidth="3" />
      <rect x="1040" y="94" width="140" height="28" rx="7" />
      <rect x="1200" y="80" width="40" height="48" />
      <rect x="1248" y="96" width="30" height="32" />
      <rect x="1286" y="70" width="46" height="58" />
      <rect x="1340" y="92" width="36" height="36" />
      <rect x="1384" y="84" width="56" height="44" />
    </svg>
  );
}
