import React from "react";

import Header from "./Header";
import FeaturedCard from "./FeaturedCard";
import AdCard from "./AdCard";
import ProductCard from "./ProductCard";
import ScrollableProductsList from "./ScrollableProductsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useLocation } from "react-router-dom";

import { ProductsContext } from "../context/productsContext";
import { faList } from "@fortawesome/free-solid-svg-icons";


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
                        })

                })

            })
    }, [])

    const productsList = productsContext.productsList

    const productsHtml = productsList.slice(0, productsList.length).map((product) => {
        return <ProductCard key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            rating={product.rating}
            img={product.img}
            addToCart={productsContext.addToCart}
            size='big'
        />
    })

    const [controls, setControls] = React.useState([
        {
            name: "Category",
            options: ["Wands", "Brooms", "Hats"],
            selected: "",
            isOpen: false
        },
        {
            name: "Price",
            options: ["0-10", "10-20", "20+"],
            selected: "",
            isOpen: false
        },
        {
            name: "Color",
            options: ["Red", "Blue", "Purple"],
            selected: "",
            isOpen: false
        },
        {
            name: "Size",
            options: ["S", "M", "L"],
            selected: "",
            isOpen: false
        },
        {
            name: "Sort by",
            options: ["Name", "Price", "Rating"],
            selected: "",
            isOpen: false
        },
    ])

    const toggleOptions = (controlName) => {
        setControls(prevControls =>
            prevControls.map(control =>
                control.name === controlName ? { ...control, isOpen: !control.isOpen } : { ...control, isOpen: false }
            )
        );
    };

    const selectOption = (controlName, option) => {
        setControls(prevControls => prevControls.map(control => control.name === controlName ? { ...control, selected: option !== controlName ? option : ""} : control))
    }

    const controlsHtml = controls.map(el => {
        const optionsHtml = [el.name, ...el.options].map(option => {
            return <div className="all-products__dropdown-option" onClick={() => selectOption(el.name, option)}>
                {option}
                {option === el.name && <FontAwesomeIcon icon="fa-solid fa-chevron-down" className='text--dark' />}
            </div>
        })

        return <div>
            <div className="all-products__dropdown-btn" onClick={() => toggleOptions(el.name)}>
                {el.selected || el.name}
                <FontAwesomeIcon icon="fa-solid fa-chevron-down" className='text--dark' />
                {el.isOpen && <div className="all-products__dropdown-list">
                    {optionsHtml}
                </div>}
            </div>



        </div>
    })




    return (
        <div className="all-products">
            {productsList.length > 0 && <div className="container">
                <Header title="All products" subtitle="Find your magic" />
                <div className="all-products__controls">
                    {controlsHtml}
                    <div className="btn--ghost btn--small btn all-products__filter-btn">Apply filters</div>
                </div>
                <div className="all-products__products">
                    {productsHtml}
                </div>
            </div>}
        </div>)
}
