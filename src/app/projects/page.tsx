import Card from "@/components/Card";
import Layout from "@/components/Layout";
import { ProjectLoader } from "@/lib/data-loaders/project-loader";
import Image from "next/image";
import Link from "next/link";
import { load } from "outstatic/server";

const ACCENT_BG = ["bg-primary", "bg-accent", "bg-secondary", "bg-brand-violet"];

export default async function Projects() {
  const db = await load();
  const projects = await new ProjectLoader(db).load();
  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center pb-4">
        <div className="max-w-(--breakpoint-md) w-full px-4">
          <div className="mt-8 mb-8">
            <h1 className="font-display text-5xl font-bold tracking-tight md:text-6xl">
              Projects
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Things I&apos;ve built, broken, and shipped.
            </p>
          </div>
          <div className="grid gap-8">
            {projects.map((project, idx) => (
              <Link
                key={project.slug}
                href={`projects/${project.slug}`}
                className="block neo-press"
              >
                <Card variant="neo" className="overflow-hidden">
                  <div
                    className={`${ACCENT_BG[idx % ACCENT_BG.length]} border-b-2 border-foreground px-6 py-4 text-zinc-950`}
                  >
                    <Card.Title>{project.title}</Card.Title>
                    <p className="mt-1 text-sm font-medium">
                      {project.description}
                    </p>
                  </div>
                  <Card.Content className="p-6">
                    <div className="relative h-64 w-full">
                      <Image
                        className="mx-auto min-h-64"
                        src={project.coverImage ?? ""}
                        alt={`${project.title} Image`}
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                        priority
                      />
                    </div>
                    <div className="mt-4 flex flex-row justify-end">
                      <div className="font-semibold underline decoration-2 underline-offset-2">
                        {"Read more →"}
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
