import React, { useRef, useState, useContext } from "react";
import { Button, Card, Form, FormGroup } from "react-bootstrap";
import { AuthenticationContext } from "../services/authenticationContext/authentication.context";
import { ThemeContext } from "../services/ThemeContext/Theme.context";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { handleLogin } = useContext(AuthenticationContext);
  const { theme } = useContext(ThemeContext);
  const [loginError, setLoginError] = useState(""); 
  const navigate = useNavigate();

  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const USERNAME_MIN_LENGTH = 3;
  const USERNAME_MAX_LENGTH = 15;
  const PASSWORD_MIN_LENGTH = 8;

  const validateUsername = (value) => {
    if (!value) return "Username is required";
    if (value.length < USERNAME_MIN_LENGTH) return `Must be between ${USERNAME_MIN_LENGTH} and ${USERNAME_MAX_LENGTH} characters`;
    if (value.length > USERNAME_MAX_LENGTH) return `Must be between ${USERNAME_MIN_LENGTH} and ${USERNAME_MAX_LENGTH} characters`;
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < PASSWORD_MIN_LENGTH) return `Must be at least ${PASSWORD_MIN_LENGTH} characters`;
    return "";
  };

  const changeUsernameHandler = () => {
    const value = usernameRef.current.value;
    setErrors((prevErrors) => ({ ...prevErrors, username: validateUsername(value) }));
  };

  const changePasswordHandler = () => {
    const value = passwordRef.current.value;
    setErrors((prevErrors) => ({ ...prevErrors, password: validatePassword(value) }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const usernameError = validateUsername(usernameRef.current.value);
    const passwordError = validatePassword(passwordRef.current.value);

    if (usernameError || passwordError) {
      setErrors({ username: usernameError, password: passwordError });
      return; 
    }

    try {
      const response = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token } = data;
        localStorage.setItem("token", token);
        handleLogin(usernameRef.current.value, token);
      
        setTimeout(() => navigate("/mainPage"), 100);
      } else {
        setLoginError("Incorrect username or password.");
      }
    } catch (error) {
      console.error("Error trying to log in:", error);
      setLoginError("There was a server issue. Please try again.");
    }
  };

  return (
    <div className={`principal d-flex justify-content-center align-items-center vh-100 ${theme === "dark" ? "theme-dark" : "theme-default"}`}>
      <Card className="p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}> 
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          <p className="text-center mb-4">Log in to enjoy all our services</p>
          <Form onSubmit={submitHandler}>
            {loginError && <p className="text-danger text-center">{loginError}</p>} 
            <FormGroup className="mb-3">
              <Form.Control
                className={errors.username ? "border border-danger" : ""}
                ref={usernameRef} 
                onChange={changeUsernameHandler} 
                type="text"
                placeholder="Username"
                style={{
                  backgroundColor: theme === "dark" ? "#2B2B2B" : "#ffffff",
                  color: theme === "dark" ? "#ffffff" : "#000000",
                }}
              />
              {errors.username && <p className="pt-2 text-danger">{errors.username}</p>}
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Control
                className={errors.password ? "border border-danger" : ""}
                ref={passwordRef}
                onChange={changePasswordHandler} 
                type="password"
                placeholder="Password"
                style={{
                  backgroundColor: theme === "dark" ? "#2B2B2B" : "#ffffff",
                  color: theme === "dark" ? "#ffffff" : "#000000",
                }}
              />
              {errors.password && <p className="pt-2 text-danger">{errors.password}</p>}
            </FormGroup>
            <Button variant="primary" type="submit" className="w-100">
              Log in
            </Button>
            <p className="text-center mt-3">
              Don’t have an account? <a href="/register">Sign up here</a>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
