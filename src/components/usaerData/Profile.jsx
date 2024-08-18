

import React from 'react';
import { Button, Card, Form, Container, Row, Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Header from '../header/header';
import Footer from '../footer/footer';

// Suponiendo que este usuario viene de un estado o de props, lo pongo aquí como ejemplo.
const user = {
  Name: "Jose Luis",
  Email: "JoseLuis@gmail.com",
  Surname: "Carlos Bodoque",
  Password: "*******",
  profileImage: "https://via.placeholder.com/100"
};

const Profile = ({ Name, Email, Surname, Password, profileImage }) => {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Profile Content */}
      <Container fluid className="py-4" style={{ background: "linear-gradient(45deg, #322A94, #645DB5, #87ACF7, #6BF8EF)", minHeight: "calc(100vh - 56px - 40px)" }}>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="p-4 shadow-lg" style={{ backgroundColor: "#8677C2", borderRadius: "20px" }}>
              <Row>
                {/* Profile Info Section */}
                <Col md={6}>
                  <div className="d-flex align-items-center mb-4">
                    <Button variant="link" className="text-light">
                      <i className="bi bi-arrow-left"></i>
                    </Button>
                  </div>
                  <div className="text-center mb-4">
                    <Image src={profileImage ? profileImage : "https://via.placeholder.com/100"} roundedCircle />
                  </div>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Nombre:</Form.Label>
                      <Form.Control plaintext readOnly value={Name} className="text-light" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Email:</Form.Label>
                      <Form.Control plaintext readOnly value={Email} className="text-light" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Password:</Form.Label>
                      <Form.Control plaintext readOnly value={Password} className="text-light" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Apellido:</Form.Label>
                      <Form.Control plaintext readOnly value={Surname} className="text-light" />
                    </Form.Group>
                    <Button variant="primary" className="w-100">
                      Editar
                    </Button>
                  </Form>
                </Col>

                {/* Additional Section */}
                <Col md={6} className="d-flex align-items-center justify-content-center">
                  <div className="text-center " style={{ border: "2px dashed #00FFFF", borderRadius: "10px", padding: "20px", width: "auto", height: "auto" }}>
                    <div style={{ fontSize: "60px", color: "#00FFFF" }}>+</div>
                    <p className="text-light">Tienes una habilidad práctica o útil? Agrega una profesión sin costo y espera a ser contactado por un cliente!</p>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
};

// Llamada al componente Profile con props
const App = () => (
  <Profile
    Name={user.Name}
    Email={user.Email}
    Surname={user.Surname}
    Password={user.Password}
    profileImage={user.profileImage}
  />
);

Profile.propTypes = {
  Name: PropTypes.string.isRequired,
  Email: PropTypes.string.isRequired,
  Surname: PropTypes.string.isRequired,
  Password: PropTypes.string.isRequired,
  profileImage: PropTypes.string
};

export default App;


