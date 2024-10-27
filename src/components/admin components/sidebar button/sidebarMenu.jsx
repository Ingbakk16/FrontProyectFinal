import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../services/ThemeContext/Theme.context';
import './SidebarMenu.css'; 

const SidebarMenu = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext); // Usa ThemeContext para verificar el tema actual

  const handleEditUser = () => navigate('/Admin');
  const handleDeleteReview = () => navigate('/deleteReview');
  const handleEditCategory = () => navigate('/AdminEditCategory');
  const handleEditWorker = () => navigate('/adminWorkersPage');

  return (
    <div className={`sidebar-container ${theme === 'dark' ? 'sidebar-container-dark' : ''}`}>
      <Button className={`sidebar-button ${theme === 'dark' ? 'sidebar-button-dark' : ''}`} onClick={handleEditUser}>
        Editar usuario
      </Button>
      <Button className={`sidebar-button ${theme === 'dark' ? 'sidebar-button-dark' : ''}`} onClick={handleDeleteReview}>
        Borrar reseña
      </Button>
      <Button className={`sidebar-button ${theme === 'dark' ? 'sidebar-button-dark' : ''}`} onClick={handleEditCategory}>
        Editar categoría
      </Button>
      <Button className={`sidebar-button ${theme === 'dark' ? 'sidebar-button-dark' : ''}`} onClick={handleEditWorker}>
        Editar trabajador
      </Button>
    </div>
  );
};

export default SidebarMenu;
