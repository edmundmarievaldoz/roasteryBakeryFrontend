import apiURL from "../../api/apiURL.js";
import useLoad from "../../api/useLoad.js";

function RecipeIngredients({recipeID}) {
    const recipeIngredientsEndpoint = `${apiURL}/recipeingredients/recipe/${recipeID}`;
    const [ingredients, loadingMessage] = useLoad(recipeIngredientsEndpoint);

    if (!ingredients)
        return <p>{loadingMessage}</p>;

    return (
        <ul className="recipeIngredients">
            {ingredients.map((item) => (
                <li key={item.recipeIngredientID} className="recipeIngredientRow">
                    <span>{item.ingredientName}</span> {" "}
                    <span className="recipeIngredientQty">{Number(item.ingredientQuantity)}</span>
                </li>
            ))}
        </ul>
    );
}

export default RecipeIngredients;