import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

import { UserContext } from "../context/userContext";
import { ProductsContext } from "../context/productsContext";

import CartPopup from "./CartPopup";

export default function Header(props) {


  const userContext = useContext(UserContext)
  const productsContext = useContext(ProductsContext)

  const navigate = useNavigate()
  const location = useLocation()

  function toggleCart() {
    productsContext.setShowCart(prev => !prev)
  }

  function search(e) {
    e.preventDefault()
    productsContext.setAllFetched(false)
    //odpowiedni fetch do wyszukiwania
    if(location.pathname==="/products") {
      window.location.reload(false);

    }
    else{
      navigate("/products")
    }
  }

  return (
    <div className='header'>
      <div className="header__text">
        <h2 className="header__title text--primary text--nowrap">{props.title}</h2>
        <h4 className="header__subtitle text--secondary text--nowrap" >{props.subtitle}</h4>
      </div>
      {props.searchbar && <div className="header__searchbar input-with-icon">
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className='icon--input' />
        <form onSubmit={e => search(e)}><input className='text--input-medium' placeholder="Search"/></form>
      </div>}
      {props.buttons && <div className="header__buttons">
        <div className="header__cart-btn header__icon-btn">
          <FontAwesomeIcon icon="fa-solid fa-cart-shopping" className='icon--m icon--primary' onClick={(e) => toggleCart(e)} />
          <p className='text--small text--white' onClick={(e) => toggleCart(e)}>Cart</p>
          <CartPopup show={productsContext.showCart}
            toggle={toggleCart}
            removeFromCart={props.removeFromCart}
            changeNumberOfItemsInCart={props.changeNumberOfItemsInCart}
            cart={props.cart} />
        </div>

        {localStorage.getItem("userID") !== null && <div className="header__account-btn header__icon-btn" onClick={() => navigate("/profile")}>
          <FontAwesomeIcon icon="fa-solid fa-user" className='icon--m icon--primary' />
          <p className='text--small text--white'>Account</p>
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