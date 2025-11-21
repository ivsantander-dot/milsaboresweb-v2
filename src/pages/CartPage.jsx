import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/HeaderComponents';
import Footer from '../components/Footer/FooterComponent';

import { carritoAPI } from '../services/api';

function CartPage() {
  const navigate = useNavigate();

  // STATE: Ahora guardamos todo el objeto del backend (items, subtotal, etc.)
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // STATE: Código de descuento (Lógica visual Frontend)
  const [codigoDescuento, setCodigoDescuento] = useState('');
  const [descuentoAplicado, setDescuentoAplicado] = useState(false);
  const [mensajeDescuento, setMensajeDescuento] = useState('');

  // EFFECT: Cargar carrito al montar
  useEffect(() => {
    cargarCarrito();
  }, []);

  // Función para cargar el carrito desde AWS
  const cargarCarrito = async () => {
    setLoading(true);
    try {
      const data = await carritoAPI.getCarrito();
      setCartData(data);
      setError(null);
    } catch (err) {
      console.error("Error cargando carrito:", err);
      setError("No se pudo cargar el carrito. ¿Estás conectado?");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE: Cambiar cantidad (+ / -)
  const handleCantidadChange = async (itemId, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    try {
      // Enviamos cambio al backend
      await carritoAPI.updateItem(itemId, nuevaCantidad);
      // Recargamos para tener el subtotal actualizado por el servidor
      const data = await carritoAPI.getCarrito();
      setCartData(data);
    } catch (error) {
      alert("⚠️ Error: No hay suficiente stock o falló la conexión.");
    }
  };

  // DELETE: Eliminar un producto
  const handleEliminarProducto = async (itemId) => {
    if (window.confirm('¿Seguro que quieres eliminar este producto?')) {
      try {
        await carritoAPI.deleteItem(itemId);
        const data = await carritoAPI.getCarrito();
        setCartData(data);
      } catch (error) {
        alert("Error al eliminar producto.");
      }
    }
  };

  // DELETE: Vaciar todo
  const handleLimpiarCarrito = async () => {
    if (window.confirm('¿Seguro que quieres vaciar el carrito?')) {
      try {
        await carritoAPI.vaciarCarrito();
        setCartData(null); // Limpiamos visualmente
        setDescuentoAplicado(false);
        setMensajeDescuento('');
      } catch (error) {
        alert("Error al vaciar el carrito.");
      }
    }
  };

  // Lógica de Descuento (Visual en Frontend)
  const handleAplicarDescuento = () => {
    if (descuentoAplicado) return;

    if (codigoDescuento.toLowerCase() === 'felices50') {
      setDescuentoAplicado(true);
      setMensajeDescuento('✓ Descuento del 10% aplicado');
      setCodigoDescuento('');
    } else {
      setMensajeDescuento('✗ Código inválido');
    }

    setTimeout(() => {
      if (mensajeDescuento.includes('inválido')) setMensajeDescuento('');
    }, 3000);
  };

  // Proceder al pago
  const handleProcederPago = () => {
    // Pasamos el total calculado (con descuento si aplica) al checkout
    navigate('/checkout', { state: { totalFinal: totalCalculado } });
  };

  // --- CÁLCULOS ---
  const items = cartData?.items || [];
  const subtotalBackend = cartData?.subtotal || 0;
  const descuentoMonto = descuentoAplicado ? (subtotalBackend * 0.10) : 0;
  const totalCalculado = subtotalBackend - descuentoMonto;

  if (loading) {
    return (
      <>
        <Header />
        <Container className="my-5 text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Sincronizando con tu carrito...</p>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <main style={{ minHeight: '75vh' }}>
        <Container className="my-5">
          <h1 className="text-center mb-4">Mi Carrito de Compras</h1>

          {error && <Alert variant="danger">{error}</Alert>}

          <Row>
            {/* Columna de productos */}
            <Col lg={8}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Productos ({cartData?.totalItems || 0})</h4>
                {items.length > 0 && (
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={handleLimpiarCarrito}
                  >
                    Limpiar Carrito
                  </Button>
                )}
              </div>

              {/* Lista de productos */}
              {items.length > 0 ? (
                items.map(item => (
                  <Card key={item.id} className="mb-3 shadow-sm border-0">
                    <Card.Body>
                      <Row className="align-items-center">
                        {/* Imagen */}
                        <Col xs={3} md={2}>
                          <img
                            src={item.imagen || "https://via.placeholder.com/150"}
                            alt={item.nombre}
                            className="img-fluid rounded"
                            style={{ objectFit: 'cover', height: '80px' }}
                            onError={(e) => { e.target.src = '/src/assets/placeholder.png'; }}
                          />
                        </Col>

                        {/* Información */}
                        <Col xs={9} md={5}>
                          <h5 className="mb-1">{item.nombre}</h5>
                          <p className="text-muted small mb-1">
                            {/* Usamos descripción si viene del DTO enriquecido */}
                            {item.descripcion ? item.descripcion.substring(0, 50) + '...' : ''}
                          </p>
                          <strong className="text-primary">
                            ${item.precio.toLocaleString('es-CL')}
                          </strong>
                        </Col>

                        {/* Controles de cantidad */}
                        <Col xs={6} md={3} className="text-center mt-3 mt-md-0">
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <Button
                              variant="outline-dark" size="sm"
                              onClick={() => handleCantidadChange(item.id, item.cantidad - 1)}
                            >-</Button>
                            <span className="fw-bold px-2">{item.cantidad}</span>
                            <Button
                              variant="outline-dark" size="sm"
                              onClick={() => handleCantidadChange(item.id, item.cantidad + 1)}
                            >+</Button>
                          </div>
                        </Col>

                        {/* Botón eliminar */}
                        <Col xs={6} md={2} className="text-end mt-3 mt-md-0">
                          <Button
                            variant="link" className="text-danger text-decoration-none"
                            onClick={() => handleEliminarProducto(item.id)}
                          >
                            <small>Eliminar</small>
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <div className="text-center py-5 bg-light rounded">
                  <h5 className="text-muted">Tu carrito está vacío 🛒</h5>
                  <p className="text-muted">
                    <Button variant="primary" className="mt-3" onClick={() => navigate('/productos')}>
                      Ir a comprar
                    </Button>
                  </p>
                </div>
              )}
            </Col>

            {/* Columna de resumen */}
            <Col lg={4}>
              <Card className="border-0 shadow-sm bg-light">
                <Card.Body>
                  <h5 className="text-center mb-4">Resumen del Pedido</h5>

                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>${subtotalBackend.toLocaleString('es-CL')}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span>Envío:</span>
                    <span className="text-success fw-bold">Gratis</span>
                  </div>

                  {descuentoAplicado && (
                    <div className="d-flex justify-content-between mb-2 text-success">
                      <span>Descuento (10%):</span>
                      <span>-${descuentoMonto.toLocaleString('es-CL')}</span>
                    </div>
                  )}

                  <hr />

                  <div className="d-flex justify-content-between mb-3">
                    <strong className="h5">TOTAL:</strong>
                    <strong className="h5 text-primary">${totalCalculado.toLocaleString('es-CL')}</strong>
                  </div>

                  {/* Código de descuento */}
                  <div className="mb-3">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Código"
                        value={codigoDescuento}
                        onChange={(e) => setCodigoDescuento(e.target.value)}
                        disabled={descuentoAplicado || items.length === 0}
                      />
                      <Button 
                        variant="dark" 
                        onClick={handleAplicarDescuento}
                        disabled={descuentoAplicado || items.length === 0}
                      >
                        Aplicar
                      </Button>
                    </div>
                    {mensajeDescuento && (
                      <p className={`mt-2 mb-0 small ${mensajeDescuento.includes('✓') ? 'text-success' : 'text-danger'}`}>
                        {mensajeDescuento}
                      </p>
                    )}
                  </div>

                  <Button 
                    variant="success" 
                    size="lg" 
                    className="w-100"
                    onClick={handleProcederPago}
                    disabled={items.length === 0}
                  >
                    PROCEDER AL PAGO
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
    </>
  );
}

export default CartPage;