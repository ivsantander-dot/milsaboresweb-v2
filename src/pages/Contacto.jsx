import React from 'react'
import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "../styles/Contacto.module.css";
import HeaderComponents from '../components/Header/HeaderComponents'
import FooterComponents from '../components/Footer/FooterComponent'
import logoEmpresa from '../../public/images/LogoEmpresa.jpg'

const Contacto = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contenido: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      alert("Formulario enviado correctamente. ✅");
      setFormData({ nombre: "", correo: "", contenido: "" });
    }
    setValidated(true);
  };

  return (
    <>
      <HeaderComponents/>

      {/* Logo y Título */}
      <Container className="text-center my-4">
        <img src={logoEmpresa} alt="Logo Empresa" className="img-fluid rounded mx-auto d-block mb-3" style={{ maxWidth: "200px" }} />
        <h1 className={styles.titulo}>Pastelería Mil Sabores</h1>
        <h4 className="mt-3">Formulario de Contacto</h4>
      </Container>

      {/* Formulario */}
      <Container className="my-5">
        <Form noValidate validated={validated} onSubmit={handleSubmit} className={styles.formulario}>
          <Row className="g-3">
            {/* Nombre completo */}
            <Col md={6} className="position-relative">
              <Form.Label>
                Nombre Completo *
                <span className={styles.guiaValidacion}>
                  (?)
                  <span className={styles.guiaValidacionTexto}>
                    • Obligatorio<br />• Máx: 150 caracteres
                  </span>
                </span>
              </Form.Label>
              <Form.Control
                type="text"
                id="nombre"
                placeholder="Juanito Alcachofa Muñoz"
                value={formData.nombre}
                onChange={handleChange}
                required
                maxLength={150}
              />
              <Form.Control.Feedback type="invalid">El nombre no es válido.</Form.Control.Feedback>
            </Col>

            {/* Correo */}
            <Col md={6} className="position-relative">
              <Form.Label>
                Correo *
                <span className={styles.guiaValidacion}>
                  (?)
                  <span className={styles.guiaValidacionTexto}>
                    Debe terminar en:<br />• @duoc.cl<br />• @profesor.duoc.cl<br />• @gmail.com
                  </span>
                </span>
              </Form.Label>
              <Form.Control
                type="email"
                id="correo"
                placeholder="ejemplo@duoc.cl"
                value={formData.correo}
                onChange={handleChange}
                required
                pattern="^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$"
                maxLength={100}
              />
              <Form.Control.Feedback type="invalid">El correo no es válido.</Form.Control.Feedback>
            </Col>

            {/* Contenido */}
            <Col xs={12} className="position-relative">
              <Form.Label>
                Contenido *
                <span className={styles.guiaValidacion}>
                  (?)
                  <span className={styles.guiaValidacionTexto}>
                    • Obligatorio<br />• Máx: 500 caracteres
                  </span>
                </span>
              </Form.Label>
              <Form.Control
                as="textarea"
                id="contenido"
                placeholder="Describa su problema aquí."
                value={formData.contenido}
                onChange={handleChange}
                required
                maxLength={500}
                rows={10}
              />
              <Form.Control.Feedback type="invalid">El contenido no es válido.</Form.Control.Feedback>
            </Col>

            <Col xs={12} className="text-end">
              <Button type="submit" className={styles.btnEnviar}>Enviar</Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <FooterComponents/>
    </>
  );
};

export default Contacto;
