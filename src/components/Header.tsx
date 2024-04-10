import { HeaderLinkProps, HeaderText } from "./HeaderText";
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
        "layout flex items-center justify-center p-4 dark:bg-zinc-900",
        className,
      )}
    >
      <div className="flex-1" />
      <div className="flex-1">
        <div className="flex justify-center">
          <div
            role="listbox"
            aria-label="header navigation links"
            className="flex space-x-3 rounded-full bg-white/90 p-2 px-4 align-middle text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-black dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
          >
            <HeaderText text="Home" link="/" />
            <HeaderText text="Projects" link="/projects" />
            <HeaderText text="Resume" link="/resume" />
          </div>
        </div>
      </div>
      <div className="flex-1">
        {hideThemeSwitch ? null : (
          <div className="flex justify-end">
            <ThemeSwitch />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
