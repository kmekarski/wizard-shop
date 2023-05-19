import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProductImage from "./ProductImage";
import {useNavigate} from "react-router-dom";
import { ProductsContext } from "../context/productsContext";

export default function CartPopup(props) {

    const navigate = useNavigate()
    const context = React.useContext(ProductsContext)

    const cartItemsHtml = context.cart.map((item, index) => {
        return (
            <div className="cart-popup__item" key={index}>
                <ProductImage src={item.img} />
                <div className="cart-popup__item__text">
                    <p className="cart-popup__item__name text--small-bold">{item.name}</p>
                    <p className="cart-popup__item__price text--small-bold">${item.price}</p>
                    <div className="cart-popup__item__panel">
                        <div className="cart-popup__item__quantity">
                            <div className="cart-popup__item__quantity-btn" onClick={() => context.changeNumberOfItemsInCart(item.id, "minus")}>-</div>
                            <p className="cart-popup__item__quantity-number">{item.number}</p>
                            <div className="cart-popup__item__quantity-btn" onClick={() => context.changeNumberOfItemsInCart(item.id, "plus")}>+</div>
                        </div>
                        <p className="text--small" onClick={() => context.removeFromCart(item.id)}>remove</p>
                    </div>
                </div>
            </div>
        )
    })

    let total = 0 
    context.cart.forEach(item => total += item.price * item.number)

    return (
        <div>
            {props.show && <div className="cart-popup card--small">
                <div className="cart-popup__arrow"></div>
                <div className="cart-popup__header">
                    <p>{context.cart.length > 0 ? `${context.cart.length} item${context.cart.length > 1 ? 's' : ''} in cart` : 'The cart is empty'}</p>
                    <FontAwesomeIcon icon={`fa-solid fa-xmark`} className='icon--l icon--clickable' onClick={props.toggle} />

                </div>
               {context.cart.length > 0 && <div className="cart-popup__inner">

                    <div className="cart-popup__items">

                        {cartItemsHtml}

                    </div>

                    <div className="cart-popup__checkout">
                        <div className="cart-popup__checkout__text text--medium-bold">
                            <p>Total:</p>
                            <p>${total}</p>
                        </div>
                        <div className="btn--medium btn--solid btn" onClick={() => navigate("/checkout")}>Checkout</div>
                    </div>
                </div>}
            </div>}
        </div>

    )
}