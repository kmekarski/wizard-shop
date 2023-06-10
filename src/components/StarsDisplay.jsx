import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarsDisplay = (props) => {
    const filledStars = Math.floor(props.rating);
    const decimalPart = props.rating % 1; // Decimal part of the rating



    // Create an array of star icons based on the rating
    const stars = Array.from({ length: 5 }, (_, index) => {
        if (index < filledStars) {

            return <FontAwesomeIcon icon={faStar} key={index} className={`icon--star--filled icon--${props.size}`} />;
        } else if (index === filledStars && decimalPart > 0) {

            const percentage = decimalPart * 100;
            return (
                <div className={`star-icon-container icon--${props.size}`} key={index}>
                    <div className="star-icon partial" style={{ width: `${percentage}%` }}>
                        <FontAwesomeIcon icon={faStar} className={`icon--star--filled icon--${props.size}`} />
                    </div>
                    <FontAwesomeIcon icon={faStar} className={`icon--star--empty icon--${props.size}`} />

                </div>
            );
        } else {
            return <FontAwesomeIcon icon={faStar} key={index} className={`icon--star--empty icon--${props.size}`} />;
        }
    })

    return <div className="stars-display">{stars}</div>;
}

export default StarsDisplay;

StarsDisplay.defaultProps = {
    size: "s"
}