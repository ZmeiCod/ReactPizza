import React, { useEffect, useState } from 'react';

export default function Carousel({ sliders }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % sliders.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [sliders]);

    return (
        <div className="carousel">
            {sliders.map((slide, index) => (
                <img
                    key={slide.id}
                    className={`slider-list ${index === currentSlide ? 'active' : ''}`}
                    src={slide.image}
                    alt={slide.name}
                    style={{ width: '100%', height: '400px', display: index === currentSlide ? 'block' : 'none' }}
                />
            ))}
            <div className="slider-dots">
                {sliders.map((_, index) => (
                    <button
                        key={index}
                        className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
}
