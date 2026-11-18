import "./RecipesToReview.scss";
import apiURL from "../api/apiURL.js";
import useLoad from "../api/useLoad.js";
import { CardContainer } from "../UI/Card.jsx";
import ReviewRecipeCard from "../entity/recipe/ReviewRecipeCard.jsx";

function RecipesToReview() {
  // Initialisation--------------------------------------
  const pendingRecipesEndpoint = `${apiURL}/recipes?status=Pending`;

  // State ----------------------------------------------
  const [recipes, loadingMessage, , errorStatus] = useLoad(pendingRecipesEndpoint);

  // Handlers -------------------------------------------
  // View -----------------------------------------------
  const renderContent = () => {
    // 1. The API returns 404 when no recipe is pending
    if (errorStatus === 404) {
      return <p className="recipesToReview__message">No recipes waiting for review</p>;
    }

    // 2. Still loading, or another error (its message replaces "Loading records...")
    if (!recipes) {
      return <p className="recipesToReview__message">{loadingMessage}</p>;
    }

    // 3. We have recipes: show the count and one card per recipe
    const countText = recipes.length === 1 ? "1 recipe" : `${recipes.length} recipes`;

    return (
      <>
        <p className="recipesToReview__count">{countText} waiting for review</p>
        <CardContainer>
          {recipes.map((recipe) => (
            <ReviewRecipeCard key={recipe.recipeID} recipe={recipe} />
          ))}
        </CardContainer>
      </>
    );
  };

  return (
    <div className="recipesToReview">
      <h1 className="recipesToReview__title">Recipes to Review</h1>
      {renderContent()}
    </div>
  );
}

export default RecipesToReview;
