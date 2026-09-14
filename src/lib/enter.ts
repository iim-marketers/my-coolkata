export const ENTER_EVENT = "coolkata:enter";

export const ENTER_IMAGES =
  ":is(.hero-rise, .hero-down, .hero-zoom, .hero-slide, .hero-pop) img";

export const ENTER_GIVE_UP = 2500;

/** Runs `fn` once the entrance is settled, immediately if it already is. */
export function onEnter(fn: () => void): () => void {
  if (typeof document === "undefined") return () => {};
  // No mark at all means the inline script never ran; there is nothing to
  // wait for, so the page animates as it always would have.
  if (document.documentElement.dataset.enter !== "hold") {
    fn();
    return () => {};
  }
  document.addEventListener(ENTER_EVENT, fn, { once: true });
  return () => document.removeEventListener(ENTER_EVENT, fn);
}
