import "./RecipeCard.scss";
import { Card } from "../../UI/Card";
import StatusBadge from "../../UI/StatusBadge.jsx";
import RecipeIngredients from "./RecipeIngredients.jsx";

function RecipeCard({ recipe, isOpen, onToggle }) {
  // Initialisation--------------------------------------
  // State ----------------------------------------------
  // Handlers -------------------------------------------
  // View -----------------------------------------------
  return (
    <div className={isOpen ? "recipeCard recipeCard--open" : "recipeCard"}>
      <Card>
        <button type="button" className="recipeCard__header" onClick={onToggle} aria-expanded={isOpen}>
          <span className="recipeCard__initial">{recipe.recipeName.charAt(0)}</span>
          <span className="recipeCard__name">{recipe.recipeName}</span>
          <StatusBadge status={recipe.recipeStatus} />
        </button>
        {isOpen && <RecipeIngredients recipeID={recipe.recipeID} />}
      </Card>
    </div>
  );
}

export default RecipeCard;
