import { ProjectLoader } from "@/lib/data-loaders/project-loader";
import { ImageResponse } from "next/og";
import { load } from "outstatic/server";

export const alt = "Project — Vince Vella";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENTS: Record<string, { bg: string; ink: string }> = {
  primary: { bg: "#FFD23D", ink: "#131313" },
  accent: { bg: "#4ec5b0", ink: "#131313" },
  secondary: { bg: "#f48474", ink: "#131313" },
  "brand-violet": { bg: "#b08cff", ink: "#131313" },
};

function pickAccent(slug: string) {
  const keys = Object.keys(ACCENTS);
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return ACCENTS[keys[Math.abs(h) % keys.length]];
}

type Props = { params: Promise<{ slug: string }> };

export default async function ProjectOg(props: Props) {
  const { slug } = await props.params;
  const db = await load();

  let title = "Project";
  let description = "";
  let accentKey: string | null = null;
  try {
    const project = await new ProjectLoader(db).loadProject(slug);
    title = project.title;
    description = project.description ?? "";
    accentKey = project.accentColor ?? null;
  } catch {
    /* fall through to defaults */
  }
  const accent = (accentKey && ACCENTS[accentKey]) || pickAccent(slug);

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
            background: accent.bg,
            borderRadius: 14,
            padding: 56,
            boxShadow: "10px 10px 0 0 #131313",
            color: accent.ink,
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
              Project
            </div>
            <div
              style={{
                display: "flex",
                fontSize: title.length > 14 ? 130 : 170,
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: -4,
                marginTop: 12,
              }}
            >
              {title}
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
            {description && (
              <div
                style={{
                  display: "flex",
                  fontSize: 32,
                  fontWeight: 600,
                  lineHeight: 1.3,
                }}
              >
                {description}
              </div>
            )}
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
