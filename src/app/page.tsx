import Layout from "../components/Layout";
import Image from "next/image";
import {
  ContactMethod,
  ContactMethodLoader,
} from "@/lib/data-loaders/contact-method-loader";
import { ResumeSectionLoader } from "@/lib/data-loaders/resume-section-loader";
import { Button } from "@/components/Button";
import { ContactMethodIcon } from "@/components/ContactMethodIcon";
import { CurrentlyStamp } from "@/components/CurrentlyStamp";
import { ProfessionalTLDR } from "@/components/ProfessionalTLDR";
import { PressCoverage } from "@/components/PressCoverage";
import { load } from "outstatic/server";

function addEmailLink(description: string, email: ContactMethod | undefined) {
  const [preface, ending] = description.split("[email]");
  return (
    <p className="text-lg font-medium leading-relaxed">
      {preface}
      <a
        className="underline decoration-2 underline-offset-4 hover:decoration-primary"
        href={email?.content}
      >
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
  const currently = resumeSections.currently?.content;
  const currentlyText =
    typeof currently === "string"
      ? currently
      : Array.isArray(currently)
        ? currently.join(" ")
        : null;

  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center pb-4">
        <div className="max-w-(--breakpoint-md) w-full px-4">
          <div className="mt-12 flex w-full flex-col">
            <div className="relative mb-6 inline-block w-fit">
              <div className="bg-primary neo-border absolute inset-0 translate-x-2 translate-y-2 rounded-full" />
              <Image
                className="neo-border bg-card relative rounded-full"
                src="/images/avatar-1x.jpeg"
                alt="Avatar Image"
                width={120}
                height={120}
                priority
              />
            </div>
            <h1 className="font-display mb-4 text-5xl font-bold tracking-tight md:text-6xl">
              Vincent Vella
            </h1>
            <section className="mb-6">
              {typeof resumeSections.about.description === "string" &&
                addEmailLink(resumeSections.about.description, email)}
            </section>
            <div className="flex flex-wrap gap-2 pt-1 text-sm">
              {contactMethods.map((method) => (
                <Button
                  aria-label={method.title.toLowerCase()}
                  key={method.title.toLowerCase()}
                  variant="outline"
                  size="icon"
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
            {currentlyText ? (
              <div className="mt-8">
                <CurrentlyStamp text={currentlyText} />
              </div>
            ) : null}
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
    await new ResumeSectionLoader(db).stringify("about").stringify("currently").load(),
  ]);

  const [contactMethods, resumeSections] = results;

  return {
    contactMethods,
    resumeSections,
  };
}
