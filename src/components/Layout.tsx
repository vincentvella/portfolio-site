type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="min-h-screen">{children}</div>
);

export default Layout;
