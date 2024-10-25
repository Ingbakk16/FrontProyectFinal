import React, { useRef, useState, useContext } from "react";
import { Button, Card, Form, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../services/ThemeContext/Theme.context"; // Importa el ThemeContext

const Register = () => {
  const { theme } = useContext(ThemeContext); // Usa el ThemeContext para obtener el tema
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: false,
    name: false,
    lastname: false,
    email: false,
    password: false,
  });

  const usernameRef = useRef(null);
  const nameRef = useRef(null);
  const lastnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const changeUsernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const changeNameHandler = (event) => {
    setName(event.target.value);
  };

  const changeLastnameHandler = (event) => {
    setLastname(event.target.value);
  };

  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (usernameRef.current.value.length <= 0) {
      usernameRef.current.focus();
      setErrors({ username: true, name: false, lastname: false, email: false, password: false });
      return;
    }

    if (nameRef.current.value.length <= 0) {
      nameRef.current.focus();
      setErrors({ username: false, name: true, lastname: false, email: false, password: false });
      return;
    }

    if (lastnameRef.current.value.length <= 0) {
      lastnameRef.current.focus();
      setErrors({ username: false, name: false, lastname: true, email: false, password: false });
      return;
    }

    if (emailRef.current.value.length <= 0) {
      emailRef.current.focus();
      setErrors({ username: false, name: false, lastname: false, email: true, password: false });
      return;
    }

    if (passwordRef.current.value.length <= 0) {
      passwordRef.current.focus();
      setErrors({ username: false, name: false, lastname: false, email: false, password: true });
      return;
    }
    
    try {
      const response = await fetch("http://localhost:8081/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          name,
          lastname,
          email,
          password,
        }),
      });

      if (response.ok) {
        alert("Registro exitoso");
        setUsername("");
        setName("");
        setLastname("");
        setEmail("");
        setPassword("");
        navigate("/login");
      } else {
        throw new Error("Error en el registro");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al registrarse. Por favor, intente nuevamente.");
    }
  };


  const backgroundStyle = {
    background: theme === "dark"
      ? "#1F1F1F"  
      : "linear-gradient(45deg, #6BF8EF, #87ACF7, #645DB5, #322A94)", 
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
          <p className="text-center mb-4">
            Regístrese para formar parte de esta gran familia!
          </p>
          <Form onSubmit={submitHandler}>
            <FormGroup className="mb-3">
              <Form.Control
                className={errors.username ? "border border-danger" : ""}
                ref={usernameRef}
                value={username}
                onChange={changeUsernameHandler}
                type="text"
                placeholder="Nombre de usuario"
                style={{ backgroundColor: theme === "dark" ? "#2B2B2B" : "#ffffff", color: theme === "dark" ? "#ffffff" : "#000000" }}
              />
              {errors.username && (
                <p className="pt-2 text-danger">El nombre de usuario es obligatorio</p>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Control
                className={errors.name ? "border border-danger" : ""}
                ref={nameRef}
                value={name}
                onChange={changeNameHandler}
                type="text"
                placeholder="Nombre"
                style={{ backgroundColor: theme === "dark" ? "#2B2B2B" : "#ffffff", color: theme === "dark" ? "#ffffff" : "#000000" }}
              />
              {errors.name && (
                <p className="pt-2 text-danger">El nombre es obligatorio</p>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Control
                className={errors.lastname ? "border border-danger" : ""}
                ref={lastnameRef}
                value={lastname}
                onChange={changeLastnameHandler}
                type="text"
                placeholder="Apellido"
                style={{ backgroundColor: theme === "dark" ? "#2B2B2B" : "#ffffff", color: theme === "dark" ? "#ffffff" : "#000000" }}
              />
              {errors.lastname && (
                <p className="pt-2 text-danger">El apellido es obligatorio</p>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Control
                className={errors.email ? "border border-danger" : ""}
                ref={emailRef}
                value={email}
                onChange={changeEmailHandler}
                type="email"
                placeholder="E-mail"
                style={{ backgroundColor: theme === "dark" ? "#2B2B2B" : "#ffffff", color: theme === "dark" ? "#ffffff" : "#000000" }}
              />
              {errors.email && (
                <p className="pt-2 text-danger">El email es obligatorio</p>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Control
                className={errors.password ? "border border-danger" : ""}
                ref={passwordRef}
                value={password}
                onChange={changePasswordHandler}
                type="password"
                placeholder="Contraseña"
                style={{ backgroundColor: theme === "dark" ? "#2B2B2B" : "#ffffff", color: theme === "dark" ? "#ffffff" : "#000000" }}
              />
              {errors.password && (
                <p className="pt-2 text-danger">La contraseña es obligatoria</p>
              )}
            </FormGroup>
            <Button variant="primary" type="submit" className="w-100">
              Regístrame
            </Button>
            <p className="text-center mt-3">
              ¿Tiene una cuenta? <a href="/login">Inicie sesión aquí</a>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
