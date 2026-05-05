"use client";

import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/Command";
import { Button } from "@/components/Button";
import { CommandIcon } from "lucide-react";
import { cn } from "@/lib/classname";

interface Props {
  links: { url: string; title: string }[];
}

const HIDE_THRESHOLD_PX = 96;

export const CommandMenu = ({ links }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [nearFooter, setNearFooter] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    function update() {
      const distanceFromBottom =
        document.body.clientHeight - (window.scrollY + window.innerHeight);
      setNearFooter(distanceFromBottom <= HIDE_THRESHOLD_PX);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <button
        id="command-menu-hint"
        type="button"
        onClick={() => setOpen(true)}
        aria-hidden={nearFooter}
        tabIndex={nearFooter ? -1 : 0}
        className={cn(
          "bg-card text-muted-foreground neo-border neo-shadow-sm fixed right-4 bottom-4 z-40 hidden items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium hover:bg-muted xl:flex print:hidden transition-opacity duration-200",
          nearFooter && "pointer-events-none opacity-0",
        )}
      >
        <span>Press</span>
        <kbd className="bg-muted text-foreground inline-flex h-5 items-center gap-1 rounded-sm px-1.5 font-mono text-[10px] font-bold">
          <span className="text-xs">⌘</span>K
        </kbd>
        <span>to search</span>
      </button>
      <Button
        aria-label="Open command menu"
        id="command-menu-button"
        onClick={() => setOpen((open) => !open)}
        aria-hidden={nearFooter}
        tabIndex={nearFooter ? -1 : 0}
        variant="outline"
        size="icon"
        className={cn(
          "fixed right-4 bottom-4 z-40 flex rounded-full xl:hidden print:hidden transition-opacity duration-200",
          nearFooter && "pointer-events-none opacity-0",
        )}
      >
        <CommandIcon className="size-5" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          aria-label="Search commands and links"
          placeholder="Type a command or search..."
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem
              onSelect={() => {
                setOpen(false);
                window.print();
              }}
            >
              <span>Print</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Links">
            {links.map(({ url, title }) => (
              <CommandItem
                key={url}
                onSelect={() => {
                  setOpen(false);
                  window.open(url, "_blank");
                }}
              >
                <span>{title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
};
