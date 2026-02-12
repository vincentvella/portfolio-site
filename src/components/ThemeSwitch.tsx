"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <button
        aria-label="theme switch"
        className="flex h-9 items-center space-x-3 rounded-full bg-white/90 p-1 px-4 align-middle text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-black dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
        onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
        onDoubleClick={() => setTheme("system")}
      >
        {resolvedTheme === "light" ? <SunIcon /> : <MoonIcon />}
      </button>
    </>
  );
};

export default ThemeSwitch;
