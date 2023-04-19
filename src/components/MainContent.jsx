import React from "react";

import Header from "./Header";
import FeaturedCard from "./FeaturedCard";
import AdCard from "./AdCard";
import ProductCard from "./ProductCard";


export default function MainContent(props) {




    React.useEffect(() => {
        fetch("https://wishop.azurewebsites.net/api/Products")
            .then(res => res.json())
            .then(data => {
                data.forEach(el => {
                    fetch(`https://wishop.azurewebsites.net/api/Storage/${el.photoId}`)
                        .then(res => res.json())
                        .then(imgData => {
                            const newProduct = {
                                ...el,
                                img: imgData.uri
                            }
                            setProductsData(prev => [...prev, newProduct])
                            console.log("?")
                        })
                })

            })
    }, [])

    const [productsData, setProductsData] = React.useState([])
    const [cart, setCart] = React.useState([])

    const productsHtml = productsData.slice(1, productsData.length).map((product, index) => {
        return <ProductCard key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            rating={product.rating}
            img={product.img}
            last={index === productsData.length - 2 ? true : false}
            addToCart={addToCart}
        />
    })

    const featuredProduct = productsData[0]

    function addToCart(id, number) {

        let newCart

        if (cart.filter(item => item.id === id).length) {  //if item has already been added to cart
            newCart = cart.map(item => {
                if (item.id === id) {
                    item.number = item.number + number
                }
                return item
            })
            setCart(newCart)
        } else {
            const itemToAdd = { ...productsData.filter(item => item.id === id)[0], number: number }
            newCart = [...cart, itemToAdd]
            setCart(newCart)
        }


        setCart(newCart)
    }

    function removeFromCart(id) {
        const newCart = cart.filter(item => item.id !== id)
        setCart(newCart)
    }

    function changeNumberOfItemsInCart(id, sign) {
        let amount = 1
        if (sign === "minus") {
            amount = -1
        }

        const newCart = cart.map(item => {
            if (item.id === id) {
                item.number = item.number + amount
            }
            if (item.number < 1) {
                item.number = 1
            }
            return item
        })
        setCart(newCart)
    }

    return (
        <div className="main">
            {productsData.length > 0 && <div className="container">
                <Header cart={cart} removeFromCart={removeFromCart} changeNumberOfItemsInCart={changeNumberOfItemsInCart} />

                <FeaturedCard id={featuredProduct.id}
                    name={featuredProduct.name}
                    desc={featuredProduct.description}
                    price={featuredProduct.price}
                    rating={featuredProduct.rating}
                    reviewCount={featuredProduct.reviewCount}
                    img={featuredProduct.img}
                    addToCart={addToCart}
                />

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
}