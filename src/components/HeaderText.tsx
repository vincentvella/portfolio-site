"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { cn } from "@/lib/classname";

export type HeaderLinkProps = {
  text: string;
  link: string;
};

export const HeaderText: React.FC<HeaderLinkProps> = ({ text, link }) => {
  const pathname = usePathname();
  const isSelected = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const linkSegments = link.split("/").filter(Boolean);
    if (segments.length === 0 && linkSegments.length === 0) return true;
    return segments.some((segment) => linkSegments.includes(segment));
  }, [pathname, link]);

  return (
    <Link
      aria-label={text}
      href={link}
      role="option"
      aria-selected={isSelected}
      className={cn(
        "neo-border neo-press relative inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-bold uppercase tracking-wide",
        isSelected
          ? "bg-primary text-primary-foreground neo-shadow"
          : "bg-card text-foreground hover:bg-muted",
      )}
    >
      {text}
    </Link>
  );
};
