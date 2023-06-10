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

    const [alert, setAlert] = React.useState(false)

    function handleInputChange(event) {
        let newOkay
        if (event.target.value.length > limit) {
            newOkay = true
            setAlert(true)
            setFormData({
                ...formData,
                [event.target.name]: event.target.value.slice(0, 20)
            })
        } else if(event.target.value.length === 0 && props.required) {
            newOkay = false
            setAlert(false)
            setFormData({
                ...formData,
                [event.target.name]: event.target.value
            })
        }
        else {
            newOkay = true
            setAlert(false)
            setFormData({
                ...formData,
                [event.target.name]: event.target.value
            })
        }
        setOkay(newOkay)
        setInputOkay(name, newOkay)
    }

    return (
        <div className='text-input'>
            <label htmlFor={name}>{label}</label>

            {props.type === "input" && <input type={props.dataType} id={name} name={name} value={formData[name]} onChange={handleInputChange} placeholder={placeholder} className='add-product__input--long' />}

            {props.type === "textarea" && <textarea rows="3" id={name} name={name} value={formData[name]} onChange={handleInputChange} placeholder={placeholder} className='add-product__input--long' />}

            {props.silent ? "" : props.required && formData[name] === "" ? <p className='text--small text--medium-dark'>this field cannot be empty</p> : !alert ? <p className='text--small text--white'>la</p> : <p className="text--small text--medium-dark">do not exceed {limit} characters</p>}

        </div>
    )

}



TextInput.defaultProps = {
    type: "input",
    dataType: "text",
    required: true,
    silent: false
}