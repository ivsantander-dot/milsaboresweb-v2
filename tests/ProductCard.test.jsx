/**
 * Pruebas unitarias para ProductCard
 * - Pruebas de renderizado
 * - Pruebas de props
 * - Pruebas de estado
 * - Pruebas de eventos
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductCard from '../src/components/ProductCard/ProductCard.jsx';
import * as cartHelpers from '../src/utils/carthelpers';

// Mock de las funciones del carrito
vi.mock('../src/utils/carthelpers', () => ({
  addToCart: vi.fn()
}));


describe('ProductCard Component', () => {
  // Props de ejemplo para las pruebas
  const mockProducto = {
    id: 1,
    nombre: 'Torta de Chocolate',
    descripcion: 'Deliciosa torta de chocolate',
    precio: 15000,
    imagen: 'chocolate.png',
    enOferta: false
  };

  beforeEach(() => {
    // Limpiar mocks antes de cada prueba
    vi.clearAllMocks();
  });

  // pruebas de renderizado (2)


  it('1. debe renderizar correctamente con los datos del producto', () => {
    render(<ProductCard {...mockProducto} />);
    
    // Verificar que se renderiza el nombre
    expect(screen.getByText('Torta de Chocolate')).toBeInTheDocument();
    
    // Verificar que se renderiza la descripción
    expect(screen.getByText('Deliciosa torta de chocolate')).toBeInTheDocument();
    
    // Verificar que se renderiza el precio formateado
    expect(screen.getByText('$15.000')).toBeInTheDocument();
  });

  it('2. debe mostrar el badge de oferta cuando enOferta es true', () => {
    render(<ProductCard {...mockProducto} enOferta={true} />);
    
    // Verificar que aparece el badge
    expect(screen.getByText('¡OFERTA!')).toBeInTheDocument();
  });


  // pruebas de prop (2)


  it('3. debe recibir y mostrar correctamente las props', () => {
    render(<ProductCard {...mockProducto} />);
    
    // Verificar imagen (atributo alt)
    const imagen = screen.getByAltText('Torta de Chocolate');
    expect(imagen).toBeInTheDocument();
    expect(imagen).toHaveAttribute('src', expect.stringContaining('chocolate.png'));
  });

  it('4. debe manejar correctamente la prop enOferta como false por defecto', () => {
    render(<ProductCard {...mockProducto} />);
    
    // Verificar que NO aparece el badge cuando enOferta es false
    expect(screen.queryByText('¡OFERTA!')).not.toBeInTheDocument();
  });


  // pruebas de estado (3)


  it('5. debe inicializar la cantidad en 1', () => {
    render(<ProductCard {...mockProducto} />);
    
    const inputCantidad = screen.getByLabelText(/cantidad/i);
    expect(inputCantidad).toHaveValue(1);
  });

  it('6. debe actualizar la cantidad cuando el usuario cambia el input', () => {
    render(<ProductCard {...mockProducto} />);
    
    const inputCantidad = screen.getByLabelText(/cantidad/i);
    
    // Cambiar la cantidad a 5
    fireEvent.change(inputCantidad, { target: { value: '5' } });
    
    expect(inputCantidad).toHaveValue(5);
  });

  it('7. no debe aceptar cantidades menores a 1', () => {
    render(<ProductCard {...mockProducto} />);
    
    const inputCantidad = screen.getByLabelText(/cantidad/i);
    
    // Intentar poner cantidad 0
    fireEvent.change(inputCantidad, { target: { value: '0' } });
    
    // Debe mantener el valor anterior (1)
    expect(inputCantidad).toHaveValue(1);
  });

  // pruebas de evento (3)

  it('8. debe llamar a addToCart cuando se hace click en agregar al carrito', () => {
    render(<ProductCard {...mockProducto} />);
    
    const botonAgregar = screen.getByRole('button', { name: /agregar al carrito/i });
    
    fireEvent.click(botonAgregar);
    
    // Verificar que se llamó a addToCart
    expect(cartHelpers.addToCart).toHaveBeenCalledTimes(1);
    expect(cartHelpers.addToCart).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        nombre: 'Torta de Chocolate'
      }),
      1
    );
  });

  it('9. debe mostrar mensaje de confirmación después de agregar al carrito', async () => {
    render(<ProductCard {...mockProducto} />);
    
    const botonAgregar = screen.getByRole('button', { name: /agregar al carrito/i });
    
    fireEvent.click(botonAgregar);
    
    // Esperar a que aparezca el mensaje
    await waitFor(() => {
      expect(screen.getByText(/agregado\(s\) al carrito/i)).toBeInTheDocument();
    });
  });

  it('10. debe resetear la cantidad a 1 después de agregar al carrito', async () => {
    render(<ProductCard {...mockProducto} />);
    
    const inputCantidad = screen.getByLabelText(/cantidad/i);
    const botonAgregar = screen.getByRole('button', { name: /agregar al carrito/i });
    
    // Cambiar cantidad a 3
    fireEvent.change(inputCantidad, { target: { value: '3' } });
    expect(inputCantidad).toHaveValue(3);
    
    // Agregar al carrito
    fireEvent.click(botonAgregar);
    
    // Esperar y verificar que se resetea a 1
    await waitFor(() => {
      expect(inputCantidad).toHaveValue(1);
    });
  });
});