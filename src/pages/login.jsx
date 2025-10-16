import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import HeaderComponents from '../components/Header/HeaderComponents';
import FooterComponents from '../components/Footer/FooterComponent';
import styles from "../styles/login.module.css";


import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();
  const form = e.currentTarget;

  if (!form.checkValidity()) {
    e.stopPropagation();
    setValidated(true);
    return;
  }

  // Login validation
  if (email.trim() === "admin@gmail.com" && password.trim() === "admin") {
    navigate("/homeAdmin");
  } else {
    alert("Correo o contraseña incorrectos. ❌");
    setValidated(true);
  }
};

  return (
    <>
      <HeaderComponents />

      {/* Logo y nombre */}
      <Container className={`text-center my-4 ${styles.loginContainer}`}>
        <img 
          src="/images/LogoEmpresa.jpg" 
          alt="LogoEmpresa" 
          className={`img-fluid rounded mx-auto d-block mb-2 ${styles.loginLogo}`} 
        />
        <h1 className={styles.loginTitle}>Pastelería Mil Sabores</h1>
      </Container>

      {/*Formulario*/}
      <Container className={`my-5 ${styles.loginFormContainer}`}>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <h2 className="text-center mb-4">Iniciar Sesión</h2>

            <Form noValidate validated={validated} onSubmit={handleSubmit} className={styles.loginForm}>
              {/* Correo */}
              <Form.Group className="mb-3 position-relative" controlId="emailId">
                <Form.Label>
                  Correo *
                  <span className={styles.tooltip}> (?)
                    <span className={styles.tooltipText}>
                      Debe terminar en:<br/>
                      • @duoc.cl<br/>
                      • @profesor.duoc.cl<br/>
                      • @gmail.com
                    </span>
                  </span>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ejemplo@duoc.cl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  pattern="^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$"
                />
                <Form.Control.Feedback type="invalid">
                  El correo no es válido.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Contraseña */}
              <Form.Group className="mb-3 position-relative" controlId="contraseñaId">
                <Form.Label>
                  Contraseña *
                  <span className={styles.tooltip}> (?)
                    <span className={styles.tooltipText}>
                      Debe tener entre 4-10 caracteres
                    </span>
                  </span>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="**********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={4}
                  maxLength={10}
                />
                <Form.Control.Feedback type="invalid">
                  La contraseña no es válida.
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-grid">
                <Button type="submit" variant="primary" className={styles.btnEnviar}>
                  Enviar
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>

      <FooterComponents />
    </>
  );
}

