import { BagLoader } from "@/lib/data-loaders/bag-loader";
import { ImageResponse } from "next/og";
import { load } from "outstatic/server";

export const alt = "What's in my bag — Vince Vella";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function BagOg() {
  const db = await load();
  const latest = await new BagLoader(db).loadLatest();
  const year = latest?.year ?? new Date().getFullYear();
  const tagline = latest?.tagline ?? "What I am actually using this year.";
  return renderBagOg(year, tagline);
}

export function renderBagOg(year: number, tagline: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#faf8f1",
          padding: 48,
          fontFamily: "system-ui",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "6px solid #131313",
            background: "#4ec5b0",
            borderRadius: 14,
            padding: 56,
            boxShadow: "10px 10px 0 0 #131313",
            color: "#131313",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: 6,
                textTransform: "uppercase",
                opacity: 0.85,
              }}
            >
              What's in my bag
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 280,
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: -10,
                marginTop: 6,
              }}
            >
              {year}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              maxWidth: 880,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 30,
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              {tagline}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: "uppercase",
                opacity: 0.8,
                marginTop: 4,
              }}
            >
              vincevella.com
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
