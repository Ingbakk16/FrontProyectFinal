import React, { useContext, useRef, useState } from 'react';
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
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const skillsRequiredRef = useRef(null);
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    skillsRequired: false,
  });

  const { theme } = useContext(ThemeContext);
  const { token } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const handleBlur = (ref, fieldName) => {
    if (ref.current.value === '') {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: true }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: false }));
    }
  };

  const confirmAndSubmit = () => {
    AdminConfirmationAlert({
      title: "¿Confirmar creación de categoría?",
      text: "Esta acción creará una nueva categoría.",
      onConfirm: handleSubmit, 
    });
  };

  const handleSubmit = async () => {
    const formData = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      skillsRequired: skillsRequiredRef.current.value,
    };

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
          <h2 className="text-center mb-4">Formulario de Categoría</h2>
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
                  <Form.Label>Título de la Categoría</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Ingresa el título de la categoría"
                    ref={titleRef}
                    onBlur={() => handleBlur(titleRef, 'title')}
                    className={`${theme === "dark" ? "form-control-dark" : ""} ${errors.title ? 'border-danger' : ''}`}
                    required
                  />
                  {errors.title && <small className="text-danger">Este campo es obligatorio.</small>}
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="categoryDescription">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    placeholder="Ingresa la descripción de la categoría"
                    ref={descriptionRef}
                    onBlur={() => handleBlur(descriptionRef, 'description')}
                    rows={3}
                    className={`${theme === "dark" ? "form-control-dark" : ""} ${errors.description ? 'border-danger' : ''}`}
                    required
                  />
                  {errors.description && <small className="text-danger">Este campo es obligatorio.</small>}
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="categorySkillsRequired">
                  <Form.Label>Habilidades Requeridas</Form.Label>
                  <Form.Control
                    type="text"
                    name="skillsRequired"
                    placeholder="Especifica las habilidades requeridas"
                    ref={skillsRequiredRef}
                    onBlur={() => handleBlur(skillsRequiredRef, 'skillsRequired')}
                    className={`${theme === "dark" ? "form-control-dark" : ""} ${errors.skillsRequired ? 'border-danger' : ''}`}
                  />
                  {errors.skillsRequired && <small className="text-danger">Este campo es obligatorio.</small>}
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

export default CategoryForm;
