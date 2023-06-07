import React, { createContext, useState } from 'react';

const ProductsContext = createContext();

const ProductsContextProvider = ({ children }) => {

    const [cart, setCart] = useState([])
    const [showCart, setShowCart] = useState(false)
    const [productsList, setProductsList] = useState([])

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
            const itemToAdd = { ...productsList.filter(item => item.id === id)[0], number: number }

            setCart(prev => {
                return [...prev, itemToAdd]
            })
        }
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
        <ProductsContext.Provider value={{
            cart,
            setCart,
            showCart,
            setShowCart,
            addToCart,
            removeFromCart,
            changeNumberOfItemsInCart,
            productsList,
            setProductsList
        }}>
            {children}
        </ProductsContext.Provider>
    );
};

export { ProductsContext, ProductsContextProvider };


