import './RecipeCard.scss';
import { Card } from '../../UI/Card';

function RecipeCard ({recipe}) {
    //initialisation
    //state
    //handlers
    //view
    return (

        <div className="recipeCard" key={recipe.recipeID}>
            <Card>
            <p>{recipe.recipeName}</p>
            </Card>
        </div>

    );
}

export default RecipeCard;