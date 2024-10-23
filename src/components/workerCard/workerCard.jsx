import React from "react";
import { Card, Row, Col, Image, Badge, Button } from "react-bootstrap";

const WorkerCard = ({ id, name, lastname, description, profession, rating, isFavorite, toggleFavorite, onClick }) => {
  return (
    <Card
      className="p-3"
      style={{
        borderRadius: "1rem",
        background: "linear-gradient(180deg, #6BF8EF, #87ACF7, #645DB5)",
        cursor: "pointer", 
      }}
      onClick={onClick} 
    >
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={3} className="text-center">
            <Image
              src="https://via.placeholder.com/50" // Placeholder para imagen de perfil
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
        <Row className="align-items-center justify-content-between">
          <Col className="text-center mt-2">
            {[...Array(Math.round(rating))].map((_, idx) => (
              <Badge key={idx} pill bg="primary" className="me-1">
                ★
              </Badge>
            ))}
          </Col>
          <Col xs="auto">
            <Button
              variant={isFavorite ? "warning" : "outline-warning"}
              onClick={(e) => {
                e.stopPropagation(); // Evitar que el clic del botón desencadene el evento del card
                toggleFavorite(id);
              }}
            >
              {isFavorite ? "★" : "☆"}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default WorkerCard;
