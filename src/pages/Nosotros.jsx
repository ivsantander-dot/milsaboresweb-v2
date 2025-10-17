import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import HeaderComponents from '../components/Header/HeaderComponents';
import FooterComponent from '../components/Footer/FooterComponent';
import img50Anios from '../assets/nosotros/50anios.png';
import imgMision from '../assets/nosotros/mision.png';
import imgVision from '../assets/nosotros/vision.png';

function Nosotros() {
  return (
    <>
      <HeaderComponents />

      <main className="container my-5">
        {/* Sobre Nosotros */}
        <section className="nosotros-section mb-5">
          <Row className="align-items-center">
            <Col md={6}>
              <h1>Sobre Nosotros</h1>
              <p>
                Pastelería 1000 Sabores celebra su <strong>50 aniversario</strong> como un referente en la repostería chilena. 
                Somos reconocidos por nuestra participación en el <strong>Récord Guinness de 1995</strong>, cuando colaboramos en la creación de 
                la torta más grande del mundo.  
                Hoy, renovamos nuestra experiencia online para llevar nuestras delicias directamente a tu hogar, combinando tradición con innovación.
              </p>
            </Col>
            <Col md={6} className="text-center">
              <Image src={img50Anios} alt="Sobre Nosotros" fluid className="nos-img-50anios" style={{maxWidth: '60%', height: 'auto'}}/>
            </Col>
          </Row>
        </section>

        {/* Misión */}
        <section className="nosotros-section my-5">
          <Row className="align-items-center">
            <Col md={6} className="text-center">
              <Image src={imgMision} alt="Misión" fluid className="nos-img-mision" style={{maxWidth: '60%', height: 'auto'}}/>
            </Col>
            <Col md={6}>
              <h2>Misión</h2>
              <p>
                Ofrecer una experiencia dulce y memorable a nuestros clientes, proporcionando tortas y productos 
                de repostería de alta calidad para todas las ocasiones, mientras celebramos nuestras raíces históricas 
                y fomentamos la creatividad en la repostería.
              </p>
            </Col>
          </Row>
        </section>

        {/* Visión */}
        <section className="nosotros-section my-5">
          <Row className="align-items-center">
            <Col md={6}>
              <h2>Visión</h2>
              <p>
                Convertirnos en la tienda online líder de productos de repostería en Chile, conocida por nuestra 
                innovación, calidad y el impacto positivo en la comunidad, especialmente en la formación de nuevos 
                talentos en gastronomía.
              </p>
            </Col>
            <Col md={6} className="text-center">
              <Image src={imgVision} alt="Visión" fluid className="nos-img-vision" style={{maxWidth: '60%', height: 'auto'}}/>
            </Col>
          </Row>
        </section>
      </main>

      <FooterComponent />
    </>
  );
}
export default Nosotros