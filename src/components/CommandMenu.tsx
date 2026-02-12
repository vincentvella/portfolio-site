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

interface Props {
  links: { url: string; title: string }[];
}

const DEFAULT_DISTANCE_TO_BOTTOM = 16;
const EXTENDED_DISTANCE_TO_BOTTOM = 48;

export const CommandMenu = ({ links }: Props) => {
  const [open, setOpen] = React.useState(false);

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
    function ensureBottomPadding() {
      const element = document.getElementById("command-menu-button");
      const viewportHeight = window.innerHeight;
      const documentHeight = document.body.clientHeight;
      const scrollTop = window.scrollY;

      const distanceFromBottom = documentHeight - (scrollTop + viewportHeight);

      if (element) {
        if (distanceFromBottom <= EXTENDED_DISTANCE_TO_BOTTOM) {
          // Adjust the position when close to the bottom
          const newBottomPosition =
            EXTENDED_DISTANCE_TO_BOTTOM - distanceFromBottom;
          const bottomPosition = Math.max(
            newBottomPosition,
            DEFAULT_DISTANCE_TO_BOTTOM,
          );
          element.style.bottom = `${bottomPosition}px`;
        } else if (element.style.bottom !== `${DEFAULT_DISTANCE_TO_BOTTOM}px`) {
          // Reset to original position
          element.style.bottom = `${DEFAULT_DISTANCE_TO_BOTTOM}px`;
        }
      }
    }
    ensureBottomPadding();
    window.addEventListener("scroll", ensureBottomPadding);
    return () => document.removeEventListener("scroll", ensureBottomPadding);
  }, []);

  return (
    <>
      <p className="border-t-muted text-muted-foreground fixed right-0 bottom-0 left-0 hidden border-t bg-white p-1 text-center text-sm xl:block print:hidden">
        Press{" "}
        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          <span className="text-xs">⌘</span>K
        </kbd>{" "}
        to open the command menu
      </p>
      <Button
        aria-label="Open command menu"
        id="command-menu-button"
        onClick={() => setOpen((open) => !open)}
        variant="outline"
        size="icon"
        className="fixed right-4 flex rounded-full shadow-2xl xl:hidden print:hidden"
      >
        <CommandIcon className="my-6 size-6" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
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
