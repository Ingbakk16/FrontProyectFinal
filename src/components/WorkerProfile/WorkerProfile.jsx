import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, Image, Container, Row, Col } from 'react-bootstrap';
import Header from '../header/header';
import Footer from '../footer/footer';
import { useParams } from 'react-router-dom'; 
import { AuthenticationContext } from "../services/authenticationContext/authentication.context"; 

const WorkerProfile = () => {
  const { id } = useParams(); 
  const { token } = useContext(AuthenticationContext); 

  const [worker, setWorker] = useState(null); 
  const [loading, setLoading] = useState(true); 

  // Comentarios estáticos 
  const [comments, setComments] = useState([
    { name: "Ana", comment: "Excelente trabajo, muy recomendado!", rating: 5 },
    { name: "Pedro", comment: "Muy profesional, volveré a contratar.", rating: 4 },
    { name: "Maria", comment: "Instaló el sistema eléctrico en mi casa, muy puntual y profesional.", rating: 5 },
    { name: "Juan", comment: "Buen trabajo, pero podría haber sido más rápido.", rating: 3 },
    { name: "Luisa", comment: "Muy buen servicio!", rating: 5 },
  ]);

  const [newComment, setNewComment] = useState({ name: '', comment: '', rating: 0 });
  const [showComments, setShowComments] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false); 

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

        setWorker(workerData); 
        debugger;
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
      setNewComment({ name: '', comment: '', rating: 0 });
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
                  src={worker.imageUrl || 'https://via.placeholder.com/100'} // Placeholder o imagen del trabajador
                  roundedCircle
                  className="card-image"
                />
                <h3>{worker.user?.name || "Nombre no disponible"}</h3>
                <h5>{worker.jobTitles?.join(", ") || "Profesión no disponible"}</h5>
                <p className="worker-description">"{worker.description || "Sin descripción"}"</p>

                {/* Carrusel de imágenes de trabajo */}
                {worker.imageUrl ? (
                  <div className="work-images-carousel">
                    <Image src={worker.imageUrl} rounded className="work-image" />
                  </div>
                ) : (
                  <p>No hay imágenes de trabajo disponibles</p>
                )}

                <Button
                  variant="primary"
                  className="mt-4 comments-toggle-button"
                  onClick={toggleComments}
                >
                  {showComments ? 'OCULTAR COMENTARIOS' : 'MOSTRAR COMENTARIOS'}
                </Button>

                {showComments && (
                  <div className={`mt-4 comments-section`}>
                    <h4>Comentarios:</h4>
                    {comments.length > 0 ? (
                      comments.map((comment, index) => (
                        <div key={index} className="comment">
                          <strong>{comment.name}</strong>
                          <p>{comment.comment}</p>
                          <p>Calificación: {'★'.repeat(comment.rating)}</p>
                        </div>
                      ))
                    ) : (
                      <p>No hay comentarios disponibles</p>
                    )}
                  </div>
                )}

                <Button
                  variant="primary"
                  className="mt-4 comments-toggle-button"
                  onClick={toggleCommentForm}
                >
                  {showCommentForm ? 'OCULTAR AGREGAR COMENTARIO' : 'AGREGAR COMENTARIO'}
                </Button>

                {showCommentForm && (
                  <div className={`add-comment-form mt-4 ${showCommentForm ? 'show' : 'hide'}`}>
                    <h5>Añadir un nuevo comentario</h5>
                    <input
                      type="text"
                      name="name"
                      placeholder="Tu nombre"
                      value={newComment.name}
                      onChange={handleCommentChange}
                      className="form-control mb-2"
                    />
                    <textarea
                      name="comment"
                      placeholder="Tu comentario"
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
                      <option value="0">Selecciona una calificación</option>
                      <option value="1">★</option>
                      <option value="2">★★</option>
                      <option value="3">★★★</option>
                      <option value="4">★★★★</option>
                      <option value="5">★★★★★</option>
                    </select>
                    <Button variant="success" onClick={handleAddComment}>
                      Añadir Comentario
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
