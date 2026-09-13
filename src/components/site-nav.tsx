"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Moon, MoonStar, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { NavTram } from "@/components/ambient";
import { useEra } from "@/components/era-provider";
import { ExploreButton } from "@/components/explore";
import { sections } from "@/lib/kolkata";
import { sectionGroups } from "@/lib/kolkata/section-groups";
import { cn } from "@/lib/utils";

/** Six in the bar; the full index is behind the menu. */
const PRIMARY = sections.slice(0, 6);

export function SiteNav() {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const { night, setNight } = useEra();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  const home = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the index when the route changes. Adjusting state during render
  // is React's recommended alternative to a route-watching effect.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenu(false);
  }

  // While the index is open, the page behind it holds still and Escape closes it.
  useEffect(() => {
    if (!menu) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  // One control for the look: light, then dark, then Night Kolkata.
  const cycleTheme = () => {
    if (night) {
      setNight(false);
      setTheme("light");
    } else if (resolvedTheme === "dark") {
      setNight(true);
    } else {
      setTheme("dark");
    }
  };

  // Over the hero the bar is invisible; once the page scrolls it solidifies.
  const overHero = home && !scrolled;

  const iconButton = cn(
    "rounded-full border p-2 transition-colors",
    overHero
      ? "border-cream/25 text-cream/80 hover:text-cream"
      : "border-border text-muted-foreground hover:text-foreground",
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          menu
            ? "border-b border-border bg-background"
            : overHero
              ? "bg-transparent"
              : "border-b border-border bg-background/85 backdrop-blur-md",
        )}
      >
        <nav className="mx-auto flex h-16 w-full max-w-352 items-center gap-6 px-5 sm:px-8">
          <Link
            href="/"
            className={cn(
              "font-display text-base font-semibold tracking-[0.14em] transition-colors",
              overHero && !menu ? "text-cream" : "text-foreground",
            )}
          >
            KOLKATA
          </Link>

          <ul className="ml-auto hidden items-center gap-6 lg:flex">
            {PRIMARY.map((s) => {
              const active = pathname.startsWith(s.href);
              return (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className={cn(
                      "font-mono text-[0.66rem] tracking-[0.18em] uppercase transition-colors",
                      overHero
                        ? active
                          ? "text-marigold"
                          : "text-cream/70 hover:text-cream"
                        : active
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {s.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <ExploreButton
              className={cn(
                "hidden sm:inline-flex",
                overHero
                  ? "border-cream/25 text-cream/80 hover:border-cream/50 hover:text-cream"
                  : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
              )}
            />
            <button
              type="button"
              aria-label="Change theme: light, dark or Night Kolkata"
              title="Light → Dark → Night Kolkata"
              onClick={cycleTheme}
              className={cn(
                iconButton,
                night && "border-marigold/60 bg-marigold/10 text-marigold hover:text-marigold",
              )}
            >
              {night ? (
                <MoonStar className="size-3.5" />
              ) : (
                <>
                  <Sun className="size-3.5 dark:hidden" />
                  <Moon className="hidden size-3.5 dark:block" />
                </>
              )}
            </button>
            <button
              type="button"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              aria-controls="site-index"
              onClick={() => setMenu((m) => !m)}
              className={cn(iconButton, menu && "border-border text-foreground")}
            >
              {menu ? (
                <X className="size-3.5" />
              ) : (
                <Menu className="size-3.5" />
              )}
            </button>
          </div>
        </nav>
        {/* Asia's first electric tramway ran here from 1902. One crosses
            the bar every couple of minutes; it is the only decoration on
            the site that is also an argument. */}
        <NavTram tone={overHero ? "var(--cream)" : "var(--muted-foreground)"} />
      </header>

      {/* Full index, grouped, and scrollable when the screen is short. */}
      <div
        id="site-index"
        className={cn(
          "fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-background transition-[opacity,visibility] duration-300",
          menu ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="mx-auto w-full max-w-352 px-5 pt-24 pb-12 sm:px-8 lg:pt-28">
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {sectionGroups.map((group) => (
              <section key={group.label}>
                <h2 className="border-b border-border pb-2 font-mono text-[0.62rem] tracking-[0.2em] text-muted-foreground/70 uppercase">
                  {group.label}
                </h2>
                <ul className="mt-2">
                  {group.items.map((s) => {
                    const active = pathname.startsWith(s.href);
                    return (
                      <li key={s.href}>
                        <Link
                          href={s.href}
                          aria-current={active ? "page" : undefined}
                          className="group block py-1.5"
                        >
                          <span
                            className={cn(
                              "font-display text-lg leading-tight font-semibold transition-colors group-hover:text-terracotta",
                              active && "text-primary",
                            )}
                          >
                            {s.label}
                          </span>
                          <span className="block text-[0.74rem] leading-snug text-muted-foreground">
                            {s.blurb}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
          <div className="mt-10 sm:hidden">
            <ExploreButton
              shortcut={false}
              className="w-full justify-center border-border text-muted-foreground"
            />
          </div>
        </div>
      </div>
    </>
  );
}
