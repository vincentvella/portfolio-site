import Layout from "@/components/Layout";
import { Badge } from "@/components/Badge";
import {
  AccentColor,
  ProjectLoader,
} from "@/lib/data-loaders/project-loader";
import { Metadata } from "next";
import Image from "next/image";
import { getDocumentSlugs, load } from "outstatic/server";

export async function generateMetadata(props: ProjectProps): Promise<Metadata> {
  const { slug } = await props.params;
  const db = await load();
  try {
    const project = await new ProjectLoader(db).loadProject(slug);
    const description = project.description ?? `${project.title} by Vince Vella`;
    return {
      title: project.title,
      description,
      alternates: { canonical: `/projects/${project.slug}` },
      openGraph: {
        title: project.title,
        description,
        url: `/projects/${project.slug}`,
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: project.title,
        description,
      },
    };
  } catch {
    return {};
  }
}

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
  const projectLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `https://vincevella.com/projects/${project.slug}`,
    ...(project.coverImage
      ? { image: `https://vincevella.com${project.coverImage}` }
      : {}),
    author: {
      "@type": "Person",
      name: "Vincent Vella",
      url: "https://vincevella.com",
    },
    keywords: project.stack.map((s) => s.label).join(", "),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://vincevella.com" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://vincevella.com/projects" },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `https://vincevella.com/projects/${project.slug}`,
      },
    ],
  };
  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <main id="main" className="flex min-h-screen flex-col items-center pb-4">
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
          {project.coverImage &&
            project.imageDims &&
            project.imageDims.aspectRatio < 1 ? (
            <div className="mx-auto mt-8 flex justify-center">
              <div className="neo-border relative h-[560px] aspect-[9/19.5] overflow-hidden rounded-[14%/6%] bg-card shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)]">
                <span
                  aria-hidden
                  className="bg-foreground/30 absolute left-1/2 top-[2.5%] z-10 h-[2.5%] w-[34%] -translate-x-1/2 rounded-full"
                />
                <Image
                  className="absolute inset-0 h-full w-full object-cover"
                  src={project.coverImage}
                  alt={`Cover for ${project.title}`}
                  width={project.imageDims?.width ?? 260}
                  height={project.imageDims?.height ?? 560}
                  sizes="260px"
                  priority
                />
              </div>
            </div>
          ) : project.coverImage ? (
            <div className="neo-border neo-shadow bg-card mx-auto mt-8 w-fit rounded-md p-2">
              <Image
                className="block max-h-[440px] w-auto"
                src={project.coverImage}
                alt={`Cover for ${project.title}`}
                width={project.imageDims?.width ?? 500}
                height={project.imageDims?.height ?? 300}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 500px"
                priority
              />
            </div>
          ) : null}
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
