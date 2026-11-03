import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Recipes from "./components/views/Recipes.jsx";
import NewRecipe from "./components/views/NewRecipe.jsx";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Recipes />} />
          <Route path="/new" element={<NewRecipe />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
