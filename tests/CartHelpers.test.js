/**
 * Pruebas unitarias para cartHelpers
 * Prueba las operaciones CRUD del carrito
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItemQuantity,
  getCartItemCount,
  getCartSubtotal
} from '../src/utils/carthelpers';

describe('Cart Helpers - CRUD Operations', () => {
  
  beforeEach(() => {
    // Limpiar localStorage antes de cada prueba
    localStorage.clear();
  });

  const productoEjemplo = {
    id: 1,
    nombre: 'Torta de Vainilla',
    precio: 20000,
    imagen: 'vainilla.png'
  };

  // pruebas de lectura (READ)

  it('debe retornar un array vacío cuando no hay productos en el carrito', () => {
    const carrito = getCart();
    expect(carrito).toEqual([]);
  });

  it('debe retornar los productos guardados en el carrito', () => {
    addToCart(productoEjemplo, 2);
    const carrito = getCart();
    
    expect(carrito).toHaveLength(1);
    expect(carrito[0].nombre).toBe('Torta de Vainilla');
    expect(carrito[0].cantidad).toBe(2);
  });


  // pruebas de creación (CREATE)

  it('debe agregar un producto nuevo al carrito', () => {
    addToCart(productoEjemplo, 1);
    const carrito = getCart();
    
    expect(carrito).toHaveLength(1);
    expect(carrito[0].id).toBe(1);
  });

  it('debe incrementar la cantidad si el producto ya existe', () => {
    addToCart(productoEjemplo, 2);
    addToCart(productoEjemplo, 3);
    
    const carrito = getCart();
    expect(carrito).toHaveLength(1);
    expect(carrito[0].cantidad).toBe(5);
  });


  // pruebas de actualización (UPDATE)


  it('debe actualizar la cantidad de un producto', () => {
    addToCart(productoEjemplo, 1);
    updateCartItemQuantity(1, 5);
    
    const carrito = getCart();
    expect(carrito[0].cantidad).toBe(5);
  });

  it('debe eliminar el producto si la cantidad se actualiza a 0', () => {
    addToCart(productoEjemplo, 3);
    updateCartItemQuantity(1, 0);
    
    const carrito = getCart();
    expect(carrito).toHaveLength(0);
  });

  // pruebas de eliminación (DELETE)


  it('debe eliminar un producto específico del carrito', () => {
    addToCart(productoEjemplo, 2);
    addToCart({ ...productoEjemplo, id: 2, nombre: 'Torta de Chocolate' }, 1);
    
    removeFromCart(1);
    
    const carrito = getCart();
    expect(carrito).toHaveLength(1);
    expect(carrito[0].id).toBe(2);
  });

  it('debe vaciar completamente el carrito', () => {
    addToCart(productoEjemplo, 2);
    addToCart({ ...productoEjemplo, id: 2 }, 3);
    
    clearCart();
    
    const carrito = getCart();
    expect(carrito).toEqual([]);
  });


  // pruebas de utilidades


  it('debe calcular correctamente el total de items', () => {
    addToCart(productoEjemplo, 2);
    addToCart({ ...productoEjemplo, id: 2 }, 3);
    
    const total = getCartItemCount();
    expect(total).toBe(5);
  });

  it('debe calcular correctamente el subtotal', () => {
    addToCart({ ...productoEjemplo, precio: 10000 }, 2);
    addToCart({ ...productoEjemplo, id: 2, precio: 15000 }, 1);
    
    const subtotal = getCartSubtotal();
    expect(subtotal).toBe(35000);
  });
});