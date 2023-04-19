import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CartPopup from "./CartPopup";

export default function Header(props) {

    const [showCart, setShowCart] = React.useState(false)

    function toggleCart() {
        setShowCart(prev => !prev)
    }

    return (
        <div className='header'>
            <div className="header__text">
              <h2 className="header__title text--primary">Magic equipment</h2>
              <h4 className="header__subtitle text--secondary">From best brands</h4>
            </div>
            <div className="header__searchbar input">
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className='icon--input'/>
              <p className='text--input-medium'>Search</p>
            </div>
            <div className="header__buttons">
              <div className="header__cart-btn header__icon-btn">
                <FontAwesomeIcon icon="fa-solid fa-cart-shopping" className='icon--m icon--primary' onClick={(e) => toggleCart(e)}/>
                <p className='text--icon' onClick={(e) => toggleCart(e)}>Cart</p>
                < CartPopup show={showCart} 
                            toggle={toggleCart} 
                            removeFromCart={props.removeFromCart} 
                            changeNumberOfItemsInCart = {props.changeNumberOfItemsInCart}
                            cart={props.cart}/>
              </div>
              <div className="header__account-btn header__icon-btn">
                <FontAwesomeIcon icon="fa-solid fa-user" className='icon--m icon--primary'/>
                <p className='text--icon'>Account</p>
              </div>
              <div className="header__logout-btn btn--solid btn--medium btn">Logout</div>
            </div>

            

          </div>
    )
}