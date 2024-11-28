import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import Sidebar from "../sidebar button/sidebarMenu";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../services/ThemeContext/Theme.context";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import AdminConfirmationAlert from "../../ConfirmationAlert/ConfirmationAlert"; 
import "./CreateAdminForm.css";

const CreateAdminForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const { theme } = useContext(ThemeContext);
  const { token } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirmSubmit = () => {
    AdminConfirmationAlert({
      title: "Confirm Admin Creation",
      text: "Are you sure you want to create this admin?",
      onConfirm: handleSubmit, 
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/admin/create-admin", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate(-1);
      } else {
        throw new Error("Error creating the admin");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={`page-background ${theme === "dark" ? "background-dark" : "background-light"}`}>
      <Header />
      <Container fluid className="d-flex">
        {/* Sidebar */}
        <Col md={2} className="bg-dark text-light sidebar-button-padding">
          <Sidebar />
        </Col>
        
        <Col md={10} className="p-4">
          <Form onSubmit={(e) => {
              e.preventDefault();
              handleConfirmSubmit(); 
            }}
            className={`create-admin-form ${theme === "dark" ? "form-dark" : ""}`}
          >
            <h3>Create Admin</h3>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className={theme === "dark" ? "form-control-dark" : ""}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={theme === "dark" ? "form-control-dark" : ""}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
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
                    required
                    className={theme === "dark" ? "form-control-dark" : ""}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={theme === "dark" ? "form-control-dark" : ""}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="form-actions">
              <Button type="submit" className="btn-save">Save</Button>
              <Button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</Button>
            </div>
          </Form>
        </Col>
      </Container>
      <Footer />
    </div>
  );
};

export default CreateAdminForm;
