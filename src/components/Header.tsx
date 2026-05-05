import Link from "next/link";
import { HeaderText } from "./HeaderText";
import { SketchModeToggle } from "./SketchModeToggle";
import ThemeSwitch from "./ThemeSwitch";
import { cn } from "@/lib/classname";

export type HeaderProps = {
  className?: string;
  hideThemeSwitch?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  className,
  hideThemeSwitch = false,
}) => {
  return (
    <nav
      className={cn(
        "layout flex items-center justify-between gap-3 p-4 md:p-6",
        className,
      )}
    >
      <Link
        href="/"
        aria-label="Home"
        className="neo-border neo-shadow neo-press bg-secondary text-secondary-foreground inline-flex items-center justify-center rounded-md px-2.5 py-1.5 font-display text-base font-bold leading-none tracking-tight"
      >
        VV
      </Link>

      <div
        role="listbox"
        aria-label="header navigation links"
        className="flex items-center gap-2"
      >
        <HeaderText text="Home" link="/" />
        <HeaderText text="Projects" link="/projects" />
        <HeaderText text="Resume" link="/resume" />
      </div>

      <div className="flex min-w-[2.5rem] items-center justify-end gap-2">
        {hideThemeSwitch ? null : (
          <>
            <SketchModeToggle />
            <ThemeSwitch />
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
