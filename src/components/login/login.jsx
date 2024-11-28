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
  const [isFormValid, setIsFormValid] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const USERNAME_MIN_LENGTH = 3;
  const USERNAME_MAX_LENGTH = 16;
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

  const handleBlur = (field, value, validator) => {
    const error = validator(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
    validateForm({ ...errors, [field]: error });
  };

  
  const validateForm = (updatedErrors) => {
    setIsFormValid(Object.values(updatedErrors).every((error) => !error));
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      username: validateUsername(value),
    }));
    validateForm({ ...errors, username: validateUsername(value) });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(value),
    }));
    validateForm({ ...errors, password: validatePassword(value) });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

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
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token } = data;
        localStorage.setItem("token", token);
        handleLogin(username, token);

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
    <div
      className={`principal d-flex justify-content-center align-items-center vh-100 ${
        theme === "dark" ? "theme-dark" : "theme-default"
      }`}
    >
      <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          <p className="text-center mb-4">Log in to enjoy all our services</p>
          <Form onSubmit={submitHandler}>
            {loginError && <p className="text-danger text-center">{loginError}</p>}
            <FormGroup className="mb-3">
              <Form.Control
                className={errors.username ? "border border-danger" : ""}
                value={username}
                onChange={handleUsernameChange}
                onBlur={() =>
                  handleBlur("username", username, validateUsername)
                }
                type="text"
                placeholder="Username"
                style={{
                  backgroundColor: theme === "dark" ? "#2B2B2B" : "#ffffff",
                  color: theme === "dark" ? "#ffffff" : "#000000",
                }}
              />
              {errors.username && (
                <p className="pt-2 text-danger">{errors.username}</p>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Control
                className={errors.password ? "border border-danger" : ""}
                value={password}
                onChange={handlePasswordChange}
                onBlur={() =>
                  handleBlur("password", password, validatePassword)
                }
                type="password"
                placeholder="Password"
                style={{
                  backgroundColor: theme === "dark" ? "#2B2B2B" : "#ffffff",
                  color: theme === "dark" ? "#ffffff" : "#000000",
                }}
              />
              {errors.password && (
                <p className="pt-2 text-danger">{errors.password}</p>
              )}
            </FormGroup>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={!isFormValid}
            >
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

