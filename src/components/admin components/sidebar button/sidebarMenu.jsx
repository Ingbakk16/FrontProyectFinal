import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SidebarMenu.css'; 


const SidebarMenu = () => {
  const navigate = useNavigate();

  
  const handleEditUser = () => navigate('/Admin');
  const handleDeleteReview = () => navigate('/deleteReview');
  const handleEditCategory = () => navigate('/AdminEditCategory');
  const handleEditWorker = () => navigate('/adminWorkersPage');

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
