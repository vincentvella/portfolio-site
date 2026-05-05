import { Badge } from "@/components/Badge";
import Card from "@/components/Card";
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
        <div className="max-w-(--breakpoint-md) w-full px-4">
          <StampedHeader
            stamp="Projects"
            title="Projects"
            subtitle="Things I've built, broken, and shipped."
          />
          <div className="grid gap-8">
            {projects.map((project) => {
              const accent = project.accentColor ?? pickAccent(project.slug);
              return (
              <Link
                key={project.slug}
                href={`projects/${project.slug}`}
                className="block neo-press"
              >
                <Card variant="neo" className="overflow-hidden">
                  <div
                    className={`${ACCENT_BG[accent]} border-b-2 border-foreground px-6 py-4 text-zinc-950`}
                  >
                    <Card.Title>{project.title}</Card.Title>
                    <p className="mt-1 text-sm font-medium">
                      {project.description}
                    </p>
                  </div>
                  <Card.Content className="p-6">
                    {project.coverImage ? (
                      <div className="relative h-64 w-full">
                        <Image
                          className="mx-auto min-h-64"
                          src={project.coverImage}
                          alt={`${project.title} Image`}
                          style={{ objectFit: "contain" }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          fill
                          priority
                        />
                      </div>
                    ) : (
                      <ul className="flex flex-row flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <li key={item.value}>
                            <Badge look="neo" variant="outline">{item.label}</Badge>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-4 flex flex-row justify-end">
                      <div className="font-semibold underline decoration-2 underline-offset-2">
                        {"Read more →"}
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </Link>
              );
            })}
          </div>
        </div>
      </main>
    </Layout>
  );
}
