import "./Header.scss";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <span className="header__title">Roast and Rise</span>
      <nav className="header__nav">
        {/* No "end": a NavLink is active on its own path AND every path below it.
            So "Recipes" is active on /recipes and /recipes/new,
            and "Review" is active on /review and /review/4. */}
        <NavLink to="/recipes" className="header__link">
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