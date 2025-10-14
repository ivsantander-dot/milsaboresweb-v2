import { Routes, Route } from "react-router-dom";
import HeaderComponents from "./components/Header/HeaderComponents";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogsArticle1Pages from "./pages/BlogsArticle1Pages";
import BlogsArticle2Pages from "./pages/BlogsArticle2Pages";


function App() {
  return (
    <>
      <HeaderComponents />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogsArticle1" element={<BlogsArticle1Pages />} />
          <Route path="/blogsArticle2" element={<BlogsArticle2Pages />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

