"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main"
      className="flex min-h-screen flex-col items-center justify-center pb-12"
    >
      <div className="max-w-(--breakpoint-md) w-full px-4">
        <div className="neo-border neo-shadow-lg bg-card mt-8 rounded-md px-6 py-10 md:px-12 md:py-12">
          <span className="font-display block text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Something broke
          </span>
          <h1 className="font-display mt-2 text-5xl font-black leading-none tracking-tighter md:text-6xl">
            Sorry about that.
          </h1>
          <p className="mt-6 max-w-prose text-base font-medium md:text-lg">
            An unexpected error tripped this page. Try again, or head home and
            pretend it never happened.
          </p>
          {error.digest && (
            <p className="text-muted-foreground mt-3 font-mono text-xs">
              Reference: {error.digest}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="neo-border neo-shadow neo-press bg-primary text-primary-foreground inline-flex items-center rounded-md px-4 py-2 text-sm font-bold uppercase tracking-wide"
            >
              Try again
            </button>
            <a
              href="/"
              className="neo-border neo-shadow neo-press bg-card text-foreground inline-flex items-center rounded-md px-4 py-2 text-sm font-bold uppercase tracking-wide"
            >
              Take me home
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
