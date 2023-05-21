import React from "react";

import Header from "./Header";
import FeaturedCard from "./FeaturedCard";
import AdCard from "./AdCard";
import ProductCard from "./ProductCard";
import ScrollableProductsList from "./ScrollableProductsList";
import { useLocation } from "react-router-dom";

import { ProductsContext } from "../context/productsContext";


export default function AllProducts(props) {

    const productsContext = React.useContext(ProductsContext)

    React.useEffect(() => {
        fetch("https://wishop.azurewebsites.net/api/Products")
            .then(res => res.json())
            .then(data => {
                productsContext.setProductsList([])
                data.forEach(el => {
                    fetch(`https://wishop.azurewebsites.net/api/ProductStorage/${el.photoId}`)
                        .then(res => res.json())
                        .then(imgData => {
                            const newProduct = {
                                ...el,
                                img: imgData.uri
                            }
                            productsContext.setProductsList(prev => [...prev, newProduct])
                            productsContext.setProductsList(prev => [...prev, newProduct])
                        })

                })

            })
    }, [])

    const productsList = productsContext.productsList


    return (
        <div className="all-products">
            {productsList.length > 0 && <div className="container">
                <Header title="All products" subtitle="Find your magic"/>

                <ScrollableProductsList>
                </ScrollableProductsList>
            </div>}
        </div>)
}
