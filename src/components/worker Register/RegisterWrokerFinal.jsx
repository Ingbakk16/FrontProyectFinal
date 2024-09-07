import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 

const RegisterWorkerFinal = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    dni: "",
    job: "",
    password: "",
    contact: "",
    profilePicture: null,
    description: "",
    workImages: [],
  });
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [key]: file });
  };

  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, workImages: files });
  };

  const validateStep = () => {
    const newErrors = [];
    if (step === 1) {
      if (!formData.dni.match(/^\d{8}$/)) newErrors.push("El DNI debe tener 8 números.");
      if (formData.password.length < 6) newErrors.push("La contraseña debe tener al menos 6 caracteres.");
      if (!formData.contact.match(/^\+?\d{10,15}$/)) newErrors.push("El contacto debe ser un número válido.");
    } else if (step === 2) {
      if (!formData.profilePicture) newErrors.push("Debe subir una foto de perfil.");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateStep();
    if (formErrors.length > 0) return setErrors(formErrors);

    setSuccess(true);
    setErrors([]);
    setStep(1);

    
    navigate("/Profile");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <InputField label="DNI" name="dni" type="text" value={formData.dni} onChange={handleChange} />
            <InputField label="Trabajo" name="job" as="select" value={formData.job} onChange={handleChange}>
              <option value="">Seleccione su trabajo</option>
              <option value="Ingeniero">Ingeniero</option>
              <option value="Arquitecto">Arquitecto</option>
              <option value="Doctor">Doctor</option>
              <option value="Otro">Otro</option>
            </InputField>
            <InputField label="Contraseña" name="password" type="password" value={formData.password} onChange={handleChange} />
            <InputField label="Contacto" name="contact" type="text" value={formData.contact} onChange={handleChange} />
          </>
        );
      case 2:
        return (
          <>
            <Form.Group controlId="profilePicture">
              <Form.Label>Foto de Perfil</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={(e) => handleImageChange(e, "profilePicture")} />
            </Form.Group>
            <InputField label="Descripción" name="description" as="textarea" rows={3} value={formData.description} onChange={handleChange} />
            <Form.Group controlId="workImages">
              <Form.Label>Imágenes de su Trabajo (opcional)</Form.Label>
              <Form.Control type="file" accept="image/*" multiple onChange={handleMultipleImagesChange} />
            </Form.Group>
          </>
        );
      case 3:
        return (
          <div className="text-center">
            <h4>Revisa tu información</h4>
            {Object.entries(formData).map(([key, value], idx) => (
              <p key={idx}>
                <strong>{key}:</strong> 
                {Array.isArray(value)
                  ? value.map((img) => img.name).join(", ") // Mostrar nombres de archivos si es una lista de imágenes
                  : value instanceof File
                  ? value.name // Mostrar el nombre del archivo si es un objeto File
                  : value || "N/A"}
              </p>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "linear-gradient(45deg, #6BF8EF, #87ACF7, #645DB5, #322A94)" }}>
      <Row>
        <Col xs={12} md={8} lg={10}>
          <Form onSubmit={step === 3 ? handleSubmit : handleNext} className="p-4" style={{ backgroundColor: "#f8f9fa", borderRadius: "1rem", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
            <h3 className="text-center mb-4">Registro de Trabajador</h3>
            <p className="text-center">¡Regístrese para formar parte de esta gran familia!</p>

            {errors.length > 0 && <Alert variant="danger">{errors.join(", ")}</Alert>}
            {success && <Alert variant="success">¡Registro exitoso!</Alert>}

            <ProgressBar now={(step / 3) * 100} className="mb-4" />

            {renderStep()}

            <div className="d-flex justify-content-between mt-4">
              {step > 1 && <Button variant="secondary" onClick={handleBack}>Atrás</Button>}
              {step < 3 ? <Button variant="primary" type="submit">{step === 1 ? "Revisar" : "Continuar"}</Button> : <Button variant="success" type="submit">Registrarse</Button>}
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
