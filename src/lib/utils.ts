export { cn } from "cn"

/**
 * Round to two decimals. Math.sin, Math.cos and fractional Math.pow can
 * differ in the last bit between Node and the browser; rounding anything
 * computed with them keeps server-rendered SVG identical on hydration.
 */
export const round2 = (v: number) => Math.round(v * 100) / 100
