import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const markSrc = `data:image/svg+xml;base64,${await readFile(
  join(process.cwd(), "src/app/icon.svg"),
  "base64",
)}`;
const bricolage = await readFile(
  join(process.cwd(), "src/assets/fonts/bricolage-grotesque-800.ttf"),
);

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 44,
        background: "#fcfbf7",
      }}
    >
      <img src={markSrc} width={200} height={200} alt="" />
      <div
        style={{
          display: "flex",
          fontFamily: "Bricolage Grotesque",
          fontSize: 132,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: "#101622",
        }}
      >
        <span style={{ color: "#ffae23" }}>My</span>
        <span style={{ marginLeft: "0.25em" }}>Cool</span>
        <span style={{ color: "#d81f23" }}>kata</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Bricolage Grotesque", data: bricolage, weight: 800 }],
    },
  );
}
