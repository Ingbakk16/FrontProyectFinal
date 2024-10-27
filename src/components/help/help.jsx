import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import Header from "../header/header";
import Footer from "../footer/footer";
import { ThemeContext } from "../services/ThemeContext/Theme.context";
import './help.css';

const HelpSeccion = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    email: "",
    problem: "",
    name: "",
    dni: "",
  });

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = [];

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.push("El E-mail no es válido.");
    }
    if (formData.problem.trim() === "") {
      newErrors.push("El campo del problema no puede estar vacío.");
    }
    if (formData.name.trim() === "") {
      newErrors.push("El campo del nombre no puede estar vacío.");
    }
    if (!formData.dni.match(/^\d{8}$/)) {
      newErrors.push("El DNI debe tener 8 números.");
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (formErrors.length > 0) {
      setErrors(formErrors);
    } else {
      setErrors([]);
      setSuccess(true);
    }
  };

  return (
    <div className={`background ${theme === 'dark' ? 'background-dark' : 'background-light'}`}>
      <Header />
      <Container fluid className={`help-container ${theme === 'dark' ? 'help-container-dark' : ''} d-flex flex-column justify-content-center align-items-center`}>
        <Row className="justify-content-center align-items-center w-100 full-height-row">
          <Col lg={5} md={4} sm={5}>
            <div className={`help-form ${theme === 'dark' ? 'help-form-dark' : ''}`}>
              <h3>¿Problemas?</h3>
              <p>Completa este formulario y nos pondremos en contacto contigo lo antes posible.</p>

              {errors.length > 0 && <Alert className={`${theme === 'dark' ? 'alert-dark' : ''}`} variant="danger">{errors.join(", ")}</Alert>}
              {success && <Alert className={`${theme === 'dark' ? 'alert-dark' : ''}`} variant="success">¡Formulario Enviado!</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Introduce tu E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${theme === 'dark' ? 'form-control-dark' : ''}`}
                  />
                </Form.Group>

                <Form.Group controlId="formProblem" className="mt-3">
                  <Form.Label>Problema/Error</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="problem"
                    rows={3}
                    placeholder="Describe tu problema"
                    value={formData.problem}
                    onChange={handleChange}
                    className={`${theme === 'dark' ? 'form-control-dark' : ''}`}
                  />
                </Form.Group>

                <Form.Group controlId="formName" className="mt-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Introduce tu nombre"
                    value={formData.name}
                    onChange={handleChange}
                    className={`${theme === 'dark' ? 'form-control-dark' : ''}`}
                  />
                </Form.Group>

                <Form.Group controlId="formDNI" className="mt-3">
                  <Form.Label>DNI</Form.Label>
                  <Form.Control
                    type="text"
                    name="dni"
                    placeholder="Introduce tu DNI"
                    value={formData.dni}
                    onChange={handleChange}
                    className={`${theme === 'dark' ? 'form-control-dark' : ''}`}
                  />
                </Form.Group>

                <div className="form-submit-btn">
                  <Button variant="primary" type="submit" className={`${theme === 'dark' ? 'button-dark' : ''}`}>
                    Enviar
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default HelpSeccion;
