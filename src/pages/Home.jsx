import React from 'react'
import HeaderComponents from '../components/Header/HeaderComponents'
import FooterComponents from '../components/Footer/FooterComponent' 
import { Link } from 'react-router-dom';

function HomePages() {
  return (
    <>
        <HeaderComponents/>

        <div class="user-links">
          <Link to="/login">Iniciar sesión</Link> |
           <Link to="/register"> Registrarse</Link>
        </div>

        <div>Pagina principal</div>

        <FooterComponents/>
    </>
  )
}

export default HomePages