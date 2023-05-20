import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartPopup from "./CartPopup.jsx";
import ProductImage from "./ProductImage.jsx";
import Header from './Header.jsx';
import { ProductsContext } from "../context/productsContext";

export default function Checkout(props) {
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

  return (
    <div className="checkout">
      <div className="container">
        <Header title="Checkout" subtitle="" searchbar={false} buttons={false}></Header>
        <div className="checkout__main">
          <div className="checkout__card card--small"></div>
          <div className="checkout__card card--small"></div>
        </div>
      </div>
    </div>
  );
}