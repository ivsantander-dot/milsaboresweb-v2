// Importar imágenes
import TC001 from "../assets/pasteles/TC001.png";
import TC002 from "../assets/pasteles/TC002.png";
import TT001 from "../assets/pasteles/TT001.png";
import TT002 from "../assets/pasteles/TT002.png";
import PI001 from "../assets/pasteles/PI001.png";
import PI002 from "../assets/pasteles/PI002.png";
import PSA001 from "../assets/pasteles/PSA001.png";
import PSA002 from "../assets/pasteles/PSA002.png";
import PT001 from "../assets/pasteles/PT001.png";
import PT002 from "../assets/pasteles/PT002.png";
import PG001 from "../assets/pasteles/PG001.png";
import PG002 from "../assets/pasteles/PG002.png";
import PV001 from "../assets/pasteles/PV001.png";
import PV002 from "../assets/pasteles/PV002.png";
import TE001 from "../assets/pasteles/TE001.png";
import TE002 from "../assets/pasteles/TE002.png";

// Array de productos (simula una base de datos)
export const products = [
  { id: 1, nombre: "Torta Cuadrada de Chocolate", descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.", precio: 45000, imagen: TC001, categoria: "tortas", enOferta: false, stock: 10, destacado: false },
  { id: 2, nombre: "Torta Cuadrada de Frutas", descripcion: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.", precio: 50000, imagen: TC002, categoria: "tortas", enOferta: false, stock: 10, destacado: true },
  { id: 3, nombre: "Torta Circular de Vainilla", descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.", precio: 40000, imagen: TT001, categoria: "tortas", enOferta: false, stock: 15, destacado: true },
  { id: 4, nombre: "Torta Circular de Manjar", descripcion: "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces.", precio: 42000, imagen: TT002, categoria: "tortas", enOferta: false, stock: 12, destacado: true },
  { id: 5, nombre: "Mousse de Chocolate", descripcion: "Postre individual cremoso y suave, hecho con chocolate de alta calidad.", precio: 5000, imagen: PI001, categoria: "individuales", enOferta: true, stock: 30, destacado: true },
  { id: 6, nombre: "Tiramisú Clásico", descripcion: "Un postre italiano individual con capas de café, mascarpone y cacao.", precio: 5500, imagen: PI002, categoria: "individuales", enOferta: false, stock: 25, destacado: true },
  { id: 7, nombre: "Torta Sin Azúcar de Naranja", descripcion: "Torta ligera y deliciosa, endulzada naturalmente, ideal para opciones más saludables.", precio: 48000, imagen: PSA001, categoria: "sin-azucar", enOferta: false, stock: 8, destacado: true },
  { id: 8, nombre: "Cheesecake Sin Azúcar", descripcion: "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.", precio: 47000, imagen: PSA002, categoria: "sin-azucar", enOferta: false, stock: 8, destacado: false },
  { id: 9, nombre: "Empanada de Manzana", descripcion: "Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.", precio: 3000, imagen: PT001, categoria: "individuales", enOferta: false, stock: 20, destacado: false },
  { id: 10, nombre: "Tarta de Santiago", descripcion: "Tradicional tarta española hecha con almendras, azúcar y huevos, una delicia para los amantes de los postres clásicos.", precio: 6000, imagen: PT002, categoria: "individuales", enOferta: false, stock: 18, destacado: false },
  { id: 11, nombre: "Brownie Sin Gluten", descripcion: "Rico y denso, perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.", precio: 4000, imagen: PG001, categoria: "sin-gluten", enOferta: false, stock: 15, destacado: false },
  { id: 12, nombre: "Pan Sin Gluten", descripcion: "Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.", precio: 3500, imagen: PG002, categoria: "sin-gluten", enOferta: false, stock: 15, destacado: false },
  { id: 13, nombre: "Torta Vegana de Chocolate", descripcion: "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.", precio: 50000, imagen: PV001, categoria: "vegano", enOferta: false, stock: 10, destacado: false },
  { id: 14, nombre: "Galletas Veganas de Avena", descripcion: "Crujientes y sabrosas, una excelente opción para un snack saludable y vegano.", precio: 4500, imagen: PV002, categoria: "vegano", enOferta: false, stock: 20, destacado: false },
  { id: 15, nombre: "Torta Especial de Cumpleaños", descripcion: "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.", precio: 55000, imagen: TE001, categoria: "especial", enOferta: false, stock: 5, destacado: false },
  { id: 16, nombre: "Torta Especial de Boda", descripcion: "Elegante y deliciosa, diseñada para ser el centro de atención en cualquier boda.", precio: 60000, imagen: TE002, categoria: "especial", enOferta: false, stock: 5, destacado: false },
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