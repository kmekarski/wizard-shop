import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartPopup from "./CartPopup.jsx";
import ProductImage from "./ProductImage.jsx";
import TextInput from './TextInput.jsx';
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

  // inputs limits management:
  const [addressInputsOkay, setAddressInputsOkay] = React.useState({
    address1: false,
    address2: true,
    country: false,
    city: false,
    zip: false
  })

  const [paymentInputsOkay, setPaymentInputsOkay] = React.useState({
    cardNumber: false,
    expDate: false,
    cvc: false,
    name: false,
    country2: false,
    zip2: false
  })

  function setInputOkay(name, okay) {
    setAddressInputsOkay({
      ...addressInputsOkay,
      [name]: okay
    })
    setPaymentInputsOkay({
      ...paymentInputsOkay,
      [name]: okay
    })
  }
  const allAddressInputsOkay = Object.keys(addressInputsOkay).every(key => {
    return addressInputsOkay[key]
  })
  const allPaymentInputsOkay = Object.keys(paymentInputsOkay).every(key => {
    return paymentInputsOkay[key]
  })
  ////////

  const [addressFormData, setAddressFormData] = React.useState({
    address1: "",
    address2: "",
    country: "",
    city: "",
    zip: ""
  })

  const [paymentFormData, setPaymentFormData] = React.useState({
    cardNumber: "",
    expDate: "",
    cvc: "",
    name: "",
    country2: "",
    zip2: ""
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
        <ProductImage src={item.images[0]} />
        <div className="cart-popup__item__text">
          <p className="text--small-bold text--dark">{item.name}</p>
          <p className="cart-popup__item__price text--small-bold text--dark">${item.price}</p>
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
      <TextInput
        limit={20}
        name="address1"
        label="Address line 1"
        formData={addressFormData}
        setFormData={setAddressFormData}
        setInputOkay={setInputOkay}
        silent={true}
      />
    </div>

    <div className='checkout__long-input-container'>
      <TextInput
        limit={20}
        name="address2"
        label="Address line 2 (optional)"
        required={false}
        formData={addressFormData}
        setFormData={setAddressFormData}
        setInputOkay={setInputOkay}
        silent={true}
      />
    </div>
    <div className='checkout__two-inputs-container'>
      <div>
        <TextInput
          limit={20}
          name="country"
          label="Country or region"
          formData={addressFormData}
          setFormData={setAddressFormData}
          setInputOkay={setInputOkay}
          silent={true}
        />
      </div>
    </div>
    <div className='checkout__two-inputs-container'>
      <div>
        <TextInput
          limit={20}
          name="city"
          label="City"
          formData={addressFormData}
          setFormData={setAddressFormData}
          setInputOkay={setInputOkay}
          silent={true}
        />
      </div>
      <div>
        <TextInput
          limit={20}
          name="zip"
          label="Zip"
          formData={addressFormData}
          setFormData={setAddressFormData}
          setInputOkay={setInputOkay}
          silent={true}
        />
      </div>
    </div>
    <button className="btn--medium btn--solid btn checkout__purchase-btn" disabled={!allAddressInputsOkay}>Proceed</button>
  </form>

  const paymentForm = <form onSubmit={e => handlePaymentSubmit(e)} className="checkout__form">
    <div className='checkout__long-input-container'>
      <label htmlFor="card-number"></label>
      <TextInput
        limit={20}
        name="cardNumber"
        label="Card number"
        formData={paymentFormData}
        setFormData={setPaymentFormData}
        setInputOkay={setInputOkay}
        silent={true}
      />
    </div>
    <div className='checkout__two-inputs-container'>
      <div>
        <TextInput
          limit={20}
          name="expDate"
          label="Expiration date"
          formData={paymentFormData}
          setFormData={setPaymentFormData}
          setInputOkay={setInputOkay}
          silent={true}
        />
      </div>
      <div>
        <TextInput
          limit={20}
          name="cvc"
          label="CVC"
          formData={paymentFormData}
          setFormData={setPaymentFormData}
          setInputOkay={setInputOkay}
          silent={true}
        />
      </div>
    </div>
    <div className='checkout__long-input-container'>
    <TextInput
          limit={20}
          name="name"
          label="Name on card"
          formData={paymentFormData}
          setFormData={setPaymentFormData}
          setInputOkay={setInputOkay}
          silent={true}
        />
    </div>
    <div className='checkout__two-inputs-container'>
      <div>
      <TextInput
          limit={20}
          name="country2"
          label="Country or region"
          formData={paymentFormData}
          setFormData={setPaymentFormData}
          setInputOkay={setInputOkay}
          silent={true}
        />
      </div>
      <div>
      <TextInput
          limit={20}
          name="zip2"
          label="Zip"
          formData={paymentFormData}
          setFormData={setPaymentFormData}
          setInputOkay={setInputOkay}
          silent={true}
        />
      </div>
    </div>
    <button className="btn--medium btn--solid btn checkout__purchase-btn" disabled={!allPaymentInputsOkay}>Purchase</button>
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
              <div className="cart-popup__checkout__text text--medium-bold text--dark">
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