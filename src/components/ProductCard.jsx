import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductCard(props) {
    return (
        <div className="product card--small">
            <div className="product__image">
            </div>
            <h3 className="text--small-bold">{props.name}</h3>
            <h3 className="text--small-regular">Price: ${props.price}</h3>
            <div className="product__panel">
                <FontAwesomeIcon icon="fa-solid fa-star" className='icon--star' />
                <h3 className="text--small-regular">{props.rating}</h3>
                <div className="product__btn">+</div>
            </div>


            {props.last && <div>
                <div className="product-cover"></div>
                <div className="product-cover__btn">
                    <FontAwesomeIcon icon="fa-solid fa-chevron-right" className='icon--s' />
                </div>
            </div>}

        </div>
    )
}