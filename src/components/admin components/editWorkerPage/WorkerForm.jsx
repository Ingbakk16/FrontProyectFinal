import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import SidebarButton from '../sidebar button/sidebarMenu';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../services/ThemeContext/Theme.context';
import './WorkerForm.css';
import { AuthenticationContext } from '../../services/authenticationContext/authentication.context';

const WorkerForm = ({ initialWorker = {}, onSubmit }) => {
  const [worker, setWorker] = useState({
    description: initialWorker.description || '',
    dni: initialWorker.dni || '',
    direccion: initialWorker.direccion || '',
    jobId: initialWorker.jobId || '',
    imageUrl: initialWorker.imageUrl || '',
  });

  const [categories, setCategories] = useState([]); // Estado para almacenar las categorías
  const { theme } = useContext(ThemeContext);
  const { token } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  // Fetch para obtener categorías al cargar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/jobs/all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener las categorías");
        }
        const data = await response.json();
        setCategories(data); // Actualiza el estado de categorías con los datos recibidos
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };

    fetchCategories();
  }, []);

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
    navigate(-1);
  };

  return (
    <div className={`page-background ${theme === "dark" ? "background-dark" : "background-light"}`}>
      <Header />
      <Container fluid className="d-flex" style={{ minHeight: '90vh' }}>
        <Col md={2} className="bg-dark text-light sidebar-button-padding">
          <SidebarButton />
        </Col>
        <Col md={10} className="p-4">
          <h2 className="text-center mb-4">
            {initialWorker.description ? 'Editar Trabajador' : 'Crear Trabajador'}
          </h2>
          <Form onSubmit={handleSubmit} className={`edit-worker-form ${theme === "dark" ? "edit-worker-form-dark" : ""}`}>
            <Row>
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
                    className={theme === "dark" ? "form-control-dark" : ""}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="workerDni">
                  <Form.Label>DNI</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="DNI"
                    name="dni"
                    value={worker.dni}
                    onChange={handleChange}
                    className={theme === "dark" ? "form-control-dark" : ""}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <Form.Group controlId="workerDireccion">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Dirección"
                    name="direccion"
                    value={worker.direccion}
                    onChange={handleChange}
                    className={theme === "dark" ? "form-control-dark" : ""}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="workerJobId">
                  <Form.Label>Categoría de Trabajo</Form.Label>
                  <Form.Control
                    as="select"
                    name="jobId"
                    value={worker.jobId}
                    onChange={handleChange}
                    className={theme === "dark" ? "form-control-dark" : ""}
                    required
                  >
                    <option value="">Seleccione una categoría</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <Form.Group controlId="workerImageUrl">
                  <Form.Label>URL de la Imagen</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="URL de la imagen"
                    name="imageUrl"
                    value={worker.imageUrl}
                    onChange={handleChange}
                    className={theme === "dark" ? "form-control-dark" : ""}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-4 text-center">
              <Col>
                <Button type="submit" className="btn-save">
                  Guardar
                </Button>
                <Button type="button" className="ms-3 btn-cancel" onClick={handleCancel}>
                  Cancelar
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Container>
      <Footer />
    </div>
  );
};

export default WorkerForm;
