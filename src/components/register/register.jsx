import React, { useState, useContext, useEffect } from "react";
import { Button, Card, Form, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../services/ThemeContext/Theme.context";
import './register.css';

const Register = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const changeUsernameHandler = (event) => {
    const value = event.target.value;
    setUsername(value);
    setErrors((prevErrors) => ({ ...prevErrors, username: validateUsername(value) }));
  };

  const changeNameHandler = (event) => {
    const value = event.target.value;
    
    if (/^[a-zA-Z]*$/.test(value) || value === "") {
      setName(value);
      setErrors((prevErrors) => ({ ...prevErrors, name: validateName(value) }));
    }
  };
  
  const changeLastnameHandler = (event) => {
    const value = event.target.value;
    
    if (/^[a-zA-Z]*$/.test(value) || value === "") {
      setLastname(value);
      setErrors((prevErrors) => ({ ...prevErrors, lastname: validateLastname(value) }));
    }
  };

  const changeEmailHandler = (event) => {
    const value = event.target.value;
    setEmail(value);
    setErrors((prevErrors) => ({ ...prevErrors, email: validateEmail(value) }));
  };

  const changePasswordHandler = (event) => {
    const value = event.target.value;
    setPassword(value);
    setErrors((prevErrors) => ({ ...prevErrors, password: validatePassword(value) }));
  };

  // Update isFormValid whenever errors or values change
  useEffect(() => {
    const allValid =
      !validateUsername(username) &&
      !validateName(name) &&
      !validateLastname(lastname) &&
      !validateEmail(email) &&
      !validatePassword(password);
    setIsFormValid(allValid);
  }, [username, name, lastname, email, password]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      const response = await fetch("http://localhost:8081/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, name, lastname, email, password }),
      });

      if (response.ok) {
        setShowSuccessPopup(true);  
        setTimeout(() => {
        setShowSuccessPopup(false);
        setUsername("");
        setName("");
        setLastname("");
        setEmail("");
        setPassword("");
        navigate("/login");
      }, 1500);
      } else {
        throw new Error("Error en el registro");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al registrarse. Por favor, intente nuevamente.");
    }
  };

  const backgroundStyle = {
    background: theme === "dark" ? "#1F1F1F" : "linear-gradient(45deg, #6BF8EF, #87ACF7, #645DB5, #322A94)",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={backgroundStyle}>
      <Card className="p-4 shadow" style={{ width: "25rem", borderRadius: "5vh" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Registro</h2>
          <p className="text-center mb-4">Regístrese para formar parte de esta gran familia!</p>
          <Form onSubmit={submitHandler}>
            <FormGroup className="mb-3">
              <Form.Control
                className={errors.username ? "border border-danger" : ""}
                value={username}
                onChange={changeUsernameHandler}
                type="text"
                placeholder="Nombre de usuario"
                style={{
                  backgroundColor: theme === "dark" ? "#2B2B2B" : "#ffffff",
                  color: theme === "dark" ? "#ffffff" : "#000000",
                }}
              />
              {errors.username && <p className="pt-2 text-danger">{errors.username}</p>}
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Control
                className={errors.name ? "border border-danger" : ""}
                value={name}
                onChange={changeNameHandler}
                type="text"
                placeholder="Nombre"
                style={{
                  backgroundColor: theme === "dark" ? "#2B2B2B" : "#ffffff",
                  color: theme === "dark" ? "#ffffff" : "#000000",
                }}
              />
              {errors.name && <p className="pt-2 text-danger">{errors.name}</p>}
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Control
                className={errors.lastname ? "border border-danger" : ""}
                value={lastname}
                onChange={changeLastnameHandler}
                type="text"
                placeholder="Apellido"
                style={{
                  backgroundColor: theme === "dark" ? "#2B2B2B" : "#ffffff",
                  color: theme === "dark" ? "#ffffff" : "#000000",
                }}
              />
              {errors.lastname && <p className="pt-2 text-danger">{errors.lastname}</p>}
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Control
                className={errors.email ? "border border-danger" : ""}
                value={email}
                onChange={changeEmailHandler}
                type="email"
                placeholder="E-mail"
                style={{
                  backgroundColor: theme === "dark" ? "#2B2B2B" : "#ffffff",
                  color: theme === "dark" ? "#ffffff" : "#000000",
                }}
              />
              {errors.email && <p className="pt-2 text-danger">{errors.email}</p>}
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Control
                className={errors.password ? "border border-danger" : ""}
                value={password}
                onChange={changePasswordHandler}
                type="password"
                placeholder="Contraseña"
                style={{
                  backgroundColor: theme === "dark" ? "#2B2B2B" : "#ffffff",
                  color: theme === "dark" ? "#ffffff" : "#000000",
                }}
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

       {/* Success Popup */}
       {showSuccessPopup && (
        <div className="success-popup">
          Registro exitoso!
        </div>
      )}
      
      

    </div>
  );
};

export default Register;
