import React, { useState } from 'react';
import { Button, Card, Form, Container, Row, Col, Image, Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Header from '../header/header';
import Footer from '../footer/footer';
import { useNavigate } from "react-router-dom";

const mono = {
  Name: "Jose Luis",
  Email: "JoseLuis@gmail.com",
  Surname: "Carlos Bodoque",
  Password: "asdf1234",
  profileImage: "https://via.placeholder.com/100",
  profession: "Ingeniero"
};

const Profile = ({ Name, Email, Surname, Password, profileImage }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    Name: Name || mono.Name,
    Email: Email || mono.Email,
    Surname: Surname || mono.Surname,
    Password: Password || mono.Password,
    profileImage: profileImage || mono.profileImage,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setFormData({
      Name: Name || mono.Name,
      Email: Email || mono.Email,
      Surname: Surname || mono.Surname,
      Password: Password || mono.Password,
      profileImage: profileImage || mono.profileImage,
    });
    setIsEditing(false);
  };

  const backHandler = () => {
    navigate("/");
  };

  const WorkerRegisterHandler = () => {
    navigate("/RegisterWorker");
  };

  const EditWorkerHandler = () => {
    navigate("/EditWorker");
  };

  return (
    <>
      <Header />

      <Container fluid className="py-4" style={{ background: "linear-gradient(45deg, #322A94, #645DB5, #87ACF7, #6BF8EF)", minHeight: "calc(100vh - 56px - 40px)" }}>
        <Row className="justify-content-center">
          <Col md={8} xs={12}>
            <Card className="p-4 shadow-lg" style={{ backgroundColor: "#8677C2", borderRadius: "20px" }}>
              <Row>
                {/* Izquierda - Información de perfil */}
                <Col md={6} xs={12}>
                  <div className="d-flex align-items-center mb-4">
                    <Button variant="link" className="text-light" onClick={backHandler}>
                      <i className="bi bi-arrow-left text-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                          <path d="M400-120 160-360l241-241 56 57-144 144h367v-400h80v480H313l144 143-57 57Z" />
                        </svg>
                      </i>
                    </Button>
                  </div>
                  <div className="text-center mb-4">
                    <Image src={formData.profileImage} roundedCircle className="img-fluid" />
                  </div>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Nombre:</Form.Label>
                      <Form.Control
                        plaintext={!isEditing}
                        readOnly={!isEditing}
                        type="text"
                        name="Name"
                        value={formData.Name}
                        onChange={handleChange}
                        className="text-dark"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Email:</Form.Label>
                      <Form.Control
                        plaintext={!isEditing}
                        readOnly={!isEditing}
                        type="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        className="text-dark"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Password:</Form.Label>
                      <Form.Control
                        plaintext={!isEditing}
                        readOnly={!isEditing}
                        type="password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleChange}
                        className="text-dark"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Apellido:</Form.Label>
                      <Form.Control
                        plaintext={!isEditing}
                        readOnly={!isEditing}
                        type="text"
                        name="Surname"
                        value={formData.Surname}
                        onChange={handleChange}
                        className="text-dark"
                      />
                    </Form.Group>
                    {isEditing ? (
                      <>
                        <Button variant="primary" className="w-100" onClick={handleSaveClick}>
                          Guardar
                        </Button>
                        <Button variant="secondary" className="w-100 mt-2" onClick={handleCancelClick}>
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <Button onClick={handleEditClick} variant="primary" className="w-100">
                        Editar
                      </Button>
                    )}
                  </Form>
                </Col>

                {/* Derecha - Carrusel con WorkerProfile Preview y Agregar Profesión */}
                <Col md={6} xs={12} className="d-flex flex-column align-items-center">
                  <Carousel indicators={false} controls={true} className="w-100 h-100">
                    <Carousel.Item>
                      <div className="d-flex flex-column justify-content-center align-items-center text-light"
                        style={{
                          border: "1px solid #00FFFF",
                          borderRadius: "10px",
                          padding: "10px",
                          backgroundColor: "#2D195C",
                          height: "50vh"  // Cambiar a 50vh para altura adaptable al viewport
                        }}>
                        <Image src={formData.profileImage} roundedCircle className="mb-2 img-fluid" style={{ width: "60px", height: "60px" }} />
                        <h5>{formData.Name}</h5>
                        <p>Profesion: {mono.profession}</p>
                        <Button onClick={EditWorkerHandler} variant="primary">
                          Ver Perfil
                        </Button>
                      </div>
                    </Carousel.Item>

                    <Carousel.Item>
                      <div className="d-flex flex-column justify-content-center align-items-center"
                        style={{
                          border: "2px dashed #00FFFF",
                          borderRadius: "10px",
                          padding: "20px",
                          backgroundColor: "#322A94",
                          height: "50vh"  // Cambiar a 50vh para altura adaptable al viewport
                        }}>
                        <div style={{ fontSize: "60px", color: "#00FFFF" }}>+</div>
                        <p className="text-light text-center">
                          ¿Tienes una habilidad práctica o útil? Agrega una profesión sin costo y espera a ser contactado por un cliente!
                        </p>
                        <Button className="w-100" onClick={WorkerRegisterHandler} variant="primary">
                          Agregar Profesión
                        </Button>
                      </div>
                    </Carousel.Item>
                  </Carousel>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

Profile.propTypes = {
  Name: PropTypes.string,
  Email: PropTypes.string,
  Surname: PropTypes.string,
  Password: PropTypes.string,
  profileImage: PropTypes.string
};

export default Profile;


