import React from "react";
import { Card, Row, Col, Badge, Button } from "react-bootstrap";
import './WorkerCard.css';

const WorkerCard = ({ id, name, lastname, description, profession, rating, isFavorite, toggleFavorite, onClick }) => {

  // Función para obtener las iniciales del nombre y apellido
  const getInitials = (name, lastname) => {
    if (!name || !lastname) return '';
    return `${name[0]}${lastname[0]}`.toUpperCase();
  };

  return (
    <Card className="worker-card" onClick={onClick}>
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={3} className="text-center">
            <div className="worker-avatar-initials">
              {getInitials(name, lastname)}
            </div>
          </Col>
          <Col xs={9}>
            <Card.Title>
              Full name: {name} {lastname}
            </Card.Title>
            <Card.Text>Description: {description}</Card.Text>
            <Card.Text>Profession: {profession}</Card.Text>
          </Col>
        </Row>
        <Row className="align-items-center justify-content-between">
          <Col className="worker-rating text-center">
            {[...Array(Math.round(rating))].map((_, idx) => (
              <Badge key={idx} pill bg="primary" className="worker-badge me-1">
                ★
              </Badge>
            ))}
          </Col>
          <Col xs="auto">
            <Button
              variant={isFavorite ? "warning" : "outline-warning"}
              onClick={(e) => {
                e.stopPropagation();
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
