import React from "react";

import Header from "./Header";
import FeaturedCard from "./FeaturedCard";
import AdCard from "./AdCard";
import ProductCard from "./ProductCard";
import ScrollableProductsList from "./ScrollableProductsList";
import ProductImage from "./ProductImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UploadImage from "./UploadImage";

import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


import { ProductsContext } from "../context/productsContext";
import { faList } from "@fortawesome/free-solid-svg-icons";


export default function AddReview(props) {




    const navigate = useNavigate()
    const productsContext = React.useContext(ProductsContext)
    const { id } = useParams()
    const product = productsContext.productsList.filter(el => el.id === parseInt(id))[0]


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

    console.log(stars)
    return (
        <div className="add-review">
            <div className="container">
                <Header></Header>
                <div className="add-review__main">
                    <div className="text--primary">Add review</div>
                    <div className="add-review__product">
                        <div className="add-review__product-image">
                            <ProductImage shadow={true} src={product.img}></ProductImage>
                        </div>
                        <div className="text--medium-bold">{product.name}</div>
                    </div>
                    <form className="add-review__form">
                        <div>
                            <label htmlFor="title" className="text--medium-bold">Set a title for your review</label>
                            <input type="text" id='title' name='title' placeholder="Summarize review" />
                        </div>
                        <div>
                            <div className="text--medium-bold">Your overall rating of this product</div>
                            < div className="add-review__stars" >
                                {starsHtml}
                            </div >

                        </div>
                        <div>
                            <label htmlFor="text" className="text--medium-bold">What did you like or dislike?</label>
                            <textarea type="text" id='text' name='text' placeholder="What should shoppers know?"
                                rows={3} />
                        </div>

                        <div>
                            <div htmlFor="text" className="text--medium-bold">Would you like to add a photo?</div>
                            <div className="btn--ghost btn--big btn add-review__upload-btn" >Upload</div>
                        </div>
                        <div className="btn--solid btn--big btn add-review__submit-btn" >Submit</div>
                    </form>
                </div>
            </div>
        </div>
    )
}
