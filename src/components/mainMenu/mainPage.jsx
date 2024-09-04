import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import WorkerCard from "../workerCard/workerCard";
import Header from "../header/header";
import Footer from "../footer/footer";

const MainPage = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/workers/all")
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched workers:', data);
        setWorkers(data);
      })
      .catch((error) => console.error("Error fetching workers:", error));
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(45deg, #6BF8EF, #87ACF7, #645DB5, #322A94)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <Container className="my-4" style={{ flex: 1 }}>
        <Row>
          {workers.map((worker, index) => (
            <Col key={index} md={6} className="mb-4">
              <WorkerCard
                name={worker.user.name}
                lastname={worker.user.lastname}
                description={worker.description}
                profession={worker.user.profession}  // si el objeto tiene una propiedad profession
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
