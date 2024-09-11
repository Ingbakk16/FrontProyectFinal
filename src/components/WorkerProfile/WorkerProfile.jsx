import React, { useState } from 'react';
import { Card, Button, Image, Container, Row, Col } from 'react-bootstrap';
import Header from '../header/header';
import Footer from '../footer/footer';
import './WorkerStyle.css' ; 



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

  const comments = [
    { name: "Ana", comment: "Excelente trabajo, muy recomendado!", rating: 5 },
    { name: "Pedro", comment: "Muy profesional, volveré a contratar.", rating: 4 },
    { name: "Maria", comment: "Instaló el sistema eléctrico en mi casa, muy puntual y profesional.", rating: 5 },
    { name: "Juan", comment: "Buen trabajo, pero podría haber sido más rápido.", rating: 3 },
    { name: "Luisa", comment: "Muy buen servicio!", rating: 5 },
    // Puedes agregar más comentarios aquí para probar
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);

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

  const toggleComments = () => {
    setShowComments(!showComments);
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

              {/* Carrusel de imágenes de trabajo */}
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

              {/* Botón para mostrar/ocultar comentarios */}
              <Button
  variant="primary"
  className="mt-4"
  style={{ backgroundColor: '#4A67C3', borderRadius: '20px', padding: '10px 40px' }}
  onClick={toggleComments}
>
  {showComments ? 'HIDE COMMENTS' : 'SHOW COMMENTS'}
</Button>

{/* Sección de comentarios */}
{showComments && (
  <div
    className={`mt-4 comments-section ${showComments ? 'show' : 'hide'}`}
    style={{
      maxHeight: '200px', // Altura máxima ajustada para la caja de comentarios
      overflowY: 'auto',  // Barra de desplazamiento para contenido desbordante
      backgroundColor: '#f0f0f0',
      borderRadius: '10px',
      padding: '10px',
      color: '#000', // Color del texto para un mejor contraste
      transition: 'max-height 0.5s ease-in-out', // Add transition effect
    }}
  >
    <h4>Comments:</h4>
    {comments.length > 0 ? (
      comments.map((comment, index) => (
        <div key={index} className="text-left my-2 p-2" style={{ borderBottom: '1px solid #ddd' }}>
          <strong>{comment.name}</strong>
          <p>{comment.comment}</p>
          <p>Rating: {'★'.repeat(comment.rating)}</p>
        </div>
      ))
    ) : (
      <p>No comments available</p>
    )}
  </div>
)}
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default WorkerProfile;
