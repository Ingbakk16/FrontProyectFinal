import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Form, Container, Row, Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Header from '../header/header';
import Footer from '../footer/footer';
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from '../services/authenticationContext/authentication.context'; 

const Profile = () => {
  const { token } = useContext(AuthenticationContext); // Obtener solo el token
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Surname: '',
    profileImage: '', 
  });

  const navigate = useNavigate();

  // Fetch del perfil de usuario usando el token desde el contexto
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        console.error("No token available.");
        return; // No hacer nada si no hay token
      }

      try {
        const response = await fetch('http://localhost:8081/api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Usar el token para la autorización
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        // Actualiza el estado con los datos recibidos
        setFormData({
          Name: data.name,
          Email: data.email,
          Surname: data.lastname,
          profileImage: 'https://via.placeholder.com/100' // Aquí puedes asignar una imagen predeterminada
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [token]); // El efecto se dispara cuando cambia el token

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
    // Aquí puedes hacer una llamada al backend para actualizar los datos si es necesario
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const backHandler = () => {
    navigate('/');
  };

  return (
    <div style={{ background: "linear-gradient(45deg, #322A94, #645DB5, #87ACF7, #6BF8EF)" }}>
      <Header />
      <Container fluid className="py-4" style={{ background: "linear-gradient(45deg, #322A94, #645DB5, #87ACF7, #6BF8EF)", minHeight: "calc(100vw - 56px - 40px)" }}>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="p-4 shadow-lg" style={{ backgroundColor: "#8677C2", borderRadius: "20px" }}>
              <Row>
                <Col md={6}>
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
                    <Image src={formData.profileImage} roundedCircle />
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
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

Profile.propTypes = {
  Name: PropTypes.string,
  Email: PropTypes.string,
  Surname: PropTypes.string,
  profileImage: PropTypes.string
};

export default Profile;
