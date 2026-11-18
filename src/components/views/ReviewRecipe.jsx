import "./RecipesToReview.scss";
import { Link, useParams } from "react-router-dom";

// Placeholder: the real Review Recipe page is built in CR5.
function ReviewRecipe() {
  // Initialisation--------------------------------------
  const { id } = useParams(); // the ":id" part of /review/:id

  // State ----------------------------------------------
  // Handlers -------------------------------------------
  // View -----------------------------------------------
  return (
    <div className="recipesToReview">
      <h1 className="recipesToReview__title">Review recipe</h1>
      <p className="recipesToReview__message">
        Recipe #{id} — this page is coming in CR5.
      </p>
      <Link to="/review" className="recipesToReview__back">
        ← Back to recipes to review
      </Link>
    </div>
  );
}

export default ReviewRecipe;
