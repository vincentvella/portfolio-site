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
      <main className="flex min-h-screen flex-col items-center justify-between dark:bg-gray-800">
        <div className="px-4 max-w-screen-md">
          <div className="flex w-full flex-col mt-16">
            <Image
              className="relative rounded-full my-4"
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
                    <ContactMethodIcon
                      size={18}
                      method={method.title.toLowerCase()}
                    />
                  </a>
                </Button>
              ))}
            </div>
          </div>
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
