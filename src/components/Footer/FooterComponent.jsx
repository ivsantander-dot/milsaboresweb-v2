import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from '../Footer/Footer.module.css'; // ✅ Importa el CSS Module

function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        {/* Texto informativo */}
        <Row className="mb-3">
          <Col md={12} className={styles.footerInfo}>
            <p>
              © 2025, Pastelería Mil Sabores. Todos los derechos reservados.  
              Pastelería Mil Sabores, el logotipo de Pastelería Mil Sabores y los nombres de nuestros productos son marcas comerciales o marcas registradas de Pastelería Mil Sabores en Chile.  
              Otras marcas o nombres de productos son marcas comerciales de sus respectivos propietarios.
            </p>
          </Col>
        </Row>

        {/* Sección inferior */}
        <Row className="align-items-center">
          {/* Izquierda: categorías + medios de pago */}
          <Col md={6} className="mb-3 mb-md-0">
            <div className={styles.footerCategories}>
              <a href="#" className="text-decoration-none">
                <span>Categoria X</span>
              </a>{' '}
              |{' '}
              <a href="/productos" className="text-decoration-none">
                <span>Productos</span>
              </a>{' '}
              |{' '}
              <a href="/contacto" className="text-decoration-none">
                <span>Contacto</span>
              </a>
            </div>

            <div className={styles.paymentIcons}>
              <img src="/visa.png" alt="Visa" />
              <img src="/mastercard.png" alt="MasterCard" />
              <img src="/redcompra.png" alt="RedCompra" />
            </div>
          </Col>

          {/* Derecha: newsletter */}
          <Col md={6} className={styles.footerRight}>
            <p>Mantente al tanto de más noticias</p>
            <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                type="email"
                placeholder="Ingresar correo"
                className="me-2"
              />
              <Button type="submit" variant="primary">
                Suscribirse
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
