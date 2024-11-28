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
    description: null,
    dni: null,
    direccion: null,
    jobId: null,
    phoneNumber: null,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "description":
        return value.trim() === "" ? "Description is required." : null;
      case "dni":
        return /^[a-zA-Z0-9]+$/.test(value) ? null : "DNI must be alphanumeric.";
      case "direccion":
        return value.trim() === "" ? "Address is required." : null;
      case "phoneNumber":
        return /^[0-9]+$/.test(value) ? null : "Phone number must be numeric.";
      case "jobId":
        return value === "" ? "You must select a job." : null;
      default:
        return null;
    }
  };

  const handleBlur = (field) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: validateField(field, formData[field]),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
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
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching job categories:", error);
        setErrors((prev) => ({ ...prev, general: "Error fetching job categories" }));
      }
    };

    fetchCategories();
  }, [token]);

  useEffect(() => {
    const areAllFieldsFilled = Object.values(formData).every((value) => value.trim() !== "");
    const noErrors = Object.values(errors).every((error) => error === null);

    setIsFormValid(areAllFieldsFilled && noErrors);
  }, [formData, errors]);

  const handleSubmit = async () => {
    const payload = {
      ...formData,
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
        throw new Error("Error updating worker profile.");
      }

      navigate("/admin/adminWorkersPage");
    } catch (error) {
      console.error("Error submitting the form:", error);
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
              handleSubmit();
            }}
            className={`edit-category-form ${theme === "dark" ? "edit-category-form-dark" : ""}`}
          >
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="workerDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    placeholder="Description of experience"
                    value={formData.description}
                    onChange={handleChange}
                    onBlur={() => handleBlur("description")}
                    rows={3}
                    className={`${errors.description ? "border-danger" : ""}`}
                    required
                  />
                  {errors.description && <small className="text-danger">{errors.description}</small>}
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="workerJobId">
                  <Form.Label>Select a Job</Form.Label>
                  <Form.Control
                    as="select"
                    name="jobId"
                    value={formData.jobId}
                    onChange={handleChange}
                    onBlur={() => handleBlur("jobId")}
                    className={`${errors.jobId ? "border-danger" : ""}`}
                    required
                  >
                    <option value="">Select an option</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </Form.Control>
                  {errors.jobId && <small className="text-danger">{errors.jobId}</small>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="workerDni">
                  <Form.Label>DNI</Form.Label>
                  <Form.Control
                    type="text"
                    name="dni"
                    placeholder="Enter DNI"
                    value={formData.dni}
                    onChange={handleChange}
                    onBlur={() => handleBlur("dni")}
                    className={`${errors.dni ? "border-danger" : ""}`}
                    required
                  />
                  {errors.dni && <small className="text-danger">{errors.dni}</small>}
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="workerPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    onBlur={() => handleBlur("phoneNumber")}
                    className={`${errors.phoneNumber ? "border-danger" : ""}`}
                    required
                  />
                  {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="workerDireccion">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    placeholder="Enter address"
                    value={formData.direccion}
                    onChange={handleChange}
                    onBlur={() => handleBlur("direccion")}
                    className={`${errors.direccion ? "border-danger" : ""}`}
                    required
                  />
                  {errors.direccion && <small className="text-danger">{errors.direccion}</small>}
                </Form.Group>
              </Col>
            </Row>
            <div className="text-center">
              <Button type="submit" className="btn-save me-2" disabled={!isFormValid}>
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
