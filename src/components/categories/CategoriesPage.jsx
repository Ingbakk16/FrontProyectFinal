import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoriesStyle.css'; 
import Header from '../header/header';
import Footer from '../footer/footer';
import { AuthenticationContext } from '../services/authenticationContext/authentication.context';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { token } = useContext(AuthenticationContext);
    const categoriesPerPage = 4;  
    const totalPages = Math.ceil(categories.length / categoriesPerPage);

    const navigate = useNavigate();

    // Fetch de categorías desde el backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/jobs/all', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`, 
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Error al obtener las categorías');
                }
                const data = await response.json();
                setCategories(data.map(category => category.title)); // Actualiza con los títulos de las categorías
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []); // Ejecutar una vez al cargar el componente

    const handleCategoryClick = (category) => {
        navigate(`/categories/${category.toLowerCase()}`);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Categorías a mostrar en la página actual
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

    return (
        <div className="categories-page-background">
            <Header />
            <div className="categories-container">
                <div className="categories-box">
                    {currentCategories.map((category, index) => (
                        <button
                            key={index}
                            className="category-button"
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </button>
                    ))}
                    <div className="pagination">
                        <button 
                            className="pagination-arrow" 
                            onClick={handlePreviousPage} 
                            disabled={currentPage === 1}
                        >
                            &#8249;
                        </button>
                        <span className="pagination-number">{currentPage}</span>
                        <button 
                            className="pagination-arrow" 
                            onClick={handleNextPage} 
                            disabled={currentPage === totalPages}
                        >
                            &#8250;
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CategoriesPage;
