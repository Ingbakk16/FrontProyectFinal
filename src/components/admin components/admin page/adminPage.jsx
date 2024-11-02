import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import UserCard from "../AdminUserCard/UserCard";
import { useNavigate } from "react-router-dom";
import SidebarButton from "../sidebar button/sidebarMenu";
import { ThemeContext } from "../../services/ThemeContext/Theme.context";
import "./SysAdmin.css";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";

const SysAdmin = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { token } = useContext(AuthenticationContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/users/all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Obtén el token de autorización almacenado
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [theme]);

  const handleEdit = (userId) => {
    navigate(`/editUserAdmin/${userId}`);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario?"))
      return;
    
    try {
      const response = await fetch(
        `http://localhost:8081/api/admin/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      if (response.ok) {
        console.log(`Usuario con ID ${userId} eliminado con éxito`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

      } else {
        throw new Error("Error al eliminar el usuario");
      }
    } catch (error) {
      console.error("Error al intentar eliminar el usuario:", error);
    }
  };
  
  const handleMakeWorker = (userId) => {
    navigate(`/MakeWorkerForm/${userId}`);
  };
  
  const handleAddAdmin = () => {
    navigate("/AdminCreateForm");
  };
  
  const handleAddUser = () => {
    navigate("/adminCreateUserForm");
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
        className={`sys-admin-page-background ${
          theme === "dark" ? "admin-page-dark" : "admin-page-light"
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
                Administrar Usuarios y Administradores
              </h2>

              <div className="d-flex">
                <Button
                  className={`add-admin-button mx-2 ${
                    theme === "dark" ? "button-dark" : ""
                  }`}
                  onClick={handleAddAdmin}
                >
                  Añadir Administrador
                </Button>

                <Button
                  className={`add-user-button ${
                    theme === "dark" ? "button-dark" : ""
                  }`}
                  onClick={handleAddUser}
                >
                  Añadir Usuario
                </Button>
              </div>
            </div>

            {loading ? (
              <p>Cargando usuarios...</p>
            ) : (
              <div className="user-list-container">
                <Row>
                  {users.map((user) => (
                    <Col md={12} className="mb-3" key={user.id}>
                      <UserCard
                        username={user.username}
                        name={user.name}
                        lastname={user.lastname}
                        email={user.email}
                        role={user.role?.name || "Usuario"}
                        onEdit={() => handleEdit(user.id)}
                        onDelete={() => handleDelete(user.id)}
                        onMakeWorker={() => handleMakeWorker(user.id)} // Pasa la función de "Make Worker"
                        showMakeWorker={true} // Habilita el botón "Make Worker"
                        isWorker={false}
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

export default SysAdmin;
