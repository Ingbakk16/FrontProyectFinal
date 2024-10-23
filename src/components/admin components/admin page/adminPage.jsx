import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import UserCard from '../AdminUserCard/UserCard'; 
import { useNavigate } from 'react-router-dom';
import SidebarButton from '../sidebar button/sidebarMenu';

const SysAdmin = () => {
  const navigate = useNavigate();
  
  const handleEdit = (isWorker) => {
    if (isWorker) {
      navigate(`/AdminEditWorkers`);
    } else {
      navigate(`/editUserAdmin`);
    }
  };

  const handleDelete = (username) => {
    console.log(`Eliminar: ${username}`);
  };

  const handleViewWorkerProfile = (username) => {
    console.log(`Ver Perfil del Trabajador: ${username}`);
  };

  return (
    <>
      <Header />
      <Container fluid className="d-flex" style={{ minHeight: "90vh" }}>
        <Col md={2} className="bg-dark text-light sidebar-button-padding">
          <SidebarButton />
        </Col>
        <Col md={10} className="p-4">
          <Row>
            <Col md={12} className="mb-3">
              <UserCard 
                username="josefasio_malandro"
                role="Admin"
                email="josefasio@example.com"
                onEdit={handleEdit}
                onDelete={() => handleDelete("josefasio_malandro")}
                onViewProfile={() => handleViewWorkerProfile("josefasio_malandro")}
                showViewProfile={false} 
                isWorker={false} 
              />
            </Col>
            
          </Row>
        </Col>
      </Container>
      <Footer />
    </>
  );
};

export default SysAdmin;
