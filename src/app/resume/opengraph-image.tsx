import { ImageResponse } from "next/og";

export const alt = "Resume — Vince Vella";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ResumeOg() {
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
            background: "#FFD23D",
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
              Curriculum Vitae
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 220,
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: -8,
                marginTop: 12,
              }}
            >
              Resume
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              maxWidth: 980,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 36,
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Vince Vella — Lead Software Engineer
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
              vincevella.com/resume
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
