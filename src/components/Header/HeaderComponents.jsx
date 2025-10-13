import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';

function HeaderComponents() {
  return (
    <header>
      <Navbar expand="lg" bg="primary" variant="dark">
        <Container fluid>
          <Navbar.Brand href="index.html" className="d-flex align-items-center">
            <img
              src=''
              alt="logo"
              width="30"
              height="24"
              className="me-2"
              style={{ borderRadius: '2px' }}
            />
            PMS©
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="mainNavbar" />

          <Navbar.Collapse id="mainNavbar">
            <Nav className="mx-auto mb-2 mb-lg-0">
              <Nav.Link href={links.home} className="text-white">Home</Nav.Link>
              <Nav.Link href={links.productos} className="text-white">Productos</Nav.Link>
              <Nav.Link href={links.nosotros} className="text-white">Nosotros</Nav.Link>
              <Nav.Link href={links.blogs} className="text-white">Blogs</Nav.Link>
              <Nav.Link href={links.contacto} className="text-white">Contacto</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <a
            href="carrito.html"
            className="navbar-text text-white fw-bold d-flex align-items-center text-decoration-none"
          >
            <img
              src=''
              alt="Carrito"
              style={{ width: '20px', height: '20px', marginRight: '8px' }}
            />
            Carrito (<span id="cart-count">0</span>)
          </a>
        </Container>
      </Navbar>
    </header>
  );
}

export default HeaderComponents;
