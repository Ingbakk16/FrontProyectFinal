import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Button,
  Image,
  Modal,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import Swal from "sweetalert2";
import Header from "../header/header";
import Footer from "../footer/footer";
import { AuthenticationContext } from "../services/authenticationContext/authentication.context";
import { ThemeContext } from "../services/ThemeContext/Theme.context";
import "../WorkerProfile/WorkerStyle.css";
import { useNavigate } from "react-router-dom";
import Carousel from "../Carousel/Carousel";

const EditWorkerProfile = () => {
  const { token } = useContext(AuthenticationContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [worker, setWorker] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    phoneNumber: "",
    direccion: "",
    workImages: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showAddImageModal, setShowAddImageModal] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [showDeleteImageModal, setShowDeleteImageModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  useEffect(() => {
    const fetchWorkerProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/workers/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          console.log("Fetched worker data:", data);

          const parsedImageUrls = Array.isArray(data.imageUrls)
            ? data.imageUrls
                .map((item) => {
                  try {
                    const parsedItem = JSON.parse(item);
                    return parsedItem.imageUrl;
                  } catch (e) {
                    console.error("Error parsing image URL:", e);
                    return null;
                  }
                })
                .filter(Boolean)
            : [];

          setWorker(data);
          setFormData({
            description: data.description || "",
            phoneNumber: data.phoneNumber || "",
            direccion: data.direccion || "",
            workImages: parsedImageUrls,
          });

          console.log("Parsed image URLs:", parsedImageUrls);
        } else {
          throw new Error("Error fetching worker profile");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkerProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    Swal.fire({
      title: "¿Confirmar actualización?",
      text: "¿Deseas guardar los cambios realizados en el perfil?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleSaveProfile();
      }
    });
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/api/workers/edit_profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setIsEditing(false);
        const updatedWorker = await response.json();
        setWorker(updatedWorker);
      } else {
        throw new Error("Error saving worker profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddImageModalOpen = () => setShowAddImageModal(true);
  const handleAddImageModalClose = () => {
    setShowAddImageModal(false);
    setNewImageUrl("");
  };

  const handleAddImage = async () => {
    if (newImageUrl && formData.workImages.length < 3) {
      try {
        const response = await fetch(
          "http://localhost:8081/api/workers/images/add",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageUrl: newImageUrl }),
          }
        );

        if (response.ok) {
          setFormData((prevState) => ({
            ...prevState,
            workImages: [...prevState.workImages, newImageUrl],
          }));
          handleAddImageModalClose();
        } else {
          alert("Error adding image");
        }
      } catch (error) {
        console.error("Error adding image:", error);
      }
    } else if (formData.workImages.length >= 3) {
      alert("Maximum of 3 images allowed.");
    }
  };

  // Delete Image Modal Logic
  const handleDeleteImageModalOpen = (imageUrl) => {
    setImageToDelete(imageUrl);
    setShowDeleteImageModal(true);
  };

  const handleDeleteImageModalClose = () => {
    setShowDeleteImageModal(false);
    setImageToDelete(null);
  };

  const handleDeleteImage = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/api/workers/images/delete",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl: imageToDelete }),
        }
      );

      if (response.ok) {
        setFormData((prevState) => ({
          ...prevState,
          workImages: prevState.workImages.filter(
            (img) => img !== imageToDelete
          ),
        }));
        handleDeleteImageModalClose();
      } else {
        alert("Error deleting image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  if (!worker) {
    return <p>Loading...</p>;
  }

  const getInitials = (name, lastname) => {
    if (!name || !lastname) return "";
    return `${name[0].toUpperCase()}${lastname[0].toUpperCase()}`;
  };

  if (!worker) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div
        className={`.background ${
          theme === "dark" ? "background-dark" : "background-light"
        }`}
      >
        <Header />
        <Container fluid className="container-fluid-custom">
          <Row className="justify-content-center">
            <Col md={8}>
              <Card
                className={`p-4 shadow-lg text-center d-flex justify-content-center align-items-center card-custom ${
                  theme === "dark" ? "card-dark" : ""
                }`}
              >
                <div
                  className={`profile-initials-circle ${
                    theme === "dark" ? "initials-circle-dark" : ""
                  }`}
                >
                  {getInitials(worker.user.name, worker.user.lastname)}
                </div>
                <h3 className={theme === "dark" ? "text-dark" : "text-light"}>
                  {worker.user.name} {worker.user.lastname}
                </h3>
                <h5 className={theme === "dark" ? "text-dark" : "text-light"}>
                  {worker.jobTitles.join(", ")}
                </h5>

                <p>
                  <strong>Descripción:</strong>{" "}
                  {isEditing ? (
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className={`mb-3 ${
                        theme === "dark" ? "form-control-dark" : ""
                      }`}
                    />
                  ) : (
                    <span
                      className={theme === "dark" ? "text-light" : "text-dark"}
                    >
                      {worker.description}
                    </span>
                  )}
                </p>

                <p>
                  <strong>Phone number:</strong>{" "}
                  {isEditing ? (
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={theme === "dark" ? "form-control-dark" : ""}
                    />
                  ) : (
                    <span
                      className={theme === "dark" ? "text-light" : "text-dark"}
                    >
                      {worker.phoneNumber}
                    </span>
                  )}
                </p>

                <p>
                  <strong>Dirección:</strong>{" "}
                  {isEditing ? (
                    <Form.Control
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      className={theme === "dark" ? "form-control-dark" : ""}
                    />
                  ) : (
                    <span
                      className={theme === "dark" ? "text-light" : "text-dark"}
                    >
                      {worker.direccion}
                    </span>
                  )}
                </p>

                {formData.workImages && (
                  <Carousel
                    images={formData.workImages}
                    editable={true}
                    onAddImage={handleAddImageModalOpen}
                    onDelete={handleDeleteImageModalOpen}
                    theme={theme}
                  />
                )}

                {/* Add Image Modal */}
                <Modal
                  show={showAddImageModal}
                  onHide={handleAddImageModalClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Add Image URL</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Group>
                      <Form.Label>Image URL</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter image URL"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                      />
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={handleAddImageModalClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleAddImage}
                      disabled={!newImageUrl}
                    >
                      Add Image
                    </Button>
                  </Modal.Footer>
                </Modal>

                {/* Delete Image Confirmation Modal */}
                <Modal
                  show={showDeleteImageModal}
                  onHide={handleDeleteImageModalClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure you want to delete this image?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={handleDeleteImageModalClose}
                    >
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteImage}>
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Button
                  variant="primary"
                  className="mt-4 edit-profile-button"
                  onClick={isEditing ? handleSaveClick : handleEditClick}
                >
                  {isEditing ? "Guardar Cambios" : "Editar Perfil"}
                </Button>

                {isEditing && (
                  <Button
                    variant="secondary"
                    className="mt-4 cancel-profile-button ms-2"
                    onClick={() => {
                      setIsEditing(false); 
                      setFormData({
                        description: worker.description || "",
                        phoneNumber: worker.phoneNumber || "",
                        direccion: worker.direccion || "",
                        workImages: formData.workImages,
                      }); 
                    }}
                  >
                    Cancelar
                  </Button>
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

export default EditWorkerProfile;
