"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavTram } from "@/components/ambient";
import { ExploreButton } from "@/components/explore";
import { Logo } from "@/components/logo";
import { sections } from "@/lib/kolkata";
import { sectionGroups } from "@/lib/kolkata/section-groups";
import { cn } from "@/lib/utils";

/** Six in the bar; the full index is behind the menu. */
const PRIMARY = sections.slice(0, 6);

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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

  // The home hero is light, so the bar can sit on it clear until the page
  // scrolls. Every other page opens on a photograph and needs it solid.
  const clear = pathname === "/" && !scrolled && !menu;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
          clear
            ? "border-transparent bg-transparent"
            : "border-border bg-background/85 shadow-[0_8px_30px_-22px_oklch(0.2_0.02_265/0.45)] backdrop-blur-md",
          menu && "bg-background",
        )}
      >
        <nav className="mx-auto flex h-16 w-full max-w-352 items-center gap-6 px-5 sm:px-8">
          <Link href="/" aria-label="Cool-kata home" className="shrink-0">
            <Logo />
          </Link>

          <ul className="ml-auto hidden items-center gap-1 xl:flex">
            {PRIMARY.map((s) => {
              const active = pathname.startsWith(s.href);
              return (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-[0.88rem] font-medium transition-colors",
                      active
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    )}
                  >
                    {s.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto flex items-center gap-2 xl:ml-0">
            <ExploreButton className="hidden border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground sm:inline-flex" />
            <Link
              href="/build-my-day"
              className="hidden rounded-full bg-primary px-4 py-1.5 text-[0.86rem] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 md:inline-flex"
            >
              Build my day
            </Link>
            <button
              type="button"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              aria-controls="site-index"
              onClick={() => setMenu((m) => !m)}
              className="rounded-full border border-border bg-card p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {menu ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>
        {/* One tram crosses the bar every couple of minutes. */}
        <NavTram tone="var(--muted-foreground)" />
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
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {sectionGroups.map((group) => (
              <section key={group.label}>
                <h2 className="border-b border-border pb-2 text-[0.72rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
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
                              "font-display text-lg leading-tight font-bold tracking-tight transition-colors group-hover:text-primary",
                              active && "text-primary",
                            )}
                          >
                            {s.label}
                          </span>
                          <span className="block text-[0.78rem] leading-snug text-muted-foreground">
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
          <div className="mt-10 flex flex-col gap-3 sm:hidden">
            <ExploreButton
              shortcut={false}
              className="w-full justify-center border-border bg-card text-muted-foreground"
            />
            <Link
              href="/build-my-day"
              className="rounded-full bg-primary px-4 py-2 text-center text-[0.9rem] font-semibold text-primary-foreground"
            >
              Build my day
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
