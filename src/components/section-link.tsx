"use client";

import { useEffect } from "react";

/** Scrolls to a section on this page without writing `#id` into the URL. */
export function SectionLink({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={`#${to}`}
      className={className}
      onClick={(e) => {
        const el = document.getElementById(to);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ block: "start" });
      }}
    >
      {children}
    </a>
  );
}

/** Arriving at `/page#id`: land on the section, then drop the `#id` from the address bar. */
export function DropHash() {
  useEffect(() => {
    let frame = 0;
    const drop = () => {
      const { hash, pathname, search } = window.location;
      if (!hash) return;
      // A frame later, or the router writes its first URL back over ours on a full load.
      frame = requestAnimationFrame(() => {
        window.history.replaceState(null, "", pathname + search);
        document
          .getElementById(decodeURIComponent(hash.slice(1)))
          ?.scrollIntoView({ block: "start" });
      });
    };
    drop();
    window.addEventListener("hashchange", drop);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", drop);
    };
  }, []);

  return null;
}
