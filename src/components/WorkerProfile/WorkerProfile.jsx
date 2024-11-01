import React, { useEffect, useState, useContext } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Header from "../header/header";
import Footer from "../footer/footer";
import { useParams } from "react-router-dom";
import { AuthenticationContext } from "../services/authenticationContext/authentication.context";
import { ThemeContext } from "../services/ThemeContext/Theme.context";
import "../WorkerProfile/WorkerStyle.css";

const WorkerProfile = () => {
  const { id } = useParams();
  const { token } = useContext(AuthenticationContext);
  const { theme } = useContext(ThemeContext);

  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ comment: "", rating: 0 });
  const [showComments, setShowComments] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [hasCommented, setHasCommented] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setRefreshKey((prevKey) => prevKey + 1); // Cambia la clave cuando cambies el tema
  }, [theme]);

  useEffect(() => {
    const fetchWorkerProfile = async () => {
      setLoading(true); // Inicia el estado de carga
      if (!token) {
        console.error("No token available.");
        setLoading(false);
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
          console.error("Worker not found");
          setLoading(false);
          return;
        }

        setWorker(workerData);
      } catch (error) {
        console.error("Error fetching worker profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerProfile();
  }, [id, token, theme]);

  useEffect(() => {
    const fetchComments = async () => {
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
          throw new Error("Error fetching comments");
        }

        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id, token]); // Se ejecuta cada vez que cambian `id` o `token`

  const handleAddComment = async () => {
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
          body: JSON.stringify(newComment),
        }
      );

      if (!response.ok) {
        throw new Error("Error adding comment");
      }

      // Recargar comentarios después de añadir el nuevo comentario
      const addedComment = await response.json();
      setComments([...comments, addedComment]);
      setNewComment({ comment: "", rating: 0 });
      setHasCommented(true); // Evita que el usuario vuelva a comentar
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
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
    if (!name || !lastname) return "";
    return `${name[0].toUpperCase()}${lastname[0].toUpperCase()}`;
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!worker) {
    return <p>Datos no disponibles</p>;
  }

  return (
    <>
      <div
        key={theme}
        fluid
        className={`.background ${
          theme === "dark" ? "background-dark" : "background-light"
        }`}
      >
        <Header />
        <Container className="container-fluid-custom">
          <Row className="justify-content-center">
            <Col md={8}>
              <Card
                className={`p-4 shadow-lg text-center d-flex justify-content-center align-items-center card-custom ${
                  theme === "dark" ? "card-dark" : ""
                }`}
              >
                <div
                  className={`initials-circle ${
                    theme === "dark"
                      ? "initials-circle-dark"
                      : "initials-circle-light"
                  }`}
                >
                  {getInitials(worker.user.name, worker.user.lastname)}
                </div>
                <h3 className="text-light">
                  {worker.user.name} {worker.user.lastname}
                </h3>
                <h5 className="text-light">{worker.jobTitles.join(", ")}</h5>
  
                <p className="text-light">
                  {worker.user?.email || "Email no disponible"}
                </p>
                <p className="text-light">
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
                  className={`mt-4 comments-toggle-button ${
                    theme === "dark" ? "button-dark" : ""
                  }`}
                  onClick={toggleComments}
                >
                  {showComments ? "OCULTAR COMENTARIOS" : "MOSTRAR COMENTARIOS"}
                </Button>
  
                {showComments && (
                  <div
                    className={`mt-4 comments-container ${
                      theme === "dark"
                        ? "comments-container-dark"
                        : "comments-container-light"
                    }`}
                  >
                    <h4 className="text-dark">Comentarios:</h4>
                    {comments.length > 0 ? (
                      comments.map((comment, index) => (
                        <Card
                          key={index}
                          className={`comment-card ${
                            theme === "dark"
                              ? "comment-card-dark"
                              : "comment-card-light"
                          } mb-3`}
                        >
                          <Card.Body>
                            <strong>{comment.ratedByUserId}</strong>
                            <p>{comment.comment}</p>
                            <p>Calificación: {"★".repeat(comment.rating)}</p>
                          </Card.Body>
                        </Card>
                      ))
                    ) : (
                      <p className="text-dark">
                        No hay comentarios disponibles
                      </p>
                    )}
                  </div>
                )}
  
                <Button
                  variant="primary"
                  className={`mt-4 comments-toggle-button ${
                    theme === "dark" ? "button-dark" : ""
                  }`}
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
                      className={`form-control mb-2 ${
                        theme === "dark" ? "form-control-dark" : ""
                      }`}
                    />
                    <select
                      name="rating"
                      value={newComment.rating}
                      onChange={handleCommentChange}
                      className={`form-control mb-2 ${
                        theme === "dark" ? "form-control-dark" : ""
                      }`}
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
                      className={theme === "dark" ? "button-dark" : ""}
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
