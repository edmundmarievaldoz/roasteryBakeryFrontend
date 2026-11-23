import "./Recipes.scss";
import apiURL from "../api/apiURL.js";
import useLoad from "../api/useLoad.js";
import { useState } from "react";
import { CardContainer } from "../UI/Card.jsx";
import Button from "../UI/Button.jsx";
import RecordsState from "../UI/RecordsState.jsx";
import RecipeCard from "../entity/recipe/RecipeCard.jsx";

function Recipes() {
  // Initialisation--------------------------------------
  const recipesEndpoint = `${apiURL}/recipes`;

  // State ----------------------------------------------
  const [recipes, loadingMessage] = useLoad(recipesEndpoint);
  const [openRecipeID, setOpenRecipeID] = useState(null);

  // Handlers -------------------------------------------
  const handleToggle = (recipeID) => {
    setOpenRecipeID(openRecipeID === recipeID ? null : recipeID);
  };
  // Views ----------------------------------------------

  return (
    <div>
      <h1>Recipes</h1>
      <Button to="/recipes/new" variant="primary" className="recipes__newButton">
        + New recipe
      </Button>
      <RecordsState
        records={recipes}
        loadingMessage={loadingMessage}
        emptyMessage="No recipes yet">
        {(list) => (
          <CardContainer>
            {list.map((recipe) => (
              <RecipeCard
                key={recipe.recipeID}
                recipe={recipe}
                isOpen={openRecipeID === recipe.recipeID}
                onToggle={() => handleToggle(recipe.recipeID)}
              />
            ))}
          </CardContainer>
        )}
      </RecordsState>
    </div>
  );
}

export default Recipes;
