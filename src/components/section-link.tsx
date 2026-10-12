"use client";

import { useEffect } from "react";

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

export function DropHash() {
  useEffect(() => {
    let frame = 0;
    const drop = () => {
      const { hash, pathname, search } = window.location;
      if (!hash) return;
      // On a full load the router rewrites the URL after mount, so wait a frame.
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
