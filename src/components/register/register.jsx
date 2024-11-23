import React, { useRef, useState, useContext } from "react";
import { Button, Card, Form, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../services/ThemeContext/Theme.context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";

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
    if (!value) return "The user name is mandatory";
    if (value.length < USERNAME_MIN_LENGTH)
      return `need at least ${USERNAME_MIN_LENGTH} characters`;
    if (value.length > USERNAME_MAX_LENGTH)
      return `can't overcome ${USERNAME_MAX_LENGTH} characters`;
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "The password is mandatory";
    if (value.length < PASSWORD_MIN_LENGTH)
      return `need at least ${PASSWORD_MIN_LENGTH} characters`;
    if (value.length > PASSWORD_MAX_LENGTH)
      return `can't overcome ${PASSWORD_MAX_LENGTH} characters`;
    return "";
  };

  const validateEmail = (value) => (!value ? "The Email is mandatory" : "");
  const validateName = (value) => (!value ? "The Name is mandatory" : "");
  const validateLastname = (value) =>
    !value ? "The Last Name is mandatory" : "";

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
        toast.success("Successful signup! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        throw new Error("Error in the signup");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "Hubo un error al registrarse. Por favor, intente nuevamente."
      );
    }
  };

  return (
    <div
      className={`register-background ${theme === "dark" ? "dark" : "default"}`}
    >
      <Card className="register-card">
        <Card.Body>
          <h2 className="text-center mb-4">SignUp</h2>
          <p className="text-center mb-4">
            Register to be part of this great family!
          </p>
          <Form onSubmit={submitHandler}>
            <FormGroup className="mb-3">
              <Form.Control
                ref={usernameRef}
                name="user name"
                className={`${errors.username ? "border-danger" : ""} ${
                  theme === "dark" ? "input-dark" : "input-light"
                }`}
                type="text"
                placeholder="User name"
                onBlur={() => handleBlur(usernameRef, validateUsername)}
              />
              {errors.username && (
                <p className="pt-2 text-danger">{errors.username}</p>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Control
                ref={nameRef}
                name="name"
                className={`${errors.name ? "border-danger" : ""} ${
                  theme === "dark" ? "input-dark" : "input-light"
                }`}
                type="text"
                placeholder="Name"
                onBlur={() => handleBlur(nameRef, validateName)}
              />
              {errors.name && <p className="pt-2 text-danger">{errors.name}</p>}
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Control
                ref={lastnameRef}
                name="lastname"
                className={`${errors.lastname ? "border-danger" : ""} ${
                  theme === "dark" ? "input-dark" : "input-light"
                }`}
                type="text"
                placeholder="Last Name"
                onBlur={() => handleBlur(lastnameRef, validateLastname)}
              />
              {errors.lastname && (
                <p className="pt-2 text-danger">{errors.lastname}</p>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Control
                ref={emailRef}
                name="email"
                className={`${errors.email ? "border-danger" : ""} ${
                  theme === "dark" ? "input-dark" : "input-light"
                }`}
                type="email"
                placeholder="E-mail"
                onBlur={() => handleBlur(emailRef, validateEmail)}
              />
              {errors.email && (
                <p className="pt-2 text-danger">{errors.email}</p>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Control
                ref={passwordRef}
                name="password"
                className={`${errors.password ? "border-danger" : ""} ${
                  theme === "dark" ? "input-dark" : "input-light"
                }`}
                type="password"
                placeholder="Password"
                onBlur={() => handleBlur(passwordRef, validatePassword)}
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
              Continue
            </Button>
            <p className="text-center mt-3">
              Already have an account? <a href="/login">Log in here</a>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
