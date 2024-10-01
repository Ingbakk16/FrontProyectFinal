import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoriesStyle.css'; 
import Header from '../header/header';
import Footer from '../footer/footer';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const categoriesPerPage = 6;  // Número de categorías por página
    const totalPages = Math.ceil(categories.length / categoriesPerPage);

    const navigate = useNavigate();

    useEffect(() => {
        const simulatedCategories = ['Ingeniero', 'Electricista', 'Plomero', 'Carpintero', 'Jardinero', 'Diseñador', 'Pintor', 'Mecánico', 'Soldador', 'Albañil'];
        setCategories(simulatedCategories);
    }, []);

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
        <div className="categories-page">
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
