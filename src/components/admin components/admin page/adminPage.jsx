import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import UserCard from '../AdminUserCard/UserCard'; 
import { useNavigate } from 'react-router-dom';
import SidebarButton from '../sidebar button/sidebarMenu';

const SysAdmin = () => {
  const navigate = useNavigate();
  
  const handleEdit = (username) => {
    // Lógica para editar el usuario
    console.log(`Editar: ${username}`);
    navigate(`/editUserAdmin`);
  };

  const handleDelete = (username) => {
    // Lógica para eliminar el usuario
    console.log(`Eliminar: ${username}`);
  };

  const handleViewProfile = (username) => {
    // Lógica para ver el perfil del usuario
    console.log(`Ver Perfil: ${username}`);
  };

  return (
    <>
      <Header />
      <Container fluid className="d-flex" style={{ minHeight: "90vh" }}>
        <Col md={2} className="bg-dark text-light sidebar-button-padding">
          {/* SidebarButton Componente */}
          <SidebarButton />
        </Col>
        <Col md={10} className="p-4">
          <Row>
            <Col md={12} className="mb-3">
              <UserCard 
                username="josefasio_malandro"
                role="Admin"
                email="josefasio@example.com"
                onEdit={() => handleEdit("josefasio_malandro")}
                onDelete={() => handleDelete("josefasio_malandro")}
                onViewProfile={() => handleViewProfile("josefasio_malandro")}
              />
            </Col>
            {/* Puedes repetir la tarjeta o hacer un .map() */}
          </Row>
        </Col>
      </Container>
      <Footer />
    </>
  );
};

export default SysAdmin;
