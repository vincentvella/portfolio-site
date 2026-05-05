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
import { ProjectLoader } from "@/lib/data-loaders/project-loader";
import { RoleCycler } from "@/components/RoleCycler";
import { StackMarquee } from "@/components/StackMarquee";
import { load } from "outstatic/server";

const ROLES = [
  "Lead Software Engineer",
  "Mobile App Developer",
  "Indie Maker",
  "Coffee Tinkerer",
  "Terminal Hacker",
];

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
  const { resumeSections, contactMethods, projects } = await getData();
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

  const stackTags = Array.from(
    new Map(
      projects.flatMap((p) => p.stack).map((tag) => [tag.value, tag]),
    ).values(),
  );

  return (
    <Layout>
      <main id="main" className="flex min-h-screen flex-col items-center">
        <div className="max-w-(--breakpoint-md) w-full px-4">
          <div className="mt-12 flex w-full flex-col">
            <div
              className="relative mb-6 inline-block w-fit"
              data-sketch-label="hero photo"
            >
              <div className="bg-accent neo-border avatar-shadow absolute inset-0 rounded-full" />
              <Image
                className="neo-border bg-card relative rounded-full"
                src="/images/avatar-illustration.jpeg"
                alt="Vince Vella, illustrated portrait"
                width={120}
                height={120}
                priority
              />
            </div>
            <h1
              className="font-display mb-2 text-5xl font-bold tracking-tight md:text-6xl"
              data-sketch-label="name (h1)"
            >
              Vincent Vella
            </h1>
            <div data-sketch-label="rotating roles">
              <RoleCycler
                roles={ROLES}
                className="text-muted-foreground mb-4"
              />
            </div>
            <section className="mb-6">
              {typeof resumeSections.about.description === "string" &&
                addEmailLink(resumeSections.about.description, email)}
            </section>
            <div
              className="flex flex-wrap gap-2 pt-1 text-sm"
              data-sketch-label="contact methods"
            >
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
              <div className="mt-8" data-sketch-label="status sticker">
                <CurrentlyStamp text={currentlyText} />
              </div>
            ) : null}
          </div>
          <ProfessionalTLDR />
          <PressCoverage />
        </div>
        {stackTags.length > 0 ? (
          <div
            className="mt-12 w-full"
            data-sketch-label="tech marquee"
            data-sketch-label-dir="below"
          >
            <StackMarquee tags={stackTags} />
          </div>
        ) : null}
      </main>
    </Layout>
  );
}

async function getData() {
  const db = await load();

  const results = await Promise.all([
    await new ContactMethodLoader(db).load(),
    await new ResumeSectionLoader(db).stringify("about").stringify("currently").load(),
    await new ProjectLoader(db).load(),
  ]);

  const [contactMethods, resumeSections, projects] = results;

  return {
    contactMethods,
    resumeSections,
    projects,
  };
}
