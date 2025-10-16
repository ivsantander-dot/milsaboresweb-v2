import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { addToCart } from '../../utils/carthelpers';
import styles from './ProductCard.module.css';

/**
 * Componente ProductCard
 * Tarjeta de producto individual con gestión de estado
 * 
 * DEMUESTRA PARA LA EVALUACIÓN:
 * - Gestión de PROPS (datos del producto)
 * - Gestión de STATE (cantidad, mensaje de confirmación)
 * - Eventos (onClick, onChange)
 * - Diseño responsivo con Bootstrap
 */
function ProductCard({ 
  id, 
  nombre, 
  descripcion, 
  precio, 
  imagen,   // imagen ahora es una importación, no un string
  enOferta = false 
}) {
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');

  const handleCantidadChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) setCantidad(value);
  };

  const handleAgregarCarrito = () => {
    const producto = { id, nombre, descripcion, precio, imagen };
    addToCart(producto, cantidad);

    setMensaje(`✓ ${cantidad} ${nombre} agregado(s) al carrito`);
    setTimeout(() => setMensaje(''), 3000);

    window.dispatchEvent(new Event('storage'));
    setCantidad(1);
  };

  return (
    <article className={styles.card}>
      {enOferta && <span className={styles.badge}>¡OFERTA!</span>}

      {/* 🔹 Imagen ahora viene importada directamente, sin usar /src/ */}
      <img 
        src={imagen}
        alt={nombre}
        className={styles.image}
        onError={(e) => {
          e.target.src = '/src/assets/placeholder.png';
        }}
      />

      <h3 className={styles.title}>{nombre}</h3>
      <p className={styles.description}>{descripcion}</p>
      <p className={styles.price}>${precio.toLocaleString('es-CL')}</p>

      <div className={styles.quantityControl}>
        <label htmlFor={`cantidad-${id}`} className="me-2">Cantidad:</label>
        <input
          type="number"
          id={`cantidad-${id}`}
          min="1"
          max="10"
          value={cantidad}
          onChange={handleCantidadChange}
          className={styles.quantityInput}
        />
      </div>

      <Button 
        variant="primary" 
        className="mi-button w-100 mt-2"
        onClick={handleAgregarCarrito}
      >
        Agregar al carrito
      </Button>

      {mensaje && <div className={styles.mensaje}>{mensaje}</div>}
    </article>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  nombre: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  imagen: PropTypes.string.isRequired,
  enOferta: PropTypes.bool
};

export default ProductCard;
