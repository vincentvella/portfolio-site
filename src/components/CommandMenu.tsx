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
      <p className="fixed bottom-0 left-0 right-0 hidden border-t border-t-muted bg-white p-1 text-center text-sm text-muted-foreground xl:block print:hidden">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>{" "}
        to open the command menu
      </p>
      <Button
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
