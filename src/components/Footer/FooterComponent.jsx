import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row className="mb-3">
          <Col md={12} className="footer-info mb-3">
            <p>
              © 2025, Pastelería Mil Sabores. Todos los derechos reservados.  
              Pastelería Mil Sabores, el logotipo de Pastelería Mil Sabores y los nombres de nuestros productos son marcas comerciales o marcas registradas de Pastelería Mil Sabores en Chile.  
              Otras marcas o nombres de productos son marcas comerciales de sus respectivos propietarios.
            </p>
          </Col>
        </Row>

        <Row className="align-items-center">
          <Col md={6} className="footer-left mb-3 mb-md-0">
            <div className="footer-categories mb-2">
              <a href="#" className="text-white text-decoration-none"><span>Categoria X</span></a> |{' '}
              <a href="productos.html" className="text-white text-decoration-none"><span>Productos</span></a> |{' '}
              <a href="contacto.html" className="text-white text-decoration-none"><span>Contacto</span></a>
            </div>

            <div className="payment-icons d-flex gap-2">
              <img src="" alt="Visa" style={{ width: '50px' }} />
              <img src="" alt="MasterCard" style={{ width: '50px' }} />
              <img src="" alt="RedCompra" style={{ width: '50px' }} />
            </div>
          </Col>

          <Col md={6} className="footer-right">
            <p>Mantengase al tanto de más noticias</p>
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
