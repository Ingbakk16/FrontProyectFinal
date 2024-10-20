import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import SidebarButton from '../sidebar button/sidebarMenu';
import CategoryCard from '../EditCategoryCard/CategoryCard '; // Componente para mostrar categorías
import { useNavigate } from 'react-router-dom';

const AdminCategoriesPage = () => {
  const navigate = useNavigate();

  // Función para navegar al formulario de edición de categoría
  const handleEditCategory = (categoryId) => {
    navigate(`/AdminCategoryForm/${categoryId}`); // Navega hacia el form pasando el ID de la categoría
  };

  const handleDeleteCategory = (categoryId) => {
    console.log(`Eliminar categoría: ${categoryId}`);
  };

  return (
    <>
      <Header />
      <Container fluid className="d-flex" style={{ minHeight: '90vh' }}>
        <Col md={2} className="bg-dark text-light sidebar-button-padding">
          <SidebarButton />
        </Col>
        <Col md={10} className="p-4">
          <h2 className="text-center mb-4">Administrar Categorías</h2>
          <Row>
            <Col md={12} className="mb-3">
              <CategoryCard
                categoryName="Ingeniero"
                onEdit={() => handleEditCategory("1")} // ID de ejemplo, ajusta según el dato
                onDelete={() => handleDeleteCategory("1")}
              />
            </Col>
            {/* Repetir el bloque de categorías */}
            <Col md={12} className="mb-3">
              <CategoryCard
                categoryName="Doctor"
                onEdit={() => handleEditCategory("2")}
                onDelete={() => handleDeleteCategory("2")}
              />
            </Col>
          </Row>
        </Col>
      </Container>
      <Footer />
    </>
  );
};

export default AdminCategoriesPage;
