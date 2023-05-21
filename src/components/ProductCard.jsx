import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductsContext } from "../context/productsContext";
import ProductImage from "./ProductImage";

export default function ProductCard(props) {

    const context = React.useContext(ProductsContext)

    return (
        <div className="product card--small">
            <ProductImage src={props.img} />
            <h3 className="text--small-bold">{props.name}</h3>
            <h3 className="text--small-regular">Price: ${props.price}</h3>
            <div className="product__panel">
                <FontAwesomeIcon icon="fa-solid fa-star" className='icon--star' />
                <h3 className="text--small-regular">{props.rating}</h3>
                <div className="product__btn" onClick={() => context.addToCart(props.id, 1)}>+</div>
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