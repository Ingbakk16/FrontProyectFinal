import React from "react";
import { Card, Row, Col, Image, Badge } from "react-bootstrap";
import './WorkerCard.css';  // Import the CSS file

const WorkerCard = ({ name, lastname, description, profession, rating }) => {
  return (
    <Card className="worker-card">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={3} className="text-center">
            <Image
              src="https://via.placeholder.com/50"
              roundedCircle
              fluid
              alt="Worker Avatar"
              className="worker-avatar"
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
          <Col className="text-center worker-rating">
            {[...Array(rating)].map((_, idx) => (
              <Badge key={idx} pill bg="primary" className="me-1 worker-badge">
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
