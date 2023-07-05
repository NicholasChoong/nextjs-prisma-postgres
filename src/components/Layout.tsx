import type { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <div>
    <Header />
    <div className="px-8">{children}</div>
  </div>
);

export default Layout;
