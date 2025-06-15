import React, { useState } from 'react';
import './StarRating.css'; 

const StarRating = ({ rating, onRatingChange }) => {
    const [hoveredStar, setHoveredStar] = useState(0);

    const handleMouseEnter = (index) => {
        setHoveredStar(index);
    };

    const handleMouseLeave = () => {
        setHoveredStar(0);
    };

    const handleClick = (index) => {
        onRatingChange(index)
    };

    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`star ${star <= (hoveredStar || rating) ? 'filled' : ''}`}
                    onMouseEnter={() => handleMouseEnter(star)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(star)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
