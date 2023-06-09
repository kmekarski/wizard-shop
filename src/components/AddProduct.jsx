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

export default function AddProduct(props) {
    const navigate = useNavigate()
    const productsContext = React.useContext(ProductsContext)
    const modalContext = React.useContext(ModalContext)

    const { id } = useParams()
    const product = productsContext.productsList.filter(el => el.id === parseInt(id))[0]




    function editProduct() {
        console.log("edit product")
    }

    function deleteProduct() {
        console.log("delete product")
    }

    function addProduct() {
        console.log("add product")
    }

    function handleSubmitClick(e) {
        e.preventDefault()
        switch(e.target.innerHTML) {
            case "Add product": {
                modalContext.setCallback(addProduct)
                break;
            }
            case "Delete product": {
                modalContext.setCallback(deleteProduct)
                break;
            }
            case "Edit product": {
                modalContext.setCallback(editProduct)
                break;
            }
        }
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
        <div className='add-product__long-input-container'>
            <label htmlFor="name">Product name</label>
            <input type="text" id='name' name='name' value={formData.name} onChange={handleInputChange} className='add-product__input--long' />
            <p className="text--small text--medium-dark">do not exceed 20 characters</p>
        </div>
        <div className='add-product__long-input-container'>
            <label htmlFor="category">Category</label>
            <input type="text" id='category' name='category' value={formData.category} onChange={handleInputChange} className='add-product__input--long' />
        </div>
        <div className='add-product__two-inputs-container'>
            <div>
                <label htmlFor="price">Price</label>
                <input type="text" id='price' name='price' value={formData.price} onChange={handleInputChange} className='add-product__input--medium' />
            </div>
        </div>
        <div className='add-product__long-input-container'>
            <label htmlFor="desc">Description</label>
            <textarea type="text" id='desc' name='desc' placeholder="" rows={3} value={formData.desc} onChange={handleInputChange} />
            <p className="text--small text--medium-dark">do not exceed 100 characters</p>
        </div>
    </form>

    const rightForm = <form onSubmit={e => handleSubmit(e)} className="add-product__form">
        <div className='add-product__long-input-container'>
            <label htmlFor="name">Product images</label>
            <div className="add-product__upload-images">
                <UploadImage />
                <UploadImage />
                <UploadImage />
                <UploadImage />
            </div>
        </div>
        <div className='add-product__two-inputs-container--even'>
            <div>
                <label htmlFor="size">Size</label>
                <input type="text" id='size' name='size' value={formData.size} onChange={handleInputChange} className='checkout__input--medium' />
            </div>
            <div>
                <label htmlFor="color">Color</label>
                <input type="text" id='color' name='color' value={formData.color} onChange={handleInputChange} className='checkout__input--short' />
            </div>
        </div>
        {props.edit ? <div className='edit-product__buttons'>
            <button className="btn--medium btn--solid btn add-product__add-btn" onClick={handleSubmitClick}>Edit product</button>
            <button className="btn--medium btn--solid btn add-product__add-btn" onClick={handleSubmitClick}>Delete product</button>
        </div> : <button className="btn--medium btn--solid btn add-product__add-btn" onClick={handleSubmitClick}>Add product</button>}
    </form>

    return (
        <div className="add-product">
            <div className="container">
                <Header title="Admin panel" subtitle={props.edit ? "Edit or delete the product" : "Add product"} searchbar={false} buttons={false}></Header>
                <div className="add-product__main">
                    <div className="add-product__left card--big">
                        {leftForm}
                    </div>
                    <div className="add-product__right card--big">
                        {rightForm}
                    </div>
                </div>
            </div>
        </div>
    );
}

AddProduct.defaultProps = {
    edit: false
}