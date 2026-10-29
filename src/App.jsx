import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Recipes from "./components/views/Recipes.jsx";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/recipes" element={<Recipes />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
