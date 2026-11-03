import "./Layout.scss";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { GiCoffeeBeans } from "react-icons/si";

const Layout = ({ children }) => {
  return (
    <div className="layout">
    <GiCoffeeBeans className="layout__bgIcon" aria-hidden="true" />  
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
