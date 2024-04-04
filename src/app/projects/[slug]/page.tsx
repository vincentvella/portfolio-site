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
      <main className="flex min-h-screen flex-col items-center dark:bg-gray-800 pb-4">
        <div className="px-4 max-w-screen-md">
          <h1 className="text-center text-2xl p-4">{project.title}</h1>
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
          <section className="py-6 flex-grow">
            <p>{project.content}</p>
          </section>
          <section>
            <h3 className="font-semibold">Stack:</h3>
            <ul className="flex flex-row flex-wrap">
              {project.stack.map((item) => (
                <li
                  className="dark:bg-zinc-900 bg-zinc-600 text-zinc-200 p-1 px-2 mr-1 rounded"
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
