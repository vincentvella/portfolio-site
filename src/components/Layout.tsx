import Header, { HeaderProps } from "./Header";

interface Props extends HeaderProps {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children, ...props }) => (
  <>
    <Header
      className="absolute left-0 right-0 h-16 w-full dark:bg-black"
      {...props}
    />
    {children}
  </>
);

export default Layout;
