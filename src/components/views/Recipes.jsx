import apiURL from "../api/apiURL.js";
import useLoad from "../api/useLoad.js";

function Recipes () {
    // Initialisation--------------------------------------
    const recipesEndpoint = `${apiURL}/recipes`;
    // State ----------------------------------------------
    const [recipes, loadingMessage, loadingRecipes] = useLoad(recipesEndpoint);
    // Handlers -------------------------------------------
    // Views ----------------------------------------------

    return (
        <div>
            <h1>Recipes</h1>
            
        </div>

    );
}

export default Recipes;