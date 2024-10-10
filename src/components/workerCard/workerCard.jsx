import React from "react";
import { Card, Row, Col, Image, Badge, Button } from "react-bootstrap";

const WorkerCard = ({ id, name, lastname, description, profession, rating, isFavorite, toggleFavorite }) => {
  return (
    <Card
      className="p-3"
      style={{
        borderRadius: "1rem",
        background: "linear-gradient(180deg, #6BF8EF, #87ACF7, #645DB5)",
        position: "relative",
      }}
    >
      <Button
        variant="link"
        style={{ position: "absolute", top: "10px", right: "10px" }}
        onClick={toggleFavorite}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill={isFavorite ? "gold" : "gray"} // Cambiar el color si es favorito
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      </Button>

      <Card.Body>
        <Row className="align-items-center">
          <Col xs={3} className="text-center">
            <Image
              src="https://via.placeholder.com/50"
              roundedCircle
              fluid
              alt="Worker Avatar"
            />
          </Col>
          <Col xs={9}>
            <Card.Title>
              Nombre: {name} {lastname}
            </Card.Title>
            <Card.Text>Descripción: {description}</Card.Text>
            <Card.Text>Profesión: {profession}</Card.Text>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-2">
            {[...Array(Math.round(rating))].map((_, idx) => (
              <Badge key={idx} pill bg="primary" className="me-1">
                ★
              </Badge>
            ))}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default WorkerCard;
