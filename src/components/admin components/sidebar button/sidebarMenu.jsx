import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../services/ThemeContext/Theme.context';
import './SidebarMenu.css';

const SidebarMenu = () => {
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    console.error;
    return null; 
  }

  const { theme } = themeContext;

  const handleEditUser = () => navigate('/Admin');
  const handleEditCategory = () => navigate('/admin/AdminEditCategory');
  const handleEditWorker = () => navigate('/admin/adminWorkersPage');

  return (
    <div className={`sidebar-container ${theme === 'dark' ? 'sidebar-container-dark' : ''}`}>
      <Button className={`sidebar-button ${theme === 'dark' ? 'sidebar-button-dark' : ''}`} onClick={handleEditUser}>
        Edit User
      </Button>
      <Button className={`sidebar-button ${theme === 'dark' ? 'sidebar-button-dark' : ''}`} onClick={handleEditCategory}>
        Edit Category
      </Button>
      <Button className={`sidebar-button ${theme === 'dark' ? 'sidebar-button-dark' : ''}`} onClick={handleEditWorker}>
        Edit Worker
      </Button>
    </div>
  );
};

export default SidebarMenu;
