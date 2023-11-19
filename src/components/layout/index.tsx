import { Footer } from "./footer";
import { Header } from "./header";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => (
  <>
    <Header />
    <div>{children}</div>
    <Footer />
  </>
);
