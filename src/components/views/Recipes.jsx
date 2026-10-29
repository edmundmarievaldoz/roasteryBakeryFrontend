import apiURL from "../api/apiURL.js";
import useLoad from "../api/useLoad.js";
import {CardContainer} from "../UI/Card.jsx";
import RecipeCard from "../entity/recipe/RecipeCard.jsx";

function Recipes () {
    // Initialisation--------------------------------------
    const recipesEndpoint = `${apiURL}/recipes`;
    // State ----------------------------------------------
    const [recipes, loadingMessage] = useLoad(recipesEndpoint);
    // Handlers -------------------------------------------
    // Views ----------------------------------------------

    return (
        <div>
            <h1>Recipes</h1>
            {!recipes ? (
                <p>{loadingMessage}</p>
            ):(
                <CardContainer>
                    {
                        recipes.map((recipe) => <RecipeCard key={recipe.recipeID} recipe={recipe} />)
                    }
                </CardContainer>
            )}
            
        </div>

    );
}

export default Recipes;