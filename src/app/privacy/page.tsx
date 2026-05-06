import Layout from "@/components/Layout";
import { Metadata } from "next";

const LAST_UPDATED = "May 5, 2026";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How vincevella.com handles visitor data — analytics, cookies, third parties.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy",
    description:
      "How vincevella.com handles visitor data — analytics, cookies, third parties.",
    url: "/privacy",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy",
    description:
      "How vincevella.com handles visitor data — analytics, cookies, third parties.",
  },
};

export default function PrivacyPage() {
  return (
    <Layout>
      <main
        id="main"
        className="flex min-h-screen flex-col items-center pb-4"
      >
        <div className="max-w-(--breakpoint-md) w-full px-4">
          <div className="neo-border neo-shadow-lg bg-card mt-8 mb-10 rounded-md px-6 py-8 md:px-10 md:py-10">
            <span className="font-display block text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
              The fine print
            </span>
            <h1 className="font-display mt-2 text-5xl font-black leading-none tracking-tighter md:text-6xl">
              Privacy
            </h1>
            <p className="text-muted-foreground mt-4 text-base font-medium">
              Last updated: {LAST_UPDATED}
            </p>
          </div>

          <div className="space-y-6 leading-relaxed">
            <p>
              This site is a personal portfolio. There are no accounts, no
              forms, no comments, and nothing for sale. The privacy story is
              short and I want it to stay that way.
            </p>

            <section>
              <h2 className="font-display text-2xl font-bold tracking-tight mt-2 mb-3">
                Analytics
              </h2>
              <p>
                I run a self-hosted instance of{" "}
                <a
                  href="https://umami.is"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold underline decoration-2 underline-offset-2 hover:decoration-primary"
                >
                  Umami
                </a>{" "}
                at <code>umami.vellapps.dev</code> to count page views and see
                which sections of the site people read. Umami records the page
                URL, the referring URL, your country (derived from IP, then
                discarded), browser, and device type. It does not set cookies,
                does not fingerprint you, and does not share data with any
                third party. The data lives on infrastructure I own.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold tracking-tight mt-2 mb-3">
                Hosting
              </h2>
              <p>
                The site is hosted on Vercel. Vercel sees inbound requests as
                part of serving the page and may log IP addresses for security
                and abuse prevention under their own privacy practices. I do
                not pull those logs into anything.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold tracking-tight mt-2 mb-3">
                What I don&apos;t do
              </h2>
              <ul className="list-disc space-y-1 pl-6">
                <li>No advertising. No ad networks. No retargeting pixels.</li>
                <li>No third-party trackers or analytics beyond what&apos;s above.</li>
                <li>No selling, renting, or sharing of any visitor data.</li>
                <li>No newsletter or mailing list to opt in or out of.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold tracking-tight mt-2 mb-3">
                Contact
              </h2>
              <p>
                If you have a question about this page or want any record of
                your visit removed from the analytics database, email me at{" "}
                <a
                  href="mailto:vincevella0@gmail.com"
                  className="font-bold underline decoration-2 underline-offset-2 hover:decoration-primary"
                >
                  vincevella0@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}
