// Array de productos (simula una base de datos)
export const products = [
  {
    id: 1,
    nombre: "Torta Cuadrada de Frutas",
    descripcion: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.",
    precio: 50000,
    imagen: "TC002.png",
    categoria: "tortas",
    enOferta: false,
    stock: 10,
    destacado: true
  },
  {
    id: 2,
    nombre: "Torta Circular de Vainilla",
    descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce.",
    precio: 40000,
    imagen: "TT001.png",
    categoria: "tortas",
    enOferta: false,
    stock: 15,
    destacado: true
  },
  {
    id: 3,
    nombre: "Torta Circular de Manjar",
    descripcion: "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces.",
    precio: 42000,
    imagen: "TT002.png",
    categoria: "tortas",
    enOferta: false,
    stock: 12,
    destacado: true
  },
  {
    id: 4,
    nombre: "Mousse de Chocolate",
    descripcion: "Postre individual cremoso y suave, hecho con chocolate de alta calidad.",
    precio: 5000,
    imagen: "PI001.png",
    categoria: "individuales",
    enOferta: true,
    stock: 30,
    destacado: true
  },
  {
    id: 5,
    nombre: "Tiramisú Clásico",
    descripcion: "Un postre italiano individual con capas de café, mascarpone y cacao.",
    precio: 5500,
    imagen: "PI002.png",
    categoria: "individuales",
    enOferta: false,
    stock: 25,
    destacado: true
  },
  {
    id: 6,
    nombre: "Torta Sin Azúcar de Naranja",
    descripcion: "Torta ligera y deliciosa, endulzada naturalmente, ideal para opciones más saludables.",
    precio: 48000,
    imagen: "PSA001.png",
    categoria: "sin-azucar",
    enOferta: false,
    stock: 8,
    destacado: true
  }
];


// OPERACIONES CRUD


/**
 * CREATE - Agregar un nuevo producto
 * @param {Object} producto - Objeto con los datos del producto
 * @returns {Object} El producto creado con su ID
 */
export const createProduct = (producto) => {
  const nuevoId = Math.max(...products.map(p => p.id)) + 1;
  const nuevoProducto = { id: nuevoId, ...producto };
  products.push(nuevoProducto);
  return nuevoProducto;
};

/**
 * READ - Obtener todos los productos
 * @returns {Array} Array con todos los productos
 */
export const getProducts = () => {
  return [...products]; // Retorna una copia para evitar mutaciones
};

/**
 * READ - Obtener un producto por ID
 * @param {Number} id - ID del producto a buscar
 * @returns {Object|undefined} El producto encontrado o undefined
 */
export const getProductById = (id) => {
  return products.find(p => p.id === id);
};

/**
 * READ - Obtener productos por categoría
 * @param {String} categoria - Categoría a filtrar
 * @returns {Array} Array con productos de la categoría
 */
export const getProductsByCategory = (categoria) => {
  return products.filter(p => p.categoria === categoria);
};

/**
 * READ - Obtener productos destacados
 * @returns {Array} Array con productos destacados
 */
export const getFeaturedProducts = () => {
  return products.filter(p => p.destacado === true);
};

/**
 * READ - Obtener productos en oferta
 * @returns {Array} Array con productos en oferta
 */
export const getProductsOnSale = () => {
  return products.filter(p => p.enOferta === true);
};

/**
 * UPDATE - Actualizar un producto existente
 * @param {Number} id - ID del producto a actualizar
 * @param {Object} datosActualizados - Datos nuevos del producto
 * @returns {Object|null} El producto actualizado o null si no existe
 */
export const updateProduct = (id, datosActualizados) => {
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...datosActualizados };
    return products[index];
  }
  return null;
};

/**
 * DELETE - Eliminar un producto
 * @param {Number} id - ID del producto a eliminar
 * @returns {Boolean} true si se eliminó, false si no existía
 */
export const deleteProduct = (id) => {
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    return true;
  }
  return false;
};

/**
 * Buscar productos por término de búsqueda
 * @param {String} searchTerm - Término a buscar
 * @returns {Array} Productos que coinciden con la búsqueda
 */
export const searchProducts = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return products.filter(p => 
    p.nombre.toLowerCase().includes(term) || 
    p.descripcion.toLowerCase().includes(term)
  );
};