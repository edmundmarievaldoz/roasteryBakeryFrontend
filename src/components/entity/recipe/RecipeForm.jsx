import { useState } from "react";
import apiURL from "../../api/apiURL.js";
import useLoad from "../../api/useLoad.js";
import "./RecipeForm.scss";

const initialRecipe = {
  recipeName: null,
};

const newRow = () => ({
  rowKey: crypto.randomUUID(),
  ingredientID: null,
  ingredientQuantity: null,
});

function RecipeForm({ onSubmit, onCancel }) {
  //Initialisation--------------------------------------

  const conformance = {
    js2html: {
      recipeName: (value) => (value === null ? "" : value),
      ingredientID: (value) => (value === null ? "0" : String(value)),
      ingredientQuantity: (value) => (value === null ? "" : String(value)),
    },
    html2js: {
      recipeName: (value) => (value === "" ? null : value),
      ingredientID: (value) => (value === "0" ? null : parseInt(value)),
      ingredientQuantity: (value) => (value === "" ? null : parseFloat(value)),
    },
  };

  //State---------------------------------------------
  const [ingredients, loadingMessage] = useLoad(`${apiURL}/ingredients`);
  const [recipe, setRecipe] = useState(initialRecipe);
  const [rows, setRows] = useState([newRow()]);
  const [errors, setErrors] = useState([]);

  //Handlers-----------------------------------------
  const handleNameChange = (event) => {
    setRecipe({
      ...recipe,
      recipeName: conformance.html2js.recipeName(event.target.value),
    });
  };

  const handleRowChange = (rowKey, field, value) => {
    setRows(
      rows.map((row) =>
        row.rowKey === rowKey
          ? { ...row, [field]: conformance.html2js[field](value) }
          : row,
      ),
    );
  };

  const handleAddRow = () => setRows([...rows, newRow()]);

  const handleRemoveRow = (rowKey) =>
    setRows(rows.filter((row) => row.rowKey !== rowKey));

  const findUnit = (ingredientID) => {
    const ingredient = ingredients.find(
      (item) => item.ingredientID === ingredientID,
    );
    return ingredient ? ingredient.info.ingredientUnit : "";
  };

  const validate = () => {
    const problem = [];
    if (!recipe.recipeName || recipe.recipeName.trim() === "") {
      problem.push("Recipe name is required.");
    }
    const chosen = rows.filter((row) => row.ingredientID !== null);
    if (chosen.length === 0) {
      problem.push("Please choose atleast one ingredient.");
    }
    if (chosen.some((row) => !(row.ingredientQuantity > 0))) {
      problem.push("Every ingredient must have a quantity above 0");
    }
    const duplicates = chosen.map((row) => row.ingredientID);
    if (new Set(duplicates).size !== duplicates.length) {
      problem.push("Please only choose each ingredient once.");
    }
    return problem;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const problem = validate();
    setErrors(problem);
    if (problem.length > 0) return;

    onSubmit({
      recipeName: recipe.recipeName.trim(),
      ingredients: rows
        .filter((row) => row.ingredientID !== null)
        .map((row) => ({
          ingredientID: row.ingredientID,
          ingredientQuantity: row.ingredientQuantity,
        })),
    });
  };

  //View---------------------------------------------
  if (!ingredients) return <p>{loadingMessage}</p>;

  return (
    <form className="recipeForm" onSubmit={handleSubmit} noValidate>
      <div className="recipeForm__panel">
        <div className="recipeForm__field">
          <label htmlFor="recipeName"> Recipe Name</label>
          <input
            id="recipeName"
            type="text"
            value={conformance.js2html.recipeName(recipe.recipeName)}
            onChange={handleNameChange}
          />
        </div>

        <hr className="recipeForm__divider" />

        <h2 className="recipeForm__subtitle">Ingredients</h2>
        <div
          className="recipeForm__row recipeForm__row--labels"
          aria-hidden="true">
          <span>Ingredient</span>
          <span>Quantity</span>
          <span>Unit</span>
          <span></span>
        </div>

        {rows.map((row, index) => (
          <div className="recipeForm__row" key={row.rowKey}>
            <select
              aria-label={`Ingredient ${index + 1}`}
              value={conformance.js2html.ingredientID(row.ingredientID)}
              onChange={(event) =>
                handleRowChange(row.rowKey, "ingredientID", event.target.value)
              }>
              <option value="0">Choose an ingredient</option>
              {ingredients.map((ingredient) => (
                <option
                  key={ingredient.ingredientID}
                  value={ingredient.ingredientID}>
                  {ingredient.ingredientName}
                </option>
              ))}
            </select>

            <input
              aria-label={`Quantity for ingredient ${index + 1}`}
              type="number"
              min="0"
              step="0.01"
              value={conformance.js2html.ingredientQuantity(
                row.ingredientQuantity,
              )}
              onChange={(event) =>
                handleRowChange(
                  row.rowKey,
                  "ingredientQuantity",
                  event.target.value,
                )
              }
            />

            <span className="recipeForm__unit">
              {findUnit(row.ingredientID)}
            </span>

            <button
              type="button"
              className="recipeForm__remove"
              aria-label={`Remove ingredient ${index + 1}`}
              onClick={() => handleRemoveRow(row.rowKey)}
              disabled={rows.length === 1}>
              ✕
            </button>
          </div>
        ))}

        <button
          type="button"
          className="recipeForm__add"
          onClick={handleAddRow}>
          + Add ingredient
        </button>
      </div>

      {errors.length > 0 && (
        <ul className="recipeForm__errors" role="alert">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <div className="recipeForm__actions">
        <button type="button" className="recipeForm__button" onClick={onCancel}>
          Cancel
        </button>
        <button
          type="submit"
          className="recipeForm__button recipeForm__button--primary">
          Save recipe
        </button>
      </div>
    </form>
  );
}

export default RecipeForm;
