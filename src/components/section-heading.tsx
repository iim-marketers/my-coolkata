import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[0.62rem] tracking-[0.3em] text-primary uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  href,
  hrefLabel = "See all",
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  href?: string;
  hrefLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end justify-between gap-x-8 gap-y-4",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 className="mt-3 font-display text-[clamp(1.75rem,4.4vw,3rem)] leading-[1.05] font-semibold tracking-tight text-balance">
          {title}
        </h2>
        {lede ? (
          <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-muted-foreground">
            {lede}
          </p>
        ) : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-2 border-b border-border pb-1 font-mono text-[0.68rem] tracking-[0.22em] uppercase transition-colors hover:border-primary hover:text-primary"
        >
          {hrefLabel}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : null}
    </div>
  );
}

/** A hairline with a pigment dot, used between major blocks. */
export function Rule({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="size-1 rounded-full bg-terracotta" />
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export function Stat({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note?: string;
}) {
  return (
    <div className="border-t border-border pt-4">
      <p className="font-display text-[clamp(1.6rem,4vw,2.4rem)] leading-none font-semibold text-terracotta">
        {value}
      </p>
      <p className="mt-2 text-sm font-medium">{label}</p>
      {note ? (
        <p className="mt-1 text-[0.8rem] leading-snug text-muted-foreground">
          {note}
        </p>
      ) : null}
    </div>
  );
}
