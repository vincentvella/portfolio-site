"use client";

import { useEffect, useState } from "react";
import { Pencil1Icon } from "@radix-ui/react-icons";

const STORAGE_KEY = "sketch-mode";

export function SketchModeToggle() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem(STORAGE_KEY) === "1";
    setActive(stored);
    document.documentElement.classList.toggle("sketch", stored);
  }, []);

  if (!mounted) return null;

  const toggle = () => {
    const next = !active;
    setActive(next);
    document.documentElement.classList.toggle("sketch", next);
    window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  };

  return (
    <button
      type="button"
      aria-label={active ? "Exit sketch mode" : "Enter sketch mode"}
      aria-pressed={active}
      onClick={toggle}
      className="neo-border neo-shadow neo-press bg-card text-foreground flex h-10 w-10 items-center justify-center rounded-md"
    >
      <Pencil1Icon />
    </button>
  );
}
