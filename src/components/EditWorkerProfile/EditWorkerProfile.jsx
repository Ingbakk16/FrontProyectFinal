import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Image, Container, Row, Col, Form } from 'react-bootstrap';
import Header from '../header/header';
import Footer from '../footer/footer';
import { AuthenticationContext } from '../services/authenticationContext/authentication.context';
import { ThemeContext } from '../services/ThemeContext/Theme.context'; // Importa ThemeContext
import '../WorkerProfile/WorkerStyle.css'; 
import { useNavigate } from 'react-router-dom';

const EditWorkerProfile = () => {
  const { token } = useContext(AuthenticationContext);
  const { theme } = useContext(ThemeContext); // Usa el ThemeContext
  const navigate = useNavigate();

  const [worker, setWorker] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    dni: '',
    direccion: '',
    workImages: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchWorkerProfile = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/workers/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setWorker(data);
          setFormData({
            description: data.description || '',
            dni: data.dni || '',
            direccion: data.direccion || '',
            workImages: Array.isArray(data.imageUrl) ? data.imageUrl : [data.imageUrl],
          });
        } else {
          throw new Error('Error fetching worker profile');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkerProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/workers/edit_profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsEditing(false);
        const updatedWorker = await response.json();
        setWorker(updatedWorker);
      } else {
        throw new Error('Error saving worker profile');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file)); 
    setFormData({ ...formData, workImages: imageUrls });
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? formData.workImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === formData.workImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getInitials = (name, lastname) => {
    if (!name || !lastname) return '';
    return `${name[0].toUpperCase()}${lastname[0].toUpperCase()}`;
  };

  if (!worker) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className={`background ${theme === 'dark' ? 'background-dark' : 'background-light'}`}>
        <Header />
        <Container fluid className="container-fluid-custom">
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className={`p-4 shadow-lg text-center d-flex justify-content-center align-items-center card-custom ${theme === 'dark' ? 'card-dark' : ''}`}>
                <div className={`profile-initials-circle ${theme === 'dark' ? 'initials-circle-dark' : ''}`}>
                  {getInitials(worker.user.name, worker.user.lastname)}
                </div>
                <h3 className={theme === 'dark' ? 'text-light' : 'text-dark'}>{worker.user.name} {worker.user.lastname}</h3>
                <h5 className={theme === 'dark' ? 'text-light' : 'text-dark'}>{worker.jobTitles.join(", ")}</h5>

                <p><strong>Descripción:</strong> {isEditing ? (
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`mb-3 ${theme === 'dark' ? 'form-control-dark' : ''}`}
                  />
                ) : (
                  <span className={theme === 'dark' ? 'text-light' : 'text-dark'}>{worker.description}</span>
                )}</p>

                <p><strong>DNI:</strong> {isEditing ? (
                  <Form.Control
                    type="text"
                    name="dni"
                    value={formData.dni}
                    onChange={handleChange}
                    className={theme === 'dark' ? 'form-control-dark' : ''}
                  />
                ) : (
                  <span className={theme === 'dark' ? 'text-light' : 'text-dark'}>{worker.dni}</span>
                )}</p>

                <p><strong>Dirección:</strong> {isEditing ? (
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    className={theme === 'dark' ? 'form-control-dark' : ''}
                  />
                ) : (
                  <span className={theme === 'dark' ? 'text-light' : 'text-dark'}>{worker.direccion}</span>
                )}</p>

                {isEditing && (
                  <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label><strong>Subir Imágenes de Trabajo:</strong></Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      onChange={handleMultipleImagesChange}
                      className={theme === 'dark' ? 'form-control-dark' : ''}
                    />
                  </Form.Group>
                )}

                {formData.workImages.length > 0 ? (
                  <div className="work-images-carousel">
                    <Button variant="link" onClick={handlePreviousImage}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
                      </svg>
                    </Button>
                    <Image
                      src={formData.workImages[currentImageIndex]}
                      rounded
                      className="work-image"
                    />
                    <Button variant="link" onClick={handleNextImage}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
                      </svg>
                    </Button>
                  </div>
                ) : (
                  <p>No work images available</p>
                )}

                <Button
                  variant="primary"
                  className="mt-4 edit-profile-button"
                  onClick={isEditing ? handleSaveClick : handleEditClick}
                >
                  {isEditing ? "Guardar Cambios" : "Editar Perfil"}
                </Button>
              </Card>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default EditWorkerProfile;
