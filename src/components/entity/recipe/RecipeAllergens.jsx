import "./RecipeAllergens.scss";
import apiURL from "../../api/apiURL.js";
import useLoad from "../../api/useLoad.js";
import RecordsState from "../../UI/RecordsState.jsx";
import Tag from "../../UI/Tag.jsx";

function RecipeAllergens({ recipeID }) {
  // Initialisation--------------------------------------
  const allergensEndpoint = `${apiURL}/recipes/${recipeID}/allergens`;

  // State ----------------------------------------------
  const [allergens, loadingMessage] = useLoad(allergensEndpoint);

  // Handlers -------------------------------------------
  // View -----------------------------------------------
  return (
    <RecordsState
      records={allergens}
      loadingMessage={loadingMessage}
      emptyMessage="No allergens">
      {(list) => (
        <div className="recipeAllergens">
          {list.map((allergen) => (
            <Tag key={allergen.allergenID}>{allergen.allergenName}</Tag>
          ))}
        </div>
      )}
    </RecordsState>
  );
}

export default RecipeAllergens;
