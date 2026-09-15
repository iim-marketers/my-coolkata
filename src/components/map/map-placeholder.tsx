/**
 * Holds the map's box while Leaflet loads on the client, so nothing jumps.
 * Kept free of Leaflet imports so it can render on the server.
 */
export function MapPlaceholder() {
  return (
    <div className="absolute inset-0 grid animate-pulse place-items-center bg-secondary">
      <p className="font-mono text-[0.6rem] tracking-[0.2em] text-muted-foreground/60 uppercase">
        Loading map
      </p>
    </div>
  );
}
