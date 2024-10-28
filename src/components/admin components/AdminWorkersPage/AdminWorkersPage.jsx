import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import UserCard from "../AdminUserCard/UserCard";
import { useNavigate } from "react-router-dom";
import SidebarButton from "../sidebar button/sidebarMenu";
import { ThemeContext } from "../../services/ThemeContext/Theme.context";
import "./AdminWOrkersPage.css";

const AdminWorkersPage = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const handleEditWorker = (workerName) => {
    console.log(`Editar Trabajador: ${workerName}`);
    navigate(`/adminWorkersEdit`);
  };

  const handleDeleteWorker = (workerName) => {
    console.log(`Eliminar Trabajador: ${workerName}`);
  };

  const handleViewWorkerProfile = (workerName) => {
    console.log(`Ver Perfil del Trabajador: ${workerName}`);
  };

  return (
    <div className={`.background ${theme === 'dark' ? 'APage-background-dark' : 'APage-background-light'}`}>
      <Header />
      <Container
        fluid
        className={`admin-categories-page-background ${theme === 'dark' ? 'admin-page-dark' : 'APage-background-light'} d-flex flex-column justify-content-center align-items-center`}
        style={{ minHeight: "90vh" }}
      >
        <Row className="justify-content-center align-items-center w-100 full-height-row">
          <Col md={2} className="bg-dark text-light sidebar-button-padding">
            <SidebarButton />
          </Col>
          <Col md={10} className="p-4">
            <Row>
              <Col md={12} className="mb-3">
                <UserCard
                  username="trabajador_ejemplo"
                  role="Worker"
                  email="trabajador@example.com"
                  onEdit={() => handleEditWorker("trabajador_ejemplo")}
                  onDelete={() => handleDeleteWorker("trabajador_ejemplo")}
                  onViewProfile={() =>
                    handleViewWorkerProfile("trabajador_ejemplo")
                  }
                  showViewProfile={false}
                  isWorker={true}
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

export default AdminWorkersPage;
