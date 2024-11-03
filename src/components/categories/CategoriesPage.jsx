import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CategoriesStyle.css'; 
import Header from '../header/header';
import Footer from '../footer/footer';
import { AuthenticationContext } from '../services/authenticationContext/authentication.context';
import { ThemeContext } from '../services/ThemeContext/Theme.context';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { token } = useContext(AuthenticationContext);
    const { theme } = useContext(ThemeContext);
    const categoriesPerPage = 4;  
    const totalPages = Math.ceil(categories.length / categoriesPerPage);

    const navigate = useNavigate();


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
                console.log("Fetched categories:", data);
                setCategories(data.map(category => ({ title: category.title, jobId: category.id })));
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [token]);

    const handleCategoryClick = (jobId) => {
        navigate(`/mainPage?category=${jobId}`); // Navigate with jobId in the query
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

    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

    return (
        <div className={`categories-page-background ${theme === 'dark' ? 'background-dark' : 'background-light'}`}>
            <Header />
            <div className={`categories-container ${theme === 'dark' ? 'categories-container-dark' : ''}`}>
            <div className={`categories-box ${theme === 'dark' ? 'categories-box-dark' : ''}`}>
                    {currentCategories.map((category, index) => (
                         <button
                         key={index}
                         className={`category-button ${theme === 'dark' ? 'category-button-dark' : ''}`}
                         onClick={() => handleCategoryClick(category.jobId)} // Pass jobId here
                     >
                         {category.title} {/* Display the title only */}
                     </button>
                    ))}
                    <div className="pagination">
                        <button 
                            className={`pagination-arrow ${theme === 'dark' ? 'pagination-arrow-dark' : ''}`}
                            onClick={handlePreviousPage} 
                            disabled={currentPage === 1}
                        >
                            &#8249;
                        </button>
                        <span className="pagination-number">{currentPage}</span>
                        <button 
                            className={`pagination-arrow ${theme === 'dark' ? 'pagination-arrow-dark' : ''}`}
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
