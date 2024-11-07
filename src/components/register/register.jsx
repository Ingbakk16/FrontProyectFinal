import React, { useRef, useState, useContext } from "react";
import { Button, Card, Form, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../services/ThemeContext/Theme.context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './register.css';

const Register = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const usernameRef = useRef();
  const nameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState({
    username: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const USERNAME_MIN_LENGTH = 3;
  const USERNAME_MAX_LENGTH = 15;
  const PASSWORD_MIN_LENGTH = 8;
  const PASSWORD_MAX_LENGTH = 20;

  const validateUsername = (value) => {
    if (!value) return "El nombre de usuario es obligatorio";
    if (value.length < USERNAME_MIN_LENGTH) return `Debe tener al menos ${USERNAME_MIN_LENGTH} caracteres`;
    if (value.length > USERNAME_MAX_LENGTH) return `No puede superar ${USERNAME_MAX_LENGTH} caracteres`;
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "La contraseña es obligatoria";
    if (value.length < PASSWORD_MIN_LENGTH) return `Debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`;
    if (value.length > PASSWORD_MAX_LENGTH) return `No puede superar ${PASSWORD_MAX_LENGTH} caracteres`;
    return "";
  };

  const validateEmail = (value) => (!value ? "El email es obligatorio" : "");
  const validateName = (value) => (!value ? "El nombre es obligatorio" : "");
  const validateLastname = (value) => (!value ? "El apellido es obligatorio" : "");

  const handleBlur = (field, validator) => {
    const value = field.current.value;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field.current.name]: validator(value),
    }));
    setIsFormValid(Object.values(errors).every((error) => !error));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const response = await fetch("http://localhost:8081/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameRef.current.value,
          name: nameRef.current.value,
          lastname: lastnameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      });

      if (response.ok) {
        toast.success("Registro exitoso! Redirigiendo al login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        throw new Error("Error en el registro");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Hubo un error al registrarse. Por favor, intente nuevamente.");
    }
  };

  return (
    <div className={`register-background ${theme === "dark" ? "dark" : "default"}`}>
      <Card className="register-card">
        <Card.Body>
          <h2 className="text-center mb-4">Registro</h2>
          <p className="text-center mb-4">Regístrese para formar parte de esta gran familia!</p>
          <Form onSubmit={submitHandler}>
            <FormGroup className="mb-3">
              <Form.Control
                ref={usernameRef}
                name="username"
                className={`${errors.username ? "border-danger" : ""} ${theme === "dark" ? "input-dark" : "input-light"}`}
                type="text"
                placeholder="Nombre de usuario"
                onBlur={() => handleBlur(usernameRef, validateUsername)}
              />
              {errors.username && <p className="pt-2 text-danger">{errors.username}</p>}
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Control
                ref={nameRef}
                name="name"
                className={`${errors.name ? "border-danger" : ""} ${theme === "dark" ? "input-dark" : "input-light"}`}
                type="text"
                placeholder="Nombre"
                onBlur={() => handleBlur(nameRef, validateName)}
              />
              {errors.name && <p className="pt-2 text-danger">{errors.name}</p>}
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Control
                ref={lastnameRef}
                name="lastname"
                className={`${errors.lastname ? "border-danger" : ""} ${theme === "dark" ? "input-dark" : "input-light"}`}
                type="text"
                placeholder="Apellido"
                onBlur={() => handleBlur(lastnameRef, validateLastname)}
              />
              {errors.lastname && <p className="pt-2 text-danger">{errors.lastname}</p>}
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Control
                ref={emailRef}
                name="email"
                className={`${errors.email ? "border-danger" : ""} ${theme === "dark" ? "input-dark" : "input-light"}`}
                type="email"
                placeholder="E-mail"
                onBlur={() => handleBlur(emailRef, validateEmail)}
              />
              {errors.email && <p className="pt-2 text-danger">{errors.email}</p>}
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Control
                ref={passwordRef}
                name="password"
                className={`${errors.password ? "border-danger" : ""} ${theme === "dark" ? "input-dark" : "input-light"}`}
                type="password"
                placeholder="Contraseña"
                onBlur={() => handleBlur(passwordRef, validatePassword)}
              />
              {errors.password && <p className="pt-2 text-danger">{errors.password}</p>}
            </FormGroup>
            <Button variant="primary" type="submit" className="w-100" disabled={!isFormValid}>
              Regístrame
            </Button>
            <p className="text-center mt-3">¿Tiene una cuenta? <a href="/login">Inicie sesión aquí</a></p>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
