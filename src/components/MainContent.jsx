import React from "react";

import Header from "./Header";
import FeaturedCard from "./FeaturedCard";
import AdCard from "./AdCard";
import ProductCard from "./ProductCard";

const productsData = [
    {
        name: "Magic Caster Wand",
        desc: "Great wand for amateur Wizards. Solid, easy to use and reliable in practice combat.",
        price: "69",
        rating: "4.8",
        reviewCount: 179,
        img: ""
    },
    {
        name: "Magic Caster Wand",
        desc: "Great wand for amateur Wizards. Solid, easy to use and reliable in practice combat.",
        price: "68",
        rating: "4.7",
        reviewCount: 179,
        img: ""
    },
    {
        name: "Magic Caster Wand",
        desc: "Great wand for amateur Wizards. Solid, easy to use and reliable in practice combat.",
        price: "67",
        rating: "4.6",
        reviewCount: 179,
        img: ""
    },
    {
        name: "Magic Caster Wand",
        desc: "Great wand for amateur Wizards. Solid, easy to use and reliable in practice combat.",
        price: "66",
        rating: "4.5",
        reviewCount: 179,
        img: ""
    },
    {
        name: "Magic Caster Wand",
        desc: "Great wand for amateur Wizards. Solid, easy to use and reliable in practice combat.",
        price: "65",
        rating: "4.4",
        reviewCount: 179,
        img: ""
    }
]

export default function MainContent(props) {


    const productsHtml = productsData.map((product, index) => {
        return <ProductCard name={product.name}
                            price={product.price}
                            rating={product.rating}
                            img={product.img}
                            last={index === productsData.length-1 ? true : false}/>
    })


    const featuredProduct = productsData[0]

    return (
        <div className="main">
        <div className="container">
          <Header />

          <FeaturedCard name={featuredProduct.name}
                        desc={featuredProduct.desc}
                        price={featuredProduct.price}
                        rating={featuredProduct.rating}
                        reviewCount={featuredProduct.reviewCount}
                        img={featuredProduct.img}
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