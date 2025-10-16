import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import HeaderComponents from "../components/Header/HeaderComponents";
import FooterComponents from "../components/Footer/FooterComponent";
import styles from "../styles/register.module.css";
import logoEmpresa from "../../public/images/LogoEmpresa.jpg";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    rut: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthdate: "",
    region: "",
    comuna: "",
    terms: false
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity() || formData.password !== formData.confirmPassword) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    // Aquí iría la lógica de registro (API, localStorage, etc.)
    console.log("Usuario registrado:", formData);
  };

  // Función para llenar comunas según región
  const getComunas = (region) => {
    switch(region){
      case "metropolitana": return ["Santiago","Puente Alto","Maipú","Ñuñoa"];
      case "valparaiso": return ["Valparaíso","Viña del Mar","Quilpué","Villa Alemana"];
      case "nuble": return ["Chillán","Chillán Viejo","Bulnes","San Carlos"];
      case "araucania": return ["Temuco","Villarrica","Pucón","Loncoche"];
      default: return [];
    }
  };

  return (
    <>
      <HeaderComponents />

      {/* Formulario de registro */}
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <h2 className="text-center mb-4">Registro de Usuario</h2>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              {/* Nombre */}
              <Form.Group className="mb-3 position-relative" controlId="name">
                <Form.Label>
                  Nombre Completo *
                  <span className={styles.tooltip}>
                    (?)
                    <span>
                      • Obligatorio<br />
                      • Max: 150 caracteres
                    </span>
                  </span>
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Juanito Alcachofa Muñoz"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={150}
                />
                <Form.Control.Feedback type="invalid">El nombre no es válido.</Form.Control.Feedback>
              </Form.Group>

              {/* RUT */}
              <Form.Group className="mb-3 position-relative" controlId="rut">
                <Form.Label>
                  RUT *
                  <span className={styles.tooltip}> (?)
                    <span className={styles.tooltipText}>• Sin puntos ni guion</span>
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="12345678K"
                  value={formData.rut}
                  onChange={handleChange}
                  required
                  minLength={7}
                  maxLength={9}
                  pattern="^[0-9]{7,8}[0-9Kk]$"
                />
                <Form.Control.Feedback type="invalid">El RUT no es válido.</Form.Control.Feedback>
              </Form.Group>

              {/* Correo */}
              <Form.Group className="mb-3 position-relative" controlId="email">
                <Form.Label>
                  Correo *
                  <span className={styles.tooltip}> (?)
                    <span className={styles.tooltipText}>
                      Debe terminar en:<br/>
                      • @duocuc.cl<br/>
                      • @profesor.duoc.cl<br/>
                      • @gmail.com
                    </span>
                  </span>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ejemplo@duoc.cl"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  pattern="^[a-zA-Z0-9._%+-]+@(duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$"
                />
                <Form.Control.Feedback type="invalid">El correo no es válido.</Form.Control.Feedback>
              </Form.Group>

              {/* Contraseña */}
              <Form.Group className="mb-3 position-relative" controlId="password">
                <Form.Label>
                  Contraseña *
                  <span className={styles.tooltip}> (?)
                    <span className={styles.tooltipText}>Debe tener entre 4-10 caracteres</span>
                  </span>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="**********"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={4}
                  maxLength={10}
                />
                <Form.Control.Feedback type="invalid">La contraseña no es válida.</Form.Control.Feedback>
              </Form.Group>

              {/* Confirmar contraseña */}
              <Form.Group className="mb-3 position-relative" controlId="confirmPassword">
                <Form.Label>Confirmar Contraseña *</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="**********"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  isInvalid={validated && formData.password !== formData.confirmPassword}
                  isValid={validated && formData.password === formData.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">Las contraseñas no coinciden.</Form.Control.Feedback>
              </Form.Group>

              {/* Teléfono */}
              <Form.Group className="mb-3 position-relative" controlId="phone">
                <Form.Label>Teléfono (opcional)</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="+56 9 1234 5678"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="^\+569[0-9]{8}$|^\+56 9 [0-9]{4} [0-9]{4}$"
                  title="El número de teléfono debe estar en el formato correcto."
                />
              </Form.Group>

              {/* Fecha de nacimiento */}
              <Form.Group className="mb-3 position-relative" controlId="birthdate">
                <Form.Label>Fecha Nacimiento (opcional)</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.birthdate}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Región */}
              <Form.Group className="mb-3 position-relative" controlId="region">
                <Form.Label>Región</Form.Label>
                <Form.Select
                  value={formData.region}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Seleccione...</option>
                  <option value="metropolitana">Región Metropolitana</option>
                  <option value="valparaiso">Valparaíso</option>
                  <option value="nuble">Ñuble</option>
                  <option value="araucania">La Araucanía</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">Seleccione una región válida.</Form.Control.Feedback>
              </Form.Group>

              {/* Comuna */}
              <Form.Group className="mb-3 position-relative" controlId="comuna">
                <Form.Label>Comuna</Form.Label>
                <Form.Select
                  value={formData.comuna}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Seleccione...</option>
                  {getComunas(formData.region).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">Seleccione una comuna válida.</Form.Control.Feedback>
              </Form.Group>

              {/* Términos y condiciones */}
              <Form.Group className="mb-3 form-check">
                <Form.Check
                  type="checkbox"
                  label="Acepto los términos y condiciones"
                  id="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Debes estar de acuerdo para ingresar.
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-grid mb-5">
                <Button type="submit" variant="primary">Registrarse</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>

      <FooterComponents />
    </>
  );
}

