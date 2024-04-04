"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

export type HeaderLinkProps = {
  text: string;
  link: string;
};

export const HeaderText: React.FC<HeaderLinkProps> = ({ text, link }) => {
  const pathname = usePathname();
  const isSelected = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const linkSegments = link.split("/").filter(Boolean);
    if (segments.length === 0 && linkSegments.length === 0) {
      return true;
    }
    return segments.some((segment) => linkSegments.includes(segment));
  }, [pathname, link]);

  return (
    <div aria-selected={isSelected} className="aria-selected:text-blue-400">
      {text}
    </div>
  );
};
