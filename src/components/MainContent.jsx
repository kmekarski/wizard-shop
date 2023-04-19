import React from "react";

import Header from "./Header";
import FeaturedCard from "./FeaturedCard";
import AdCard from "./AdCard";
import ProductCard from "./ProductCard";

const productsData = [
    {
        id: 1,
        name: "Featured Wand",
        desc: "Great wand for amateur Wizards. Solid, easy to use and reliable in practice combat.",
        price: "69",
        rating: "4.8",
        reviewCount: 179,
        img: ""
    },
    {
        id: 2,
        name: "First Wand",
        desc: "Great wand for amateur Wizards. Solid, easy to use and reliable in practice combat.",
        price: "68",
        rating: "4.7",
        reviewCount: 179,
        img: ""
    },
    {
        id: 3,
        name: "Second Wand",
        desc: "Great wand for amateur Wizards. Solid, easy to use and reliable in practice combat.",
        price: "67",
        rating: "4.6",
        reviewCount: 179,
        img: ""
    },
    {
        id: 4,
        name: "Third Wand",
        desc: "Great wand for amateur Wizards. Solid, easy to use and reliable in practice combat.",
        price: "66",
        rating: "4.5",
        reviewCount: 179,
        img: ""
    },
    {
        id: 5,
        name: "Fourth Wand",
        desc: "Great wand for amateur Wizards. Solid, easy to use and reliable in practice combat.",
        price: "65",
        rating: "4.4",
        reviewCount: 179,
        img: ""
    },
    {
        id: 6,
        name: "Fifth Wand",
        desc: "Great wand for amateur Wizards. Solid, easy to use and reliable in practice combat.",
        price: "64",
        rating: "4.3",
        reviewCount: 179,
        img: ""
    }
]

export default function MainContent(props) {

    const [cart, setCart] = React.useState([])

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

    return (
        <div className="main">
            <div className="container">
                <Header cart={cart} removeFromCart={removeFromCart} changeNumberOfItemsInCart={changeNumberOfItemsInCart} />

                <FeaturedCard id={featuredProduct.id}
                    name={featuredProduct.name}
                    desc={featuredProduct.desc}
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
            </div>
        </div>
    )
}