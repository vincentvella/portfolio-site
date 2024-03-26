"use client";

import { usePathname } from "next/navigation";

export type HeaderLinkProps = {
  text: string;
  link: string;
};

export const HeaderText: React.FC<HeaderLinkProps> = ({ text, link }) => {
  const pathname = usePathname();
  return (
    <div
      aria-selected={pathname === link}
      className="aria-selected:text-blue-400"
    >
      {text}
    </div>
  );
};
