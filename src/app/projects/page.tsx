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

function pickAccent(slug: string): AccentColor {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return FALLBACK_ACCENTS[Math.abs(h) % FALLBACK_ACCENTS.length];
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
            {projects.map((project, idx) => {
              const accent = project.accentColor ?? pickAccent(project.slug);
              const tilt =
                idx % 4 === 0
                  ? "-1.5deg"
                  : idx % 4 === 1
                    ? "1.5deg"
                    : idx % 4 === 2
                      ? "1deg"
                      : "-1deg";
              const tapeRotation = idx % 2 === 0 ? "-rotate-6" : "rotate-6";
              const tapeRip = idx % 2 === 0 ? "tape-rip-a" : "tape-rip-b";
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
                      className={`${ACCENT_BG[accent]} ${tapeRip} absolute -top-4 left-1/2 z-10 h-9 w-40 -translate-x-1/2 ${tapeRotation}`}
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
