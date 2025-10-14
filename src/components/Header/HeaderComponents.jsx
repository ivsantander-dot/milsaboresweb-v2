import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import links from "../../links";
import styles from "../Header/Header.module.css"; // ✅ Importamos el CSS module

function HeaderComponents() {
  return (
    <header className={styles.header}>
      <Navbar expand="lg" bg="transparent" variant="dark" className={styles.navbar}>
        <Container fluid>
          {/* LOGO / MARCA */}
          <Navbar.Brand as={Link} to={links.home} className={styles.logo}>
            PMS©
          </Navbar.Brand>

          {/* BOTÓN RESPONSIVO */}
          <Navbar.Toggle aria-controls="mainNavbar" />

          {/* MENÚ */}
          <Navbar.Collapse id="mainNavbar">
            <Nav className="mx-auto mb-2 mb-lg-0">
              <Nav.Link as={Link} to={links.home}>Home</Nav.Link>
              <Nav.Link as={Link} to={links.productos}>Productos</Nav.Link>
              <Nav.Link as={Link} to={links.nosotros}>Nosotros</Nav.Link>
              <Nav.Link as={Link} to={links.blogs}>Blogs</Nav.Link>
              <Nav.Link as={Link} to={links.contacto}>Contacto</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          {/* CARRITO */}
          <Link
            to="/carrito"
            className={styles.cartLink}
          >
            Carrito (<span id="cart-count">0</span>)
          </Link>
        </Container>
      </Navbar>
    </header>
  );
}

export default HeaderComponents;
