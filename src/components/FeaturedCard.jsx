import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import ProductImage from "./ProductImage";

import { ProductsContext } from "../context/productsContext";


export default function FeaturedCard(props) {

  const navigate = useNavigate()
  const context = React.useContext(ProductsContext)
  const featuredProduct = context.productsList[0]
  const [numberOfItems, setNumberOfItems] = React.useState(1)

  React.useEffect(() => {
    if (numberOfItems < 1) {
      setNumberOfItems(1)
    }
  }, [numberOfItems])

  return (
    <div className='featured card--big'>
      <ProductImage src={featuredProduct.img} />
      <div className="featured__text">
        <h3 className="featured__name text--primary">{featuredProduct.name}</h3>
        <div className="featured__rating">
          <div className="featured__stars">
            {Array(5).fill(null).map(() => {return <FontAwesomeIcon icon="fa-solid fa-star" className='icon--star icon--s' />})}
          </div>
          <p className="text--small-regular text--white">({featuredProduct.reviewCount}200 reviews)</p>
        </div>
        <p className="featured__desc text--desc">{featuredProduct.desc}</p>
        <div className="featured__panel">
          <p className="text--medium-bold">Price: ${featuredProduct.price}</p>
          <div className="featured__quantity">
            <div className="featured__quantity-btn" onClick={() => setNumberOfItems(prev => prev - 1)}>-</div>
            <p className="featured__quantity-number">{numberOfItems}</p>
            <div className="featured__quantity-btn" onClick={() => setNumberOfItems(prev => prev + 1)}>+</div>
          </div>
        </div>
        <div className="featured__buttons">
          <div className="btn--ghost btn--small btn" onClick={() => context.addToCart(featuredProduct.id, numberOfItems)}>Add to Cart</div>
          <div className="btn--solid btn--small btn" onClick={() => {
            context.addToCart(featuredProduct.id, 1)
            navigate("/checkout")
          }}>Buy now</div>
        </div>
      </div>
    </div>
  )
}