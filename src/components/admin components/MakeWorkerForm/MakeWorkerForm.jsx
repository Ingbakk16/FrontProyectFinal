import React, { useContext, useRef, useState, useEffect } from "react";
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
  const descriptionRef = useRef(null);
  const dniRef = useRef(null);
  const direccionRef = useRef(null);
  const jobIdRef = useRef(null);
  const imageUrlRef = useRef(null);
  const phoneNumberRef = useRef(null);

  const { theme } = useContext(ThemeContext);
  const { token } = useContext(AuthenticationContext);
  const { id: userId } = useParams();
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({
    description: false,
    dni: false,
    direccion: false,
    jobId: false,
    imageUrl: false,
    phoneNumber: false,
  });
  const navigate = useNavigate();

  const handleBlur = (ref, fieldName) => {
    if (ref.current && ref.current.value.trim() === "") {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: true }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: false }));
    }
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

  const handleConfirmSubmit = () => {
    AdminConfirmationAlert({
      title: "Confirmar creación de trabajador",
      text: "¿Estás seguro de que deseas crear o actualizar este perfil de trabajador?",
      onConfirm: handleSubmit,
    });
  };

  const handleSubmit = async () => {
    const formData = {
      description: descriptionRef.current.value,
      dni: dniRef.current.value,
      direccion: direccionRef.current.value,
      jobId: jobIdRef.current.value,
      imageUrl: imageUrlRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
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
          body: JSON.stringify(formData),
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
          <h2 className="text-center mb-4">Formulario de Trabajador</h2>
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
                    ref={descriptionRef}
                    onBlur={() => handleBlur(descriptionRef, "description")}
                    placeholder="Descripción de la experiencia"
                    rows={3}
                    className={`${theme === "dark" ? "form-control-dark" : ""} ${errors.description ? "border-danger" : ""}`}
                    required
                  />
                  {errors.description && <small className="text-danger">Este campo es obligatorio.</small>}
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="workerDNI">
                  <Form.Label>DNI</Form.Label>
                  <Form.Control
                    type="text"
                    name="dni"
                    ref={dniRef}
                    onBlur={() => handleBlur(dniRef, "dni")}
                    placeholder="Ingresa el DNI"
                    className={`${theme === "dark" ? "form-control-dark" : ""} ${errors.dni ? "border-danger" : ""}`}
                    required
                  />
                  {errors.dni && <small className="text-danger">Este campo es obligatorio.</small>}
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="workerPhoneNumber">
                  <Form.Label>Número de Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    ref={phoneNumberRef}
                    onBlur={() => handleBlur(phoneNumberRef, "phoneNumber")}
                    placeholder="Ingresa el número de teléfono"
                    className={`${theme === "dark" ? "form-control-dark" : ""} ${errors.phoneNumber ? "border-danger" : ""}`}
                    required
                  />
                  {errors.phoneNumber && <small className="text-danger">Este campo es obligatorio.</small>}
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="workerDireccion">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    ref={direccionRef}
                    onBlur={() => handleBlur(direccionRef, "direccion")}
                    placeholder="Ingresa la dirección"
                    className={`${theme === "dark" ? "form-control-dark" : ""} ${errors.direccion ? "border-danger" : ""}`}
                    required
                  />
                  {errors.direccion && <small className="text-danger">Este campo es obligatorio.</small>}
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="workerJobId">
                  <Form.Label>Trabajo</Form.Label>
                  <Form.Control
                    as="select"
                    name="jobId"
                    ref={jobIdRef}
                    onBlur={() => handleBlur(jobIdRef, "jobId")}
                    className={`${theme === "dark" ? "form-control-dark" : ""} ${errors.jobId ? "border-danger" : ""}`}
                    required
                  >
                    <option value="">Selecciona un trabajo</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </Form.Control>
                  {errors.jobId && <small className="text-danger">Este campo es obligatorio.</small>}
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

export default MakeWorkerForm;
