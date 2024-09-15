import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center p-3">
      <Container fluid>
        <small>&copy; 2024 Mi Aplicación. Todos los derechos reservados.</small>
      </Container>
    </footer>
  );
};

export default Footer;

