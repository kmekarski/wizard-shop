import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

import CartPopup from "./CartPopup";

export default function Header(props) {

  const [showCart, setShowCart] = React.useState(false)
  const navigate = useNavigate()

  function toggleCart() {
    setShowCart(prev => !prev)
  }

  return (
    <div className='header'>
      <div className="header__text">
        <h2 className="header__title text--primary">{props.title}</h2>
        <h4 className="header__subtitle text--secondary">{props.subtitle}</h4>
      </div>
      {props.searchbar && <div className="header__searchbar input">
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className='icon--input' />
        <p className='text--input-medium'>Search</p>
      </div>}
      {props.buttons && <div className="header__buttons">
        <div className="header__cart-btn header__icon-btn">
          <FontAwesomeIcon icon="fa-solid fa-cart-shopping" className='icon--m icon--primary' onClick={(e) => toggleCart(e)} />
          <p className='text--icon' onClick={(e) => toggleCart(e)}>Cart</p>
          <CartPopup show={showCart}
            toggle={toggleCart}
            removeFromCart={props.removeFromCart}
            changeNumberOfItemsInCart={props.changeNumberOfItemsInCart}
            cart={props.cart} />
        </div>
        {localStorage.getItem("userID") === null && <div className="header__logout-btn btn--solid btn--medium btn" onClick={() => navigate("/register")}>
          Register
        </div>}
        {localStorage.getItem("userID") !== null && <div className="header__account-btn header__icon-btn" onClick={() => navigate("/profile")}>
          <FontAwesomeIcon icon="fa-solid fa-user" className='icon--m icon--primary' />
          <p className='text--icon'>Account</p>
        </div>}
        {localStorage.getItem("userID") === null && <div className="header__logout-btn btn--solid btn--medium btn" onClick={() => navigate("/login")}>Login</div>}
        {localStorage.getItem("userID") !== null && <div className="header__logout-btn btn--solid btn--medium btn" onClick={() => navigate("/logout")}>Logout</div>}
      </div>}
    </div>
  )
}

Header.defaultProps = {
  title: "Magic equipment",
  subtitle: "From top brands",
  searchbar: true,
  buttons: true
}