import { useState } from "react";
import apiURL from "../../api/apiURL.js";
import useLoad from "../../api/useLoad.js";
import "./RecipeForm.scss";

const initialRecipe = {
    recipeName: null
};

const newRow = () => ({
    rowKey: crypto.randomUUID(),
    ingredientID: null,
    ingredientQuantity: null
});

function RecipeForm ({onSubmit, onCancel}) {
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
        setRecipe({...recipe, recipeName: conformance.html2js.recipeName(event.target.value) });
    };

    const handleRowChange = (rowKey, field, value) => {
        setRows(rows.map((row) =>
        row.rowKey === rowKey ? {...row, [field]: conformance.html2js[field](value)} : row));
    };

    const handleAddRow = () => setRows([...rows, newRow()]);

    const handleRemoveRow = (rowKey) => setRows(rows.filter((row) => row.rowKey !== rowKey));

    const findUnit = (ingredientID) => {
        const ingredient = ingredients.find((item) => item.ingredientID === ingredientID);
        return ingredient ? ingredient.info.ingredientUnit : "";
    };

    const validate = () => {
        const problem = [];
        if (!recipe.recipeName || recipe.recipeName.trim() ==="") {
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

    
}
