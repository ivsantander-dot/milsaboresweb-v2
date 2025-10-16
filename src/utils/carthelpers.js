import React from 'react';

const CART_KEY = 'carrito';

// OPERACIONES CRUD DEL CARRITO

/**
 * READ - Obtener el carrito actual desde localStorage
 * @returns {Array} Array con los productos del carrito
 */
export const getCart = () => {
  try {
    const carrito = localStorage.getItem(CART_KEY);
    return carrito ? JSON.parse(carrito) : [];
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    return [];
  }
};

/**
 * CREATE/UPDATE - Guardar el carrito en localStorage
 * @param {Array} carrito - Array con los productos del carrito
 */
export const saveCart = (carrito) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(carrito));
  } catch (error) {
    console.error('Error al guardar el carrito:', error);
  }
};

/**
 * CREATE - Agregar un producto al carrito
 * @param {Object} producto - Producto a agregar
 * @param {Number} cantidad - Cantidad a agregar (default: 1)
 * @returns {Array} Carrito actualizado
 */
export const addToCart = (producto, cantidad = 1) => {
  const carrito = getCart();
  
  // Verificar si el producto ya existe en el carrito
  const existingProduct = carrito.find(item => item.id === producto.id);
  
  if (existingProduct) {
    // Si existe, incrementar la cantidad
    existingProduct.cantidad += cantidad;
  } else {
    // Si no existe, agregarlo con la cantidad especificada
    carrito.push({
      ...producto,
      cantidad: cantidad
    });
  }
  
  saveCart(carrito);
  return carrito;
};

/**
 * UPDATE - Actualizar la cantidad de un producto en el carrito
 * @param {Number} productoId - ID del producto
 * @param {Number} nuevaCantidad - Nueva cantidad (debe ser >= 1)
 * @returns {Array} Carrito actualizado
 */
export const updateCartItemQuantity = (productoId, nuevaCantidad) => {
  if (nuevaCantidad < 1) {
    return removeFromCart(productoId);
  }
  
  const carrito = getCart();
  const producto = carrito.find(item => item.id === productoId);
  
  if (producto) {
    producto.cantidad = nuevaCantidad;
    saveCart(carrito);
  }
  
  return carrito;
};

/**
 * UPDATE - Incrementar la cantidad de un producto
 * @param {Number} productoId - ID del producto
 * @param {Number} incremento - Cantidad a incrementar (default: 1)
 * @returns {Array} Carrito actualizado
 */
export const incrementQuantity = (productoId, incremento = 1) => {
  const carrito = getCart();
  const producto = carrito.find(item => item.id === productoId);
  
  if (producto) {
    producto.cantidad += incremento;
    saveCart(carrito);
  }
  
  return carrito;
};

/**
 * UPDATE - Decrementar la cantidad de un producto
 * @param {Number} productoId - ID del producto
 * @param {Number} decremento - Cantidad a decrementar (default: 1)
 * @returns {Array} Carrito actualizado
 */
export const decrementQuantity = (productoId, decremento = 1) => {
  const carrito = getCart();
  const producto = carrito.find(item => item.id === productoId);
  
  if (producto) {
    producto.cantidad -= decremento;
    
    // Si la cantidad llega a 0 o menos, eliminar el producto
    if (producto.cantidad <= 0) {
      return removeFromCart(productoId);
    }
    
    saveCart(carrito);
  }
  
  return carrito;
};

/**
 * DELETE - Eliminar un producto del carrito
 * @param {Number} productoId - ID del producto a eliminar
 * @returns {Array} Carrito actualizado
 */
export const removeFromCart = (productoId) => {
  const carrito = getCart();
  const carritoActualizado = carrito.filter(item => item.id !== productoId);
  saveCart(carritoActualizado);
  return carritoActualizado;
};

/**
 * DELETE - Vaciar completamente el carrito
 * @returns {Array} Carrito vacío
 */
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  return [];
};


// UTILIDADES DE CÁLCULO


/**
 * Calcular el total de items en el carrito
 * @returns {Number} Cantidad total de items
 */
export const getCartItemCount = () => {
  const carrito = getCart();
  return carrito.reduce((total, item) => total + item.cantidad, 0);
};

/**
 * Calcular el subtotal del carrito
 * @returns {Number} Subtotal sin descuentos
 */
export const getCartSubtotal = () => {
  const carrito = getCart();
  return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
};

/**
 * Calcular el total con descuento aplicado
 * @param {Number} descuentoPorcentaje - Porcentaje de descuento (0-100)
 * @returns {Object} Objeto con subtotal, descuento y total
 */
export const getCartTotal = (descuentoPorcentaje = 0) => {
  const subtotal = getCartSubtotal();
  const montoDescuento = subtotal * (descuentoPorcentaje / 100);
  const total = subtotal - montoDescuento;
  
  return {
    subtotal,
    descuento: montoDescuento,
    total
  };
};

/**
 * Verificar si un producto está en el carrito
 * @param {Number} productoId - ID del producto
 * @returns {Boolean} true si está en el carrito
 */
export const isInCart = (productoId) => {
  const carrito = getCart();
  return carrito.some(item => item.id === productoId);
};

/**
 * Obtener la cantidad de un producto específico en el carrito
 * @param {Number} productoId - ID del producto
 * @returns {Number} Cantidad del producto (0 si no está)
 */
export const getProductQuantityInCart = (productoId) => {
  const carrito = getCart();
  const producto = carrito.find(item => item.id === productoId);
  return producto ? producto.cantidad : 0;
};