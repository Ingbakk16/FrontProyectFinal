import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import SidebarButton from '../sidebar button/sidebarMenu';
import CategoryCard from '../EditCategoryCard/CategoryCard';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../services/ThemeContext/Theme.context';
import AdminConfirmationAlert from '../../ConfirmationAlert/ConfirmationAlert';
import './AdminCategoriesPage.css';
import { AuthenticationContext } from '../../services/authenticationContext/authentication.context';

const AdminCategoriesPage = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { token } = useContext(AuthenticationContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddCategory = () => {
    navigate('/admin/AdminCategoryForm/new');
  };

  const confirmDeleteCategory = (categoryId) => {
    AdminConfirmationAlert({
      title: "Are you sure you want to delete this category?",
      text: "This action cannot be undone.",
      onConfirm: () => handleDeleteCategory(categoryId),
    });
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/admin/jobs/${categoryId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== categoryId)
        );
      } else {
        throw new Error("Error deleting category");
      }
    } catch (error) {
      console.error("Error trying to delete the category:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/jobs/all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error fetching categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [token]);

  return (
    <div className={`background ${theme === 'dark' ? 'background-dark' : 'background-light'}`}>
      <Header />
      <Container fluid className={`admin-categories-page-background ${theme === 'dark' ? 'admin-page-dark' : 'help-container'} d-flex flex-column justify-content-center align-items-center`}>
        <Row className="justify-content-center align-items-center w-100 full-height-row">
          <Col md={2} className="bg-dark text-light sidebar-button-padding">
            <SidebarButton />
          </Col>
          <Col md={10} className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className={theme === 'dark' ? 'text-light' : 'text-dark'}>Manage Categories</h2>
              <Button
                className={`add-category-button ${theme === 'dark' ? 'button-dark' : ''}`}
                onClick={handleAddCategory}
              >
                Add Category
              </Button>
            </div>
            
            {loading ? (
              <p>Loading categories...</p>
            ) : (
              <Row>
                {categories.map((category) => (
                  <Col md={12} className="mb-3" key={category.id}>
                    <CategoryCard
                      categoryName={category.title}
                      categoryDescription={category.description}
                      onEdit={() => handleEditCategory(category.id)}
                      onDelete={() => confirmDeleteCategory(category.id)}
                      darkMode={theme === 'dark'}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default AdminCategoriesPage;
