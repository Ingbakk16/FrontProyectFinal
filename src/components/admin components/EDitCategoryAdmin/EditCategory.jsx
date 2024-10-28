import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import SidebarButton from '../sidebar button/sidebarMenu';
import CategoryCard from '../EditCategoryCard/CategoryCard ';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../services/ThemeContext/Theme.context';
import './AdminCategoriesPage.css';

const AdminCategoriesPage = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const handleAddCategory = () => {
    navigate('/AdminCategoryForm/new');
  };


  const handleEditCategory = (categoryId) => {
    navigate(`/AdminCategoryForm/${categoryId}`);
  };

  const handleDeleteCategory = (categoryId) => {
    console.log(`Eliminar categoría: ${categoryId}`);
  };

  return (
    <div className={`.background ${theme === 'dark' ? 'background-dark' : 'background-light'}`}>
      <Header />
      <Container fluid className={`admin-categories-page-background ${theme === 'dark' ? 'admin-page-dark' : 'help-container'} d-flex flex-column justify-content-center align-items-center`}>
        <Row className="justify-content-center align-items-center w-100 full-height-row">
          <Col md={2} className="bg-dark text-light sidebar-button-padding">
            <SidebarButton />
          </Col>
          <Col md={10} className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className={theme === 'dark' ? 'text-light' : 'text-dark'}>Administrar Categorías</h2>
              <Button
                className={`add-category-button ${theme === 'dark' ? 'button-dark' : ''}`}
                onClick={handleAddCategory}
              >
                Añadir Categoría
              </Button>
            </div>
            <Row>
              <Col md={12} className="mb-3">
                <CategoryCard
                  categoryName="Ingeniero"
                  onEdit={() => handleEditCategory("1")}
                  onDelete={() => handleDeleteCategory("1")}
                  darkMode={theme === 'dark'}
                />
              </Col>
              <Col md={12} className="mb-3">
                <CategoryCard
                  categoryName="Doctor"
                  onEdit={() => handleEditCategory("2")}
                  onDelete={() => handleDeleteCategory("2")}
                  darkMode={theme === 'dark'}
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

export default AdminCategoriesPage;
