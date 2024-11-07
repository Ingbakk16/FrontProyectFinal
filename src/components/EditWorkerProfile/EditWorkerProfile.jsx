import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Button,
  Image,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import Header from "../header/header";
import Footer from "../footer/footer";
import { AuthenticationContext } from "../services/authenticationContext/authentication.context";
import { ThemeContext } from "../services/ThemeContext/Theme.context"; // Importa ThemeContext
import "../WorkerProfile/WorkerStyle.css";
import { useNavigate } from "react-router-dom";
import Carousel from "../Carousel/Carousel";

const EditWorkerProfile = () => {
  const { token } = useContext(AuthenticationContext);
  const { theme } = useContext(ThemeContext); // Usa el ThemeContext
  const navigate = useNavigate();

  const [worker, setWorker] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    phoneNumber: "",
    direccion: "",
    workImages: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchWorkerProfile = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/workers/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          
          
          console.log("Fetched worker data:", data);
  
          const parsedImageUrls = Array.isArray(data.imageUrls)
            ? data.imageUrls.map((item) => {
                try {
                  // Check if item is a string and parse it
                  const parsedItem = JSON.parse(item);
                  return parsedItem.imageUrl; // Extract imageUrl
                } catch (e) {
                  console.error("Error parsing image URL:", e);
                  return null; // Skip invalid items
                }
              }).filter(Boolean) // Remove null values
            : []; // Set to empty array if data.imageUrls is not an array
  
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

  const handleSaveClick = async () => {
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

  

   

  const handleAddImage = async () => {
    const newImage = prompt("Enter image URL");
    
    // Ensure there is a new image URL and the current images are fewer than 3
    if (newImage && formData.workImages.length < 3) {
      try {
        const response = await fetch("http://localhost:8081/api/workers/images/add", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl: newImage }), // Send as a JSON object with key imageUrl
        });
  
        if (response.ok) {
          // Add new image URL to the formData
          setFormData((prevState) => ({
            ...prevState,
            workImages: [...prevState.workImages, newImage],
          }));
        } else {
          const errorMsg = await response.text();
          alert(`Error adding image: ${errorMsg}`);
        }
      } catch (error) {
        console.error("Error adding image:", error);
      }
    } else if (formData.workImages.length >= 3) {
      alert("Maximum of 3 images allowed.");
    }
  };

  // Updated handleDeleteImage to integrate with backend
  const handleDeleteImage = async (imageUrl) => {
    try {
      const response = await fetch("http://localhost:8081/api/workers/images/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }), // Send imageUrl as a JSON object
      });
  
      if (response.ok) {
        // Update the images in the formData to reflect the deletion
        setFormData((prevState) => ({
          ...prevState,
          workImages: prevState.workImages.filter((img) => img !== imageUrl),
        }));
      } else {
        const errorMsg = await response.text();
        alert(`Error deleting image: ${errorMsg}`);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };


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
                onDelete={handleDeleteImage}
                onAddImage={handleAddImage}
                theme={theme}
              />
            )}

                <Button
                  variant="primary"
                  className="mt-4 edit-profile-button"
                  onClick={isEditing ? handleSaveClick : handleEditClick}
                >
                  {isEditing ? "Guardar Cambios" : "Editar Perfil"}
                </Button>
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
