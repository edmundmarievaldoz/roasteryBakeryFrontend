import "./ReviewRecipe.scss";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../api/API.js";
import apiURL from "../api/apiURL.js";
import useLoad from "../api/useLoad.js";
import currentUser from "../auth/currentUser.js";
import StatusBadge from "../UI/StatusBadge.jsx";
import RecipeIngredients from "../entity/recipe/RecipeIngredients.jsx";
import RecipeAllergens from "../entity/recipe/RecipeAllergens.jsx";
import ReviewHistory from "../entity/review/ReviewHistory.jsx";
import ReviewForm from "../entity/review/ReviewForm.jsx";

function ReviewRecipe() {
  // Initialisation--------------------------------------
  const { id } = useParams(); // always a string, e.g. "1"
  const recipeID = Number(id); // the backend needs the number 1, not "1"
  const recipeEndpoint = `${apiURL}/recipes/${recipeID}`;

  // State ----------------------------------------------
  const [recipes, loadingMessage, loadRecords, errorStatus] = useLoad(recipeEndpoint);
  const [serverError, setServerError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState(null);
  const [historyVersion, setHistoryVersion] = useState(0);

  // Handlers -------------------------------------------
  // Load the recipe again (new badge) and remount ReviewHistory (new key)
  const refreshPage = () => {
    loadRecords(recipeEndpoint);
    setHistoryVersion(historyVersion + 1);
  };

  const handleSubmit = async (decision) => {
    setIsSaving(true);
    setServerError(null);

    try {
      const response = await API.post(`${apiURL}/recipereviews`, {
        recipeID,
        reviewerID: currentUser.userID,
        ...decision,
      });

      if (response.isSuccess) {
        setSavedMessage("Review saved.");
        refreshPage();
      } else if (response.status === 409) {
        setServerError("This recipe has already been reviewed");
        refreshPage();
      } else {
        setServerError(response.message); // 400 and any other error
      }
    } catch {
      // fetch only rejects when the server cannot be reached
      setServerError("Could not reach the server. Please try again.");
    }

    setIsSaving(false);
  };

  // View -----------------------------------------------
  const renderDecision = (recipe) => {
    // 1. Just saved: show the message and a way back
    if (savedMessage) {
      return (
        <>
          <p className="reviewRecipe__success" role="status">{savedMessage}</p>
          <Link to="/review" className="reviewRecipe__back">
            ← Back to recipes to review
          </Link>
        </>
      );
    }

    // 2. Still waiting for a decision: show the form
    if (recipe.recipeStatus === "Pending") {
      return (
        <ReviewForm onSubmit={handleSubmit} serverError={serverError} isSaving={isSaving} />
      );
    }

    // 3. Already Approved or Rejected (also after a 409)
    return (
      <>
        {serverError && (
          <p className="reviewRecipe__error" role="alert">{serverError}</p>
        )}
        <p className="reviewRecipe__message">
          This recipe has already been {recipe.recipeStatus}.
        </p>
      </>
    );
  };

  const renderContent = () => {
    // 1. The API returns 404 when the recipe does not exist
    if (errorStatus === 404) {
      return <p className="reviewRecipe__message">Recipe not found</p>;
    }

    // 2. Still loading, or another error
    if (!recipes) {
      return <p className="reviewRecipe__message">{loadingMessage}</p>;
    }

    // 3. The API returns a one-item array
    const recipe = recipes[0];
    const createdBy = `${recipe.recipeCreatedByFirstName} ${recipe.recipeCreatedByLastName}`;

    return (
      <div className="reviewRecipe__layout">
        <div className="reviewRecipe__details">
          <div className="reviewRecipe__header">
            <h1 className="reviewRecipe__title">{recipe.recipeName}</h1>
            <span className="reviewRecipe__createdBy">Created by {createdBy}</span>
            <StatusBadge status={recipe.recipeStatus} />
          </div>

          <section className="reviewRecipe__section">
            <h2 className="reviewRecipe__subtitle">Ingredients</h2>
            <RecipeIngredients recipeID={recipeID} />
          </section>

          <section className="reviewRecipe__section">
            <h2 className="reviewRecipe__subtitle">Allergens</h2>
            <RecipeAllergens recipeID={recipeID} />
          </section>

          <section className="reviewRecipe__section">
            <h2 className="reviewRecipe__subtitle">Review history</h2>
            <ReviewHistory key={historyVersion} recipeID={recipeID} />
          </section>
        </div>

        <aside className="reviewRecipe__section reviewRecipe__decision">
          <h2 className="reviewRecipe__subtitle">Decision</h2>
          {renderDecision(recipe)}
        </aside>
      </div>
    );
  };

  return (
    <div className="reviewRecipe">
      <Link to="/review" className="reviewRecipe__back">
        ← Back to recipes to review
      </Link>
      {renderContent()}
    </div>
  );
}

export default ReviewRecipe;
