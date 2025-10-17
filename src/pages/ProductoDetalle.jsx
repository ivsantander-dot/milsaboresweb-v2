// src/pages/ProductoDetalle.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header/HeaderComponents';
import Footer from '../components/Footer/FooterComponent';
import productsData from '../data/productsData';
import { addToCart } from '../utils/carthelpers';

function ProductoDetalle() {
  const { id } = useParams(); // id del producto desde la URL
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [showModal, setShowModal] = useState(false);

  // Cargar el producto según el id
  useEffect(() => {
    const prod = productsData.find(p => p.id === parseInt(id));
    if (prod) setProducto(prod);
  }, [id]);

  // Agregar al carrito
  const handleAgregarAlCarrito = () => {
    addToCart(producto, cantidad);
    setShowModal(true);
  };

  const handleCerrarModal = () => setShowModal(false);

  if (!producto) {
    return <p className="text-center mt-5">Producto no encontrado</p>;
  }

  return (
    <>
      <Header />

      <Container className="my-5">
        <Row>
          {/* Imagen del producto */}
          <Col md={6}>
            <Card>
              <Card.Img
                variant="top"
                src={producto.imagen}
                alt={producto.nombre}
                style={{ objectFit: 'cover', height: '400px' }}
              />
            </Card>
          </Col>

          {/* Información del producto */}
          <Col md={6}>
            <h2>{producto.nombre}</h2>
            <p className="text-muted">{producto.descripcion}</p>
            <h4>${producto.precio.toLocaleString('es-CL')}</h4>

            <div className="d-flex align-items-center mb-3 mt-3">
              <Button
                variant="outline-primary"
                onClick={() => setCantidad(prev => Math.max(prev - 1, 1))}
              >
                -
              </Button>
              <span className="mx-3">{cantidad}</span>
              <Button
                variant="outline-primary"
                onClick={() => setCantidad(prev => prev + 1)}
              >
                +
              </Button>
            </div>

            <Button variant="primary" onClick={handleAgregarAlCarrito}>
              Añadir al carrito
            </Button>
          </Col>
        </Row>

        {/* Productos relacionados */}
        <Row className="mt-5">
          <h4>Productos relacionados</h4>
          {productsData
            .filter(p => p.categoria === producto.categoria && p.id !== producto.id)
            .slice(0, 4)
            .map(p => (
              <Col md={3} key={p.id} className="mt-3">
                <Card
                  onClick={() => navigate(`/producto/${p.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Img
                    variant="top"
                    src={p.imagen}
                    style={{ height: '150px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title style={{ fontSize: '0.9rem' }}>{p.nombre}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={handleCerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>¡Producto agregado!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          "{producto.nombre}" ha sido agregado a tu carrito.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCerrarModal}>
            Seguir comprando
          </Button>
          <Button variant="primary" onClick={() => navigate('/carrito')}>
            Ir al carrito
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
}

export default ProductoDetalle;

