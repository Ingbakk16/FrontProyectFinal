import React, { useState } from 'react';
import { Card, Button, Image, Container, Row, Col } from 'react-bootstrap';
import Header from '../header/header';
import Footer from '../footer/footer';
import profileSVG from '../svg back/profile.svg';
import './WorkerStyle.css'; // Import the CSS file

const WorkerProfile = () => {
  const worker = {
    name: "Jose Luis",
    profession: "Electricista",
    description: "Especialista en instalaciones eléctricas, con más de 10 años de experiencia en el sector.",
    profileImage: "/assets/images/profile.svg", // Ruta al archivo SVG
    workImages: [
      "https://via.placeholder.com/200x150", 
      "https://via.placeholder.com/150", 
      "https://via.placeholder.com/200x150/0000FF/FFFFFF?text=Work+Image", 
      "https://place.dog/200/150"
    ]
  };

  const [showCommentForm, setShowCommentForm] = useState(false);
  const toggleCommentForm = () => {
    setShowCommentForm(!showCommentForm);
  };

  const [newComment, setNewComment] = useState({ name: '', comment: '', rating: 0 });
  const [comments, setComments] = useState([
    { name: "Ana", comment: "Excelente trabajo, muy recomendado!", rating: 5 },
    { name: "Pedro", comment: "Muy profesional, volveré a contratar.", rating: 4 },
    { name: "Maria", comment: "Instaló el sistema eléctrico en mi casa, muy puntual y profesional.", rating: 5 },
    { name: "Juan", comment: "Buen trabajo, pero podría haber sido más rápido.", rating: 3 },
    { name: "Luisa", comment: "Muy buen servicio!", rating: 5 },
  ]);
  
  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };
  
  const handleAddComment = () => {
    if (newComment.name && newComment.comment && newComment.rating > 0) {
      setComments([...comments, newComment]);
      setNewComment({ name: '', comment: '', rating: 0 }); // Limpiar formulario
    }
  };

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

                {/* Botón para mostrar/ocultar comentarios */}
                <Button
                  variant="primary"
                  className="mt-4 comments-toggle-button"
                  onClick={toggleComments}
                >
                  {showComments ? 'HIDE COMMENTS' : 'SHOW COMMENTS'}
                </Button>

                {/* Sección de comentarios */}
                {showComments && (
                  <div className={`mt-4 comments-section`}>
                    <h4>Comments:</h4>
                    {comments.length > 0 ? (
                      comments.map((comment, index) => (
                        <div key={index} className="comment">
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

                {/* Botón para mostrar/ocultar el formulario de agregar comentarios */}
                <Button
                  variant="primary"
                  className="mt-4 comments-toggle-button"
                  onClick={toggleCommentForm}
                >
                  {showCommentForm ? 'HIDE ADD COMMENT' : 'SHOW ADD COMMENT'}
                </Button>

                {/* Formulario de agregar comentario con animación */}
                {showCommentForm && (
                  <div className={`add-comment-form mt-4 ${showCommentForm ? 'show' : 'hide'}`}>
                    <h5>Add a new comment</h5>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={newComment.name}
                      onChange={handleCommentChange}
                      className="form-control mb-2"
                    />
                    <textarea
                      name="comment"
                      placeholder="Your comment"
                      value={newComment.comment}
                      onChange={handleCommentChange}
                      className="form-control mb-2"
                    />
                    <select
                      name="rating"
                      value={newComment.rating}
                      onChange={handleCommentChange}
                      className="form-control mb-2"
                    >
                      <option value="0">Select rating</option>
                      <option value="1">★</option>
                      <option value="2">★★</option>
                      <option value="3">★★★</option>
                      <option value="4">★★★★</option>
                      <option value="5">★★★★★</option>
                    </select>
                    <Button variant="success" onClick={handleAddComment}>
                      Add Comment
                    </Button>
                  </div>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default WorkerProfile;
