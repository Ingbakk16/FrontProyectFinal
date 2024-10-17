import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, Image, Container, Row, Col } from 'react-bootstrap';
import Header from '../header/header';
import Footer from '../footer/footer';
import { useParams } from 'react-router-dom'; // Para obtener el ID
import { AuthenticationContext } from "../services/authenticationContext/authentication.context"; 

const WorkerProfile = () => {
  const { id } = useParams(); // Obtener el ID del trabajador desde la URL
  const { token } = useContext(AuthenticationContext); // Obtener el token desde el contexto

  const [worker, setWorker] = useState(null); // Estado para los datos del trabajador
  const [loading, setLoading] = useState(true); // Estado de carga

  // Comentarios estáticos (puedes reemplazarlos con comentarios dinámicos más adelante)
  const [comments, setComments] = useState([
    { name: "Ana", comment: "Excelente trabajo, muy recomendado!", rating: 5 },
    { name: "Pedro", comment: "Muy profesional, volveré a contratar.", rating: 4 },
    { name: "Maria", comment: "Instaló el sistema eléctrico en mi casa, muy puntual y profesional.", rating: 5 },
    { name: "Juan", comment: "Buen trabajo, pero podría haber sido más rápido.", rating: 3 },
    { name: "Luisa", comment: "Muy buen servicio!", rating: 5 },
  ]);
  
  const [newComment, setNewComment] = useState({ name: '', comment: '', rating: 0 });
  const [showComments, setShowComments] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false); // Estado para mostrar/ocultar el formulario

  useEffect(() => {
    const fetchWorkerProfile = async () => {
      if (!token) {
        console.error("No token available.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8081/api/workers/all`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching worker profile");
        }

        const data = await response.json();
        const workerData = data.find((worker) => worker.id === id); // Buscar el trabajador por ID

        if (!workerData) {
          throw new Error("Worker not found");
        }

        setWorker(workerData); // Establecer los datos del trabajador
        setLoading(false); // Desactivar el estado de carga
      } catch (error) {
        console.error("Error fetching worker profile:", error);
        setLoading(false);
      }
    };

    fetchWorkerProfile();
  }, [id, token]);

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleAddComment = () => {
    if (newComment.name && newComment.comment && newComment.rating > 0) {
      setComments([...comments, newComment]);
      setNewComment({ name: '', comment: '', rating: 0 }); // Limpiar el formulario
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const toggleCommentForm = () => {
    setShowCommentForm(!showCommentForm);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!worker) {
    return <p>Datos no disponibles</p>;
  }

  return (
    <>
      <div className="background">
        <Header />
        <Container fluid className="container-fluid-custom">
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="p-4 shadow-lg text-center d-flex justify-content-center align-items-center card-custom">
                <Image 
                  src={worker.user?.profileImage || 'https://via.placeholder.com/100'} // Placeholder o imagen de perfil
                  roundedCircle
                  className="card-image"
                />
                <h3>{worker.user?.name || "Nombre no disponible"}</h3>
                <h5>{worker.jobTitles?.join(", ") || "Profesión no disponible"}</h5>
                <p className="worker-description">"{worker.description || "Sin descripción"}"</p>

                {/* Carrusel de imágenes de trabajo */}
                {worker.workImages?.length > 0 ? (
                  <div className="work-images-carousel">
                    {worker.workImages.map((image, index) => (
                      <Image key={index} src={image} rounded className="work-image" />
                    ))}
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
                  {showCommentForm ? 'HIDE ADD COMMENT' : 'ADD COMMENT'}
                </Button>

                {/* Formulario de agregar comentario */}
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
