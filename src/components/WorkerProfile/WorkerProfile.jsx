import React, { useEffect, useState, useContext } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Header from "../header/header";
import Footer from "../footer/footer";
import { useParams } from "react-router-dom";
import { AuthenticationContext } from "../services/authenticationContext/authentication.context";

const WorkerProfile = () => {
  const { id } = useParams();
  const { token } = useContext(AuthenticationContext);

  const [worker, setWorker] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ comment: "", rating: 0 });
  const [showComments, setShowComments] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [hasCommented, setHasCommented] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchWorkerProfile = async () => {
      if (!token) {
        console.error("No token available.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8081/api/workers/all`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching worker profile");
        }

        const data = await response.json();
        const workerData = data.find((worker) => worker.id === id);

        if (!workerData) {
          throw new Error("Worker not found");
        }

        setWorker(workerData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching worker profile:", error);
        setLoading(false);
      }
    };

    fetchWorkerProfile();
  }, [id, token]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        console.error("No token available.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8081/api/workers/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching user profile");
        }

        const userData = await response.json();
        setUserId(userData.id); // Almacenar el user.id
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [token]);

  useEffect(() => {
    const fetchWorkerComments = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          `http://localhost:8081/api/workers/${id}/comments`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching worker comments");
        }

        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching worker comments:", error);
      }
    };

    fetchWorkerComments();
  }, [id, token]);

  // Añadir un nuevo comentario
  const handleAddComment = async () => {
    if (hasCommented || isSubmitting || !userId) return; // Verificación extra para evitar múltiples envíos y asegurarnos de tener el user.id

    if (newComment.comment && newComment.rating > 0) {
      setIsSubmitting(true);

      try {
        const response = await fetch(
          `http://localhost:8081/api/workers/${id}/rate`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              comment: newComment.comment,
              rating: newComment.rating,
              userId: userId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Error adding comment");
        }

        const addedComment = await response.json();
        setComments([...comments, addedComment]);
        setNewComment({ comment: "", rating: 0 });
        setHasCommented(true);
      } catch (error) {
        console.error("Error adding comment:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const toggleCommentForm = () => {
    setShowCommentForm(!showCommentForm);
  };

  const getInitials = (name, lastname) => {
    const nameInitial = name ? name.charAt(0).toUpperCase() : "";
    const lastnameInitial = lastname ? lastname.charAt(0).toUpperCase() : "";
    return nameInitial + lastnameInitial;
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
                <div className="initials-circle">
                  {getInitials(worker.user?.name, worker.user?.lastname)}
                </div>
                <h3>{worker.user?.name || "Nombre no disponible"}</h3>
                <h5>
                  {worker.jobTitles?.join(", ") || "Profesión no disponible"}
                </h5>
                <p>{worker.user?.email || "Email no disponible"}</p>{" "}
                {/* Muestra el email del trabajador */}
                <p className="worker-description">
                  "{worker.description || "Sin descripción"}"
                </p>
                {worker.imageUrl ? (
                  <div className="work-images-carousel">
                    <img
                      src={worker.imageUrl}
                      alt="Work"
                      className="work-image"
                    />
                  </div>
                ) : (
                  <p>No hay imágenes de trabajo disponibles</p>
                )}
                <Button
                  variant="primary"
                  className="mt-4 comments-toggle-button"
                  onClick={toggleComments}
                >
                  {showComments ? "OCULTAR COMENTARIOS" : "MOSTRAR COMENTARIOS"}
                </Button>
                {showComments && (
                  <div className="mt-4 comments-section">
                    <h4>Comentarios:</h4>
                    {comments.length > 0 ? (
                      comments.map((comment, index) => (
                        <div key={index} className="comment">
                          <strong>{comment.name}</strong>
                          <p>{comment.comment}</p>
                          <p>Calificación: {"★".repeat(comment.rating)}</p>
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
                  {showCommentForm
                    ? "OCULTAR AGREGAR COMENTARIO"
                    : "AGREGAR COMENTARIO"}
                </Button>
                {showCommentForm && (
                  <div className="add-comment-form mt-4 show">
                    <h5>Añadir un nuevo comentario</h5>
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
                    <Button
                      variant="success"
                      onClick={handleAddComment}
                      disabled={hasCommented || isSubmitting}
                    >
                      {hasCommented
                        ? "Ya has comentado"
                        : isSubmitting
                        ? "Enviando..."
                        : "Añadir Comentario"}
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
