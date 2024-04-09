"use client";

import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const useForcedTheme = () => {
  const pathname = usePathname();
  return pathname.startsWith("/resume") ? "light" : undefined;
};

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  const forcedTheme = useForcedTheme();
  return (
    <ThemeProvider attribute="class" forcedTheme={forcedTheme}>
      {children}
    </ThemeProvider>
  );
};
