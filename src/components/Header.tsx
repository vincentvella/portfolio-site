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
      aria-label="Primary"
      className={cn(
        "layout grid grid-cols-[auto_1fr_auto] items-center gap-2 p-3 sm:gap-3 sm:p-4 md:p-6",
        className,
      )}
    >
      <Link
        href="/"
        aria-label="Home"
        className="neo-border neo-shadow neo-press bg-secondary text-secondary-foreground inline-flex w-fit items-center justify-center justify-self-start rounded-md px-2.5 py-1.5 font-display text-base font-bold leading-none tracking-tight"
      >
        VV
      </Link>

      <div className="flex items-center justify-center gap-1.5 sm:gap-2">
        <HeaderText text="Projects" link="/projects" />
        <HeaderText text="Bag" link="/bag" />
        <HeaderText text="Resume" link="/resume" />
      </div>

      <div className="flex items-center justify-end gap-2 justify-self-end">
        {hideThemeSwitch ? null : (
          <>
            <span className="hidden sm:inline-flex">
              <SketchModeToggle />
            </span>
            <ThemeSwitch />
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
