import React, { useState } from 'react';
import { Image, Button } from 'react-bootstrap';
import './Carousel.css'; // Import custom CSS for styling

const Carousel = ({ images, editable = false, onDelete, onAddImage, theme }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  

 
  const maxSlides = Math.min(3, images.length + (editable && images.length < 3 ? 1 : 0));

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? maxSlides - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === maxSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const isAddImageSlide = editable && currentImageIndex >= images.length;

  return (
    <div className={`carousel-container ${theme === 'dark' ? 'carousel-dark' : 'carousel-light'}`}>
      {/* Navigation buttons */}
      <Button variant="link" onClick={handlePreviousImage} className="carousel-nav-btn">
        {'<'}
      </Button>

      <div className="image-wrapper" style={{ position: 'relative' }}>
        {/* Conditional render for Add Image placeholder or image */}
        {isAddImageSlide ? (
          <div className="add-image-placeholder" onClick={onAddImage}>
            <span className="add-icon">+</span>
          </div>
        ) : (
          <>
            <Image
              src={images[currentImageIndex]}
              rounded
              className="carousel-image"
            />
            {/* Delete button only in edit mode */}
            {editable && onDelete && (
              <Button
                variant="danger"
                size="sm"
                className="delete-button"
                onClick={() => onDelete(images)}
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                🗑️
              </Button>
            )}
          </>
        )}
      </div>

      <Button variant="link" onClick={handleNextImage} className="carousel-nav-btn">
        {'>'}
      </Button>
    </div>
  );
};

export default Carousel;