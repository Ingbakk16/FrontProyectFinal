import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Container, Row, Col, Alert, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import { AuthenticationContext } from "../services/authenticationContext/authentication.context"; 
import './RegisterWorkerFinal.css';

const RegisterWorkerFinal = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    dni: "",
    jobId: "", 
    direccion: "",
    description: "",
    workImages: [], 
    rating: 0, 
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  
  const { token, handleLogout } = useContext(AuthenticationContext); // Se agrega handleLogout
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/jobs/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setCategories(data); 
      } catch (error) {
        console.error('Error fetching categories:', error);
        setErrors(['Error al obtener las categorías de trabajo']);
      }
    };

    fetchCategories();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file)); 
    setFormData({ ...formData, workImages: imageUrls });
  };

  const validateStep = () => {
    const newErrors = [];
    if (step === 1) {
      if (!formData.dni.match(/^\d{8}$/)) newErrors.push("El DNI debe tener 8 números.");
      if (!formData.jobId) newErrors.push("Debe seleccionar un trabajo.");
      if (formData.direccion.trim() === "") newErrors.push("La dirección es obligatoria.");
    } else if (step === 2) {
      if (formData.workImages.length === 0) newErrors.push("Debe subir al menos una imagen de su trabajo.");
      if (formData.description.trim() === "") newErrors.push("La descripción es obligatoria.");
    }
    return newErrors;
  };

  const handleNext = (e) => {
    e.preventDefault();
    const formErrors = validateStep();
    if (formErrors.length > 0) return setErrors(formErrors);
    setErrors([]);
    setStep(step + 1);
  };

  const handleBack = () => {
    setErrors([]);
    setStep(step - 1);
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateStep();
    if (formErrors.length > 0) return setErrors(formErrors);

    const payload = {
      description: formData.description,
      dni: formData.dni,
      direccion: formData.direccion, 
      rating: 0, 
      jobId: formData.jobId,
      imageUrl: formData.workImages[0],
    };
    try {
      const response = await fetch('http://localhost:8081/api/workers/worker', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        setSuccess(true);
        setErrors([]);
        setStep(1);

        handleLogout(); // Llamar a handleLogout para desconectar al usuario

        navigate("/login"); // Redirigir al login

      } else {
        const errorData = await response.json();
        setErrors([errorData.message]);
      }
    } catch (error) {
      setErrors(["Error al registrar el trabajador."]);
      console.error("Error submitting form:", error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <InputField label="DNI" name="dni" type="text" value={formData.dni} onChange={handleChange} />
            <Form.Group controlId="jobId" className="mt-3">
              <Form.Label>Selecciona un Trabajo</Form.Label>
              <Form.Control as="select" name="jobId" value={formData.jobId} onChange={handleChange} required>
                <option value="">Selecciona una opción</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <InputField label="Dirección" name="direccion" type="text" value={formData.direccion} onChange={handleChange} />
          </>
        );
      case 2:
        return (
          <>
            <Form.Group controlId="workImages">
              <Form.Label>Imágenes de Trabajo</Form.Label>
              <Form.Control type="file" accept="image/*" multiple onChange={handleMultipleImagesChange} />
            </Form.Group>
            <InputField label="Descripción" name="description" as="textarea" rows={3} value={formData.description} onChange={handleChange} />
          </>
        );
      case 3:
        return (
          <div className="text-center">
            <h4>Revisa tu información</h4>
            {Object.entries(formData).map(([key, value], idx) => (
              key !== 'rating' && ( 
              <p key={idx}>
                <strong>{key}:</strong> 
                {Array.isArray(value)
                  ? value.join(", ")
                  : value || "N/A"}
              </p>)
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Container fluid className="register-container">
      <Row>
        <Col xs={12} md={8} lg={10} className="register-col">
          <Form onSubmit={step === 3 ? handleSubmit : handleNext} className="register-form">
            <h3 className="register-title">Registro de Trabajador</h3>
            <p className="register-subtitle">¡Regístrate para formar parte de nuestra comunidad!</p>

            {errors.length > 0 && <Alert variant="danger">{errors.join(", ")}</Alert>}
            {success && <Alert variant="success">¡Registro exitoso!</Alert>}

            <ProgressBar now={(step / 3) * 100} className="progress-bar-custom" />

            {renderStep()}

            <div className="button-container d-flex justify-content-between">
              <Button variant="danger" onClick={handleCancel}>Cancelar</Button>
              <div>
                {step > 1 && <Button variant="secondary" className="me-2" onClick={handleBack}>Atrás</Button>}
                {step < 3 ? <Button variant="primary" type="submit">Continuar</Button> : <Button variant="success" type="submit">Registrarse</Button>}
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const InputField = ({ label, name, type = "text", value, onChange, children, ...props }) => (
  <Form.Group controlId={name} className="mt-3">
    <Form.Label>{label}</Form.Label>
    <Form.Control name={name} type={type} value={value} onChange={onChange} {...props}>
      {children}
    </Form.Control>
  </Form.Group>
);

export default RegisterWorkerFinal;
