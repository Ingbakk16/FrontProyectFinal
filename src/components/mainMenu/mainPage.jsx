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
                  name={worker.user?.name || "Nombre no disponible"}
                  lastname={worker.user?.lastname || "Apellido no disponible"}
                  description={worker.description || "Sin descripción"}
                  profession={worker.jobTitles?.join(", ") || "Profesión no disponible"}
                  rating={worker.rating || 0}
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
