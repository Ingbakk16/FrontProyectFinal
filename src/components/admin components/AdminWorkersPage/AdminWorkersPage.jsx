import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import AdminWorkerCard from "../AdminWorkerCard/AdminWorkerCard";
import { useNavigate } from "react-router-dom";
import SidebarButton from "../sidebar button/sidebarMenu";
import { ThemeContext } from "../../services/ThemeContext/Theme.context";
import "./AdminWOrkersPage.css";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";

const AdminWorkersPage = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [workers, setWorkers] = useState([]);
  const { token } = useContext(AuthenticationContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/workers/all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener los trabajadores");
        }
        const data = await response.json();

        // Agrega `workerId` y `userId` usando ambos `id` de nivel superior y `user`
        const workersWithIds = data.map((worker) => ({
          ...worker,
          workerId: worker.id, // `id` de nivel superior como `workerId`
          userId: worker.user.id, // `id` dentro de `user`
        }));

        setWorkers(workersWithIds);
      } catch (error) {
        console.error("Error al cargar los trabajadores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, [token]);

  const handleEditWorker = (userId) => {
    navigate(`/admin/adminWorkersEdit/${userId}`);
  };

  const handleDeleteWorker = async (workerId) => {
    if (
      !window.confirm("¿Estás seguro de que deseas eliminar este trabajador?")
    )
      return;

    try {
      const response = await fetch(
        `http://localhost:8081/api/admin/${workerId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el trabajador");
      }

      setWorkers((prevWorkers) =>
        prevWorkers.filter((worker) => worker.id !== workerId)
      );
      console.log(`Trabajador ${workerId} eliminado exitosamente`);
    } catch (error) {
      console.error("Error al intentar eliminar el trabajador:", error);
    }
  };

  const handleViewReviews = (workerId) => {
    navigate(`/admin/DeleteReview/${workerId}`);
  };

  return (
    <div
      className={`background ${
        theme === "dark" ? "APage-background-dark" : "APage-background-light"
      }`}
    >
      <Header />
      <Container
        fluid
        className={`admin-workers-page-background ${
          theme === "dark" ? "admin-page-dark" : "APage-background-light"
        } d-flex flex-column justify-content-center align-items-center`}
        style={{ minHeight: "90vh" }}
      >
        <Row className="justify-content-center align-items-center w-100 full-height-row">
          <Col md={2} className="bg-dark text-light sidebar-button-padding">
            <SidebarButton />
          </Col>

          <Col md={10} className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className={theme === "dark" ? "text-light" : "text-dark"}>
                Administrar Trabajador
              </h2>
            </div>

            {loading ? (
              <p>Cargando trabajadores...</p>
            ) : (
              <div className="worker-list-container">
                <Row>
                  {workers.map((worker) => (
                    <Col md={12} className="mb-3" key={worker.id}>
                      <AdminWorkerCard
                        username={worker.user.username} 
                        name={worker.user.name} 
                        lastname={worker.user.lastname} 
                        email={worker.user.email} 
                        onEdit={() => handleEditWorker(worker.userId)}
                        onDelete={() => handleDeleteWorker(worker.workerId)}
                        onViewReviews={() => handleViewReviews(worker.workerId)}
                        showViewProfile={false}
                        showDeleteReviews={true}
                        isWorker={true}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default AdminWorkersPage;
