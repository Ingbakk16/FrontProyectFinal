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
      <div className="image-wrapper">
        {isAddImageSlide ? (
          <div className="add-image-placeholder" onClick={onAddImage}>
            <span className="add-icon">+</span>
          </div>
        ) : (
          <>
            <Image
              src={images[currentImageIndex]}
              className="carousel-image"
            />
            {editable && onDelete && (
              <Button
                variant="danger"
                size="sm"
                className="delete-button"
                onClick={() => onDelete(images)}
              >
                🗑️
              </Button>
            )}
          </>
        )}
        <Button variant="link" onClick={handlePreviousImage} className="carousel-nav-btn left">
          {'<'}
        </Button>
        <Button variant="link" onClick={handleNextImage} className="carousel-nav-btn right">
          {'>'}
        </Button>
      </div>
    </div>
  );
};

export default Carousel;