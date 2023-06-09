import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartPopup from "./CartPopup.jsx";
import ProductImage from "./ProductImage.jsx";
import Header from './Header.jsx';
import { ProductsContext } from "../context/productsContext";
import { ModalContext } from '../context/modalContext.jsx';

export default function Checkout(props) {
  const navigate = useNavigate()
  const productsContext = React.useContext(ProductsContext)
  const modalContext = React.useContext(ModalContext)



  if (productsContext.cart.length === 0) {
    navigate('/')
  }

  const [addressData, setAddressData] = useState({
    isSet: false
  })

  const [paymentData, setPaymentData] = useState({
    isSet: false
  })

  function handleAddressSubmit(e) {
    e.preventDefault()
    modalContext.setCallback(addressSubmit)


  }

  function handlePaymentSubmit(e) {
    e.preventDefault()
    modalContext.setCallback(paymentSubmit)
  }

  function addressSubmit() {
    setAddressData(prev => { return { ...prev, isSet: true } })
    //odpowiednio sformatować dane z formularza i zapisać w state addressData
  }

  function paymentSubmit() {
    setPaymentData(prev => { return { ...prev, isSet: true } })
    //odpowiednio sformatować dane z formularza, zapisać w state paymentData
    //i wysłać na odpowiedni endpoint
  }


  const cartItemsHtml = productsContext.cart.map((item, index) => {
    return (
      <div className="cart-popup__item" key={index}>
        <ProductImage src={item.img} />
        <div className="cart-popup__item__text">
          <p className="cart-popup__item__name text--small-bold">{item.name}</p>
          <p className="cart-popup__item__price text--small-bold">${item.price}</p>
          <div className="cart-popup__item__panel">
            <div className="cart-popup__item__quantity">
              <div className="cart-popup__item__quantity-btn" onClick={() => productsContext.changeNumberOfItemsInCart(item.id, "minus")}>-</div>
              <p className="cart-popup__item__quantity-number">{item.number}</p>
              <div className="cart-popup__item__quantity-btn" onClick={() => productsContext.changeNumberOfItemsInCart(item.id, "plus")}>+</div>
            </div>
            <p className="text--small" onClick={() => productsContext.removeFromCart(item.id)}>remove</p>
          </div>
        </div>
      </div>
    )
  })

  let total = 0
  productsContext.cart.forEach(item => total += item.price * item.number)

  const addressForm = <form onSubmit={e => handleAddressSubmit(e)} className="checkout__form">
    <div className='checkout__long-input-container'>
      <label htmlFor="address1">Address line 1</label>
      <input type="text" id='address1' name='address1' className='checkout__input--long' />
    </div>

    <div className='checkout__long-input-container'>
      <label htmlFor="address2">Address line 2 (optional)</label>
      <input type="text" id='address2' name='address2' className='checkout__input--long' />
    </div>
    <div className='checkout__two-inputs-container'>
      <div>
        <label htmlFor="country">Country or region</label>
        <input type="text" id='country' name='country' className='checkout__input--medium' />
      </div>
    </div>
    <div className='checkout__two-inputs-container'>
      <div>
        <label htmlFor="city">City</label>
        <input type="text" id='city' name='city' className='checkout__input--medium' />
      </div>
      <div>
        <label htmlFor="zip">ZIP</label>
        <input type="text" id='zip' name='zip' className='checkout__input--short' />
      </div>
    </div>
    <button className="btn--medium btn--solid btn checkout__purchase-btn">Proceed</button>
  </form>

  const paymentForm = <form onSubmit={e => handlePaymentSubmit(e)} className="checkout__form">
    <div className='checkout__long-input-container'>
      <label htmlFor="card-number">Card number</label>
      <input type="text" id='card-number' name='card-number' className='checkout__input--long' />
    </div>
    <div className='checkout__two-inputs-container'>
      <div>
        <label htmlFor="exp-date">Expiration date</label>
        <input type="text" id='exp-date' name='exp-date' className='checkout__input--medium' />
      </div>
      <div>
        <label htmlFor="cvc">CVC</label>
        <input type="text" id='cvc' name='cvc' className='checkout__input--short' />
      </div>
    </div>
    <div className='checkout__long-input-container'>
      <label htmlFor="name">Name on card</label>
      <input type="text" id='name' name='name' className='checkout__input--long' />
    </div>
    <div className='checkout__two-inputs-container'>
      <div>
        <label htmlFor="country">Country or region</label>
        <input type="text" id='country' name='country' className='checkout__input--medium' />
      </div>
      <div>
        <label htmlFor="zip">ZIP</label>
        <input type="text" id='zip' name='zip' className='checkout__input--short' />
      </div>
    </div>
    <button className="btn--medium btn--solid btn checkout__purchase-btn">Purchase</button>
  </form>

  return (
    <div className="checkout">
      <div className="container">
        <Header title="Checkout" subtitle="" searchbar={false} buttons={false}></Header>
        <div className="checkout__main">
          <div className="checkout__cart card--big">
            <p className="text--medium-bold text--dark">Cart</p>
            <div className="checkout__cart__items">
              {cartItemsHtml}
            </div>
            <div className="cart-popup__checkout">
              <div className="cart-popup__checkout__text text--medium-bold">
                <p>Total:</p>
                <p>${total}</p>
              </div>
            </div>
          </div>
          <div className="checkout__payment card--big">



            {addressData.isSet === true ? <div>
              <p className="text--small text--medium-dark">pay using:</p>
              <div className="checkout__providers">
                <div className="btn--medium btn--light btn">Paypal</div>
              </div>
              <p className="text--small text--medium-dark">or pay using credit card:</p>
            </div> : <p className="text--small text--medium-dark">your address info:</p>}

            {addressData.isSet ? paymentForm : addressForm}

          </div>
        </div>
      </div>
    </div>
  );
}