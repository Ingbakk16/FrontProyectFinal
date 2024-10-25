import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { ThemeContext } from '../services/ThemeContext/Theme.context'; 

const Footer = () => {
  const { theme } = useContext(ThemeContext); 

  const footerStyle = {
    backgroundColor: theme === 'dark' ? '#000000' : '#25206A', 
    color: theme === 'dark' ? '#ffffff' : '#ffffff', 
  };

  return (
    <footer className="text-center p-3" style={footerStyle}>
      <Container fluid>
        <small>&copy; 2024 Mi Aplicación. Todos los derechos reservados.</small>
      </Container>
    </footer>
  );
};

export default Footer;
