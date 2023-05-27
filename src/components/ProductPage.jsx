import React from "react";

import Header from "./Header";
import FeaturedCard from "./FeaturedCard";
import AdCard from "./AdCard";
import ProductCard from "./ProductCard";
import ScrollableProductsList from "./ScrollableProductsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';


import { ProductsContext } from "../context/productsContext";
import { faList } from "@fortawesome/free-solid-svg-icons";


export default function ProductPage(props) {

    const productsContext = React.useContext(ProductsContext)
    const { id } = useParams()
    return (
        <div className="all-products">
            <div className="container">
                <Header title={`Product ${id}`} subtitle="" searchbar={false} buttons={false}></Header>
            </div>
        </div>)
}
