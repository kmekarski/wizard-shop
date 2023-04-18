import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header(props) {
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
                <FontAwesomeIcon icon="fa-solid fa-cart-shopping" className='icon--m'/>
                <p className='text--icon'>Cart</p>
              </div>
              <div className="header__account-btn header__icon-btn">
                <FontAwesomeIcon icon="fa-solid fa-user" className='icon--m'/>
                <p className='text--icon'>Account</p>
              </div>
              <div className="header__logout-btn btn--solid btn--medium btn">Logout</div>
            </div>
          </div>
    )
}