import "./Header.scss";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <span className="header__title">Roast and Rise</span>
      <nav className="header__nav">
        {/* "end" = only active on exactly "/", not on every page */}
        <NavLink to="/" end className="header__link">
          Recipes
        </NavLink>
        <NavLink to="/review" className="header__link">
          Review
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;