import Layout from "@/components/Layout";
import { Badge } from "@/components/Badge";
import { ProjectLoader } from "@/lib/data-loaders/project-loader";
import Image from "next/image";
import { getDocumentSlugs, load } from "outstatic/server";

type ProjectParams = {
  slug: string;
};

type ProjectProps = {
  params: Promise<ProjectParams>;
};

export default async function Project(props: ProjectProps) {
  const db = await load();
  const { slug } = await props.params;
  const project = await new ProjectLoader(db).loadProject(slug);
  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center pb-4">
        <div className="max-w-(--breakpoint-md) w-full px-4">
          <h1 className="font-display mt-6 text-center text-4xl font-bold tracking-tight md:text-5xl">
            {project.title}
          </h1>
          <h2 className="text-muted-foreground mt-2 text-center text-lg">
            {project.description}
          </h2>
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
            <h3 className="font-display text-xl font-bold">Stack</h3>
            <ul className="mt-2 flex flex-row flex-wrap gap-2">
              {project.stack.map((item) => (
                <li key={item.value}>
                  <Badge look="neo" variant="outline">{item.label}</Badge>
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
