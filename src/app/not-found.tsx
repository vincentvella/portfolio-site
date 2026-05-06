import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you tried to visit doesn't exist on vincevella.com.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-screen flex-col items-center justify-center pb-12"
    >
      <div className="max-w-(--breakpoint-md) w-full px-4">
        <div className="neo-border neo-shadow-lg bg-secondary text-secondary-foreground mt-8 rounded-md px-6 py-10 md:px-12 md:py-16">
          <span className="font-display block text-sm font-bold uppercase tracking-[0.2em] opacity-80">
            Page not found
          </span>
          <h1 className="font-display mt-2 text-7xl font-black leading-none tracking-tighter md:text-9xl">
            404
          </h1>
          <p className="mt-6 max-w-prose text-base font-medium md:text-lg">
            The page you tried to visit doesn&apos;t exist, was moved, or was
            never here in the first place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/"
              className="neo-border neo-shadow neo-press bg-card text-foreground inline-flex items-center rounded-md px-4 py-2 text-sm font-bold uppercase tracking-wide"
            >
              Take me home
            </a>
            <a
              href="/projects"
              className="neo-border neo-shadow neo-press bg-card text-foreground inline-flex items-center rounded-md px-4 py-2 text-sm font-bold uppercase tracking-wide"
            >
              See projects
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
