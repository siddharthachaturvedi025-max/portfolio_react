import React, { useState, useEffect } from 'react';
import DriveImage from './DriveImage';

/**
 * Auto-cycling image carousel for project images
 * Supports 1-6 images with sophisticated fade transitions
 * 3-second interval per image
 */
const ImageCarousel = ({ images, className }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Auto-cycle through images every 3 seconds
    useEffect(() => {
        if (!images || images.length <= 1) return;

        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
                setIsTransitioning(false);
            }, 300); // Half of transition duration for crossfade effect
        }, 3000); // 3 seconds per image

        return () => clearInterval(interval);
    }, [images]);

    if (!images || images.length === 0) {
        return (
            <div className="display-zone">
                <div className="ph-content">
                    <i className="fas fa-image"></i><br />
                    No images available
                </div>
            </div>
        );
    }

    // Single image - no carousel needed
    if (images.length === 1) {
        const img = images[0];
        return (
            <div className="display-zone">
                <DriveImage name={img.name} alt={img.caption} />
                {!img.name && (
                    <div className="ph-content">
                        <i className={`fas ${img.icon}`}></i><br />
                        {img.caption}
                    </div>
                )}
            </div>
        );
    }

    // Multiple images - show carousel
    const currentImage = images[currentIndex];

    return (
        <div className={`carousel-container ${className || ''}`}>
            <div className="carousel-display-zone">
                {/* Main image display with fade transition */}
                <div className={`carousel-image ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
                    <DriveImage name={currentImage.name} alt={currentImage.caption} />
                    {!currentImage.name && (
                        <div className="ph-content">
                            <i className={`fas ${currentImage.icon}`}></i><br />
                            {currentImage.caption}
                        </div>
                    )}
                </div>

                {/* Image caption */}
                {currentImage.caption && (
                    <div className="carousel-caption">
                        <span>{currentImage.caption}</span>
                    </div>
                )}

                {/* Carousel indicators */}
                <div className="carousel-indicators">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            className={`indicator ${idx === currentIndex ? 'active' : ''}`}
                            onClick={() => {
                                setIsTransitioning(true);
                                setTimeout(() => {
                                    setCurrentIndex(idx);
                                    setIsTransitioning(false);
                                }, 300);
                            }}
                            aria-label={`Go to image ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* Navigation arrows (subtle, appear on hover) */}
                {images.length > 1 && (
                    <>
                        <button
                            className="carousel-nav prev"
                            onClick={() => {
                                setIsTransitioning(true);
                                setTimeout(() => {
                                    setCurrentIndex((prevIndex) =>
                                        prevIndex === 0 ? images.length - 1 : prevIndex - 1
                                    );
                                    setIsTransitioning(false);
                                }, 300);
                            }}
                            aria-label="Previous image"
                        >
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <button
                            className="carousel-nav next"
                            onClick={() => {
                                setIsTransitioning(true);
                                setTimeout(() => {
                                    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
                                    setIsTransitioning(false);
                                }, 300);
                            }}
                            aria-label="Next image"
                        >
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ImageCarousel;
