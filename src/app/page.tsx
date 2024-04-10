import Layout from "../components/Layout";
import Image from "next/image";
import {
  ContactMethod,
  ContactMethodLoader,
} from "@/lib/data-loaders/contact-method-loader";
import { ResumeSectionLoader } from "@/lib/data-loaders/resume-section-loader";
import { Button } from "@/components/Button";
import { ContactMethodIcon } from "@/components/ContactMethodIcon";
import { ProfessionalTLDR } from "@/components/ProfessionalTLDR";
import { PressCoverage } from "@/components/PressCoverage";
import { load } from "@/lib/load";

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
      <main className="flex min-h-screen flex-col items-center pb-4 dark:bg-gray-800">
        <div className="max-w-screen-md px-4">
          <div className="mt-16 flex w-full flex-col">
            <Image
              className="relative my-4 rounded-full"
              src="/images/avatar-1x.jpeg"
              alt="Avatar Image"
              width={100}
              height={100}
              priority
            />
            <h1 className="mb-4 text-4xl font-bold">Vincent Vella</h1>
            <section className="mb-4">
              {typeof resumeSections.about.description === "string" &&
                addEmailLink(resumeSections.about.description, email)}
            </section>
            <div className="flex gap-x-1 pt-1 text-sm">
              {contactMethods.map((method) => (
                <Button
                  aria-label={method.title.toLowerCase()}
                  key={method.title.toLowerCase()}
                  variant="ghost"
                  size="sm"
                  asChild
                >
                  <a href={method.content}>
                    <ContactMethodIcon
                      size={18}
                      method={method.title.toLowerCase()}
                    />
                  </a>
                </Button>
              ))}
            </div>
          </div>
          <ProfessionalTLDR />
          <PressCoverage />
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
