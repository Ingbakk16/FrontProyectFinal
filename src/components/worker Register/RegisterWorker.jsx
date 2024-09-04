import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const RegisterWorker = () => {
  const [dni, setDni] = useState("");
  const [job, setJob] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const workerData = { dni, job, password, contact };
    console.log(workerData);
    // poner peticion para el back a futuro 
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: "100vh",
     background: "linear-gradient(45deg, #6BF8EF, #87ACF7, #645DB5, #322A94)" }}>
      <Row>
        <Col xs={12} md={6} lg={4}>
          <Form onSubmit={handleSubmit} className="p-4" style={{ backgroundColor: "#f8f9fa", borderRadius: "1rem",width:"100vh", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
            <h3 className="text-center mb-4">Registro</h3>
            <p className="text-center">Regístrese para formar parte de esta gran familia!</p>
            <Form.Group controlId="dni">
              <Form.Label>DNI</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese su DNI" 
                value={dni} 
                onChange={(e) => setDni(e.target.value)} 
                required 
              />
            </Form.Group>
            <Form.Group controlId="job" className="mt-3">
              <Form.Label>Trabajo</Form.Label>
              <Form.Control 
                as="select" 
                value={job} 
                onChange={(e) => setJob(e.target.value)} 
                required 
              >
                <option value="">Seleccione su trabajo</option>
                <option value="Ingeniero">Ingeniero</option>
                <option value="Arquitecto">Arquitecto</option>
                <option value="Doctor">Doctor</option>
                <option value="Otro">Otro</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Ingrese su contraseña" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </Form.Group>
            <Form.Group controlId="contact" className="mt-3">
              <Form.Label>Contacto</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese su contacto" 
                value={contact} 
                onChange={(e) => setContact(e.target.value)} 
                required 
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-4 w-100">
              Continuar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterWorker;
