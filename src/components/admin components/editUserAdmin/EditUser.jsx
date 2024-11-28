import React, { useContext, useRef, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import SidebarButton from "../sidebar button/sidebarMenu";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../../services/ThemeContext/Theme.context";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import AdminConfirmationAlert from "../../ConfirmationAlert/ConfirmationAlert";
import "./EditUserForm.css";

const EditUserForm = () => {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const { token } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  
  const usernameRef = useRef(null);
  const nameRef = useRef(null);
  const lastnameRef = useRef(null);
  const emailRef = useRef(null);

 
  const [errors, setErrors] = useState({
    username: false,
    name: false,
    lastname: false,
    email: false,
  });

  
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  
  const handleBlur = (ref, fieldName) => {
    const value = ref.current.value.trim();

    
    if (fieldName === "username") {
      if (value.length < 3 || value.length > 16) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Username must be between 3 and 16 characters.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: false }));
      }
    } 
    
    else if (value === "") {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "This field is mandatory" }));
    } 
    
    else if (fieldName === "email" && !emailRegex.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "Invalid email format" }));
    } 
    else {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: false }));
    }
  };

  
  const isFormValid = !Object.values(errors).some((error) => error !== false);

  
  const handleSave = async () => {
    const formData = {
      username: usernameRef.current.value,
      name: nameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
    };

    try {
      const response = await fetch(`http://localhost:8081/api/admin/edit/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/Admin");
      } else {
        throw new Error("Error al actualizar el usuario");
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  const handleConfirmSave = () => {
    AdminConfirmationAlert({
      title: "¿Confirm update?",
      text: "This action will update the user's information.",
      onConfirm: handleSave,
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div
      className={`page-background ${theme === "dark" ? "background-dark" : "background-light"}`}
    >
      <Header />
      <Container fluid className="d-flex">
        <Col md={2} className="bg-dark text-light sidebar-button-padding">
          <SidebarButton />
        </Col>
        <Col md={10} className="p-4">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleConfirmSave();
            }}
            className={`edit-user-form ${theme === "dark" ? "edit-user-form-dark" : ""}`}
          >
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    ref={usernameRef}
                    onBlur={() => handleBlur(usernameRef, 'username')}
                    className={`${theme === "dark" ? "form-control-dark" : ""} ${errors.username ? 'border-danger' : ''}`}
                  />
                  {errors.username && <small className="text-danger">{errors.username}</small>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    ref={nameRef}
                    onBlur={() => handleBlur(nameRef, 'name')}
                    className={`${theme === "dark" ? "form-control-dark" : ""} ${errors.name ? 'border-danger' : ''}`}
                  />
                  {errors.name && <small className="text-danger">{errors.name}</small>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Lastname</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    ref={lastnameRef}
                    onBlur={() => handleBlur(lastnameRef, 'lastname')}
                    className={`${theme === "dark" ? "form-control-dark" : ""} ${errors.lastname ? 'border-danger' : ''}`}
                  />
                  {errors.lastname && <small className="text-danger">{errors.lastname}</small>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    ref={emailRef}
                    onBlur={() => handleBlur(emailRef, 'email')}
                    className={`${theme === "dark" ? "form-control-dark" : ""} ${errors.email ? 'border-danger' : ''}`}
                  />
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </Form.Group>
              </Col>
            </Row>
            <div className="form-actions">
              <Button type="submit" className="btn-save" disabled={!isFormValid}>
                Save
              </Button>
              <Button
                type="button"
                className="btn-cancel"
                onClick={handleCancel}
              >
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
export default EditUserForm;
