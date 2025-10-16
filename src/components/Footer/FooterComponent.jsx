import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import mastercardImg from '../Footer/assets/mastercard.png';
import visaImg from '../Footer/assets/visa.png';
import redcompraImg from '../Footer/assets/redcompra.png';

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
              <Link to="/productos" className={styles.footerCategories}>
                Productos
              </Link>
              {" "}|{" "}
              <Link to="/nosotros" className={styles.footerCategories}>
                Nosotros
              </Link>
              {" "}|{" "}
              <Link to="/contacto" className={styles.footerCategories}>
                Contacto
              </Link>
            </div>

            {/* Iconos de medios de pago */}
            <Container className="d-flex gap-2 flex-wrap align-items-center">
              <img src={visaImg} alt="Visa" className={styles.paymentIcons} />
              <img src={mastercardImg} alt="Mastercard" className={styles.paymentIcons} />
              <img src={redcompraImg} alt="RedCompra" className={styles.paymentIcons} />
            </Container>
          </Col>

          {/* Columna derecha: Newsletter */}
          <Col md={6} className="footerRight">
            <p className="newsletterTitle">
              Mantente al tanto de más noticias
            </p>
            <Form onSubmit={handleSubmit} className="d-flex align-items-center gap-2">
              <Form.Control
                type="email"
                placeholder="Ingresar correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="footer-input"
              />
              <Button type="submit" className="footer-button">
                Suscribirse
              </Button>
            </Form>

            {mensaje && (
              <div className="mt-2 text-white">
                {mensaje}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;