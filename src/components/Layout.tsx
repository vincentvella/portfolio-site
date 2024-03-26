import Header, { HeaderProps } from "./Header";

interface Props extends HeaderProps {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children, ...props }) => (
  <>
    <Header {...props} />
    <div className="min-h-screen">{children}</div>
  </>
);

export default Layout;
