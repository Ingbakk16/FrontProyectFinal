import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import SidebarButton from "../sidebar button/sidebarMenu";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../../services/ThemeContext/Theme.context";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import "./MakeWorkerForm.css";

const MakeWorkerForm = ({
  initialWorker = {
    description: "",
    dni: "",
    direccion: "",
    jobId: "",
    imageUrl: "",
  },
}) => {
  const [formData, setFormData] = useState({
    description: initialWorker.description,
    dni: initialWorker.dni,
    direccion: initialWorker.direccion,
    jobId: initialWorker.jobId,
    imageUrl: initialWorker.imageUrl,
    phoneNumber: initialWorker.phoneNumber || "", 
  });

  const { theme } = useContext(ThemeContext);
  const { token } = useContext(AuthenticationContext);
  const { id: userId } = useParams(); // Recibe `userId` como `id`
  const [categories, setCategories] = useState([]); // Estado para almacenar categorías

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
        setCategories(data); // Guarda las categorías en el estado
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };

    fetchCategories();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:8081/api/admin/worker/${userId}`, { 
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar el perfil del trabajador');
      }
  
      navigate('/admin/adminWorkersPage'); 
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };
  
  

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div
      className={`page-background ${
        theme === "dark" ? "background-dark" : "background-light"
      }`}
    >
      <Header />
      <Container fluid className="d-flex" style={{ minHeight: "90vh" }}>
        <Col md={2} className="bg-dark text-light sidebar-button-padding">
          <SidebarButton />
        </Col>
        <Col md={10} className="p-4">
          <h2 className="text-center mb-4">Formulario de Trabajador</h2>
          <Form
            onSubmit={handleSubmit}
            className={`edit-category-form ${
              theme === "dark" ? "edit-category-form-dark" : ""
            }`}
          >
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="workerDescription">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    placeholder="Descripción de la experiencia"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className={theme === "dark" ? "form-control-dark" : ""}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="workerDNI">
                  <Form.Label>DNI</Form.Label>
                  <Form.Control
                    type="text"
                    name="dni"
                    placeholder="Ingresa el DNI"
                    value={formData.dni}
                    onChange={handleChange}
                    className={theme === "dark" ? "form-control-dark" : ""}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="workerPhoneNumber">
                  <Form.Label>Número de Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    placeholder="Ingresa el número de teléfono"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={theme === "dark" ? "form-control-dark" : ""}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="workerDireccion">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    placeholder="Ingresa la dirección"
                    value={formData.direccion}
                    onChange={handleChange}
                    className={theme === "dark" ? "form-control-dark" : ""}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="workerJobId">
                  <Form.Label>Trabajo</Form.Label>
                  <Form.Control
                    as="select"
                    name="jobId"
                    value={formData.jobId}
                    onChange={handleChange}
                    className={theme === "dark" ? "form-control-dark" : ""}
                    required
                  >
                    <option value="">Selecciona un trabajo</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title}{" "}
                        {/* Muestra el título en lugar del nombre */}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group controlId="workerImageUrl">
                  <Form.Label>URL de la Imagen</Form.Label>
                  <Form.Control
                    type="text"
                    name="imageUrl"
                    placeholder="Ingresa la URL de la imagen"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className={theme === "dark" ? "form-control-dark" : ""}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="text-center">
              <Button type="submit" className="btn-save me-2">
                Guardar
              </Button>
              <Button
                type="button"
                className="btn-cancel"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </div>
          </Form>
        </Col>
      </Container>
      <Footer />
    </div>
  );
};

export default MakeWorkerForm;
