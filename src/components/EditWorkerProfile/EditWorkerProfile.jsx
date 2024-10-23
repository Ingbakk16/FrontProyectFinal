import React, { useState } from 'react';
import { Card, Button, Image, Container, Row, Col } from 'react-bootstrap';
import Header from '../header/header';
import Footer from '../footer/footer';
import '../WorkerProfile/WorkerStyle.css'; 
import { useNavigate } from 'react-router-dom'; 

const EditWorkerProfile = () => {
  const navigate = useNavigate(); 

  const worker = {
    name: "Jose Luis",
    profession: "Electricista",
    description: "Especialista en instalaciones eléctricas, con más de 10 años de experiencia en el sector.",
    profileImage: "/assets/images/profile.svg", 
    workImages: [
      "https://via.placeholder.com/200x150", 
      "https://via.placeholder.com/150", 
      "https://via.placeholder.com/200x150/0000FF/FFFFFF?text=Work+Image", 
      "https://place.dog/200/150"
    ]
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? worker.workImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === worker.workImages.length - 1 ? 0 : prevIndex + 1
    );
  };


  const hasWorkImages = worker.workImages.length > 0;

  return (
    <>
      <div className="background">
        <Header />
        <Container fluid className="container-fluid-custom">
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="p-4 shadow-lg text-center d-flex justify-content-center align-items-center card-custom">
                <Image 
                  src={worker.profileImage}
                  roundedCircle
                  className="card-image"
                />
                <h3>{worker.name}</h3>
                <h5>{worker.profession}</h5>
                <p className="worker-description">"{worker.description}"</p>

                {/* Carrusel de imágenes de trabajo */}
                {hasWorkImages ? (
                  <div className="work-images-carousel">
                    <Button variant="link" onClick={handlePreviousImage}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
                      </svg>
                    </Button>
                    <Image
                      src={worker.workImages[currentImageIndex]}
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

                {/* Botón para editar el perfil */}
                <Button
                  variant="primary"
                  className="mt-4 edit-profile-button"
                >
                  Editar Perfil
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
