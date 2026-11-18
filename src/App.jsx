import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          <Route path="/" element={<Recipes />} />
          <Route path="/new" element={<NewRecipe />} />
          <Route path="/review" element={<RecipesToReview />} />
          <Route path="/review/:id" element={<ReviewRecipe />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
