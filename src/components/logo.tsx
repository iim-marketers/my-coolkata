import { cn } from "@/lib/utils";

/**
 * The Cool-kata mark: Howrah Bridge under a sindoor sun, on taxi yellow.
 * Drawn inline so it stays crisp at every size and costs no request.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden
      className={cn("size-9 shrink-0", className)}
    >
      <rect width="40" height="40" rx="12" fill="var(--marigold)" />
      <circle cx="20" cy="12.5" r="3.6" fill="var(--primary)" />
      <g
        fill="none"
        stroke="var(--ink)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 26.5h30" strokeWidth="2.4" />
        <path d="M12 26.5V14M28 26.5V14" strokeWidth="2.4" />
        <path d="M12 14 5.5 24M28 14l6.5 10M12 14q8 9 16 0" strokeWidth="1.8" />
        <path
          d="M8 31.5q3-1.8 6 0t6 0 6 0 6 0"
          strokeWidth="1.6"
          opacity="0.55"
        />
      </g>
    </svg>
  );
}

/** Mark and wordmark. "kata" carries the accent; the hyphen is a taxi-yellow pill. */
export function Logo({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={markClassName} />
      <span className="sr-only">Coolkata</span>
      <span
        aria-hidden
        className="font-display text-[1.4rem] leading-none font-extrabold tracking-[-0.03em] text-foreground"
      >
        Cool
        {/* <span className="mx-[0.06em] inline-block h-[0.2em] w-[0.42em] -translate-y-[0.2em] rounded-full bg-marigold" /> */}
        <span className="text-primary">kata</span>
      </span>
    </span>
  );
}
