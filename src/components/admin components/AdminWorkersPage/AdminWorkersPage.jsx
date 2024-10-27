import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import UserCard from "../AdminUserCard/UserCard";
import { useNavigate } from "react-router-dom";
import SidebarButton from "../sidebar button/sidebarMenu";
import "./AdminWOrkersPage.css";

const AdminWorkersPage = () => {
  const navigate = useNavigate();

  const handleEditWorker = (workerName) => {
    console.log(`Editar Trabajador: ${workerName}`);
    navigate(`/adminWorkersEdit`);
  };

  const handleDeleteWorker = (workerName) => {
    // Lógica para eliminar el trabajador
    console.log(`Eliminar Trabajador: ${workerName}`);
  };

  const handleViewWorkerProfile = (workerName) => {
    // Lógica para ver el perfil del trabajador
    console.log(`Ver Perfil del Trabajador: ${workerName}`);
  };

  return (
    <>
      <div className="admin-categories-page-background">
        <Header />
        <Container fluid className="d-flex" style={{ minHeight: "90vh" }}>
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
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default AdminWorkersPage;
