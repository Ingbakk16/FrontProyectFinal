import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../header/header";
import Footer from "../footer/footer";
import { ThemeContext } from "../services/ThemeContext/Theme.context";
import './help.css';

const HelpSeccion = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`background ${theme === 'dark' ? 'background-dark' : 'background-light'}`}>
      <Header />
      <Container fluid className={`help-container ${theme === 'dark' ? 'help-container-dark' : ''} d-flex flex-column justify-content-center align-items-center`}>
        <Row className="justify-content-center align-items-center w-100 full-height-row">
          <Col lg={5} md={4} sm={5}>
            <div className={`help-form ${theme === 'dark' ? 'help-form-dark' : ''}`}>
              <h3>Contact Information</h3>
              <p className="contact-tittle">Name: Juan Pérez</p>
              <p className="contact-text">Email: juan.perez@example.com</p>
              <p className="contact-tittle">Name: María García</p>
              <p className="contact-text">Email: maria.garcia@example.com</p>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default HelpSeccion;
