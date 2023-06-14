import React from "react";

import Header from "./Header";
import FeaturedCard from "./FeaturedCard";
import AdCard from "./AdCard";
import ProductCard from "./ProductCard";
import ScrollableProductsList from "./ScrollableProductsList";
import ProductImage from "./ProductImage";
import StarsDisplay from "./StarsDisplay";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


import { ProductsContext } from "../context/productsContext";
import { ModalContext } from "../context/modalContext";
import { faList } from "@fortawesome/free-solid-svg-icons";


export default function ProductPage(props) {

    const navigate = useNavigate()

    const productsContext = React.useContext(ProductsContext)
    const modalContext = React.useContext(ModalContext)

    const { id } = useParams()

    let product = productsContext.productsList.filter(el => el.id === parseInt(id))[0]



    React.useEffect(() => {
        productsContext.setShowCart(false)
        if (!product) {
            console.log("fetching")
            fetch(`https://wishop.azurewebsites.net/api/Products/${id}`)
                .then(res => res.json())
                .then(data => {
                    fetch(`https://wishop.azurewebsites.net/api/ProductStorage/${data.photoId}`)
                        .then(res => res.json())
                        .then(imgData => {
                            const newProduct = {
                                ...data,
                                img: imgData.uri
                            }
                            productsContext.setProductsList(prev => [...prev, newProduct])
                        })



                })
        }
    }, [])

    const deleteReview = () => {
        // odpowiedni fetch dla usuniecia recenzji tutaj
    }

    const handleActionClick = () => {
        modalContext.setCallback(deleteReview);
    }

    function handleImageClick(img) {
        console.log("img clicked")
        modalContext.setCallback(showImage)
        modalContext.setImage(img)
    }

    function showImage() {

    }

    const reviews = [
        {
            user: "Some user",
            title: "Excelent choice",
            text: "Great wand! Bought it for my sister and she absolutely loves it!",
            rating: 3,
            withPhoto: true,
            photo: product?.img
        },
        {
            user: "Some user",
            title: "Excelent choice",
            text: "Great wand! Bought it for my sister and she absolutely loves it!",
            rating: 2,
            withPhoto: false
        }
    ]

    const reviewsHtml = reviews.map(el => {
        return (product && <div className={`product-page__review${el.withPhoto ? "--with-photo" : ""} card--small`}>
            <div className="product-page__review__panel">
                <div className="product-page__review__title">
                    <FontAwesomeIcon icon="fa-solid fa-user" className='icon--darker icon--s' />
                    <div className="text--medium-regular text--dark">{el.user}</div>
                    <StarsDisplay rating={el.rating} />
                </div>
                <div className="text--medium-bold text--dark">{el.title}</div>
                <div className="text--medium-regular text--dark">{el.text}</div>
            </div>
            {el.withPhoto && <div className="product-page__review__image">
                <ProductImage shadow={true} src={product.img} onClick={handleImageClick}></ProductImage>
            </div>}
            <div className="product-page__review__footer">
                <div className="text--small-regular text-dark">2 hours ago</div>
                <div className="text--small-regular text-dark" onClick={handleActionClick}>remove</div>
            </div>
        </div>)
    })

    return (
        <div className="product-page">
            {product && <div className="container">
                <Header></Header>
                <div className="product-page__main">
                    <div className="product-page__preview">
                        <div className="product-page__images">
                            <ProductImage shadow={true} src={product.img} onClick={handleImageClick}></ProductImage >
                            <div className="product-page__small-images">
                                <ProductImage shadow={true} src={product.img} onClick={handleImageClick}></ProductImage>
                                <ProductImage shadow={true} src={product.img} onClick={handleImageClick}></ProductImage>
                                <ProductImage shadow={true} src={product.img} onClick={handleImageClick}></ProductImage>
                            </div>
                        </div>
                        <div className="product-page__panel">
                            <div className="product-page__text">
                                <div>
                                    <div className="text--primary">{product.name}</div>
                                    <div className="hr--short"></div>
                                </div>
                                <div>
                                    <div className="text--primary">${product.price}</div>
                                    <div className="featured__rating">
                                        <StarsDisplay size="m" rating={product.rating} />
                                        <p className="text--regular text--white">(200 reviews)</p>
                                    </div>
                                </div>
                                <div className="text--medium-regular">{product.description}</div>
                            </div>
                            <div className="product-page__buttons">
                                <div className="btn--ghost btn--big btn" onClick={() => {
                                    productsContext.addToCart(product.id, 1)
                                    productsContext.setShowCart(true)
                                }}>Add to Cart</div>
                                <div className="btn--solid btn--big btn" onClick={() => {
                                    productsContext.addToCart(product.id, 1)
                                    navigate("/checkout")
                                }}>Buy now</div>
                            </div>
                        </div>
                    </div>
                    <div className="product-page__reviews-panel">
                        <div className="product-page__reviews__header">
                            <div className="text--primary">User reviews</div>
                            <div className="btn--ghost btn--big btn" onClick={() => navigate(`/product/${id}/add-review`)}>Add review</div>
                        </div>
                        <div className="product-page__reviews">
                            {reviewsHtml}
                        </div>
                    </div>

                </div>
            </div>}
        </div>
    )
}
