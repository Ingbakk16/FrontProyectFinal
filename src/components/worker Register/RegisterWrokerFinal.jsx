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
import { toast } from "react-toastify";

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
    address: "",
    phoneNumber: "",
    description: "",
    imageUrls: [], 
    rating: 0,
  });

  const DNI_MIN_LENGTH = 6;
  const DNI_MAX_LENGTH = 8;

  const validateStep = useCallback(() => {
    const newErrors = {};
    if (step === 1) {
      newErrors.dni = validateDNI(formData.dni);
      newErrors.jobId = validateJobId(formData.jobId);
      newErrors.address = validateAddress(formData.address);
      newErrors.phoneNumber = validatePhoneNumber(formData.phoneNumber);
    } else if (step === 2) {
      newErrors.description = validateDescription(formData.description);
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  }, [formData, step]);

  const validateDNI = (value) => {
    if (!value) return "DNI is mandatory";
    if (value.length < DNI_MIN_LENGTH) return `Must have at least ${DNI_MIN_LENGTH} characters`;
    if (value.length > DNI_MAX_LENGTH) return `Cannot exceed ${DNI_MAX_LENGTH} characters`;
    return "";
  };

  const validateJobId = (value) => (!value ? "Selecting a job is mandatory" : "");
  const validateAddress = (value) => (!value ? "Address is mandatory" : "");
  const validatePhoneNumber = (value) => (!value ? "Phone number is mandatory" : "");
  const validateDescription = (value) => (!value ? "Description is mandatory" : "");

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    if (field === "dni" || field === "phoneNumber") {
      const numericValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      setFormData({ ...formData, [field]: numericValue });
    } else {
      
    setFormData((prevData) => ({ ...prevData, [field]: value }));}
    setTouchedFields((prevTouched) => ({ ...prevTouched, [field]: true }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: validateField(field, value) }));
  };

  const validateField = (field, value) => {
    switch (field) {
      case "dni":
        return validateDNI(value);
      case "jobId":
        return validateJobId(value);
      case "address":
        return validateAddress(value);
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
        setErrors({ general: "Error fetching job categories" });
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
        toast.success("Registration successful!", { position: "top-right" });
        setSuccess(true);
        handleLogout();
        navigate("/login");
      } else {
        const errorData = await response.json();
        setErrors({ general: errorData.message });
        toast.error("Registration error", { position: "top-right" });
      }
    } catch (error) {
      setErrors({ general: "Error registering the worker." });
      toast.error("Error registering the worker.", { position: "top-right" });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <InputField label="DNI" name="dni" value={formData.dni} onChange={handleChange("dni")} error={errors.dni} touched={touchedFields.dni} />
            <Form.Group controlId="jobId" className="mt-3">
              <Form.Label>Select a Job</Form.Label>
              <Form.Control as="select" name="jobId" value={formData.jobId} onChange={handleChange("jobId")}>
                <option value="">Select an option</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </Form.Control>
              {errors.jobId && touchedFields.jobId && <p className="pt-2 text-danger">{errors.jobId}</p>}
            </Form.Group>
            <InputField label="Address" name="address" value={formData.address} onChange={handleChange("address")} error={errors.address} touched={touchedFields.address} />
            <InputField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange("phoneNumber")} error={errors.phoneNumber} touched={touchedFields.phoneNumber} />
          </>
        );
      case 2:
        return (
          <>
            <InputField label="Description" name="description" value={formData.description} onChange={handleChange("description")} error={errors.description} touched={touchedFields.description} />
          </>
        );
      case 3:
        const selectedCategory = categories.find((cat) => cat.id === formData.jobId)?.title || "N/A";
        return (
          <div className="review-step-container">
            <h4 className="text-center">Review Your Information</h4>
            <p><strong>DNI:</strong> {formData.dni}</p>
            <p><strong>Job:</strong> {selectedCategory}</p>
            <p><strong>Address:</strong> {formData.address}</p>
            <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
            <p><strong>Description:</strong> {formData.description}</p>
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
            <h3>Worker Registration</h3>
            {errors.general && <Alert variant="danger">{errors.general}</Alert>}
            {success && <Alert variant="success">Registration successful!</Alert>}
            <div style={{ marginBottom: "10%" }}>
            <ProgressBar now={(step / 3) * 100} />
            </div>
            {renderStep()}
            <div className="button-container d-flex justify-content-between">
              <Button variant="danger" onClick={handleCancel}>Cancel</Button>
              <div>
                {step > 1 && <Button variant="secondary" onClick={handleBack}>Back</Button>}
                {step < 3 ? (
                  <Button variant="primary" type="submit" disabled={!canProceed && step < 3}>Next</Button>
                ) : (
                  <Button variant="success" type="submit" disabled={!canProceed && step < 3}>Register</Button>
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
