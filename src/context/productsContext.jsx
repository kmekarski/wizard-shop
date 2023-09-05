import React, { createContext, useState } from "react";

const ProductsContext = createContext();

const ProductsContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [allFetched, setAllFetched] = useState(false);

  const apiAddress = "https://localhost:7039/api";

  function addToCart(id, number) {
    let newCart;
    if (cart.filter((item) => item.id === id).length) {
      //if item has already been added to cart
      newCart = cart.map((item) => {
        if (item.id === id) {
          item.number = item.number + number;
        }
        return item;
      });
      setCart(newCart);
    } else {
      const itemToAdd = {
        ...productsList.filter((item) => item.id === id)[0],
        number: number,
      };

      setCart((prev) => {
        return [...prev, itemToAdd];
      });

      fetch(apiAddress + "/Cart/" + id, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Product added to cart:", data);
          // You can handle the success response here, for example, show a success message
          // or redirect the user to a different page.
          getCart()
        })
        .catch((error) => {
          console.error("Error adding product to cart:", error);
          // Handle error here, e.g., show an error message to the user.
        });

    }
  }

  function getCart() {
    fetch(`${apiAddress}/Cart`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Cart:", data);
      // You can handle the success response here, for example, show a success message
      // or redirect the user to a different page.
    })
    .catch((error) => {
      console.error("Error fetching the cart:", error);
      // Handle error here, e.g., show an error message to the user.
    });
    }


  function removeFromCart(id) {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  }

  function changeNumberOfItemsInCart(id, sign) {
    let amount = 1;
    if (sign === "minus") {
      amount = -1;
    }
    const newCart = cart.map((item) => {
      if (item.id === id) {
        item.number = item.number + amount;
      }
      if (item.number < 1) {
        item.number = 1;
      }
      return item;
    });
    setCart(newCart);
  }

  return (
    <ProductsContext.Provider
      value={{
        cart,
        setCart,
        showCart,
        setShowCart,
        addToCart,
        removeFromCart,
        changeNumberOfItemsInCart,
        productsList,
        setProductsList,
        allFetched,
        setAllFetched,
        apiAddress,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsContextProvider };
