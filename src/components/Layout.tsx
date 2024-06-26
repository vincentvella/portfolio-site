import Footer from "./Footer";
import Header, { HeaderProps } from "./Header";

interface Props extends HeaderProps {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children, ...props }) => (
  <>
    <Header {...props} />
    {children}
    <Footer {...props} />
  </>
);

export default Layout;
