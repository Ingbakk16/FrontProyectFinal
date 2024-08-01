import React, { useRef, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";


const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    //const navigate = useNavigate();

    const changeEmailHandler = (event) => {
        setEmail(event.target.value);
    };

    const changePasswordHandler = (event) => {
        setPassword(event.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (emailRef.current.value.length <= 0) {
            emailRef.current.focus();
            setErrors({ email: true, password: false });
            return;
        }

        if (password.length <= 0) {
            passwordRef.current.focus();
            setErrors({ email: false, password: true });
            return;
        }

        onLogin();

        navigate("/");
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" 
        style={{ background: "linear-gradient(45deg, #6BF8EF, #87ACF7, #645DB5, #322A94 )" }}>
            <Card className="p-4 shadow" style={{ width: '25rem', borderRadius:"5vh" }}>
                <Card.Body>
                    <h2 className="text-center mb-4">
                        Registro
                        </h2>
                    <p className="text-center mb-4">
                        Regístrece para formar parte de esta gran familia!
                    </p>
                    <Form onSubmit={submitHandler}>
                        <FormGroup className="mb-3">
                            <Form.Control
                                className={errors.email ? "border border-danger" : ""}
                                ref={emailRef}
                                value={email}
                                onChange={changeEmailHandler}
                                type="email"
                                placeholder="E-mail"
                            />
                            {errors.email && <p className="pt-2 text-danger">El email es obligatorio</p>}
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Control
                                className={errors.password ? "border border-danger" : ""}
                                ref={passwordRef}
                                value={password}
                                onChange={changePasswordHandler}
                                type="password"
                                placeholder="Password"
                            />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Name"
                            />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Apellido"
                            />
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

export default Login;
