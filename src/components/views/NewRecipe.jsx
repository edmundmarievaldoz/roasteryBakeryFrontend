import { Link, useNavigate } from "react-router-dom";
import RecipeForm from "../entity/recipe/RecipeForm.jsx";
import "./Recipes.scss";

function NewRecipe() {
  //Initialisation--------------------------------------
  const navigate = useNavigate();
  //State---------------------------------------------
  //Handlers-----------------------------------------
  const handleSubmit = (newRecipe) => {
    console.log("Recipe to save:", newRecipe);
  };
  const handleCancel = () => navigate("/");
  //View---------------------------------------------
  return (
    <section className="recipes">
      <div className="recipes__header">
        <Link to="/" className="recipes__back">
          Back to recipes
        </Link>
        <h1 className="recipes__title">New Recipe</h1>
        <p className="recipes__subtitle">Add one row for each ingredient.</p>
      </div>
      <RecipeForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </section>
  );
}

export default NewRecipe;
