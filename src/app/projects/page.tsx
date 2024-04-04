import Card from "@/components/Card";
import Layout from "@/components/Layout";
import { ProjectLoader } from "@/lib/data-loaders/project-loader";
import { load } from "@/lib/load";
import Image from "next/image";
import Link from "next/link";

export default async function Projects() {
  const db = await load();
  const projects = await new ProjectLoader(db).load();
  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center dark:bg-gray-800 pb-4">
        <div className="px-4 max-w-screen-md">
          {projects.map((project) => (
            <Link key={project.slug} href={`projects/${project.slug}`}>
              <Card className="max-w-128 mt-12 dark:bg-zinc-900 dark:text-zinc-200 p-8 overflow-hidden shadow-lg bg-white hover:shadow-xl transform hover:scale-105 transition duration-300">
                <Card.Header>
                  <Card.Title>{project.title}</Card.Title>
                </Card.Header>
                <Card.Content>
                  <p className="text-sm italic font-light">
                    {project.description}
                  </p>
                  <Image
                    className="mx-auto py-2"
                    src={project.coverImage ?? ""}
                    alt={`${project.title} Image`}
                    width={200}
                    height={50}
                    style={{ width: "auto" }}
                    priority
                  />
                  <div className="flex flex-row justify-end">
                    <Link
                      href={`projects/${project.slug}`}
                      className="text-sm hover:underline"
                    >
                      {"Read more ->"}
                    </Link>
                  </div>
                </Card.Content>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}
