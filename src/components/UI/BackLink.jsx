import "./BackLink.scss";
import { Link } from "react-router-dom";

// A small "← Back to ..." text link at the top of a page.
//   <BackLink to="/review">Back to recipes to review</BackLink>
function BackLink({ to, children }) {
  // Initialisation--------------------------------------
  // State ----------------------------------------------
  // Handlers -------------------------------------------
  // View -----------------------------------------------
  return (
    <Link to={to} className="backLink">
      {/* The arrow is decoration only, so screen readers skip it */}
      <span aria-hidden="true">←</span> {children}
    </Link>
  );
}

export default BackLink;
