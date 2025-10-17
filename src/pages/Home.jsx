import React from 'react'
import HeaderComponents from '../components/Header/HeaderComponents'
import FooterComponents from '../components/Footer/FooterComponent' 
import { Link } from 'react-router-dom'
import styles from "../styles/home.module.css"
import placeholderImg from "../assets/nosotros/placeholder.png"
import { products } from "../data/productsData";

function HomePages() {
  const featuredProducts = products.filter((p) => p.destacado === true);
  
  return (
    <>
      <HeaderComponents/>

      
      <div className={styles.userLinks}>
        <Link to="/login">Iniciar sesión</Link> |
        <Link to="/register"> Registrarse</Link>
      </div>

     
      <div className={styles.heroImage}>
        <img src={placeholderImg} alt="Imagen destacada" />
      </div>

      
      <div className={styles.heroText}>
        <h1>¡Celebramos 50 años!</h1>
        <p>
          Pastelería Mil Sabores celebra sus 50 años endulzando la vida de los chilenos. Desde 1975, 
          hemos sido parte de tus momentos más especiales, consolidándonos como un referente de la 
          repostería de calidad. Nuestra historia, marcada por hitos como el récord Guinness de 1995, 
          es un testimonio de nuestra dedicación.
          <br /><br />
          Para celebrar este importante aniversario, hemos renovado nuestra tienda online. 
          Ahora puedes disfrutar de nuestros productos de alta calidad de forma más sencilla y rápida, 
          desde la comodidad de tu hogar. 
          <br /><br />
          Usa el código <b>FELICES50</b> y obtén un descuento del 10% en tu próxima compra, mientras disfrutas 
          de la calidad y el sabor que solo nosotros podemos ofrecer.
        </p>

       
        <Link to="/productos">
          <button className={styles.btnProductos}>Ver productos</button>
        </Link>
      </div>

       {/* Sección de productos destacados */}
      <section className={styles.productsSection}>
        <h3 className={styles.productsTitle}>Productos destacados</h3>
        <div className={styles.productsGrid}>
          {featuredProducts.map((product) => (
            <article key={product.id} className={styles.productCard}>
              <img
                src={product.imagen}
                alt={product.nombre}
                className={styles.productImg}
              />
              <h4>{product.nombre}</h4>
              <p>{product.descripcion}</p>
              <p className={styles.productPrice}>${product.precio.toLocaleString('es-CL')}</p>
              <Link to="/productos">
                <button className={styles.productBtn}>Ver más</button>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <FooterComponents/>
    </>
  )
}

export default HomePages
