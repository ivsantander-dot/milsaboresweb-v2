import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

/**
 * Componente Footer
 * Pie de página con información, enlaces y suscripción
 * 
 * DEMUESTRA:
 * - Uso de STATE para el formulario
 * - Manejo de eventos (onSubmit)
 * - Validación básica
 */
function Footer() {
  // STATE para el email del formulario
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!email || !email.includes('@')) {
      setMensaje('Por favor ingresa un email válido');
      return;
    }

    // Simular suscripción exitosa
    setMensaje('¡Gracias por suscribirte!');
    setEmail('');

    // Limpiar mensaje después de 3 segundos
    setTimeout(() => {
      setMensaje('');
    }, 3000);
  };

  return (
    <footer className={styles.footer}>
      <Container>
        {/* Fila de información */}
        <Row className="mb-4">
          <Col md={12} className={styles.footerInfo}>
            <p>
              © 2025, Pastelería Mil Sabores. Todos los derechos reservados.
              Pastelería Mil Sabores, el logotipo de Pastelería Mil Sabores y los nombres 
              de nuestros productos son marcas comerciales o marcas registradas de 
              Pastelería Mil Sabores en Chile. Otras marcas o nombres de productos son 
              marcas comerciales de sus respectivos propietarios.
            </p>
          </Col>
        </Row>

        {/* Fila de enlaces y newsletter */}
        <Row>
          {/* Columna izquierda: Enlaces y medios de pago */}
          <Col md={6} className="mb-3 mb-md-0">
            {/* Enlaces de categorías */}
            <div className="mb-3">
              <Link to="/productos" className={styles.categoryLink}>
                Productos
              </Link>
              |
              <Link to="/nosotros" className={styles.categoryLink}>
                Nosotros
              </Link>
              |
              <Link to="/contacto" className={styles.categoryLink}>
                Contacto
              </Link>
            </div>

            {/* Iconos de medios de pago */}
            <div className="d-flex gap-2 flex-wrap">
              <span className={styles.paymentIcon}>💳 Visa</span>
              <span className={styles.paymentIcon}>💳 Mastercard</span>
              <span className={styles.paymentIcon}>💳 RedCompra</span>
            </div>
          </Col>

          {/* Columna derecha: Newsletter */}
          <Col md={6}>
            <p className={styles.newsletterTitle}>
              Mantente al tanto de más noticias
            </p>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Control
                  type="email"
                  placeholder="Ingresar correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Button 
                type="submit" 
                className={styles.subscribeButton}
              >
                Suscribirse
              </Button>
              
              {/* Mensaje de confirmación */}
              {mensaje && (
                <div className="mt-2 text-white">
                  {mensaje}
                </div>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;