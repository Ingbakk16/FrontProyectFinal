import React, { useEffect, useState, useContext } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Header from "../header/header";
import Footer from "../footer/footer";
import { useParams } from "react-router-dom";
import { AuthenticationContext } from "../services/authenticationContext/authentication.context";
import { ThemeContext } from "../services/ThemeContext/Theme.context";
import "../WorkerProfile/WorkerStyle.css";
import StarRating from "../starRating/starRating";
import Carousel from "../Carousel/Carousel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WorkerProfile = () => {
  const { id } = useParams();
  const { token, user } = useContext(AuthenticationContext);
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
    setRefreshKey((prevKey) => prevKey + 1); 
  }, [theme]);

  useEffect(() => {
    const fetchWorkerProfile = async () => {
      setLoading(true);
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
          throw new Error("Error fetching worker profiles");
        }
  
        const data = await response.json();
        const workerData = data.find((worker) => worker.id === id);

        


  
        if (!workerData) {
          console.error("Worker not found");
          setLoading(false);
          return;
        }
  
        // Parse image URLs
        const parsedImageUrls = Array.isArray(workerData.imageUrls)
          ? workerData.imageUrls.map((item) => {
              try {
                const parsedItem = JSON.parse(item); // Parse each item
                return parsedItem.imageUrl; // Extract imageUrl
              } catch (e) {
                
                return null; // Skip invalid items
              }
            }).filter(Boolean) // Remove null values
          : [];
  
        setWorker({
          ...workerData,
          imageUrls: parsedImageUrls, // Update imageUrls with parsed URLs
        });
  
        
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
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching comments");
        }

        const data = await response.json();
        setComments(data);

        
        const userHasCommented = data.some(
          (comment) => comment.ratedByUserId === user.username
        ); 

        

        setHasCommented(userHasCommented);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    

    fetchComments();
  }, [id, token, user.id]); 

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

      if (response.ok){
        toast.success("Comment added succesfully");

      }

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
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    return <p>Loading...</p>;
  }

  if (!worker) {
    return <p>No data available</p>;
  }

  return (
    <>
      <div
        key={theme}
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
                  {worker.phoneNumber || "Worker doesnt have a contact number"}
                </p>
                <p className="text-light">
                  "{worker.description || "There are not any descripción"}"
                </p>

                <div
                  className={`.background ${
                    theme === "dark" ? "background-dark" : "background-light"
                  }`}
                >
                  {worker.imageUrls && (
                    <Carousel
                      images={worker.imageUrls} 
                      editable={false} 
                      theme={theme}
                    />
                  )}
                </div>

                <Button
                  variant="primary"
                  className={`mt-4 comments-toggle-button ${
                    theme === "dark" ? "button-dark" : ""
                  }`}
                  onClick={toggleComments}
                >
                  {showComments ? "HIDE COMMENTS" : "SHOW COMMENTS"}
                </Button>

                {showCommentForm && (
                  <div
                    className={`mt-4 comments-container ${
                      theme === "dark"
                        ? "comments-container-dark"
                        : "comments-container-light"
                    }`}
                  >
                    <h4 className="text-dark">Commments:</h4>
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
                            <p>Rating: {"★".repeat(comment.rating)}</p>
                          </Card.Body>
                        </Card>
                      ))
                    ) : (
                      <p className="text-dark">
                        No comments available yet
                      </p>
                    )}
                  </div>
                )}

                {/* Button to Show/Hide Comments */}

                {/* Comments Section */}
                {showComments && (
                  <div
                    className={`mt-4 comments-container ${
                      theme === "dark"
                        ? "comments-container-dark"
                        : "comments-container-light"
                    }`}
                  >
                    <h4 className="text-dark">Comments:</h4>
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
                            <p>Rating: {"★".repeat(comment.rating)}</p>
                          </Card.Body>
                        </Card>
                      ))
                    ) : (
                      <p className="text-dark">
                        No comments available yet
                      </p>
                    )}
                  </div>
                )}

                {/* Button to Add a New Comment, Visible Only if User Hasn't Commented */}
                {!hasCommented && (
                  <Button
                    variant="primary"
                    className={`mt-4 comments-toggle-button ${
                      theme === "dark" ? "button-dark" : ""
                    }`}
                    onClick={toggleCommentForm}
                  >
                    {showCommentForm
                      ? "HIDE ADD COMMENTS" : "ADD COMMENTS"}
                  </Button>
                )}

                {/* Add Comment Form */}
                {!hasCommented && showCommentForm && (
                  <div className="add-comment-form mt-4 show">
                    <h5>Add a new comment</h5>
                    <textarea
                      name="comment"
                      placeholder="You comment"
                      value={newComment.comment}
                      onChange={handleCommentChange}
                      className={`form-control mb-2 ${
                        theme === "dark" ? "form-control-dark" : ""
                      }`}
                    />
                    <StarRating
                      rating={newComment.rating}
                      onChange={(rating) =>
                        handleCommentChange({
                          target: { name: "rating", value: rating },
                        })
                      }
                    />
                    <Button
                      variant="success"
                      onClick={handleAddComment}
                      disabled={isSubmitting}
                      className={theme === "dark" ? "button-dark" : ""}
                    >
                      {isSubmitting ? "Submitting..." : "Add Comment"}
                    </Button>
                  </div>
                )}

                {/* Message if User Already Commented */}
                {hasCommented && (
                  <p className="text-muted mt-2">
                    You have already commented this worker.
                  </p>
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
