import Link from "next/link";
import { HeaderLinkProps, HeaderText } from "./HeaderText";
import ThemeSwitch from "./ThemeSwitch";
import { cn } from "@/lib/classname";

const HeaderLink: React.FC<HeaderLinkProps> = ({ text, link }) => {
  return (
    <li>
      <Link href={link}>
        <HeaderText text={text} link={link} />
      </Link>
    </li>
  );
};

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
      className={cn("layout flex items-center justify-center p-4", className)}
    >
      <div className="flex-1" />
      <div className="flex-1">
        <div className="flex justify-center">
          <ul className="flex align-middle rounded-full bg-white/90 dark:bg-black space-x-3 p-2 px-4 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
            <HeaderLink text="Home" link="/" />
            <HeaderLink text="About" link="/about" />
            <HeaderLink text="Resume" link="/resume" />
          </ul>
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
