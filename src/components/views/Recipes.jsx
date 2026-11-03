import "./Recipes.scss";
import { Link } from "react-router-dom";
import apiURL from "../api/apiURL.js";
import useLoad from "../api/useLoad.js";
import { useState } from "react";
import { CardContainer } from "../UI/Card.jsx";
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
      <Link to="/new" className="recipes__newButton">
        + New recipe
      </Link>
      {!recipes ? (
        <p>{loadingMessage}</p>
      ) : (
        <CardContainer>
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.recipeID}
              recipe={recipe}
              isOpen={openRecipeID === recipe.recipeID}
              onToggle={() => handleToggle(recipe.recipeID)}
            />
          ))}
        </CardContainer>

      )}
    </div>
  );
}

export default Recipes;
