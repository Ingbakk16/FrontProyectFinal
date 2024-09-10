import React, { useState } from 'react';
import { Card, Button, Image, Container, Row, Col } from 'react-bootstrap';
import Header from '../header/header';
import Footer from '../footer/footer';

const WorkerProfile = () => {
  const worker = {
    name: "Jose Luis",
    profession: "Electricista",
    description: "Especialista en instalaciones eléctricas, con más de 10 años de experiencia en el sector.",
    profileImage: "https://via.placeholder.com/150",
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
      <Header />
      <Container fluid style={{ background: 'linear-gradient(180deg, #5C4AE0, #645DB5, #87ACF7)', minHeight: '100vh', padding: '10vw' }}>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="p-4 shadow-lg text-center d-flex justify-content-center align-items-center" style={{ backgroundColor: '#8677C2', borderRadius: '20px', color: '#fff', border: '2px solid #3E40A2' }}>
              <Image 
                src={worker.profileImage}
                roundedCircle
                style={{ width: '150px', height: '150px', marginBottom: '20px' }}
              />
              <h3>{worker.name}</h3>
              <h5>{worker.profession}</h5>
              <p style={{ fontStyle: 'italic', margin: '20px 0' }}>"{worker.description}"</p>

              {hasWorkImages ? (
                <div className="d-flex justify-content-center align-items-center">
                  <Button variant="link" onClick={handlePreviousImage}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                      <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
                    </svg>
                  </Button>
                  <Image
                    src={worker.workImages[currentImageIndex]}
                    rounded
                    style={{ width: '200px', height: '150px', margin: '0 20px' }}
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

              <Button variant="primary" className="mt-4" style={{ backgroundColor: '#4A67C3', borderRadius: '20px', padding: '10px 40px' }}>
                See Comments
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default WorkerProfile;

