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
        "layout grid grid-cols-[1fr_auto_1fr] items-center gap-3 p-4 md:p-6",
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

      <div
        aria-label="Primary navigation"
        className="flex items-center gap-2"
      >
        <HeaderText text="Home" link="/" />
        <HeaderText text="Projects" link="/projects" />
        <HeaderText text="Bag" link="/bag" />
        <HeaderText text="Resume" link="/resume" />
      </div>

      <div className="flex h-10 items-center justify-end gap-2 justify-self-end">
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
