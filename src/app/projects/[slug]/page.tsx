import Layout from "@/components/Layout";
import { Badge } from "@/components/Badge";
import {
  AccentColor,
  ProjectLoader,
} from "@/lib/data-loaders/project-loader";
import Image from "next/image";
import { getDocumentSlugs, load } from "outstatic/server";

type ProjectParams = {
  slug: string;
};

type ProjectProps = {
  params: Promise<ProjectParams>;
};

const FALLBACK_ACCENTS: AccentColor[] = [
  "primary",
  "accent",
  "secondary",
  "brand-violet",
];

const ACCENT_BG: Record<AccentColor, string> = {
  primary: "bg-primary text-primary-foreground",
  accent: "bg-accent text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  "brand-violet": "bg-brand-violet text-zinc-950",
};

const ACCENT_DIVIDER: Record<AccentColor, string> = {
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

export default async function Project(props: ProjectProps) {
  const db = await load();
  const { slug } = await props.params;
  const project = await new ProjectLoader(db).loadProject(slug);
  const accent: AccentColor = project.accentColor ?? pickAccent(project.slug);
  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center pb-4">
        <div className="max-w-(--breakpoint-md) w-full px-4">
          <div
            className={`neo-border neo-shadow mt-8 rounded-md px-6 py-5 ${ACCENT_BG[accent]}`}
          >
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-2 text-base font-medium md:text-lg">
              {project.description}
            </p>
          </div>
          {project.coverImage && (
            <div className="neo-border neo-shadow bg-card mx-auto mt-8 w-fit rounded-md p-2">
              <Image
                className="block"
                src={project.coverImage}
                alt={`${project.title} Image`}
                width={500}
                height={300}
                style={{ width: "auto" }}
                priority
              />
            </div>
          )}
          <section className="grow py-6 leading-relaxed">
            <p>{project.content}</p>
          </section>
          <section>
            <div className="flex items-center gap-3">
              <h3 className="font-display text-xl font-bold">Stack</h3>
              <div
                className={`h-1.5 flex-1 ${ACCENT_DIVIDER[accent]} neo-border`}
              />
            </div>
            <ul className="mt-3 flex flex-row flex-wrap gap-2">
              {project.stack.map((item) => (
                <li key={item.value}>
                  <Badge look="neo" variant="outline">
                    {item.label}
                  </Badge>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export async function generateStaticParams() {
  const posts = getDocumentSlugs("projects");
  return posts.map((slug) => ({ slug }));
}
