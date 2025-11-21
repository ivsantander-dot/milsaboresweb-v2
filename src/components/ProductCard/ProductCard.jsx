import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { carritoAPI } from '../../services/api'; 
import styles from './ProductCard.module.css';

function ProductCard({ 
  id, 
  nombre, 
  descripcion, 
  precio, 
  imagen, 
  enOferta = false 
}) {
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false); 
  const navigate = useNavigate();

  const handleCantidadChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) setCantidad(value);
  };

  const handleAgregarCarrito = async () => {
    setCargando(true); // Deshabilita el botón mientras carga
    try {
      // Llamada al Microservicio de Carrito (AWS)
      await carritoAPI.addItem({ 
        productoId: id, 
        cantidad: cantidad 
      });

      // Feedback visual de éxito
      setMensaje(`✓ ${cantidad} ${nombre} agregado(s)`);
      setCantidad(1);


    } catch (error) {
      console.error(error);
      // Manejo de errores (ej: Token vencido o sin stock)
      setMensaje('❌ Error: ¿Iniciaste sesión?');
    } finally {
      setCargando(false); // Reactiva el botón
      // Limpiar mensaje a los 3 seg
      setTimeout(() => setMensaje(''), 3000);
    }
  };

  const handleVerDetalle = () => {
    navigate(`/producto/${id}`);
  };

  return (
    <article className={styles.card}>
      {enOferta && <span className={styles.badge}>¡OFERTA!</span>}

      <img 
        src={imagen || "https://via.placeholder.com/150"}
        alt={nombre}
        className={styles.image}
        onError={(e) => {
          e.target.src = '/src/assets/placeholder.png';
        }}
      />

      <h3 className={styles.title}>{nombre}</h3>
      <p className={styles.description}>
        {descripcion ? descripcion.substring(0, 60) : ''}...
      </p>
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
        disabled={cargando} // Evita doble click
      >
        {cargando ? 'Agregando...' : 'Agregar al carrito'}
      </Button>
      
      <Button 
        variant="outline-secondary" 
        className="w-100 mt-2"
        onClick={handleVerDetalle}
      >
        Ver detalle
      </Button>
      
      {/* Mensaje flotante de éxito o error */}
      {mensaje && (
        <div 
          className={styles.mensaje} 
          style={{ backgroundColor: mensaje.includes('Error') ? '#ffcccc' : '#d4edda', color: mensaje.includes('Error') ? 'red' : 'green' }}
        >
          {mensaje}
        </div>
      )}
    </article>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  nombre: PropTypes.string.isRequired,
  descripcion: PropTypes.string,
  precio: PropTypes.number.isRequired,
  imagen: PropTypes.string,
  enOferta: PropTypes.bool
};

export default ProductCard;