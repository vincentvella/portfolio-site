import Layout from "@/components/Layout";
import { ProjectLoader } from "@/lib/data-loaders/project-loader";
import { load } from "@/lib/load";
import Image from "next/image";
import { getDocumentSlugs } from "outstatic/server";

type ProjectParams = {
  slug: string;
};

type ProjectProps = {
  params: ProjectParams;
};

export default async function Project(props: ProjectProps) {
  const db = await load();
  const project = await new ProjectLoader(db).loadProject(props.params.slug);
  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center pb-4 dark:bg-gray-800">
        <div className="max-w-screen-md px-4">
          <h1 className="p-4 text-center text-2xl">{project.title}</h1>
          <h2 className="text-center text-lg">{project.description}</h2>
          <Image
            className="mx-auto py-2"
            src={project.coverImage ?? ""}
            alt={`${project.title} Image`}
            width={500}
            height={300}
            style={{ width: "auto" }}
            priority
          />
          <section className="flex-grow py-6">
            <p>{project.content}</p>
          </section>
          <section>
            <h3 className="font-semibold">Stack:</h3>
            <ul className="flex flex-row flex-wrap">
              {project.stack.map((item) => (
                <li
                  className="mr-1 rounded bg-zinc-600 p-1 px-2 text-zinc-200 dark:bg-zinc-900"
                  key={item.value}
                >
                  {item.label}
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
