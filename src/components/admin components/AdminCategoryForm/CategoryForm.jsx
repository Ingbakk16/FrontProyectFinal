import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import SidebarButton from "../sidebar button/sidebarMenu";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../services/ThemeContext/Theme.context";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import AdminConfirmationAlert from "../../ConfirmationAlert/ConfirmationAlert";
import "./CategoryForm.css";

const CategoryForm = ({ initialCategory = { title: "", description: "", skillsRequired: "" } }) => {
  const [formData, setFormData] = useState({
    title: initialCategory.title,
    description: initialCategory.description,
    skillsRequired: initialCategory.skillsRequired,
  });

  const [errors, setErrors] = useState({
    title: null,
    description: null,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const { theme } = useContext(ThemeContext);
  const { token } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case "title":
        return value.trim() === "" ? "Category title is required." : null;
      case "description":
        return value.trim() === "" ? "Description is required." : null;
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
    setFormData({ ...formData, [name]: value });

    
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  useEffect(() => {
    const areAllFieldsFilled = formData.title.trim() !== "" && formData.description.trim() !== "";
    const noErrors = Object.values(errors).every((error) => error === null);

    setIsFormValid(areAllFieldsFilled && noErrors);
  }, [formData, errors]);

  const confirmAndSubmit = () => {
    AdminConfirmationAlert({
      title: "¿Confirm category creation?",
      text: "This action will create a new category.",
      onConfirm: handleSubmit,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/admin/jobs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/admin/AdminEditCategory");
      } else {
        throw new Error("Error creating the category");
      }
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
          <h2 className="text-center mb-4">Category Form</h2>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              confirmAndSubmit();
            }}
            className={`edit-category-form ${theme === "dark" ? "edit-category-form-dark" : ""}`}
          >
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="categoryTitle">
                  <Form.Label>Category Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter the category title"
                    value={formData.title}
                    onChange={handleChange}
                    onBlur={() => handleBlur("title")}
                    className={errors.title ? "border-danger" : ""}
                    required
                  />
                  {errors.title && <small className="text-danger">{errors.title}</small>}
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="categoryDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    placeholder="Enter the category description"
                    value={formData.description}
                    onChange={handleChange}
                    onBlur={() => handleBlur("description")}
                    rows={3}
                    className={errors.description ? "border-danger" : ""}
                    required
                  />
                  {errors.description && <small className="text-danger">{errors.description}</small>}
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="categorySkillsRequired">
                  <Form.Label>Skills Required</Form.Label>
                  <Form.Control
                    type="text"
                    name="skillsRequired"
                    placeholder="Specify the skills required"
                    value={formData.skillsRequired}
                    onChange={handleChange}
                    className={theme === "dark" ? "form-control-dark" : ""}
                  />
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

export default CategoryForm;
