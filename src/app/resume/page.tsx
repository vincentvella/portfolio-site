import Layout from "@/components/Layout";
import {
  ContactMethod,
  ContactMethodLoader,
} from "@/lib/data-loaders/contact-method-loader";
import { EducationLoader } from "@/lib/data-loaders/education-loader";
import { LanguageLoader } from "@/lib/data-loaders/language-loader";
import { PositionLoader } from "@/lib/data-loaders/position-loader";
import { ProjectLoader } from "@/lib/data-loaders/project-loader";
import { ResumeSectionLoader } from "@/lib/data-loaders/resume-section-loader";
import { ContactMethodIcon } from "@/components/ContactMethodIcon";
import Card from "@/components/Card";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import "@/styles/print.css";
import { unlink } from "@/lib/unlink";
import { Badge } from "@/components/Badge";
import { CommandMenu } from "@/components/CommandMenu";
import React from "react";
import { load } from "@/lib/load";
import Link from "next/link";

const PERSONAL_INFO = {
  name: "Vince Vella",
  title: "Senior Software Engineer",
  location: "Oxford, PA, USA",
};

const desiredPrintContactMethods = ["email", "vellapps", "github"];

export default async function Resume() {
  const {
    resumeSections,
    projects,
    positions,
    education,
    contactMethods,
    languages,
  } = await getData();

  return (
    <Layout className="print:hidden" hideThemeSwitch>
      <main className="relative mx-auto scroll-my-12 overflow-auto p-4 md:pt-6">
        <Section className="mx-auto w-full max-w-3xl bg-white pb-8 print:pb-0">
          <div className="flex items-center justify-between">
            <div className="flex-1 space-y-1.5">
              <h1 className="text-3xl font-bold">{PERSONAL_INFO.name}</h1>
              <p className="text-prettytext-sm max-w-md text-muted-foreground">
                {PERSONAL_INFO.title}
              </p>
              <p className="max-w-md items-center text-pretty text-xs text-muted-foreground print:hidden">
                {PERSONAL_INFO.location}
              </p>
              <p className="hidden max-w-md items-center text-pretty text-xs text-muted-foreground print:flex">
                {PERSONAL_INFO.location} |{" "}
                {unlink(
                  contactMethods.find(
                    (method) => method.title.toLowerCase() === "phone",
                  )?.content,
                )}
              </p>
              <div className="flex gap-x-1 pt-1 text-sm text-muted-foreground print:hidden">
                {contactMethods.map((method) => (
                  <Button
                    name={method.title.toLowerCase()}
                    key={method.title.toLowerCase()}
                    className="size-8"
                    aria-label={method.title}
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <a href={method.content}>
                      <ContactMethodIcon method={method.title.toLowerCase()} />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
            <div className="hidden flex-col gap-x-1 text-sm text-muted-foreground print:flex">
              {contactMethods
                .reduce((acc, method) => {
                  const title = method.title.toLowerCase();
                  if (desiredPrintContactMethods.indexOf(title) >= 0) {
                    acc.push({ ...method, title });
                  }
                  return acc;
                }, [] as ContactMethod[])
                .sort(
                  (a, b) =>
                    desiredPrintContactMethods.indexOf(a.title) -
                    desiredPrintContactMethods.indexOf(b.title),
                )
                .map((method) => (
                  <div
                    key={method.title.toLowerCase()}
                    className="flex items-center"
                  >
                    <Button
                      key={method.title.toLowerCase()}
                      className="size-8 text-black"
                      size="icon"
                      asChild
                    >
                      <a href={method.content}>
                        <ContactMethodIcon
                          method={method.title.toLowerCase()}
                        />
                      </a>
                    </Button>
                    <a key={method.content} href={method.content}>
                      <span className="underline">
                        {unlink(method.content)}
                      </span>
                    </a>
                  </div>
                ))}
            </div>
          </div>
          <div className="grid grid-cols-3 md:divide-x">
            <div className="col-span-3 mr-2 md:col-span-2 print:col-span-2">
              <Section>
                <p className="text-pretty pb-2 pt-2 text-sm text-muted-foreground">
                  {resumeSections.about.content}
                </p>
              </Section>
              <Section>
                <h2 className="text-xl font-bold underline">Work Experience</h2>
                {positions.map(([company, positions]) => (
                  <Card key={company}>
                    <Card.Header>
                      <div className="flex">
                        <h3 className="inline-flex items-center justify-center leading-none">
                          <a
                            className="font-bold hover:underline"
                            href={positions?.[0].companyWebsite}
                          >
                            {positions[0]?.company}
                          </a>
                          , {positions[0]?.location}
                          <span className="inline-flex gap-x-1">
                            {positions[0]?.badges?.map((badge) => (
                              <Badge
                                variant="secondary"
                                className="ml-2 align-middle text-xs"
                                key={badge.value}
                              >
                                {badge.label}
                              </Badge>
                            ))}
                          </span>
                        </h3>
                      </div>
                    </Card.Header>
                    <Card.Content className="list-disk mt-2">
                      {positions.map((position) => (
                        <React.Fragment key={position.title}>
                          <div className="space-between flex items-center justify-between gap-x-2 font-semibold">
                            <h4 className="inline-flex text-base font-semibold leading-none">
                              {position.title}
                            </h4>
                            <div className="hidden text-sm tabular-nums sm:block">
                              {position.startDate} -{" "}
                              {position.endDate || "Present"}
                            </div>
                          </div>
                          <div className="text-sm font-semibold tabular-nums sm:hidden">
                            {position.startDate} -{" "}
                            {position.endDate || "Present"}
                          </div>
                          <ul className="list-outside list-disc pl-4 text-xs text-muted-foreground">
                            {position.content.map((item) => (
                              <li key={item}>{item.replace("- ", "")}</li>
                            ))}
                          </ul>
                        </React.Fragment>
                      ))}
                    </Card.Content>
                  </Card>
                ))}
              </Section>
              <Section>
                <h2 className="text-xl font-bold underline">Education</h2>
                {education.map((education) => {
                  return (
                    <Card key={education.title}>
                      <Card.Header>
                        <div className="flex items-center text-base">
                          <h3 className="font-semibold leading-none">
                            {education.title}
                          </h3>
                          <div className="hidden items-center tabular-nums sm:inline-flex">
                            <div className="hidden sm:block">,&nbsp;</div>
                            {education.location}
                          </div>
                        </div>
                      </Card.Header>
                      <Card.Content className="text-xs text-muted-foreground">
                        <div className="text-base tabular-nums sm:hidden">
                          {education.location}
                        </div>
                        {education.content}
                      </Card.Content>
                    </Card>
                  );
                })}
              </Section>
              <Section>
                <h2 className="text-xl font-bold underline">Projects</h2>
                {projects.map((projects) => (
                  <Card key={projects.title}>
                    <Card.Header>
                      <div className="flex items-center gap-x-2 text-base">
                        <h3 className="font-semibold leading-none">
                          <Link href={`projects/${projects.slug}`}>
                            {projects.title}
                          </Link>
                        </h3>
                        <div className="hidden text-sm sm:block">
                          -&nbsp;{projects.description}
                        </div>
                      </div>
                    </Card.Header>
                    <Card.Content className="text-xs text-muted-foreground">
                      <div className="text-sm sm:hidden">
                        {projects.description}
                      </div>
                      <ul className="list-outside list-disc pl-4 text-xs text-muted-foreground">
                        {projects.bullets.map((item, index) => (
                          <li key={index}>{item.replace("- ", "")}</li>
                        ))}
                      </ul>
                      <div className="italic">
                        <span className="underline">Stack</span>:&nbsp;
                        {projects.stack.map((stack) => stack.label).join(", ")}
                      </div>
                    </Card.Content>
                  </Card>
                ))}
              </Section>
            </div>
            <div className="col-span-3 md:col-span-1 md:pl-2 print:col-span-1">
              <Section>
                <h2 className="text-xl font-bold underline">Skills</h2>
                <ul className="space-y-1 pl-2">
                  {typeof resumeSections.skills.content !== "string" &&
                    resumeSections.skills.content.map((skill) => {
                      return (
                        <li key={skill} className="text-xs">
                          {skill}
                        </li>
                      );
                    })}
                </ul>
              </Section>
              <Section>
                <h2 className="text-xl font-bold underline">Languages</h2>
                {languages.map((level) => (
                  <React.Fragment key={level.title}>
                    <h3 className="font-semibold">{level.title}</h3>
                    <ul className="grid grid-cols-2 space-y-1">
                      {level.content.map((language) => (
                        <li key={language} className="pl-2 pr-2 text-xs">
                          {language}
                        </li>
                      ))}
                    </ul>
                  </React.Fragment>
                ))}
              </Section>
              <Section>
                <h2 className="text-xl font-bold underline">
                  Frameworks & Tools
                </h2>
                <ul className="grid grid-cols-2 space-y-1 pb-4">
                  {typeof resumeSections.frameworks_and_tools.content !==
                    "string" &&
                    resumeSections.frameworks_and_tools.content.map((skill) => {
                      return (
                        <li key={skill} className="-mr-8 pl-2 text-xs">
                          {skill}
                        </li>
                      );
                    })}
                </ul>
              </Section>
              <Section>
                <h2 className="text-xl font-bold underline">
                  Hobbies & Interests
                </h2>
                <ul className="space-y-1 pl-2">
                  {typeof resumeSections.hobbies_and_interests.content !==
                    "string" &&
                    resumeSections.hobbies_and_interests.content.map(
                      (hobby) => {
                        return (
                          <li key={hobby} className="text-xs">
                            {hobby}
                          </li>
                        );
                      },
                    )}
                </ul>
              </Section>
            </div>
          </div>
        </Section>
        <CommandMenu
          links={[
            {
              url: "https://vincevella.com",
              title: "Personal Website",
            },
            ...contactMethods
              .filter((method) => method.type === "social")
              .map((method) => ({
                url: method.content,
                title: method.title,
              })),
          ]}
        />
      </main>
    </Layout>
  );
}

async function getData() {
  const db = await load();

  const results = await Promise.all([
    await new ContactMethodLoader(db).load(),
    await new EducationLoader(db).load(),
    await new LanguageLoader(db).load(),
    await new PositionLoader(db).load(),
    await new ProjectLoader(db).load(),
    await new ResumeSectionLoader(db).stringify("about").load(),
  ]);

  const [
    contactMethods,
    education,
    languages,
    positions,
    projects,
    resumeSections,
  ] = results;

  return {
    contactMethods,
    education,
    languages,
    positions,
    projects,
    resumeSections,
  };
}
