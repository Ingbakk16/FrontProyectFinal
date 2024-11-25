import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import SidebarButton from "../sidebar button/sidebarMenu";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../../services/ThemeContext/Theme.context";
import "./WorkerForm.css";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import AdminConfirmationAlert from "../../ConfirmationAlert/ConfirmationAlert"; // Importa el componente de alerta

const WorkerForm = () => {
  const [worker, setWorker] = useState({
    description: "",
    phoneNumber: "",
    direccion: "",
    imageUrl: "",
    imageUrl2: "",
    imageUrl3: "",
  });

  const { id: userId } = useParams();
  const { theme } = useContext(ThemeContext);
  const { token } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorker({
      ...worker,
      [name]: value,
    });
  };

  const handleConfirmSubmit = () => {
    AdminConfirmationAlert({
      title: "¿aare you sure about do this ?",
      text: "this action save the changes in the workerss profile.",
      onConfirm: handleSubmit,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/admin/edit_profile/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(worker),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el perfil del trabajador");
      }

      navigate("/admin/adminWorkersPage");
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
      <Container fluid className="d-flex" style={{ minHeight: "90vh" }}>
        <Col md={2} className="bg-dark text-light sidebar-button-padding">
          <SidebarButton />
        </Col>
        <Col md={10} className="p-4">
          <h2 className="text-center mb-4">edit Worker</h2>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleConfirmSubmit(); 
            }}
            className={`edit-worker-form ${
              theme === "dark" ? "edit-worker-form-dark" : ""
            }`}
          >
            <Row>
              <Col md={6}>
                <Form.Group controlId="workerDescription">
                  <Form.Label>Descriptión</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Brief description"
                    name="description"
                    value={worker.description}
                    onChange={handleChange}
                    className={theme === "dark" ? "form-control-dark" : ""}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="workerPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone number"
                    name="phoneNumber"
                    value={worker.phoneNumber}
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
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    name="direccion"
                    value={worker.direccion}
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
                  save
                </Button>
                <Button
                  type="button"
                  className="ms-3 btn-cancel"
                  onClick={handleCancel}
                >
                  cancel
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
