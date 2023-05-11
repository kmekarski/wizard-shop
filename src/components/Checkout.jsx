import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartPopup from "./CartPopup.jsx";
import ProductImage from "./ProductImage.jsx";

export default function Checkout(props) {
  const [cart, setCart] = React.useState(() => {
    const localStorageCart = JSON.parse(localStorage.getItem('cart'))
    return localStorageCart || []
  })

  const cartItemsHtml = cart.map((item, index) => {
    return (
      <div className="cart-popup__item" key={index}>
        <ProductImage src={item.img} />
        <div className="cart-popup__item__text">
          <p className="cart-popup__item__name text--small-bold">{item.name}</p>
          <p className="cart-popup__item__price text--small-bold">${item.price}</p>
          <div className="cart-popup__item__panel">
            <div className="cart-popup__item__quantity">
              <div className="cart-popup__item__quantity-btn" onClick={() => props.changeNumberOfItemsInCart(item.id, "minus")}>-</div>
              <p className="cart-popup__item__quantity-number">{item.number}</p>
              <div className="cart-popup__item__quantity-btn" onClick={() => props.changeNumberOfItemsInCart(item.id, "plus")}>+</div>
            </div>
            <p className="text--small" onClick={() => props.removeFromCart(item.id)}>remove</p>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className="checkout">
      <div className="container">
        {cartItemsHtml}
      </div>
    </div>
  );
}