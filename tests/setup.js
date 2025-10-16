import "@testing-library/jest-dom";
/**
 * Archivo de configuración para Vitest
 * Se ejecuta antes de todas las pruebas
 */

import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extender expect con matchers de jest-dom
expect.extend(matchers);

// Limpiar después de cada prueba
afterEach(() => {
  cleanup();
});

// Mock de localStorage (por si lo necesitas en las pruebas)
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

global.localStorage = localStorageMock;