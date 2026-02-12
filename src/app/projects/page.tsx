import Card from "@/components/Card";
import Layout from "@/components/Layout";
import { ProjectLoader } from "@/lib/data-loaders/project-loader";
import Image from "next/image";
import Link from "next/link";
import { load } from "outstatic/server";

export default async function Projects() {
  const db = await load();
  const projects = await new ProjectLoader(db).load();
  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center pb-4 dark:bg-gray-800">
        <div className="max-w-(--breakpoint-md) px-4">
          {projects.map((project) => (
            <Link key={project.slug} href={`projects/${project.slug}`}>
              <Card className="mt-12 max-w-lg transform overflow-hidden bg-white p-8 shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl dark:bg-zinc-900 dark:text-zinc-200">
                <Card.Header>
                  <Card.Title>{project.title}</Card.Title>
                </Card.Header>
                <Card.Content>
                  <p className="text-sm font-light italic">
                    {project.description}
                  </p>
                  <div className="relative h-64 w-full">
                    <Image
                      className="mx-auto min-h-64 py-2"
                      src={project.coverImage ?? ""}
                      alt={`${project.title} Image`}
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      fill
                      priority
                    />
                  </div>
                  <div className="flex flex-row justify-end">
                    <div className="text-sm hover:underline">
                      {"Read more ->"}
                    </div>
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
