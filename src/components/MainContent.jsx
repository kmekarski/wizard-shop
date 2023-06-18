import React from "react";

import Header from "./Header";
import FeaturedCard from "./FeaturedCard";
import AdCard from "./AdCard";
import ProductCard from "./ProductCard";
import ScrollableProductsList from "./ScrollableProductsList";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { ProductsContext } from "../context/productsContext";


export default function MainContent(props) {

    const navigate = useNavigate()

    const productsContext = React.useContext(ProductsContext)

    React.useEffect(() => {
        productsContext.setShowCart(false)
        if(!productsContext.allFetched){
            fetch("https://wishop.azurewebsites.net/api/Products")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                productsContext.setProductsList([])
                data.forEach(el => {
                    fetch(`https://wishop.azurewebsites.net/api/ProductStorage/${el.photoId}`)
                        .then(res => res.json())
                        .then(images => {
                            const newProduct = {
                                ...el,
                                images: images
                            }
                            productsContext.setProductsList(prev => [...prev, newProduct])
                        })

                })

            })
        productsContext.setAllFetched(true)}
    }, [])


    const productsList = productsContext.productsList


    return (
        <div className="main">
            {productsList.length > 0 && <div className="container">
                <Header />

                <FeaturedCard />

                <AdCard />

                <div className='products-title'>
                    <h2 className="text--primary text--nowrap">Our top products</h2>
                    <h4 className="text--secondary text--clickable text--nowrap" onClick={() => navigate('/products')}>View all</h4>
                </div>

                <ScrollableProductsList>
                </ScrollableProductsList>
            </div>}
        </div>)
}

