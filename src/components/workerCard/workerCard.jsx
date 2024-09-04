import React from "react";
import { Card, Row, Col, Image, Badge } from "react-bootstrap";

const WorkerCard = ({ name, lastname, description, profession, rating }) => {
  return (
    <Card
      className="p-3"
      style={{
        borderRadius: "1rem",
        background: "linear-gradient(180deg, #6BF8EF, #87ACF7, #645DB5)",
      }}
    >
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
            {[...Array(rating)].map((_, idx) => (
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
