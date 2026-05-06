export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen flex-col items-center justify-center pb-12"
    >
      <div className="max-w-(--breakpoint-md) w-full px-4">
        <div className="neo-border neo-shadow-lg bg-card mt-8 rounded-md px-6 py-10 md:px-12 md:py-12">
          <span className="font-display block text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
            One moment
          </span>
          <h1 className="font-display mt-2 text-5xl font-black leading-none tracking-tighter md:text-6xl">
            Loading…
          </h1>
        </div>
      </div>
    </div>
  );
}
