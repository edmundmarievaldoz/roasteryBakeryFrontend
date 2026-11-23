import "./ReviewRecipeCard.scss";
import Button from "../../UI/Button.jsx";
import { Card } from "../../UI/Card.jsx";
import StatusBadge from "../../UI/StatusBadge.jsx";

function ReviewRecipeCard({ recipe }) {
  // Initialisation--------------------------------------
  const createdBy = `${recipe.recipeCreatedByFirstName} ${recipe.recipeCreatedByLastName}`;

  // State ----------------------------------------------
  // Handlers -------------------------------------------
  // View -----------------------------------------------
  return (
    <div className="reviewRecipeCard">
      <Card>
        <div className="reviewRecipeCard__body">
          <span className="reviewRecipeCard__name">{recipe.recipeName}</span>
          <span className="reviewRecipeCard__createdBy">Created by {createdBy}</span>
          <StatusBadge status={recipe.recipeStatus} />
          <Button
            to={`/review/${recipe.recipeID}`}
            variant="primary"
            className="reviewRecipeCard__button">
            Review
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default ReviewRecipeCard;
