import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  ProgressBar,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../services/authenticationContext/authentication.context";
import { ThemeContext } from "../services/ThemeContext/Theme.context";
import "./RegisterWorkerFinal.css";

const RegisterWorkerFinal = () => {
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { token, handleLogout } = useContext(AuthenticationContext);
  const { theme } = useContext(ThemeContext);
  const [canProceed, setCanProceed] = useState(false);

  const [touchedFields, setTouchedFields] = useState({});
  const [formData, setFormData] = useState({
    dni: "",
    jobId: "",
    direccion: "",
    phoneNumber: "",
    description: "",
    imageUrls: ["", "", ""], // Tres campos para URLs
    rating: 0,
  });

  const DNI_MIN_LENGTH = 6;
  const DNI_MAX_LENGTH = 8;

  const validateStep = useCallback(() => {
    const newErrors = {};
    if (step === 1) {
      newErrors.dni = validateDNI(formData.dni);
      newErrors.jobId = validateJobId(formData.jobId);
      newErrors.direccion = validateDireccion(formData.direccion);
      newErrors.phoneNumber = validatePhoneNumber(formData.phoneNumber);
    } else if (step === 2) {
      newErrors.description = validateDescription(formData.description);
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  }, [formData, step]);

  const validateDNI = (value) => {
    if (!value) return "DNI is mandatory";
    if (value.length < DNI_MIN_LENGTH) return `Debe tener al menos ${DNI_MIN_LENGTH} caracteres`;
    if (value.length > DNI_MAX_LENGTH) return `No puede superar ${DNI_MAX_LENGTH} caracteres`;
    return "";
  };

  const validateJobId = (value) => (!value ? "Selecting a Job is mandatory" : "");
  const validateDireccion = (value) => (!value ? "La dirección es obligatoria" : "");
  const validatePhoneNumber = (value) => (!value ? "Número de teléfono es obligatorio" : "");
  const validateDescription = (value) => (!value ? "La descripción es obligatoria" : "");

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    setTouchedFields((prevTouched) => ({ ...prevTouched, [field]: true }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: validateField(field, value) }));
  };

  const handleUrlChange = (index) => (event) => {
    const newUrls = [...formData.imageUrls];
    newUrls[index] = event.target.value;
    setFormData((prevData) => ({ ...prevData, imageUrls: newUrls }));
  };

  const validateField = (field, value) => {
    switch (field) {
      case "dni":
        return validateDNI(value);
      case "jobId":
        return validateJobId(value);
      case "direccion":
        return validateDireccion(value);
      case "phoneNumber":
        return validatePhoneNumber(value);
      case "description":
        return validateDescription(value);
      default:
        return "";
    }
  };

  useEffect(() => {
    const isStepValid = validateStep();
    setCanProceed(isStepValid);
  }, [formData, step, validateStep]);

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
        console.error("Error fetching categories:", error);
        setErrors({ general: "Error al obtener las categorías de trabajo" });
      }
    };

    fetchCategories();
  }, [token]);

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep()) setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    const payload = { ...formData, rating: 0 };

    try {
      const response = await fetch("http://localhost:8081/api/workers/worker", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess(true);
        handleLogout();
        navigate("/login");
      } else {
        const errorData = await response.json();
        setErrors({ general: errorData.message });
      }
    } catch (error) {
      setErrors({ general: "Error al registrar el trabajador." });
      console.error("Error submitting form:", error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <InputField label="DNI" name="dni" value={formData.dni} onChange={handleChange("dni")} error={errors.dni} touched={touchedFields.dni} />
            <Form.Group controlId="jobId" className="mt-3">
              <Form.Label>Selecciona un Trabajo</Form.Label>
              <Form.Control as="select" name="jobId" value={formData.jobId} onChange={handleChange("jobId")}>
                <option value="">Selecciona una opción</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </Form.Control>
              {errors.jobId && touchedFields.jobId && <p className="pt-2 text-danger">{errors.jobId}</p>}
            </Form.Group>
            <InputField label="Dirección" name="direccion" value={formData.direccion} onChange={handleChange("direccion")} error={errors.direccion} touched={touchedFields.direccion} />
            <InputField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange("phoneNumber")} error={errors.phoneNumber} touched={touchedFields.phoneNumber} />
          </>
        );
      case 2:
        return (
          <>
            {formData.imageUrls.map((url, index) => (
              <InputField key={index} label={`URL de Imagen ${index + 1}`} name={`imageUrl${index}`} value={url} onChange={handleUrlChange(index)} error="" touched={touchedFields[`imageUrls${index}`]} />
            ))}
            <InputField label="Descripción" name="description" value={formData.description} onChange={handleChange("description")} error={errors.description} touched={touchedFields.description} />
          </>
        );
      case 3:
        const selectedCategory = categories.find((cat) => cat.id === formData.jobId)?.title || "N/A";
        return (
          <div className="review-step-container">
            <h4 className="text-center">Revisa tu información</h4>
            <p><strong>DNI:</strong> {formData.dni}</p>
            <p><strong>Trabajo:</strong> {selectedCategory}</p>
            <p><strong>Dirección:</strong> {formData.direccion}</p>
            <p><strong>Número de Teléfono:</strong> {formData.phoneNumber}</p>
            <p><strong>Descripción:</strong> {formData.description}</p>
            <p><strong>URLs de Imágenes:</strong> {formData.imageUrls.join(", ")}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Container fluid className={`register-container ${theme === "dark" ? "register-container-dark" : ""}`}>
      <Row>
        <Col xs={12} md={8} lg={10} className={`register-col ${theme === "dark" ? "register-col-dark" : ""}`}>
          <Form onSubmit={step === 3 ? handleSubmit : handleNext}>
            <h3>Registro de Trabajador</h3>
            {errors.general && <Alert variant="danger">{errors.general}</Alert>}
            {success && <Alert variant="success">¡Registro exitoso!</Alert>}
            <ProgressBar now={(step / 3) * 100} />
            {renderStep()}
            <div className="button-container d-flex justify-content-between">
              <Button variant="danger" onClick={handleCancel}>Cancelar</Button>
              <div>
                {step > 1 && <Button variant="secondary" onClick={handleBack}>Atrás</Button>}
                {step < 3 ? (
                  <Button variant="primary" type="submit" disabled={!canProceed && step < 3}>Continuar</Button>
                ) : (
                  <Button variant="success" type="submit" disabled={!canProceed && step < 3}>Registrarse</Button>
                )}
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const InputField = ({ label, name, value, onChange, error, touched }) => (
  <Form.Group controlId={name} className="mt-3">
    <Form.Label>{label}</Form.Label>
    <Form.Control type="text" name={name} value={value} onChange={onChange} className={error && touched ? "border border-danger" : ""} />
    {error && touched && <p className="pt-2 text-danger">{error}</p>}
  </Form.Group>
);

export default RegisterWorkerFinal;
