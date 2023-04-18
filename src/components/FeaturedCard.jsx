import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FeaturedCard(props) {
    return (
        <div className='featured card--big'>
            <div className="featured__image">

            </div>
            <div className="featured__text">
              <h3 className="featured__name text--medium-bold">{props.name}</h3>
              <div className="featured__rating">
                <div className="featured__stars">
                  <FontAwesomeIcon icon="fa-solid fa-star" className='icon--star'/>
                  <FontAwesomeIcon icon="fa-solid fa-star" className='icon--star'/>
                  <FontAwesomeIcon icon="fa-solid fa-star" className='icon--star'/>
                  <FontAwesomeIcon icon="fa-solid fa-star" className='icon--star'/>
                  <FontAwesomeIcon icon="fa-solid fa-star" className='icon--star'/>
                </div>
                <p className="text--small">({props.reviewCount} reviews)</p>
              </div>
              <p className="featured__desc text--desc">{props.desc}</p>
              <div className="featured__panel">
                <p className="text--medium-bold">Price: ${props.price}</p>
                <div className="featured__quantity">
                  <div className="featured__quantity-btn">-</div>
                  <p className="featured__quantity-number">1</p>
                  <div className="featured__quantity-btn">+</div>
                </div>
              </div>
              <div className="featured__buttons">
                <div className="btn--ghost btn--small btn">
                <FontAwesomeIcon icon="fa-solid fa-heart" className='icon--xs'/>
                </div>
                <div className="btn--ghost btn--small btn">Add to Cart</div>
                <div className="btn--solid btn--small btn">Buy Now</div>
              </div>
            </div>
          </div>
    )
}