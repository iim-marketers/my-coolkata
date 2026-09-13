import Link from "next/link";
import { Logo } from "@/components/logo";
import { sectionGroups } from "@/lib/kolkata/section-groups";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border bg-secondary/60">
      <div className="mx-auto w-full max-w-352 px-5 pt-12 pb-8 sm:px-8 sm:pt-16 sm:pb-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2.8fr] lg:gap-16">
          <div>
            <Link href="/" aria-label="Cool-kata home" className="inline-block">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-[0.9rem] leading-relaxed text-muted-foreground">
              Your cheat sheet to Kolkata: what to eat, where to wander and
              what&apos;s on this weekend.
            </p>
          </div>

          {/* The same groups as the menu, so nothing is a long list. */}
          <nav
            aria-label="All sections"
            className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3"
          >
            {sectionGroups.map((group) => (
              <div key={group.label}>
                <p className="text-[0.72rem] font-semibold tracking-[0.14em] text-foreground uppercase">
                  {group.label}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {group.items.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        className="text-[0.88rem] text-muted-foreground transition-colors hover:text-primary"
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
          <p className="text-[0.78rem] leading-relaxed text-muted-foreground">
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
            className="text-[0.78rem] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
