import { cn } from "@/lib/classname";

type CurrentlyStampProps = {
  text: string;
  className?: string;
};

export function CurrentlyStamp({ text, className }: CurrentlyStampProps) {
  return (
    <div
      role="note"
      aria-label="What I'm currently working on"
      className={cn(
        "neo-border neo-shadow bg-secondary text-secondary-foreground inline-flex max-w-full -rotate-2 items-start gap-3 rounded-md px-4 py-3",
        className,
      )}
    >
      <span className="font-display text-secondary-foreground/80 mt-0.5 shrink-0 text-xs font-black uppercase tracking-widest">
        Now
      </span>
      <p className="text-sm font-semibold leading-snug">{text}</p>
    </div>
  );
}
