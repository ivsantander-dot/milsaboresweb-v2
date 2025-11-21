import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header/HeaderComponents';
import Footer from '../components/Footer/FooterComponent';
import ProductCard from '../components/ProductCard/ProductCard';
import { productosAPI } from '../services/api';

function ProductsPage() {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await productosAPI.getAll();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  const productosFiltrados = categoriaSeleccionada === 'todas'
    ? productos
    : productos.filter(p => p.categoriaId === categoriaSeleccionada);

  if (loading) {
    return (
      <>
        <Header />
        <Container className="my-5 text-center">
          <h3>Cargando productos...</h3>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <Container className="my-5">
          <Row>
            <Col>
              <h1 className="text-center mb-4">Nuestros Productos</h1>
            </Col>
          </Row>

          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map(producto => (
                <Col key={producto.id}>
                  <ProductCard {...producto} />
                </Col>
              ))
            ) : (
              <Col>
                <p className="text-center">No hay productos disponibles</p>
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