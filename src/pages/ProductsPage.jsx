import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header/HeaderComponents';
import Footer from '../components/Footer/FooterComponent';
import { getProducts } from '../data/productsData';
import ProductCard from '../components/ProductCard';


/**
 * Página de Productos
 * Lista todos los productos disponibles con filtros
 * 
 * DEMUESTRA:
 * - Uso de STATE (productos, categoriaSeleccionada)
 * - Uso de EFFECT (cargar datos al montar)
 * - Filtrado de datos
 * - Renderizado de listas con map()
 */
function ProductsPage() {
  // STATE: Lista de productos
  const [productos, setProductos] = useState([]);
  
  // STATE: Categoría seleccionada para filtrar
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');

  // EFFECT: Cargar productos al montar el componente
  useEffect(() => {
    const productosData = getProducts();
    setProductos(productosData);
  }, []);

  // Filtrar productos según categoría
  const productosFiltrados = categoriaSeleccionada === 'todas'
    ? productos
    : productos.filter(p => p.categoria === categoriaSeleccionada);

  // Obtener categorías únicas
  const categorias = ['todas', ...new Set(productos.map(p => p.categoria))];

  return (
    <>
      <Header />
      
      <main>
        <Container className="my-5">
          {/* Título */}
          <Row>
            <Col>
              <h1 className="text-center mb-4">Nuestros Productos</h1>
            </Col>
          </Row>

          {/* Filtros de categoría */}
          <Row className="mb-4">
            <Col>
              <div className="d-flex justify-content-center gap-2 flex-wrap">
                {categorias.map(categoria => (
                  <button
                    key={categoria}
                    className={`btn ${
                      categoriaSeleccionada === categoria 
                        ? 'btn-primary' 
                        : 'btn-outline-primary'
                    }`}
                    onClick={() => setCategoriaSeleccionada(categoria)}
                  >
                    {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                  </button>
                ))}
              </div>
            </Col>
          </Row>

          {/* Grid de productos */}
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map(producto => (
                <Col key={producto.id}>
                  <ProductCard {...producto} />
                </Col>
              ))
            ) : (
              <Col>
                <p className="text-center">No hay productos en esta categoría</p>
              </Col>
            )}
          </Row>
        </Container>
      </main>

      <Footer />
    </>
  );
}

export default ProductsPage;