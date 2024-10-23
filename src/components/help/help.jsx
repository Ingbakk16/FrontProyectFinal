import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import Header from "../header/header";
import Footer from "../footer/footer";
import './help.css';  

const HelpSeccion = () => {
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
    <>
      <Header />
      <Container fluid className="help-container d-flex justify-content-center align-items-center">
        <Row className="justify-content-center align-items-center w-100 full-height-row">
          <Col lg={5} md={4} sm={5}>
            <div className="help-form">
              <h3>¿Problems?</h3>
              <p>Fill out this form and we will contact you as soon as possible.</p>

              {errors.length > 0 && <Alert variant="danger">{errors.join(", ")}</Alert>}
              {success && <Alert variant="success">¡Form Send!</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="submit your E-mail"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formProblem" className="mt-3">
                  <Form.Label>Problem/bug/Issue</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="problem"
                    rows={3}
                    placeholder="detail your problem"
                    value={formData.problem}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formName" className="mt-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="submit your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formDNI" className="mt-3">
                  <Form.Label>DNI</Form.Label>
                  <Form.Control
                    type="text"
                    name="dni"
                    placeholder="submit your DNI"
                    value={formData.dni}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="form-submit-btn">
                  <Button variant="primary" type="submit">
                    Send
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default HelpSeccion;
