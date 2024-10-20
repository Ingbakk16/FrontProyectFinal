import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SidebarMenu.css'; // Archivo de estilos


const SidebarMenu = () => {
  const navigate = useNavigate();

  // Funciones de manejo de navegación
  const handleEditUser = () => navigate('/editUser');
  const handleDeleteReview = () => navigate('/deleteReview');
  const handleEditCategory = () => navigate('/editCategory');
  const handleEditWorker = () => navigate('/editWorker');

  return (
    <div className="sidebar-container">
      <Button className="sidebar-button" onClick={handleEditUser}>
        Editar usuario
      </Button>
      <Button className="sidebar-button" onClick={handleDeleteReview}>
        Borrar reseña
      </Button>
      <Button className="sidebar-button" onClick={handleEditCategory}>
        Editar categoría
      </Button>
      <Button className="sidebar-button" onClick={handleEditWorker}>
        Editar trabajador
      </Button>
    </div>
  );
};

export default SidebarMenu;
