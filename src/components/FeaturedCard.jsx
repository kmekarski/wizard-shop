import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProductImage from "./ProductImage";

export default function FeaturedCard(props) {

    const [numberOfItems, setNumberOfItems] = React.useState(1)

    React.useEffect( () => {
        if(numberOfItems<1) {
            setNumberOfItems(1)
        }
    }, [numberOfItems] )

    return (
        <div className='featured card--big'>
            <ProductImage src={props.img} />
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
                  <div className="featured__quantity-btn" onClick={() => setNumberOfItems(prev => prev-1)}>-</div>
                  <p className="featured__quantity-number">{numberOfItems}</p>
                  <div className="featured__quantity-btn" onClick={() => setNumberOfItems(prev => prev+1)}>+</div>
                </div>
              </div>
              <div className="featured__buttons">
                <div className="btn--ghost btn--small btn">
                <FontAwesomeIcon icon="fa-solid fa-heart" className='icon--xs icon--primary'/>
                </div>
                <div className="btn--ghost btn--small btn" onClick={() => props.addToCart(props.id, numberOfItems)}>Add to Cart</div>
                <div className="btn--solid btn--small btn">Buy Now</div>
              </div>
            </div>
          </div>
    )
}