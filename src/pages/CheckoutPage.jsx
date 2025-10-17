import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/HeaderComponents';
import Footer from '../components/Footer/FooterComponent';
import { getCart, getCartSubtotal, getCartTotal, clearCart } from '../utils/carthelpers';

/**
 * Página de Checkout
 * Formulario de datos del cliente y dirección de entrega
 * 
 * DEMUESTRA:
 * - Formularios complejos con validación
 * - Gestión de estado múltiple
 * - Validación de campos
 * - Integración con carrito
 */
function CheckoutPage() {
  const navigate = useNavigate();

  // STATE: Productos del carrito
  const [carrito, setCarrito] = useState([]);
  
  // STATE: Datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    calle: '',
    departamento: '',
    region: 'metropolitana',
    comuna: '',
    indicaciones: ''
  });

  // STATE: Validación del formulario
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  // STATE: Código de descuento
  const [codigoDescuento, setCodigoDescuento] = useState('');
  const [descuentoAplicado, setDescuentoAplicado] = useState(false);

  // EFFECT: Cargar carrito al montar
  useEffect(() => {
    const carritoData = getCart();
    
    // Redirigir si el carrito está vacío
    if (carritoData.length === 0) {
      alert('Tu carrito está vacío');
      navigate('/productos');
      return;
    }
    
    setCarrito(carritoData);
  }, [navigate]);

  // Función para obtener comunas según región
  const getComunas = (region) => {
    const comunasPorRegion = {
      metropolitana: ['Santiago', 'Puente Alto', 'Maipú', 'Ñuñoa', 'La Florida', 'Pudahuel', 'Las Condes', 'Providencia'],
      valparaiso: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'Concón', 'Casablanca'],
      biobio: ['Concepción', 'Talcahuano', 'Los Ángeles', 'Chillán', 'Coronel'],
      araucania: ['Temuco', 'Villarrica', 'Pucón', 'Loncoche', 'Angol']
    };
    return comunasPorRegion[region] || [];
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }

    // Si cambia la región, resetear la comuna
    if (name === 'region') {
      setFormData({
        ...formData,
        region: value,
        comuna: ''
      });
    }
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData.apellidos.trim()) {
      newErrors.apellidos = 'Los apellidos son obligatorios';
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Ingresa un correo válido';
    }

    if (!formData.calle.trim()) {
      newErrors.calle = 'La calle es obligatoria';
    }

    if (!formData.comuna) {
      newErrors.comuna = 'Selecciona una comuna';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);

    if (!validateForm()) {
      return;
    }

    // Simular procesamiento del pago
    const totalCompra = descuentoAplicado 
      ? getCartTotal(10).total 
      : getCartSubtotal();

    // Guardar información de la compra
    const pedido = {
      id: Date.now(),
      fecha: new Date().toISOString(),
      cliente: formData,
      productos: carrito,
      total: totalCompra,
      descuento: descuentoAplicado ? 10 : 0
    };

    // En un caso real, aquí se enviaría al backend
    console.log('Pedido realizado:', pedido);

    // Limpiar carrito
    clearCart();
    window.dispatchEvent(new Event('storage'));

    // Redirigir a página de éxito
    navigate('/compra-exitosa', { 
      state: { 
        pedido,
        mensaje: '¡Compra realizada con éxito!' 
      } 
    });
  };

  // Calcular totales
  const subtotal = getCartSubtotal();
  const porcentajeDescuento = descuentoAplicado ? 10 : 0;
  const { descuento, total } = getCartTotal(porcentajeDescuento);

  return (
    <>
      <Header />
      
      <main>
        <Container className="my-5">
          <h1 className="text-center mb-4">Carrito de compra</h1>
          <p className="text-center text-muted mb-4">Completa la siguiente información</p>

          <Row>
            {/* Columna izquierda: Formulario */}
            <Col lg={7}>
              {/* Tabla de productos */}
              <Card className="mb-4">
                <Card.Body>
                  <h5 className="mb-3">Productos</h5>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carrito.map(producto => (
                        <tr key={producto.id}>
                          <td>
                            <img 
                              src={producto.imagen} 
                              alt={producto.nombre}
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                              onError={(e) => {
                                e.target.src = '/src/assets/placeholder.png';
                              }}
                            />
                          </td>
                          <td>{producto.nombre}</td>
                          <td>${producto.precio.toLocaleString('es-CL')}</td>
                          <td>{producto.cantidad}</td>
                          <td>${(producto.precio * producto.cantidad).toLocaleString('es-CL')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>

              {/* Información del cliente */}
              <Card className="mb-4">
                <Card.Body>
                  <h5 className="mb-3">Información del cliente</h5>
                  <p className="text-muted small">Completa la siguiente información</p>

                  <Form noValidate validated={validated}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Nombre*</Form.Label>
                          <Form.Control
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            isInvalid={!!errors.nombre}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.nombre}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Apellidos*</Form.Label>
                          <Form.Control
                            type="text"
                            name="apellidos"
                            value={formData.apellidos}
                            onChange={handleChange}
                            isInvalid={!!errors.apellidos}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.apellidos}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Correo*</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>

              {/* Dirección de entrega */}
              <Card className="mb-4">
                <Card.Body>
                  <h5 className="mb-3">Dirección de entrega de los productos</h5>
                  <p className="text-muted small">Ingrese dirección de forma detallada</p>

                  <Form noValidate validated={validated}>
                    <Row>
                      <Col md={8}>
                        <Form.Group className="mb-3">
                          <Form.Label>Calle*</Form.Label>
                          <Form.Control
                            type="text"
                            name="calle"
                            value={formData.calle}
                            onChange={handleChange}
                            isInvalid={!!errors.calle}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.calle}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Departamento (opcional)</Form.Label>
                          <Form.Control
                            type="text"
                            name="departamento"
                            value={formData.departamento}
                            onChange={handleChange}
                            placeholder="Ej: 603"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Región*</Form.Label>
                          <Form.Select
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                            required
                          >
                            <option value="metropolitana">Región Metropolitana de Santiago</option>
                            <option value="valparaiso">Valparaíso</option>
                            <option value="biobio">Biobío</option>
                            <option value="araucania">La Araucanía</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Comuna*</Form.Label>
                          <Form.Select
                            name="comuna"
                            value={formData.comuna}
                            onChange={handleChange}
                            isInvalid={!!errors.comuna}
                            required
                          >
                            <option value="">Seleccione...</option>
                            {getComunas(formData.region).map(comuna => (
                              <option key={comuna} value={comuna}>{comuna}</option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.comuna}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Indicaciones para la entrega (opcional)</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="indicaciones"
                        value={formData.indicaciones}
                        onChange={handleChange}
                        placeholder="Ej: Entre calles, color del edificio, no tiene timbre..."
                      />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Columna derecha: Resumen */}
            <Col lg={5}>
              <Card style={{ backgroundColor: 'var(--color-light)', position: 'sticky', top: '20px' }}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0">Total a pagar:</h5>
                    <h4 className="text-primary mb-0">
                      ${total.toLocaleString('es-CL')}
                    </h4>
                  </div>

                  <div className="mb-3 p-3 border rounded bg-white">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal:</span>
                      <span>${subtotal.toLocaleString('es-CL')}</span>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <span>Envío:</span>
                      <span className="text-success">Gratis</span>
                    </div>

                    {descuentoAplicado && (
                      <div className="d-flex justify-content-between mb-2 text-success">
                        <span>Descuento (10%):</span>
                        <span>-${descuento.toLocaleString('es-CL')}</span>
                      </div>
                    )}

                    <hr />

                    <div className="d-flex justify-content-between">
                      <strong>TOTAL:</strong>
                      <strong>${total.toLocaleString('es-CL')}</strong>
                    </div>
                  </div>

                  <Button 
                    variant="success" 
                    size="lg" 
                    className="w-100"
                    onClick={handleSubmit}
                  >
                    Pagar ahora $ {total.toLocaleString('es-CL')}
                  </Button>

                  <div className="text-center mt-3">
                    <small className="text-muted">
                      Al realizar el pago, aceptas nuestros términos y condiciones
                    </small>
                  </div>
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

export default CheckoutPage;