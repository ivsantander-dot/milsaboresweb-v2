import React from 'react';
import { Container, Row, Col, Card, Button, Table, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header/HeaderComponents';
import Footer from '../components/Footer/FooterComponent';

/**
 * Página de Error en el Pago
 * Muestra que la compra no se pudo completar
 */
function CompraErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const datosIntento = location.state || {};

  return (
    <>
      <Header />
      
      <main>
        <Container className="my-5">
          <Row className="justify-content-center">
            <Col lg={9}>
              <Card>
                <Card.Body className="p-4">
                  {/* Header con mensaje de error */}
                  <div className="d-flex align-items-start mb-4">
                    <div className="me-3">
                      <span 
                        style={{ 
                          fontSize: '2rem', 
                          color: '#dc3545',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          border: '2px solid #dc3545'
                        }}
                      >
                        ✕
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <h4 className="mb-1 text-danger">
                        No se pudo realizar el pago. nro #{datosIntento.numeroOrden || '20240705'}
                      </h4>
                      <p className="text-muted mb-3">Detalles de comprar</p>
                      
                      {/* Botón para reintentar */}
                      <div className="mb-3">
                        <Button 
                          variant="success"
                          onClick={() => navigate('/checkout')}
                        >
                          VOLVER A REALIZAR EL PAGO
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Información del cliente (si existe) */}
                  {datosIntento.cliente && (
                    <>
                      <Row className="mb-4">
                        <Col md={4}>
                          <Form.Group>
                            <Form.Label className="text-muted small">Nombre*</Form.Label>
                            <Form.Control 
                              type="text" 
                              value={datosIntento.cliente.nombre} 
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
                              value={datosIntento.cliente.apellidos} 
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
                              value={datosIntento.cliente.email} 
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
                                value={datosIntento.cliente.calle} 
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
                                value={datosIntento.cliente.departamento || 'Depto 603'} 
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
                                value={datosIntento.cliente.region === 'metropolitana' ? 'Región Metropolitana de Santiago' : datosIntento.cliente.region} 
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
                                value={datosIntento.cliente.comuna || 'Cerrillos'} 
                                readOnly 
                                className="bg-light"
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        {datosIntento.cliente.indicaciones && (
                          <Form.Group>
                            <Form.Label className="text-muted small">Indicaciones para la entrega (opcional)</Form.Label>
                            <Form.Control 
                              as="textarea" 
                              rows={2}
                              value={datosIntento.cliente.indicaciones} 
                              readOnly 
                              className="bg-light"
                            />
                          </Form.Group>
                        )}
                      </div>
                    </>
                  )}

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
                        {datosIntento.productos ? (
                          datosIntento.productos.map(producto => (
                            <tr key={producto.id}>
                              <td>
                                <div 
                                  style={{ 
                                    width: '50px', 
                                    height: '50px', 
                                    backgroundColor: '#e9ecef' 
                                  }}
                                />
                              </td>
                              <td>{producto.nombre}</td>
                              <td>$ {producto.precio.toLocaleString('es-CL')}</td>
                              <td>{producto.cantidad}</td>
                              <td>$ {(producto.precio * producto.cantidad).toLocaleString('es-CL')}</td>
                            </tr>
                          ))
                        ) : (
                          // Productos de ejemplo si no hay datos
                          <>
                            <tr>
                              <td><div style={{ width: '50px', height: '50px', backgroundColor: '#e9ecef' }} /></td>
                              <td>Fortnite</td>
                              <td>$ 0</td>
                              <td>1</td>
                              <td>$ 0</td>
                            </tr>
                            <tr>
                              <td><div style={{ width: '50px', height: '50px', backgroundColor: '#e9ecef' }} /></td>
                              <td>Minecraft</td>
                              <td>$ 2695</td>
                              <td>4</td>
                              <td>$ 10780</td>
                            </tr>
                            <tr>
                              <td><div style={{ width: '50px', height: '50px', backgroundColor: '#e9ecef' }} /></td>
                              <td>Red Dead Redemption 2</td>
                              <td>$ 5999</td>
                              <td>1</td>
                              <td>$ 5999</td>
                            </tr>
                            <tr>
                              <td><div style={{ width: '50px', height: '50px', backgroundColor: '#e9ecef' }} /></td>
                              <td>Among Us</td>
                              <td>$ 499</td>
                              <td>1</td>
                              <td>$ 499</td>
                            </tr>
                            <tr>
                              <td><div style={{ width: '50px', height: '50px', backgroundColor: '#e9ecef' }} /></td>
                              <td>The Witcher 3</td>
                              <td>$ 3999</td>
                              <td>1</td>
                              <td>$ 3999</td>
                            </tr>
                            <tr>
                              <td><div style={{ width: '50px', height: '50px', backgroundColor: '#e9ecef' }} /></td>
                              <td>Hollow Knight</td>
                              <td>$ 1499</td>
                              <td>1</td>
                              <td>$ 1499</td>
                            </tr>
                            <tr>
                              <td><div style={{ width: '50px', height: '50px', backgroundColor: '#e9ecef' }} /></td>
                              <td>Animal Crossing</td>
                              <td>$ 5999</td>
                              <td>1</td>
                              <td>$ 5999</td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </Table>
                  </div>

                  {/* Total */}
                  <div className="text-center py-3 border-top">
                    <h4 className="mb-0">
                      Total pagado: $ {datosIntento.total ? datosIntento.total.toLocaleString('es-CL') : '28775'}
                    </h4>
                  </div>
                </Card.Body>
              </Card>

              {/* Botones de acción */}
              <div className="text-center mt-4 d-flex justify-content-center gap-2">
                <Button 
                  variant="outline-secondary"
                  onClick={() => navigate('/')}
                >
                  Volver al inicio
                </Button>
                <Button 
                  variant="success"
                  onClick={() => navigate('/checkout')}
                >
                  Reintentar pago
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

export default CompraErrorPage;