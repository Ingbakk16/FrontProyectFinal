import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import SidebarButton from "../sidebar button/sidebarMenu";
import { ThemeContext } from "../../services/ThemeContext/Theme.context";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import AdminConfirmationAlert from "../../ConfirmationAlert/ConfirmationAlert"; 
import "./DeleteReview.css";

const DeleteReview = () => {
  const { workerId } = useParams();
  const { theme } = useContext(ThemeContext);
  const { token } = useContext(AuthenticationContext);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/workers/${workerId}/comments`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener las reseñas");
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [workerId, token]);

  const confirmAndDeleteReview = (reviewId) => {
    AdminConfirmationAlert({
      title: "¿confirm delete?",
      text: "This action will delete the review permanently.",
      onConfirm: () => handleDeleteReview(reviewId), 
    });
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/admin/workers/${workerId}/comments/${reviewId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la reseña");
      }

      setReviews(reviews.filter((review) => review.id !== reviewId));
      
    } catch (error) {
      console.error("Error al intentar eliminar la reseña:", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={`background ${theme === 'dark' ? 'APage-background-dark' : 'APage-background-light'}`}>
      <Header />
      <Container
        fluid
        className={`delete-review-page-background ${theme === 'dark' ? 'admin-page-dark' : 'APage-background-light'} d-flex flex-column justify-content-center align-items-center`}
        style={{ minHeight: "90vh" }}
      >
        <Row className="justify-content-center align-items-center w-100 full-height-row">
          <Col md={2} className="bg-dark text-light sidebar-button-padding">
            <SidebarButton />
          </Col>
          
          <Col md={10} className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className={theme === 'dark' ? 'text-light' : 'text-dark'}>Edit Review's</h2>
              <Button variant="secondary" onClick={handleBack}>Back</Button>
            </div>
            
            <div className="review-list-container">
              {loading ? (
                <p>Cargando reseñas...</p>
              ) : (
                <Row>
                  {reviews.map((review) => (
                    <Col md={12} className="mb-3" key={review.id}>
                      <div className={`review-card ${theme === 'dark' ? 'review-card-dark' : 'review-card-light'}`}>
                        <p><strong>User:</strong> {review.ratedByUserId}</p>
                        <p><strong>Review:</strong> {review.comment}</p>
                        <p><strong>Rating:</strong> {review.rating}</p>
                        <Button
                          variant="danger"
                          onClick={() => confirmAndDeleteReview(review.id)} 
                        >
                          Delete Review
                        </Button>
                      </div>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default DeleteReview;
