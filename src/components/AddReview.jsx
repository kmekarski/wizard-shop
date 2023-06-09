import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartPopup from "./CartPopup.jsx";
import ProductImage from "./ProductImage.jsx";
import Header from './Header.jsx';
import { ProductsContext } from "../context/productsContext";
import { ModalContext } from '../context/modalContext.jsx';
import UploadImage from './UploadImage.jsx';
import { useParams } from 'react-router-dom';

export default function AddReview(props) {
    const navigate = useNavigate()
    const productsContext = React.useContext(ProductsContext)
    const modalContext = React.useContext(ModalContext)

    const { id } = useParams()
    const product = productsContext.productsList.filter(el => el.id === parseInt(id))[0]

    function handleSubmitClick() {
        modalContext.setCallback(addReview)
    }

    function addReview() {

    }

    const [clickedRating, setClickedRating] = React.useState(0)
    const [stars, setStars] = React.useState([
        {
            filled: false
        },
        {
            filled: false
        },
        {
            filled: false
        },
        {
            filled: false
        },
        {
            filled: false
        }
    ])

    const starsHtml = stars.map((el, index) => {
        return <div onMouseEnter={() => handleMouseEnterStar(index + 1)}
            onMouseLeave={handleMouseLeaveStar} onClick={() => handleClickStar(index + 1)}
            className={`add-review__star${el.filled ? "--filled" : "--empty"}`}>
            <FontAwesomeIcon icon="fa-solid fa-star" className='icon--l' />
        </div>
    })

    function handleMouseEnterStar(starNumber) {
        updateStars(starNumber)
    }
    function handleMouseLeaveStar() {
        updateStars(clickedRating)
    }
    function handleClickStar(starNumber) {
        setClickedRating(starNumber)
    }
    function updateStars(number) {
        let newStars = []
        for (let i = 0; i < number; i++) {
            newStars.push({ filled: true })
        }
        for (let i = number; i < 5; i++) {
            newStars.push({ filled: false })
        }
        setStars(newStars)
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const [formData, setFormData] = React.useState(props.edit ? {
        name: product.name,
        price: product.price,
        desc: product.description,
        size: "",
        color: ""
    }
        : {
            name: "",
            category: "",
            price: "",
            desc: "",
            size: "",
            color: ""
        })

    const leftForm = <form className="add-product__form">
        <div>
            <div className="text--medium-bold text--dark">{product.name}</div>
            <div className="add-review__product-image">
                <ProductImage shadow={true} src={product.img}></ProductImage>
            </div>
        </div>
        <div className='add-product__long-input-container'>
            <label htmlFor="name">Set a title for your review</label>
            <input type="text" id='name' name='name' value={formData.name} onChange={handleInputChange} placeholder='Summarize review' className='add-product__input--long' />
            <p className="text--small text--medium-dark">do not exceed 40 characters</p>
        </div>
        <div className='add-product__long-input-container'>
            <label htmlFor="desc">What did you like or dislike?</label>
            <textarea type="text" id='desc' name='desc' placeholder="What should shoppers know?" rows={3} value={formData.desc} onChange={handleInputChange} />
            <p className="text--small text--medium-dark">do not exceed 250 characters</p>
        </div>
    </form>

    const rightForm = <form onSubmit={e => handleSubmit(e)} className="add-product__form">
        <div>
            <label htmlFor="name">Would you like to add a photo?</label>
            <UploadImage />
        </div>
        <div>
            <label htmlFor="name">Your overall rating of this product</label>
            < div className="add-review__stars" >
                {starsHtml}
            </div >
        </div>
        <button className="btn--medium btn--solid btn add-review__add-btn" onClick={handleSubmitClick}>Add review</button>
    </form>

    return (
        <div className="add-review">
            <div className="container">
                <Header title="Add review" subtitle="" searchbar={false} buttons={false}></Header>
                <div className="add-review__main">
                    <div className="add-review__left card--big">
                        {leftForm}
                    </div>
                    <div className="add-review__right card--big">
                        {rightForm}
                    </div>
                </div>
            </div>
        </div>
    );
}