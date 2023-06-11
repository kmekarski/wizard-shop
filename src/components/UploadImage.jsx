import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartPopup from "./CartPopup.jsx";
import ProductImage from "./ProductImage.jsx";
import Header from './Header.jsx';
import { ProductsContext } from "../context/productsContext";

export default function UploadImage(props) {
    const [selectedImage, setSelectedImage] = useState(props.src);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
        props.setImage(props.number, file)
    };

    function cancelImage(e) {
        e.stopPropagation()
        setSelectedImage(null)
        props.setImage(props.number, null)

    }

    const handleUpload = () => {
        // Implement your image upload logic here
        console.log('Selected image:', selectedImage);
    };
    return (
        <div className='upload-image__container'>
            <label htmlFor={`fileInput${props.number}`}>
                <div className={`upload-image${selectedImage ? "--selected" : ""}`}>
                    {selectedImage && <img className='uploaded-image' src={selectedImage} alt="Uploaded" />}

                    {!selectedImage && <div>
                        <FontAwesomeIcon icon="fa-solid fa-image" className='icon--m' />
                        <p>click here to browse</p></div>}
                    <input type="file" id={`fileInput${props.number}`} className='upload-image' text='hi' onChange={handleImageChange} />
                </div>
            </label>
            {selectedImage && <div className='uploaded-image__xbtn' onClick={cancelImage}>
                <FontAwesomeIcon icon={`fa-solid fa-xmark`} />
            </div>}
        </div>

    );

}

UploadImage.defaultProps = {
    number: 1,
    src: null
}