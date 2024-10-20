import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import SidebarButton from '../sidebar button/sidebarMenu';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const WorkerForm = ({ initialWorker = {}, onSubmit }) => {
  const [worker, setWorker] = useState({
    name: initialWorker.name || '',
    lastname: initialWorker.lastname || '',
    email: initialWorker.email || '',
    password: initialWorker.password || '',
    profession: initialWorker.profession || '',
    description: initialWorker.description || '',
  });

  const navigate = useNavigate(); // Hook para navegar a la página anterior

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorker({
      ...worker,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(worker);
  };

  const handleCancel = () => {
    navigate(-1); // Navegar a la página anterior
  };

  return (
    <>
      <Header />
      <Container fluid className="d-flex" style={{ minHeight: '90vh' }}>
        <Col md={2} className="bg-dark text-light sidebar-button-padding">
          <SidebarButton />
        </Col>
        <Col md={10} className="p-4">
          <h2>{initialWorker.name ? 'Editar Trabajador' : 'Crear Trabajador'}</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="workerName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre"
                    name="name"
                    value={worker.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="workerLastname">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Apellido"
                    name="lastname"
                    value={worker.lastname}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <Form.Group controlId="workerEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Correo electrónico"
                    name="email"
                    value={worker.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="workerPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={worker.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <Form.Group controlId="workerProfession">
                  <Form.Label>Profesión</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Profesión"
                    name="profession"
                    value={worker.profession}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="workerDescription">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Breve descripción"
                    name="description"
                    value={worker.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col className="text-center">
                <Button variant="primary" type="submit">
                  Guardar
                </Button>
                <Button variant="secondary" className="ms-3 btn-cancel" onClick={handleCancel}>
                  Cancelar
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Container>
      <Footer />
    </>
  );
};

export default WorkerForm;
