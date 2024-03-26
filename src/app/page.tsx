import Layout from "../components/Layout";
import { load } from "outstatic/server";
import Image from "next/image";
import {
  ContactMethod,
  ContactMethodLoader,
} from "@/lib/data-loaders/contact-method-loader";
import { ResumeSectionLoader } from "@/lib/data-loaders/resume-section-loader";
import { Button } from "@/components/Button";
import { ContactMethodIcon } from "@/components/ContactMethodIcon";

function addEmailLink(description: string, email: ContactMethod | undefined) {
  const [preface, ending] = description.split("[email]");
  return (
    <p className="text-lg font-medium">
      {preface}
      <a className="underline underline-offset-2" href={email?.content}>
        email
      </a>
      {ending}
    </p>
  );
}

export default async function Index() {
  const { resumeSections, contactMethods } = await getData();
  const email = contactMethods.find(
    (contactMethod) => contactMethod.title.toLowerCase() === "email",
  );

  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 dark:bg-gray-800">
        <div className="flex w-full flex-col">
          <Image
            className="relative rounded-full mb-4"
            src="/images/avatar-1x.jpeg"
            alt="Next.js Logo"
            width={100}
            height={100}
            priority
          />
          <h1 className="text-4xl font-bold mb-4">Vincent Vella</h1>
          <section className="mb-4">
            {typeof resumeSections.about.description === "string" &&
              addEmailLink(resumeSections.about.description, email)}
          </section>
          <div className="flex gap-x-1 pt-1 text-sm">
            {contactMethods.map((method) => (
              <Button
                key={method.title.toLowerCase()}
                variant="ghost"
                size="sm"
                asChild
              >
                <a href={method.content} style={{ color: "#ffffff" }}>
                  <ContactMethodIcon method={method.title.toLowerCase()} />
                </a>
              </Button>
            ))}
          </div>
        </div>
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 dark:invert"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Docs{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Find in-depth information about Next.js features and API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 dark:invert"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Learn{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 dark:invert"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Templates{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Explore starter templates for Next.js.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 dark:invert"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Deploy{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
              Instantly deploy your Next.js site to a shareable URL with Vercel.
            </p>
          </a>
        </div>
      </main>
    </Layout>
  );
}

async function getData() {
  const db = await load();

  const results = await Promise.all([
    await new ContactMethodLoader(db).load(),
    await new ResumeSectionLoader(db).stringify("about").load(),
  ]);

  const [contactMethods, resumeSections] = results;

  return {
    contactMethods,
    resumeSections,
  };
}
