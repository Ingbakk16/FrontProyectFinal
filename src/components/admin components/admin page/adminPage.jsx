import React, { useContext, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import UserCard from "../AdminUserCard/UserCard";
import { useNavigate } from "react-router-dom";
import SidebarButton from "../sidebar button/sidebarMenu";
import { ThemeContext } from "../../services/ThemeContext/Theme.context";
import "./SysAdmin.css";

const SysAdmin = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // Forzar el cambio de fondo cada vez que 'theme' cambia
    const backgroundElement = document.querySelector('.background');
    if (backgroundElement) {
      backgroundElement.className = `background ${theme === 'dark' ? 'APage-background-dark' : 'APage-background-light'}`;
    }
  }, [theme]); // Ejecuta este efecto cada vez que 'theme' cambia

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
    <div className={`background ${theme === 'dark' ? 'APage-background-dark' : 'APage-background-light'}`}>
      <Header />
      <Container
        fluid
        className={`sys-admin-page-background ${theme === 'dark' ? 'admin-page-dark' : 'admin-page-light'} d-flex flex-column justify-content-center align-items-center`}
        style={{ minHeight: "90vh" }}
      >
        <Row className="justify-content-center align-items-center w-100 full-height-row">
          <Col md={2} className="bg-dark text-light sidebar-button-padding">
            <SidebarButton />
          </Col>
          
          <Col md={10} className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className={theme === 'dark' ? 'text-light' : 'text-dark'}>Administrar Administrador del Sistema</h2>
              <Button
                className={`add-admin-button ${theme === 'dark' ? 'button-dark' : ''}`}
                onClick={() => handleAddAdmin()} // Función para agregar un administrador
              >
                Añadir Administrador
              </Button>
            </div>
            
            <Row>
              <Col md={12} className="mb-3">
                <UserCard
                  username="josefasio_malandro"
                  role="Admin"
                  email="josefasio@example.com"
                  onEdit={handleEdit}
                  onDelete={() => handleDelete("josefasio_malandro")}
                  onViewProfile={() => handleViewAdminProfile("josefasio_malandro")} // Cambié la función de perfil
                  showViewProfile={true} // Mostrar perfil para el administrador
                  isWorker={false}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );  
};

export default SysAdmin;
