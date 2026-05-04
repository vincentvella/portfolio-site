"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label="theme switch"
      className="neo-border neo-shadow neo-press bg-card text-foreground flex h-10 w-10 items-center justify-center rounded-md"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      onDoubleClick={() => setTheme("system")}
    >
      {resolvedTheme === "light" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ThemeSwitch;
