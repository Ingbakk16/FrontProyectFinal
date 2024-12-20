import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import SidebarButton from '../sidebar button/sidebarMenu';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../services/ThemeContext/Theme.context';
import { AuthenticationContext } from '../../services/authenticationContext/authentication.context';
import AdminConfirmationAlert from '../../ConfirmationAlert/ConfirmationAlert'; 
import './CategoryForm.css';

const CategoryForm = ({ initialCategory = { title: '', description: '', skillsRequired: '' } }) => {
  const [formData, setFormData] = useState({
    title: initialCategory.title,
    description: initialCategory.description,
    skillsRequired: initialCategory.skillsRequired,
  });
  
  const { theme } = useContext(ThemeContext);
  const { token } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const confirmAndSubmit = () => {
    AdminConfirmationAlert({
      title: "¿Confirm category creation?",
      text: "this action is gonna create a new category.",
      onConfirm: handleSubmit, 
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/admin/jobs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        navigate('/admin/AdminEditCategory'); 
      } else {
        throw new Error('Error al crear la categoría');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={`page-background ${theme === "dark" ? "background-dark" : "background-light"}`}>
      <Header />
      <Container fluid className="d-flex" style={{ minHeight: '90vh' }}>
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
                    className={theme === "dark" ? "form-control-dark" : ""}
                    required
                  />
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
                    rows={3}
                    className={theme === "dark" ? "form-control-dark" : ""}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="categorySkillsRequired">
                  <Form.Label>skills required</Form.Label>
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

export default CategoryForm;
