import "./RecipeAllergens.scss";
import apiURL from "../../api/apiURL.js";
import useLoad from "../../api/useLoad.js";
import Tag from "../../UI/Tag.jsx";

function RecipeAllergens({ recipeID }) {
  // Initialisation--------------------------------------
  const allergensEndpoint = `${apiURL}/recipes/${recipeID}/allergens`;

  // State ----------------------------------------------
  const [allergens, loadingMessage, , errorStatus] = useLoad(allergensEndpoint);

  // Handlers -------------------------------------------
  // View -----------------------------------------------
  // 1. The API returns 404 when the recipe has no allergens
  if (errorStatus === 404) {
    return <p className="recipeAllergens__message">No allergens</p>;
  }

  // 2. Still loading, or another error
  if (!allergens) {
    return <p className="recipeAllergens__message">{loadingMessage}</p>;
  }

  // 3. We have allergens: one Tag for each
  return (
    <div className="recipeAllergens">
      {allergens.map((allergen) => (
        <Tag key={allergen.allergenID}>{allergen.allergenName}</Tag>
      ))}
    </div>
  );
}

export default RecipeAllergens;
