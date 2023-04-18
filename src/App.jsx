import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far)

function App() {

  return (
    <div className="app">
        
      <div className='sidebar'>
        <div className="container">
          <div className='title text--primary'>
            <h2 className="title__text text--primary">Wizards Shop</h2>
            <FontAwesomeIcon icon="fa-solid fa-wand-magic-sparkles" className='icon--xl'/>
          </div>
          <div className="nav">
            <div className="nav__element">
              <FontAwesomeIcon icon="fa-solid fa-home" className='icon--l'/>
              <p className="nav__text">Home</p>
            </div>
            <div className="nav__element">
              <FontAwesomeIcon icon="fa-solid fa-hat-wizard" className='icon--l'/>
              <p className="nav__text">All products</p>
            </div>
            <div className="nav__element">
              <FontAwesomeIcon icon="fa-solid fa-wand-magic-sparkles" className='icon--l'/>
              <p className="nav__text">Categories</p>
            </div>
            <div className="nav__element">
              <FontAwesomeIcon icon="fa-solid fa-phone" className='icon--l'/>
              <p className="nav__text">Contact</p>
            </div>
          </div>
          <div className='newsletter card--small'>
            <div className="newsletter__header">
              <FontAwesomeIcon icon="fa-solid fa-newspaper" className='icon--xl'/>
              <h2 className="text--medium-bold">Join our Newsletter!</h2>
              <h2 className="text--desc">Get great deals and information about new products</h2>
            </div>
            <div className="newsletter__form">
              <div className="newsletter__input input">
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className='icon--input'/>
                <p className='text--input-small'>Email</p>
              </div>
              <div className="btn--solid btn--small btn">Sign me up</div>
            </div>
          </div>
        </div>
      </div>

      <div className="main">
        <div className="container">
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
          <div className='featured card--big'>
            <div className="featured__image">

            </div>
            <div className="featured__text">
              <h3 className="featured__name text--medium-bold">Magic Caster Wand</h3>
              <div className="featured__rating">
                <div className="featured__stars">
                  <FontAwesomeIcon icon="fa-solid fa-star" className='icon--star'/>
                  <FontAwesomeIcon icon="fa-solid fa-star" className='icon--star'/>
                  <FontAwesomeIcon icon="fa-solid fa-star" className='icon--star'/>
                  <FontAwesomeIcon icon="fa-solid fa-star" className='icon--star'/>
                  <FontAwesomeIcon icon="fa-solid fa-star" className='icon--star'/>
                </div>
                <p className="text--small">(200+ reviews)</p>
              </div>
              <p className="featured__desc text--desc">Great wand for amateur Wizards. Solid, easy to use and reliable in practice combat.</p>
              <div className="featured__panel">
                <p className="text--medium-bold">Price: $69</p>
                <div className="featured__quantity">
                  <div className="featured__quantity-btn">-</div>
                  <p className="featured__quantity-number">1</p>
                  <div className="featured__quantity-btn">+</div>
                </div>
              </div>
              <div className="featured__buttons">
                <div className="btn--ghost btn--small btn">
                <FontAwesomeIcon icon="fa-solid fa-heart" className='icon--xs'/>
                </div>
                <div className="btn--ghost btn--small btn">Add to Cart</div>
                <div className="btn--solid btn--small btn">Buy Now</div>
              </div>
            </div>
          </div>
          <div className='ad card--big'>
            <div className="ad__inner">
              <div>
                <h2 className='text--primary'>Free delivery</h2>
                <h2 className='text--medium-bold'>On all items</h2>
              </div>
              <div>
                <h2 className='text--primary text--special'>Shop Now</h2>
              </div>
            </div>
          </div>
          <div className='products-title'>
            <h2 className="header__title text--primary">Our top products</h2>
            <h4 className="header__subtitle text--secondary">View all</h4>
          </div>
          <div className='products'>
            <div className="product card--small">
              <div className="product__image">
              </div>
              <h3 className="text--small-bold">Magic Caster Wand</h3>
              <h3 className="text--small-regular">Price: $69</h3>
              <div className="product__panel">
                <FontAwesomeIcon icon="fa-solid fa-star" className='icon--star'/>
                <h3 className="text--small-regular">4.8</h3>
                <div className="product__btn">+</div>
              </div>
            </div>
            <div className="product card--small">
              <div className="product__image">
              </div>
              <h3 className="text--small-bold">Magic Caster Wand</h3>
              <h3 className="text--small-regular">Price: $69</h3>
              <div className="product__panel">
                <FontAwesomeIcon icon="fa-solid fa-star" className='icon--star'/>
                <h3 className="text--small-regular">4.8</h3>
                <div className="product__btn">+</div>
              </div>
            </div>
            <div className="product card--small">
              <div className="product__image">
              </div>
              <h3 className="text--small-bold">Magic Caster Wand</h3>
              <h3 className="text--small-regular">Price: $69</h3>
              <div className="product__panel">
                <FontAwesomeIcon icon="fa-solid fa-star" className='icon--star'/>
                <h3 className="text--small-regular">4.8</h3>
                <div className="product__btn">+</div>
              </div>
            </div>
            <div className="product card--small">
              <div className="product__image">
              </div>
              <h3 className="text--small-bold">Magic Caster Wand</h3>
              <h3 className="text--small-regular">Price: $69</h3>
              <div className="product__panel">
                <FontAwesomeIcon icon="fa-solid fa-star" className='icon--star'/>
                <h3 className="text--small-regular">4.8</h3>
                <div className="product__btn">+</div>
              </div>
            </div>
            <div className="product card--small">
              <div className="product__image">
              </div>
              <h3 className="text--small-bold">Magic Caster Wand</h3>
              <h3 className="text--small-regular">Price: $69</h3>
              <div className="product__panel">
                <FontAwesomeIcon icon="fa-solid fa-star" className='icon--star'/>
                <h3 className="text--small-regular">4.8</h3>
                <div className="product__btn">+</div>
              </div>

              <div className="product-cover">

              </div>
              <div className="product-cover__btn">
                <FontAwesomeIcon icon="fa-solid fa-chevron-right" className='icon--s' />
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default App
