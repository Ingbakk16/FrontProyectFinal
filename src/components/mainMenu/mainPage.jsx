import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import WorkerCard from "../workerCard/workerCard";
import Header from "../header/header";
import Footer from "../footer/footer";
import { AuthenticationContext } from "../services/authenticationContext/authentication.context";
import { ThemeContext } from "../services/ThemeContext/Theme.context"; // Importa el ThemeContext
import { useNavigate } from "react-router-dom"; 
import './mainPage.css';

const MainPage = () => {
  const [workers, setWorkers] = useState([]);
  const { token } = useContext(AuthenticationContext);
  const { theme } = useContext(ThemeContext); // Usa el ThemeContext
  const [favorites, setFavorites] = useState([]); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (workerId) => {
    const updatedFavorites = favorites.includes(workerId)
      ? favorites.filter((id) => id !== workerId)
      : [...favorites, workerId];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); 
  };

  const handleWorkerClick = (workerId) => {
    navigate(`/workerProfile/${workerId}`); 
  };

  useEffect(() => {
    const fetchWorkers = async () => {
      if (!token) {
        console.error("No token available.");
        return;
      }
      try {
        const response = await fetch("http://localhost:8081/api/workers/all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error fetching workers");
        }

        const data = await response.json();
        setWorkers(data); 
      } catch (error) {
        console.error("Error al obtener los trabajadores:", error);
      }
    };

    fetchWorkers();
  }, [token]);

  return (
    <div className={`page-container ${theme === 'dark' ? 'main-dark' : 'main-light'}`}>
      <Header />
      <div className="content">
        <Container>
          <h1 className="text-center my-4">Workers List</h1>
          <Row>
            {workers.map((worker, index) => (
              <Col key={index} md={6} className="mb-4">
                <WorkerCard
                  id={worker.id} 
                  name={worker.user?.name}
                  lastname={worker.user?.lastname || "Apellido no disponible"}
                  description={worker.description || "Sin descripción"}
                  profession={worker.jobTitles?.join(", ") || "Profesión no disponible"}
                  rating={worker.rating || 0}
                  isFavorite={favorites.includes(worker.id)} 
                  toggleFavorite={() => toggleFavorite(worker.id)} 
                  onClick={() => handleWorkerClick(worker.id)} 
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
