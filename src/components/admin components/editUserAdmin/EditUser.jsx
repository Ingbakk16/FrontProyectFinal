import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import Sidebar from "../sidebar button/sidebarMenu";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../services/ThemeContext/Theme.context";
import "./EditUserForm.css";

const EditUserForm = () => {
  const [formData, setFormData] = useState({
    name: "Jose",
    lastname: "de la cruz",
    email: "JoseMaria32@mail.com",
    password: "Jose",
    profileImage: null,
  });

  const { theme } = useContext(ThemeContext); // Usa el contexto de tema
  const navigate = useNavigate();

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
    console.log("Formulario enviado", formData);
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

      <Container fluid className="d-flex">
        {/* Sidebar */}
        <Col md={2} className="bg-dark text-light sidebar-button-padding">
          <Sidebar />
        </Col>

        {/* Main Content */}
        <Col md={10} className="p-4">
          <Form
            onSubmit={handleSubmit}
            className={`edit-user-form ${
              theme === "dark" ? "edit-user-form-dark" : ""
            }`}
          >
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={theme === "dark" ? "form-control-dark" : ""}
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
                    className={theme === "dark" ? "form-control-dark" : ""}
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
                    className={theme === "dark" ? "form-control-dark" : ""}
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
                    className={theme === "dark" ? "form-control-dark" : ""}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Agregar una Imagen</Form.Label>
              <div
                className={`image-upload ${
                  theme === "dark" ? "image-upload-dark" : ""
                }`}
              >
                <label htmlFor="file-input" className="image-upload-label">
                  <span className="upload-icon">+</span>
                  <span className="upload-text">Agregar una Imagen</span>
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
              <Button type="submit" className="btn-save">
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

export default EditUserForm;
