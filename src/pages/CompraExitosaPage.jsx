import React from 'react';
import { Container, Row, Col, Card, Button, Table, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header/HeaderComponents';
import Footer from '../components/Footer/FooterComponent';

/**
 * Página de Compra Exitosa
 * Muestra confirmación y resumen del pedido
 */
function CompraExitosaPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const pedido = location.state?.pedido;

  // Si no hay pedido, redirigir a home
  if (!pedido) {
    setTimeout(() => navigate('/'), 2000);
    return (
      <>
        <Header />
        <Container className="my-5 text-center">
          <h3>No hay información del pedido</h3>
          <p>Redirigiendo a la página principal...</p>
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
          <Row className="justify-content-center">
            <Col lg={9}>
              <Card>
                <Card.Body className="p-4">
                  {/* Header con mensaje de éxito */}
                  <div className="d-flex align-items-start mb-4">
                    <div className="me-3">
                      <span 
                        style={{ 
                          fontSize: '2rem', 
                          color: '#28a745',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          border: '2px solid #28a745'
                        }}
                      >
                        ✓
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <h4 className="mb-1">
                        Se ha realizado la compra. nro #{pedido.id}
                      </h4>
                      <p className="text-muted mb-3">Completa la siguiente información</p>
                      
                      <div className="bg-light p-2 mb-3">
                        <small className="text-muted">Código orden: ORDEN{pedido.id}</small>
                      </div>
                    </div>
                  </div>

                  {/* Información del cliente */}
                  <Row className="mb-4">
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label className="text-muted small">Nombre*</Form.Label>
                        <Form.Control 
                          type="text" 
                          value={pedido.cliente.nombre} 
                          readOnly 
                          className="bg-light"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label className="text-muted small">Apellidos*</Form.Label>
                        <Form.Control 
                          type="text" 
                          value={pedido.cliente.apellidos} 
                          readOnly 
                          className="bg-light"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label className="text-muted small">Correo*</Form.Label>
                        <Form.Control 
                          type="email" 
                          value={pedido.cliente.email} 
                          readOnly 
                          className="bg-light"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Dirección de entrega */}
                  <div className="mb-4">
                    <h6 className="mb-3">Dirección de entrega de los productos</h6>
                    <Row>
                      <Col md={8}>
                        <Form.Group className="mb-3">
                          <Form.Label className="text-muted small">Calle*</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={pedido.cliente.calle} 
                            readOnly 
                            className="bg-light"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label className="text-muted small">Departamento (opcional)</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={pedido.cliente.departamento || ''} 
                            placeholder="Depto 603"
                            readOnly 
                            className="bg-light"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="text-muted small">Región*</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={pedido.cliente.region === 'metropolitana' ? 'Región Metropolitana de Santiago' : pedido.cliente.region} 
                            readOnly 
                            className="bg-light"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="text-muted small">Comuna*</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={pedido.cliente.comuna} 
                            readOnly 
                            className="bg-light"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {pedido.cliente.indicaciones && (
                      <Form.Group>
                        <Form.Label className="text-muted small">Indicaciones para la entrega (opcional)</Form.Label>
                        <Form.Control 
                          as="textarea" 
                          rows={2}
                          value={pedido.cliente.indicaciones} 
                          readOnly 
                          className="bg-light"
                        />
                      </Form.Group>
                    )}
                  </div>

                  {/* Tabla de productos */}
                  <div className="mb-4">
                    <Table responsive bordered>
                      <thead className="table-light">
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pedido.productos.map(producto => (
                          <tr key={producto.id}>
                            <td>
                              <div 
                                style={{ 
                                  width: '50px', 
                                  height: '50px', 
                                  backgroundColor: '#e9ecef',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <img 
                                  src={producto.imagen} 
                                  alt={producto.nombre}
                                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              </div>
                            </td>
                            <td>{producto.nombre}</td>
                            <td>$ {producto.precio.toLocaleString('es-CL')}</td>
                            <td>{producto.cantidad}</td>
                            <td>$ {(producto.precio * producto.cantidad).toLocaleString('es-CL')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>

                  {/* Total */}
                  <div className="text-center py-3 border-top">
                    <h4 className="mb-3">Total pagado: $ {pedido.total.toLocaleString('es-CL')}</h4>
                    
                    <div className="d-flex justify-content-center gap-2">
                      <Button 
                        variant="danger"
                        onClick={() => window.print()}
                      >
                        Imprimir boleta en PDF
                      </Button>
                      <Button 
                        variant="success"
                        onClick={() => {
                          alert('Funcionalidad de envío por email (simulada)');
                        }}
                      >
                        Enviar boleta por email
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Botón para volver */}
              <div className="text-center mt-4">
                <Button 
                  variant="outline-primary"
                  onClick={() => navigate('/')}
                >
                  Volver al inicio
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
    </>
  );
}

export default CompraExitosaPage;