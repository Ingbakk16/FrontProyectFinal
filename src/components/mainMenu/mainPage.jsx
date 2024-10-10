import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import WorkerCard from "../workerCard/workerCard";
import Header from "../header/header";
import Footer from "../footer/footer";
import { AuthenticationContext } from "../services/authenticationContext/authentication.context"; 
import './mainPage.css';

const MainPage = () => {
  const [workers, setWorkers] = useState([]);
  const { token } = useContext(AuthenticationContext); // Obtener el token desde el contexto
  const [favorites, setFavorites] = useState([]); // Estado para los favoritos

  // Cargar favoritos desde el localStorage al montar el componente
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Función para alternar el estado de favorito
  const toggleFavorite = (workerId) => {
    const updatedFavorites = favorites.includes(workerId)
      ? favorites.filter((id) => id !== workerId) // Remover de favoritos si ya está marcado
      : [...favorites, workerId]; // Agregar a favoritos si no está marcado

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Guardar en localStorage
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
            Authorization: `Bearer ${token}`, // Incluir el token en el header
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching workers");
        }

        const data = await response.json();
        console.log("Trabajadores obtenidos:", data);
        setWorkers(data); // Establecer los datos obtenidos en el estado
      } catch (error) {
        console.error("Error al obtener los trabajadores:", error);
      }
    };

    fetchWorkers();
  }, [token]);

  return (
    <div className="page-container">
      <Header />
      <div className="content">
        <Container>
          <h1 className="text-center my-4">Lista de Trabajadores</h1>
          <Row>
            {workers.map((worker, index) => (
              <Col key={index} md={6} className="mb-4">
                <WorkerCard
                  id={worker.id} // Pasar el ID del trabajador
                  name={worker.user?.name || "Nombre no disponible"}
                  lastname={worker.user?.lastname || "Apellido no disponible"}
                  description={worker.description || "Sin descripción"}
                  profession={worker.jobTitles?.join(", ") || "Profesión no disponible"}
                  rating={worker.rating || 0}
                  isFavorite={favorites.includes(worker.id)} // Verificar si es favorito
                  toggleFavorite={() => toggleFavorite(worker.id)} // Pasar la función para alternar favoritos
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
