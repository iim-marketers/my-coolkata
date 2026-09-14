/**
 * The moment the page is judged ready to animate.
 *
 * A cold load on a phone spends its first seconds fetching the bundle,
 * hydrating and — the expensive part — decoding photographs. Frames
 * painted in that window are dropped, so a banner sequence started there
 * elapses unseen: it appears to stick, then arrives all at once. Anything
 * that plays an entrance waits for this signal instead.
 *
 * The mark is set, and the event fired, by the inline script in the root
 * layout — it has to run before the body is styled, which is earlier than
 * any React code gets to.
 */
export const ENTER_EVENT = "coolkata:enter";

/**
 * The photographs the banner animates in. Waiting on their `decode()` is
 * what keeps the sequence off the frames the browser spends rasterising
 * them; the classes are the entrance utilities in `globals.css`.
 */
export const ENTER_IMAGES =
  ":is(.hero-rise, .hero-down, .hero-zoom, .hero-slide, .hero-pop) img";

/**
 * How long the entrance is worth waiting for, in milliseconds. Past this
 * the load is slow enough that the choreography would be a stutter rather
 * than a sequence, so it is dropped and the page simply appears.
 */
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
