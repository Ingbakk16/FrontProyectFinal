import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import SidebarButton from '../sidebar button/sidebarMenu'; 
import { useNavigate } from 'react-router-dom'; 
import { ThemeContext } from '../../services/ThemeContext/Theme.context';
import './CategoryForm.css'; // Archivo CSS para los estilos

const CategoryForm = ({ initialCategory = { name: '', description: '' }, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: initialCategory.name,
    description: initialCategory.description,
  });

  const { theme } = useContext(ThemeContext); // Usa el contexto de tema
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
          <h2 className="text-center mb-4">Formulario de Categoría</h2>
          <Form onSubmit={handleSubmit} className={`edit-category-form ${theme === "dark" ? "edit-category-form-dark" : ""}`}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="categoryName">
                  <Form.Label>Nombre de la Categoría</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Ingresa el nombre de la categoría"
                    value={formData.name}
                    onChange={handleChange}
                    className={theme === "dark" ? "form-control-dark" : ""}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="categoryDescription">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    placeholder="Ingresa la descripción de la categoría"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className={theme === "dark" ? "form-control-dark" : ""}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="text-center">
              <Button type="submit" className="btn-save me-2">
                Guardar
              </Button>
              <Button type="button" className="btn-cancel" onClick={handleCancel}>
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

export default CategoryForm;
