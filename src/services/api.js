const API_BASE_URL = 'http://52.45.19.226:80';

// Helper para hacer peticiones
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ============ AUTH ============
export const authAPI = {
  login: (credentials) => 
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  
  register: (userData) => 
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
};

// ============ PRODUCTOS ============
export const productosAPI = {
  getAll: () => apiRequest('/api/v1/productos'),
  
  getById: (id) => apiRequest(`/api/v1/productos/${id}`),
  
  search: (nombre) => apiRequest(`/api/v1/productos/buscar?nombre=${nombre}`),
  
  getCategorias: () => apiRequest('/api/v1/categorias'),
};

// ============ CARRITO ============
export const carritoAPI = {
  getCarrito: () => apiRequest('/api/v1/carrito'),
  
  addItem: (productoData) => 
    apiRequest('/api/v1/carrito/items', {
      method: 'POST',
      body: JSON.stringify(productoData),
    }),
  
  updateItem: (itemId, cantidad) => 
    apiRequest(`/api/v1/carrito/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ cantidad }),
    }),
  
  deleteItem: (itemId) => 
    apiRequest(`/api/v1/carrito/items/${itemId}`, {
      method: 'DELETE',
    }),
  
  vaciarCarrito: () => 
    apiRequest('/api/v1/carrito', {
      method: 'DELETE',
    }),
  
  checkout: (checkoutData) => 
    apiRequest('/api/v1/carrito/checkout', {
      method: 'POST',
      body: JSON.stringify(checkoutData),
    }),
};

export default apiRequest;