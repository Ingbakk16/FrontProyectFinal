import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import SidebarButton from "../sidebar button/sidebarMenu";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../../services/ThemeContext/Theme.context";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import AdminConfirmationAlert from "../../ConfirmationAlert/ConfirmationAlert";
import "./MakeWorkerForm.css";

const MakeWorkerForm = ({
  initialWorker = {
    description: "",
    dni: "",
    direccion: "",
    jobId: "",
    imageUrl: "", 
    phoneNumber: "",
  },
}) => {
  const { theme } = useContext(ThemeContext);
  const { token } = useContext(AuthenticationContext);
  const { id: userId } = useParams();
  const navigate = useNavigate();

 
  const [formData, setFormData] = useState(initialWorker);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({
    description: false,
    dni: false,
    direccion: false,
    jobId: false,
    phoneNumber: false,
  });

  const handleBlur = (field) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: formData[field].trim() === "",
    }));
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
        setCategories(data);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };

    fetchCategories();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleConfirmSubmit = () => {
    AdminConfirmationAlert({
      title: "Confirm worker creation",
      text: "¿Are you sure you want to create or update this worker profile?",
      onConfirm: handleSubmit,
    });
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      imageUrl: formData.imageUrl || "", 
    };

    try {
      const response = await fetch(
        `http://localhost:8081/api/admin/worker/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
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
    <div className={`page-background ${theme === "dark" ? "background-dark" : "background-light"}`}>
      <Header />
      <Container fluid className="d-flex" style={{ minHeight: "90vh" }}>
        <Col md={2} className="bg-dark text-light sidebar-button-padding">
          <SidebarButton />
        </Col>
        <Col md={10} className="p-4">
          <h2 className="text-center mb-4">Worker Form</h2>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleConfirmSubmit(); 
            }}
            className={`edit-category-form ${theme === "dark" ? "edit-category-form-dark" : ""}`}
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
                    onBlur={() => handleBlur("description")}
                    rows={3}
                    className={`${theme === "dark" ? "form-control-dark" : ""} ${errors.description ? "border-danger" : ""}`}
                    required
                  />
                  {errors.description && <small className="text-danger">This field is mandatory.</small>}
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="workerDNI">
                  <Form.Label>DNI</Form.Label>
                  <Form.Control
                    type="text"
                    name="dni"
                    placeholder="Submit your DNI"
                    value={formData.dni}
                    onChange={handleChange}
                    onBlur={() => handleBlur("dni")}
                    className={`${theme === "dark" ? "form-control-dark" : ""} ${errors.dni ? "border-danger" : ""}`}
                    required
                  />
                  {errors.dni && <small className="text-danger">This field is mandatory.</small>}
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="workerPhoneNumber">
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    placeholder="Submit your phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    onBlur={() => handleBlur("phoneNumber")}
                    className={`${theme === "dark" ? "form-control-dark" : ""} ${errors.phoneNumber ? "border-danger" : ""}`}
                    required
                  />
                  {errors.phoneNumber && <small className="text-danger">This field is mandatory.</small>}
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="workerDireccion">
                  <Form.Label>Direction</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    placeholder="Submit your direction"
                    value={formData.direccion}
                    onChange={handleChange}
                    onBlur={() => handleBlur("direccion")}
                    className={`${theme === "dark" ? "form-control-dark" : ""} ${errors.direccion ? "border-danger" : ""}`}
                    required
                  />
                  {errors.direccion && <small className="text-danger">This field is mandatory.</small>}
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="workerJobId">
                  <Form.Label>Work</Form.Label>
                  <Form.Control
                    as="select"
                    name="jobId"
                    value={formData.jobId}
                    onChange={handleChange}
                    onBlur={() => handleBlur("jobId")}
                    className={`${theme === "dark" ? "form-control-dark" : ""} ${errors.jobId ? "border-danger" : ""}`}
                    required
                  >
                    <option value="">Select a job</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </Form.Control>
                  {errors.jobId && <small className="text-danger">This field is mandatory.</small>}
                </Form.Group>
              </Col>
            </Row>
            <div className="text-center">
              <Button type="submit" className="btn-save me-2">
                Save
              </Button>
              <Button type="button" className="btn-cancel" onClick={handleCancel}>
                Cancel
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
