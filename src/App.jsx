import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Recipes from "./components/views/Recipes.jsx";
import NewRecipe from "./components/views/NewRecipe.jsx";
import RecipesToReview from "./components/views/RecipesToReview.jsx";
import ReviewRecipe from "./components/views/ReviewRecipe.jsx";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* "/" has no page of its own: send the user to /recipes.
              "replace" swaps "/" out of the history, so Back does not return to it. */}
          <Route path="/" element={<Navigate to="/recipes" replace />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/new" element={<NewRecipe />} />
          <Route path="/review" element={<RecipesToReview />} />
          <Route path="/review/:id" element={<ReviewRecipe />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
