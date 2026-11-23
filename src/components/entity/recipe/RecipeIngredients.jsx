import "./RecipeIngredients.scss";
import apiURL from "../../api/apiURL.js";
import useLoad from "../../api/useLoad.js";
import RecordsState from "../../UI/RecordsState.jsx";

function RecipeIngredients({ recipeID }) {
  // Initialisation--------------------------------------
  const recipeIngredientsEndpoint = `${apiURL}/recipeingredients/recipe/${recipeID}`;

  // State ----------------------------------------------
  const [ingredients, loadingMessage] = useLoad(recipeIngredientsEndpoint);

  // Handlers -------------------------------------------
  // View -----------------------------------------------
  return (
    <RecordsState
      records={ingredients}
      loadingMessage={loadingMessage}
      emptyMessage="No ingredients">
      {(list) => (
        <ul className="recipeIngredients">
          {list.map((item) => (
            <li key={item.recipeIngredientID} className="recipeIngredientRow">
              <span>{item.ingredientName}</span>
              <span className="recipeIngredientQty">{Number(item.ingredientQuantity)}</span>
            </li>
          ))}
        </ul>
      )}
    </RecordsState>
  );
}

export default RecipeIngredients;
