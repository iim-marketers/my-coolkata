import Link from "next/link";
import { CITY_COORDS_DISPLAY } from "@/lib/kolkata";
import { sectionGroups } from "@/lib/kolkata/section-groups";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border bg-background">
      <div className="mx-auto w-full max-w-352 px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2.8fr] lg:gap-16">
          <div>
            <Link
              href="/"
              className="font-display text-xl font-semibold tracking-widest"
            >
              KOLKATA
            </Link>
            <p className="mt-3 max-w-xs text-[0.86rem] leading-relaxed text-muted-foreground">
              Fifteen million people on the east bank of the Hooghly: once an
              empire&apos;s capital, the seat of a renaissance, and home to two
              national anthems.
            </p>
            <p className="mt-4 font-mono text-[0.6rem] tracking-[0.28em] text-muted-foreground/60">
              {CITY_COORDS_DISPLAY}
            </p>
          </div>

          {/* The same four groups as the menu, so nothing is a long list. */}
          <nav
            aria-label="All sections"
            className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
          >
            {sectionGroups.map((group) => (
              <div key={group.label}>
                <p className="font-mono text-[0.58rem] tracking-[0.22em] text-muted-foreground/70 uppercase">
                  {group.label}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {group.items.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        className="text-[0.84rem] text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border pt-5">
          <p className="text-[0.74rem] leading-relaxed text-muted-foreground/70">
            Photographs from Wikimedia Commons, used under Creative Commons
            licences.{" "}
            <Link
              href="/credits"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              Photo credits
            </Link>
          </p>
          <a
            href="#"
            className="font-mono text-[0.58rem] tracking-[0.2em] text-muted-foreground/60 uppercase transition-colors hover:text-foreground"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
