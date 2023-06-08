import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartPopup from "./CartPopup.jsx";
import ProductImage from "./ProductImage.jsx";
import Header from './Header.jsx';
import { ProductsContext } from "../context/productsContext";

export default function UploadImage(props) {
    return (
        <div className="upload-image">
                <FontAwesomeIcon icon="fa-solid fa-image" className='icon--m' />
                <p>drop your images here or click to browse</p>
                </div>
    );
}