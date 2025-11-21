import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HeaderComponents from '../components/Header/HeaderComponents';
import FooterComponents from '../components/Footer/FooterComponent';
import { authAPI } from '../services/api';
import styles from "../styles/login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authAPI.login({
        username: email,
        password: password,
      });

      // Guardar token
      localStorage.setItem('authToken', response.token);
      
      // Redirigir según el rol (si está en el token)
      if (email === "admin@gmail.com") {
        navigate("/homeAdmin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderComponents />

      <Container className={`text-center my-4 ${styles.loginContainer}`}>
        <img 
          src="/images/LogoEmpresa.jpg" 
          alt="LogoEmpresa" 
          className={`img-fluid rounded mx-auto d-block mb-2 ${styles.loginLogo}`} 
        />
        <h1 className={styles.loginTitle}>Pastelería Mil Sabores</h1>
      </Container>

      <Container className={`my-5 ${styles.loginFormContainer}`}>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <h2 className="text-center mb-4">Iniciar Sesión</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form noValidate validated={validated} onSubmit={handleSubmit} className={styles.loginForm}>
              <Form.Group className="mb-3" controlId="emailId">
                <Form.Label>Correo *</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ejemplo@duoc.cl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="contraseñaId">
                <Form.Label>Contraseña *</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="**********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={4}
                  disabled={loading}
                />
              </Form.Group>

              <div className="d-grid">
                <Button 
                  type="submit" 
                  variant="primary" 
                  className={styles.btnEnviar}
                  disabled={loading}
                >
                  {loading ? 'Iniciando sesión...' : 'Enviar'}
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