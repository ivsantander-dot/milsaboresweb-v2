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
  imagen, 
  enOferta = false 
}) {
  // STATE: Cantidad del producto a agregar
  const [cantidad, setCantidad] = useState(1);
  
  // STATE: Mensaje de confirmación al agregar al carrito
  const [mensaje, setMensaje] = useState('');

  // Función para manejar el cambio de cantidad
  const handleCantidadChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setCantidad(value);
    }
  };

  // Función para agregar al carrito
  const handleAgregarCarrito = () => {
    const producto = { id, nombre, descripcion, precio, imagen };
    addToCart(producto, cantidad);
    
    // Mostrar mensaje de confirmación
    setMensaje(`✓ ${cantidad} ${nombre} agregado(s) al carrito`);
    
    // Limpiar mensaje después de 3 segundos
    setTimeout(() => {
      setMensaje('');
    }, 3000);
    
    // Disparar evento personalizado para actualizar el contador del header
    window.dispatchEvent(new Event('storage'));
    
    // Resetear cantidad
    setCantidad(1);
  };

  return (
    <article className={styles.card}>
      {/* Badge de oferta (renderizado condicional) */}
      {enOferta && (
        <span className={styles.badge}>¡OFERTA!</span>
      )}

      {/* Imagen del producto */}
      <img 
        src={`/src/assets/pasteles/${imagen}`}
        alt={nombre}
        className={styles.image}
        onError={(e) => {
          e.target.src = '/src/assets/placeholder.png';
        }}
      />

      {/* Información del producto */}
      <h3 className={styles.title}>{nombre}</h3>
      <p className={styles.description}>{descripcion}</p>
      <p className={styles.price}>
        ${precio.toLocaleString('es-CL')}
      </p>

      {/* Control de cantidad */}
      <div className={styles.quantityControl}>
        <label htmlFor={`cantidad-${id}`} className="me-2">
          Cantidad:
        </label>
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

      {/* Botón agregar al carrito */}
      <Button 
        variant="primary" 
        className="mi-button w-100 mt-2"
        onClick={handleAgregarCarrito}
      >
        Agregar al carrito
      </Button>

      {/* Mensaje de confirmación (renderizado condicional) */}
      {mensaje && (
        <div className={styles.mensaje}>
          {mensaje}
        </div>
      )}
    </article>
  );
}

// Validación de PropTypes
ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  nombre: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  imagen: PropTypes.string.isRequired,
  enOferta: PropTypes.bool
};

export default ProductCard;