import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import links from "../../links";

function HeaderComponents() {
  return (
    <header>
      <Navbar expand="lg" bg="primary" variant="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to={links.home}>
            PMS©
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="mainNavbar" />

          <Navbar.Collapse id="mainNavbar">
            <Nav className="mx-auto mb-2 mb-lg-0">
              <Nav.Link as={Link} to={links.home}>Home</Nav.Link>
              <Nav.Link as={Link} to={links.productos}>Productos</Nav.Link>
              <Nav.Link as={Link} to={links.nosotros}>Nosotros</Nav.Link>
              <Nav.Link as={Link} to={links.blogs}>Blogs</Nav.Link>
              <Nav.Link as={Link} to={links.contacto}>Contacto</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Link
            to="/carrito"
            className="navbar-text text-white fw-bold d-flex align-items-center text-decoration-none"
          >
            Carrito (<span id="cart-count">0</span>)
          </Link>
        </Container>
      </Navbar>
    </header>
  );
}

export default HeaderComponents;
