import "./RecipesToReview.scss";
import apiURL from "../api/apiURL.js";
import useLoad from "../api/useLoad.js";
import { CardContainer } from "../UI/Card.jsx";
import RecordsState from "../UI/RecordsState.jsx";
import ReviewRecipeCard from "../entity/recipe/ReviewRecipeCard.jsx";

function RecipesToReview() {
  // Initialisation--------------------------------------
  const pendingRecipesEndpoint = `${apiURL}/recipes?status=Pending`;

  // State ----------------------------------------------
  const [recipes, loadingMessage] = useLoad(pendingRecipesEndpoint);

  // Handlers -------------------------------------------
  // View -----------------------------------------------
  // Only called when there is at least one recipe
  const renderRecipes = (list) => {
    const countText = list.length === 1 ? "1 recipe" : `${list.length} recipes`;

    return (
      <>
        <p className="recipesToReview__count">{countText} waiting for review</p>
        <CardContainer>
          {list.map((recipe) => (
            <ReviewRecipeCard key={recipe.recipeID} recipe={recipe} />
          ))}
        </CardContainer>
      </>
    );
  };

  return (
    <div className="recipesToReview">
      <h1 className="recipesToReview__title">Recipes to Review</h1>
      <RecordsState
        records={recipes}
        loadingMessage={loadingMessage}
        emptyMessage="No recipes waiting for review">
        {renderRecipes}
      </RecordsState>
    </div>
  );
}

export default RecipesToReview;
