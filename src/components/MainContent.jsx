import React from "react";

import Header from "./Header";
import FeaturedCard from "./FeaturedCard";
import AdCard from "./AdCard";
import ProductCard from "./ProductCard";
import {useLocation} from "react-router-dom";

import { ProductsContext } from "../context/productsContext";


export default function MainContent(props) {

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
                        })
                })

            })
    }, [])


    const productsList = productsContext.productsList

    const location = useLocation()
    const pathName = location.pathname

    if (pathName === "/") {
        const productsHtml = productsList.slice(1, productsList.length).map((product, index) => {
            return <ProductCard key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                rating={product.rating}
                                img={product.img}
                                last={index === productsList.length - 2 ? true : false}
            />
        })

        return (
            <div className="main">
                {productsList.length > 0 && <div className="container">
                    <Header />
    
                    <FeaturedCard/>
    
                    <AdCard />
    
                    <div className='products-title'>
                        <h2 className="text--primary">Our top products</h2>
                        <h4 className="text--secondary">View all</h4>
                    </div>
    
                    <div className='products'>
                        {productsHtml}
                    </div>
                </div>}
            </div>
        )
    } else if (pathName === "/products") {
        const productsHtml = productsList.slice(0, productsList.length).map((product, index) => {
            return <ProductCard key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                rating={product.rating}
                                img={product.img}
                                addToCart={addToCart}
            />
        })

        return (
          <div className="all-main">
              {productsList.length > 0 && <div className="container">
                  <div className='all-products'>
                      {productsHtml}
                  </div>
              </div>}
          </div>
        )
    }
}
