import { Routes, Route } from "react-router-dom";
import HeaderComponents from "./components/Header/HeaderComponents";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";

function App() {
  return (
    <>
      <HeaderComponents />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

