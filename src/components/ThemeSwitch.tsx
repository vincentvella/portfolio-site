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
        className="flex align-middle items-center rounded-full bg-white/90 dark:bg-black space-x-3 p-1 px-4 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 h-9"
        onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
        onDoubleClick={() => setTheme("system")}
      >
        {resolvedTheme === "light" ? <SunIcon /> : <MoonIcon />}
      </button>
    </>
  );
};

export default ThemeSwitch;
