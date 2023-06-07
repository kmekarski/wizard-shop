import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductsContext } from "../context/productsContext";
import ProductImage from "./ProductImage";
import { useNavigate } from "react-router-dom";

export default function ProductCard(props) {

    const navigate = useNavigate()
    const context = React.useContext(ProductsContext)

    

    if (props.size === 'big')
        return (
            <div className={`product--big card--small`} onClick={() => navigate(`/product/${props.id}`)}>
                <ProductImage src={props.img} />
                <h3 className="text--nowrap text--medium-bold">{props.name}</h3>
                <div className="product__panel">
                    <h3 className="text--medium-regular text--white">Price: ${props.price}</h3>
                    <FontAwesomeIcon icon="fa-solid fa-star" className='icon--star icon--s' />
                    <h3 className="text--medium-regular text--white">{props.rating}</h3>
                </div>
            </div>
        )
    return (
        <div className={`product--${props.size} card--small`} onClick={() => navigate(`/product/${props.id}`)}>
            <ProductImage src={props.img} />
            <h3 className="text--small-bold">{props.name}</h3>
            <h3 className="text--small-regular text--white">Price: ${props.price}</h3>
            <div className="product__panel">
                <FontAwesomeIcon icon="fa-solid fa-star" className='icon--star' />
                <h3 className="text--small-regular text--white">{props.rating}</h3>
                <div className="product__btn" onClick={(e) => {e.stopPropagation()
                context.addToCart(props.id, 1)
                context.setShowCart(true)}}>+</div>
            </div>


            {props.last && <div>
                <div className="product-cover"></div>
                <div className="product-cover__btn" onClick={props.scroll}>
                    <FontAwesomeIcon icon="fa-solid fa-chevron-right" className='icon--s icon--primary' />
                </div>
            </div>}

        </div>
    )
}

ProductCard.defaultProps = {
    size: "small"
}