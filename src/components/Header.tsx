import { HeaderText } from "./HeaderText";
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
        "layout flex items-center justify-center p-4 md:p-6",
        className,
      )}
    >
      <div className="flex-1" />
      <div className="flex-1">
        <div className="flex justify-center">
          <div
            role="listbox"
            aria-label="header navigation links"
            className="neo-border neo-shadow bg-card flex space-x-1 rounded-md p-1 align-middle text-sm font-semibold"
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
