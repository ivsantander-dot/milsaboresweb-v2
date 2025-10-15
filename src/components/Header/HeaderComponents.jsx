import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import links from '../../links'; 

import { getCartItemCount } from '../../utils/carthelpers';

/**
 * Componente Header
 * Barra de navegación principal con contador de carrito dinámico
 * 
 * - Uso de STATE (cartCount)
 * - Uso de EFFECT (useEffect para actualizar contador)
 * - Gestión de eventos (listener de storage)
 * - Diseño responsivo con Bootstrap
 * - Escalabilidad con rutas centralizadas
 */
function Header() {
  // STATE: Contador de items en el carrito
  const [cartCount, setCartCount] = useState(0);

  // EFFECT: Actualizar contador cuando se monta el componente
  useEffect(() => {
    const updateCartCount = () => {
      const count = getCartItemCount();
      setCartCount(count);
    };

    updateCartCount(); // Actualizar al cargar

    // Listener para cambios en localStorage (por ejemplo, al agregar al carrito)
    const handleStorageChange = () => {
      updateCartCount();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <header className={styles.header}>
      <Navbar expand="lg" variant="dark" bg="primary">
        <Container fluid>
          {/* Logo */}
          <Navbar.Brand as={Link} to={links.home} className="d-flex align-items-center">
            <img
              src="/logo.jpg"
              alt="logo"
              width="30"
              height="24"
              className="me-2"
              style={{ borderRadius: '2px' }}
              onError={(e) => {
                e.target.style.display = 'none'; // Oculta si no carga
              }}
            />
            PMS©
          </Navbar.Brand>

          {/* Botón hamburguesa (móvil) */}
          <Navbar.Toggle aria-controls="mainNavbar" />

          {/* Links de navegación */}
          <Navbar.Collapse id="mainNavbar">
            <Nav className="mx-auto mb-2 mb-lg-0">
              <Nav.Link as={Link} to={links.home} className="text-white">Home</Nav.Link>
              <Nav.Link as={Link} to={links.productos} className="text-white">Productos</Nav.Link>
              <Nav.Link as={Link} to={links.nosotros} className="text-white">Nosotros</Nav.Link>
              <Nav.Link as={Link} to={links.blogs} className="text-white">Blogs</Nav.Link>
              <Nav.Link as={Link} to={links.contacto} className="text-white">Contacto</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          {/* Carrito con contador dinámico */}
          <Link to={links.carrito} className={styles.cartLink}>
            <span className={styles.cartIcon}>🛒</span>
            Carrito (<span>{cartCount}</span>)
          </Link>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
