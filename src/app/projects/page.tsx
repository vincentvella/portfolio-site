import { Badge } from "@/components/Badge";
import Layout from "@/components/Layout";
import { StampedHeader } from "@/components/StampedHeader";
import {
  AccentColor,
  ProjectLoader,
} from "@/lib/data-loaders/project-loader";
import Image from "next/image";
import Link from "next/link";
import { load } from "outstatic/server";

const FALLBACK_ACCENTS: AccentColor[] = [
  "primary",
  "accent",
  "secondary",
  "brand-violet",
];

const ACCENT_BG: Record<AccentColor, string> = {
  primary: "bg-primary",
  accent: "bg-accent",
  secondary: "bg-secondary",
  "brand-violet": "bg-brand-violet",
};

const TAPE_RIPS = [
  "tape-rip-1",
  "tape-rip-2",
  "tape-rip-3",
  "tape-rip-4",
  "tape-rip-5",
  "tape-rip-6",
];

const TAPE_WIDTHS = ["w-36", "w-40", "w-44", "w-48"];

const TAPE_ROTATIONS_DEG = [-10, -6, -3, 3, 6, 10];

const TAPE_X_OFFSETS_PX = [-6, -3, 0, 3, 6];

const CARD_TILTS = ["-2deg", "-1deg", "1deg", "2deg"];

function hash(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pickAccent(slug: string): AccentColor {
  return FALLBACK_ACCENTS[hash(slug) % FALLBACK_ACCENTS.length];
}

export default async function Projects() {
  const db = await load();
  const projects = await new ProjectLoader(db).load();
  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center pb-4">
        <div className="max-w-(--breakpoint-lg) w-full px-4">
          <StampedHeader
            stamp="Projects"
            title="Projects"
            subtitle="Things I've built, broken, and shipped."
          />
          <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2">
            {projects.map((project) => {
              const accent = project.accentColor ?? pickAccent(project.slug);
              const seed = hash(project.slug);
              const tilt = CARD_TILTS[seed % CARD_TILTS.length];
              const tapeRip = TAPE_RIPS[(seed >> 2) % TAPE_RIPS.length];
              const tapeWidth = TAPE_WIDTHS[(seed >> 4) % TAPE_WIDTHS.length];
              const tapeRotationDeg =
                TAPE_ROTATIONS_DEG[(seed >> 6) % TAPE_ROTATIONS_DEG.length];
              const tapeOffsetPx =
                TAPE_X_OFFSETS_PX[(seed >> 8) % TAPE_X_OFFSETS_PX.length];
              return (
                <Link
                  key={project.slug}
                  href={`projects/${project.slug}`}
                  className="group block"
                  style={{ rotate: tilt }}
                >
                  <article className="neo-border neo-shadow-lg neo-press bg-card relative rounded-sm p-3 pb-6 transition-transform duration-200 ease-out group-hover:[rotate:0deg]">
                    <span
                      aria-hidden
                      className={`${ACCENT_BG[accent]} ${tapeRip} ${tapeWidth} absolute -top-4 left-1/2 z-10 h-9`}
                      style={{
                        translate: `calc(-50% + ${tapeOffsetPx}px) 0`,
                        rotate: `${tapeRotationDeg}deg`,
                      }}
                    />
                    <div className="bg-muted relative aspect-[4/3] w-full overflow-hidden">
                      {project.coverImage ? (
                        <Image
                          className="object-cover"
                          src={project.coverImage}
                          alt={`${project.title} Image`}
                          sizes="(max-width: 640px) 100vw, 400px"
                          fill
                          priority
                        />
                      ) : (
                        <ul className="flex h-full w-full flex-row flex-wrap content-center items-center justify-center gap-1.5 p-4">
                          {project.stack.slice(0, 6).map((item) => (
                            <li key={item.value}>
                              <Badge look="neo" variant="outline">
                                {item.label}
                              </Badge>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="mt-4 px-1">
                      <h2 className="font-display text-2xl font-bold leading-tight tracking-tight">
                        {project.title}
                      </h2>
                      <p className="text-muted-foreground mt-1 text-sm leading-snug">
                        {project.description}
                      </p>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </Layout>
  );
}
