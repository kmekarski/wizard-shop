import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartPopup from "./CartPopup.jsx";
import ProductImage from "./ProductImage.jsx";
import Header from './Header.jsx';
import { ProductsContext } from "../context/productsContext";

export default function TextInput(props) {
    const { limit, name, label, formData, setFormData, placeholder, setInputOkay } = props

    const [okay, setOkay] = React.useState(true)

    function handleInputChange(event) {
        const newOkay = (event.target.value.length <= limit) && (!props.required || event.target.value.length > 0)
        setOkay(newOkay)
        setInputOkay(name, newOkay)
        console.log(newOkay)
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className='text-input'>
            <label htmlFor={name}>{label}</label>

            {props.type === "input" && <input type={props.dataType} id={name} name={name} value={formData[name]} onChange={handleInputChange} placeholder={placeholder} className='add-product__input--long' />}

            {props.type === "textarea" && <textarea rows="3" id={name} name={name} value={formData[name]} onChange={handleInputChange} placeholder={placeholder} className='add-product__input--long' />}

            {props.required && formData[name] === "" ? <p className='text--small text--medium-dark'>this field cannot be empty</p> : okay ? <p className='text--small text--white'>la</p> : <p className="text--small text--medium-dark">do not exceed {limit} characters</p>}
        </div>
    )

}



TextInput.defaultProps = {
    type: "input",
    dataType: "text",
    required: true
}