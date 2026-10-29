import "./RecipeCard.scss";
import { Card } from "../../UI/Card";

function RecipeCard({ recipe }) {
  return (
    <div className="recipeCard">
      <Card>
        <span className="recipeCard__initial">{recipe.recipeName.charAt(0)}</span>
        <span className="recipeCard__name">{recipe.recipeName}</span>
      </Card>
    </div>
  );
}

export default RecipeCard;