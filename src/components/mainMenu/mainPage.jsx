import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import WorkerCard from "../workerCard/workerCard";
import Header from "../header/header";
import PropTypes from 'prop-types';
import Footer from "../footer/footer";

const MainPage = () => {
  const [workers, setWorkers] = useState([]);
  WorkerCard.propTypes = {
    name: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    profession: PropTypes.string,
    rating: PropTypes.number.isRequired,
  };
  // Usamos useEffect para simular una llamada de datos, pero ahora con datos estáticos
  useEffect(() => {
    // Datos estáticos simulados
    const staticWorkers = [
      {
        id: 1, 
        user: { name: "Juan", lastname: "Pérez", profession: "Electricista" },
        description:
          "Electricista con más de 5 años de experiencia en instalaciones residenciales.",
        rating: 5,
      },
    ];

    setWorkers(staticWorkers);
  }, []); 

  return (
    <div
      style={{
        background:
          "linear-gradient(45deg, #6BF8EF, #87ACF7, #645DB5, #322A94)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Container className="my-4" style={{ flex: 1 }}>
        <Row>
          {workers.map((worker) => (
            <Col key={worker.id} md={6} className="mb-4">
              <WorkerCard
                name={worker.user.name}
                lastname={worker.user.lastname}
                description={worker.description}
                profession={worker.user.profession}
                rating={worker.rating}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default MainPage;
