import React, { useRef, useState, useContext } from "react";
import { Button, Card, Form, FormGroup } from "react-bootstrap";
import { AuthenticationContext } from "../services/authenticationContext/authentication.context";
import { ThemeContext } from "../services/ThemeContext/Theme.context"; // Importa el ThemeContext
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { handleLogin } = useContext(AuthenticationContext);
  const { theme } = useContext(ThemeContext); // Usa el ThemeContext
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });
  const [loginError, setLoginError] = useState(""); 
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const changeUsernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (usernameRef.current.value.length <= 0) {
      usernameRef.current.focus();
      setErrors({ username: true, password: false });
      return;
    }

    if (password.length <= 0) {
      passwordRef.current.focus();
      setErrors({ username: false, password: true });
      return;
    }
    
    try {
      const response = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username, 
          password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token } = data;
        localStorage.setItem("token", token);
        handleLogin(username, token);
        navigate("/profile");
      } else {
        setLoginError("Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      setLoginError("Hubo un problema con el servidor. Intenta de nuevo.");
    }
  };

  // Cambiar el color de fondo según el tema
  const backgroundColor = theme === "dark" ? "#1F1F1F" : "linear-gradient(45deg, #6BF8EF, #87ACF7, #645DB5, #322A94)"; // Cambiar el color según el tema

  return (
    <div
      className={`principal ${theme === "dark" ? "theme-dark" : "theme-default"} d-flex justify-content-center align-items-center vh-100 `}
      style={{ backgroundColor }} // Aplicar el fondo dinámico
    >
      <Card className="p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}> 
        <Card.Body>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <p className="text-center mb-4">Inicie sesión para disfrutar de todos nuestros servicios</p>
          <Form onSubmit={submitHandler}>
            {loginError && <p className="text-danger text-center">{loginError}</p>} 
            <FormGroup className="mb-3">
              <Form.Control
                className={errors.username ? "border border-danger" : ""}
                ref={usernameRef}
                value={username}
                onChange={changeUsernameHandler}
                type="text"
                placeholder="Nombre de usuario"
                
              />
              {errors.username && <p className="pt-2 text-danger">El nombre de usuario es obligatorio</p>}
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Control
                className={errors.password ? "border border-danger" : ""}
                ref={passwordRef}
                value={password}
                onChange={changePasswordHandler}
                type="password"
                placeholder="Contraseña"
               
              />
              {errors.password && <p className="pt-2 text-danger">La contraseña es obligatoria</p>}
            </FormGroup>
            <Button variant="primary" type="submit" className="w-100">
              Iniciar sesión
            </Button>
            <p className="text-center mt-3">
              ¿No tiene una cuenta? <a href="/register">Regístrese aquí</a>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
