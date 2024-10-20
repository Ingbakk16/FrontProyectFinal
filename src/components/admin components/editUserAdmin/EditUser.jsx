import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import Sidebar from '../sidebar button/sidebarMenu'; // Asumiendo que ya tienes el sidebar como componente
import { useNavigate } from 'react-router-dom'; // Importar el hook useNavigate
import './EditUserForm.css';

const EditUserForm = () => {
  const [formData, setFormData] = useState({
    name: 'Jose',
    lastname: 'de la cruz',
    email: 'JoseMaria32@mail.com',
    password: 'Jose',
    profileImage: null,
  });

  const navigate = useNavigate(); // Inicializar el hook useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      profileImage: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes hacer la lógica para guardar los cambios
    console.log('Formulario enviado', formData);
  };

  const handleCancel = () => {
    navigate(-1); // Navegar a la página anterior
  };

  return (
    <>
      <Header />

      <Container fluid className="d-flex">
        {/* Sidebar */}
        <Col md={2} className="bg-dark text-light sidebar-button-padding">
          <Sidebar />
        </Col>

        {/* Main Content */}
        <Col md={10} className="p-4">
          <Form onSubmit={handleSubmit} className="edit-user-form">
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Agregar una Imagen</Form.Label>
              <div className="image-upload">
                <label htmlFor="file-input" className="image-upload-label">
                  <span>+</span>
                  <span>Agregar una Imagen</span>
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="image-upload-input"
                />
              </div>
            </Form.Group>

            <div className="form-actions">
              <Button type="submit" className="btn-save">Guardar</Button>
              <Button type="button" className="btn-cancel" onClick={handleCancel}>Cancelar</Button>
            </div>
          </Form>
        </Col>
      </Container>

      <Footer />
    </>
  );
};

export default EditUserForm;
