import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartPopup from "./CartPopup.jsx";
import ProductImage from "./ProductImage.jsx";
import Header from './Header.jsx';
import { ProductsContext } from "../context/productsContext";
import { ModalContext } from '../context/modalContext.jsx';
import { UserContext } from "../context/userContext"
import UploadImage from './UploadImage.jsx';
import TextInput from './TextInput.jsx';
import { useParams } from 'react-router-dom';

export default function AddProduct(props) {
    const navigate = useNavigate()
    const productsContext = React.useContext(ProductsContext)
    const modalContext = React.useContext(ModalContext)

    const { id } = useParams()
    const product = productsContext.productsList.filter(el => el.id === parseInt(id))[0]

    const [productImages, setProductImages] = React.useState(new Array(4).fill(null))

    const backendAddr = 'https://wishop.azurewebsites.net/api'

    function setProductImage(number, image) {
        const newArray = productImages
        productImages[number - 1] = image
        setProductImages(newArray)
    }


    function editProduct() {
        console.log("edit product")

        const productData = {
            id: id,
            name: formData.name,
            description: formData.desc,
            price: formData.price,
            rating: "5",
            photoId: "2",
            categoryId: formData.category,
            popularity: 2,
            quantity: 1,
            size: formData.size,
            color: formData.color
        };

        fetch(backendAddr + '/Products/' + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        })
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Network response was not ok");
              }
              return response.json();
          })
          .then((data) => {
              console.log("Product edited:", data);
              // You can handle the success response here, for example, show a success message
              // or redirect the user to a different page.
          })
          .catch((error) => {
              console.error("Error updating product:", error);
              // Handle error here, e.g., show an error message to the user.
          });
    }

    function deleteProduct() {
        console.log("delete product")

        fetch(backendAddr + '/Products/' + id, {
            method: "DELETE"
        })
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Network response was not ok");
              }
              return response;
          })
          .then(() => {
              console.log("Product " + id + " deleted");
              // You can handle the success response here, for example, show a success message
              // or redirect the user to a different page.
          })
          .catch((error) => {
              console.error("Error updating product:", error);
              // Handle error here, e.g., show an error message to the user.
          });
    }

    function addProduct() {
        console.log("add product")

        const productData = {
            name: formData.name,
            description: formData.desc,
            price: formData.price,
            rating: "5",
            photoId: "2",
            categoryId: formData.category,
            popularity: 2,
            quantity: 1,
            size: formData.size,
            color: formData.color
        };

        fetch(backendAddr + '/Products', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        })
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Network response was not ok");
              }
              return response.json();
          })
          .then((data) => {
              console.log("Product added:", data);
              // You can handle the success response here, for example, show a success message
              // or redirect the user to a different page.
          })
          .catch((error) => {
              console.error("Error updating product:", error);
              // Handle error here, e.g., show an error message to the user.
          });
    }

    // inputs limits management:
    const [inputsOkay, setInputsOkay] = React.useState(props.edit ? {
        name: true,
        category: true,
        price: true,
        desc: true,
        color: true,
        size: true,
    } : {
        name: false,
        category: false,
        price: false,
        desc: false,
        color: false,
        size: false,
    })
    function setInputOkay(name, okay) {
        setInputsOkay({
            ...inputsOkay,
            [name]: okay
        })
    }
    const allInputsOkay = Object.keys(inputsOkay).every(key => {
        return inputsOkay[key]
    })
    ////////

    function handleSubmitClick(e) {
        e.preventDefault()
        switch (e.target.innerHTML) {
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

    const [formData, setFormData] = React.useState({
        name: product?.name || "",
        price: product?.price || "",
        desc: product?.description || "",
        category: product?.category || "",
        size: product?.size || "",
        color: product?.color || "",
    })

    const leftForm = <form className="add-product__form">
        <div className='add-product__long-input-container'>
            <TextInput
                limit={20}
                name="name"
                label="Product name"
                formData={formData}
                setFormData={setFormData}
                setInputOkay={setInputOkay}
            />
        </div>
        <div className='add-product__long-input-container'>
            <TextInput
                limit={20}
                name="category"
                label="Category"
                formData={formData}
                setFormData={setFormData}
                setInputOkay={setInputOkay}
            />
        </div>
        <div className='add-product__two-inputs-container'>

            <TextInput
                limit={20}
                name="price"
                label="Price"
                dataType="number"
                formData={formData}
                setFormData={setFormData}
                setInputOkay={setInputOkay}
            />

        </div>
        <div className='add-product__long-input-container'>
            <TextInput
                limit={20}
                name="desc"
                label="Description"
                type="textarea"
                formData={formData}
                setFormData={setFormData}
                setInputOkay={setInputOkay}
            />
        </div>
    </form>

    const rightForm = <form onSubmit={e => handleSubmit(e)} className="add-product__form">
        <div className='add-product__long-input-container'>
            <label htmlFor="name">Product images</label>
            <div className="add-product__upload-images">
                <UploadImage number={1} setImage={setProductImage} src={product?.img}/>
                <UploadImage number={2} setImage={setProductImage} />
                <UploadImage number={3} setImage={setProductImage} />
                <UploadImage number={4} setImage={setProductImage} />
            </div>
        </div>
        <div className='add-product__two-inputs-container--even'>
            <TextInput
                limit={20}
                name="size"
                label="Size"
                formData={formData}
                setFormData={setFormData}
                setInputOkay={setInputOkay}
            />
            <TextInput
                limit={20}
                name="color"
                label="Color"
                formData={formData}
                setFormData={setFormData}
                setInputOkay={setInputOkay}
            />
        </div>
        {props.edit ? <div className='edit-product__buttons'>
            <button className="btn--medium btn--solid btn add-product__add-btn" onClick={handleSubmitClick}disabled={!allInputsOkay}>Edit product</button>
            <button className="btn--medium btn--solid btn add-product__add-btn" onClick={handleSubmitClick}>Delete product</button>
        </div> : <button className="btn--medium btn--solid btn add-product__add-btn" onClick={handleSubmitClick} disabled={!allInputsOkay}>Add product</button>}
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