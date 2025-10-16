import { Routes, Route } from "react-router-dom";
import "../src/styles/global.css";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogsArticle1Pages from "./pages/BlogsArticle1Pages";
import BlogsArticle2Pages from "./pages/BlogsArticle2Pages";
import BlogsArticle3Pages from "./pages/BlogsArticle3Pages";
import HomeAdmin from "./pages/HomeAdmin";
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Login from "./pages/login";
import Register from "./pages/Register";
import ProductoDetalle from "./pages/ProductoDetalle";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogsArticle1" element={<BlogsArticle1Pages />} />
        <Route path="/blogsArticle2" element={<BlogsArticle2Pages />} />
        <Route path="/blogsArticle3" element={<BlogsArticle3Pages />} />
        <Route path="/homeAdmin" element={<HomeAdmin />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/productos" element  ={<ProductsPage />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productoDetalle" element={<ProductoDetalle />} />        
      </Routes>
    </>
  );
}

export default App;

