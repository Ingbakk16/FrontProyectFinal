import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import Sidebar from "../sidebar button/sidebarMenu";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../../services/ThemeContext/Theme.context";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import "./EditUserForm.css";

const EditUserForm = () => {
  const { id } = useParams(); // Captura el ID del usuario desde los parámetros
  const { theme } = useContext(ThemeContext);
  const { token } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
  });



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8081/api/admin/edit/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Usuario actualizado con éxito");
        navigate("/Admin"); 
      } else {
        throw new Error("Error al actualizar el usuario");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
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
      <Container fluid className="d-flex">
        <Col md={2} className="bg-dark text-light sidebar-button-padding">
          <Sidebar />
        </Col>
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
                  <Form.Label>Nombre de Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={theme === "dark" ? "form-control-dark" : ""}
                  />
                </Form.Group>
              </Col>
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
            </Row>
            <Row>
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
            </Row>
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
