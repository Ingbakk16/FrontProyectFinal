import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Header from '../header/header';
import Footer from '../footer/footer';
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from '../services/authenticationContext/authentication.context';
import { ThemeContext } from '../services/ThemeContext/Theme.context';
import './Profile.css';

const Profile = () => {
  const { token, handleLogout } = useContext(AuthenticationContext); // Añade logout aquí
  const { theme } = useContext(ThemeContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    lastname: '',
    username: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        console.error("No token available.");
        return;
      }

      try {
        const response = await fetch('http://localhost:8081/api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setFormData({
          name: data.name,
          email: data.email,
          lastname: data.lastname,
          username: data.username,
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/users/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedData = await response.json();
      setFormData(updatedData);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully');
      setErrorMessage('');

      // Llama a logout para redirigir al usuario a la página de inicio de sesión
      handleLogout();
    } catch (error) {
      setErrorMessage('Error updating profile');
      setSuccessMessage('');
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const backHandler = () => {
    navigate('/');
  };

  const getInitials = () => {
    const { name, lastname } = formData;
    if (!name || !lastname) return '';
    return `${name.charAt(0).toUpperCase()}${lastname.charAt(0).toUpperCase()}`;
  };

  return (
    <div className={`Background ${theme === 'dark' ? 'background-dark-profile' : 'background-light-profile'}`}>
      <Header />
      <Container fluid className={`Background ${theme === 'dark' ? 'background-dark-profile' : 'background-light-profile'}`}>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className={`p-4 shadow-lg profile-card ${theme === 'dark' ? 'profile-card-dark' : ''}`}>
              <Row>
                <Col md={8}>
                  <div className="back-button">
                    <Button variant="link" className="text-light" onClick={backHandler}>
                      <i className="bi bi-arrow-left text-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                          <path d="M400-120 160-360l241-241 56 57-144 144h367v-400h80v480H313l144 143-57 57Z" />
                        </svg>
                      </i>
                    </Button>
                  </div>

                  <div className={`${theme === 'dark' ? 'profile-initials-circle-dark' : 'profile-initials-circle'}`}>
                    {getInitials()}
                  </div>

                  {successMessage && <Alert variant="success">{successMessage}</Alert>}
                  {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label className={`${theme === 'dark' ? 'text-light' : 'text-dark'}`}>Username:</Form.Label>
                      <Form.Control
                        plaintext={!isEditing}
                        readOnly={!isEditing}
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={`${theme === 'dark' ? 'text-light' : 'text-dark'}`}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className={`${theme === 'dark' ? 'text-light' : 'text-dark'}`}>Name:</Form.Label>
                      <Form.Control
                        plaintext={!isEditing}
                        readOnly={!isEditing}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`${theme === 'dark' ? 'text-light' : 'text-dark'}`}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className={`${theme === 'dark' ? 'text-light' : 'text-dark'}`}>Email:</Form.Label>
                      <Form.Control
                        plaintext={!isEditing}
                        readOnly={!isEditing}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`${theme === 'dark' ? 'text-light' : 'text-dark'}`}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className={`${theme === 'dark' ? 'text-light' : 'text-dark'}`}>Last Name:</Form.Label>
                      <Form.Control
                        plaintext={!isEditing}
                        readOnly={!isEditing}
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className={`${theme === 'dark' ? 'text-light' : 'text-dark'}`}
                      />
                    </Form.Group>
                    {isEditing ? (
                      <>
                        <Button variant="primary" className="w-100" onClick={handleSaveClick}>
                          Save
                        </Button>
                        <Button variant="secondary" className="w-100 mt-2" onClick={handleCancelClick}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button onClick={handleEditClick} variant="primary" className="w-100">
                        Edit
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
  name: PropTypes.string,
  email: PropTypes.string,
  lastname: PropTypes.string,
  username: PropTypes.string,
};

export default Profile;
