import React, { useRef } from 'react';
import { ProductsContext } from '../context/productsContext';
import ProductCard from './ProductCard';

function ScrollableProductsList(props) {
    const context = React.useContext(ProductsContext)
    const scrollableRef = useRef(null)
    const scrollByAmount = () => {
        console.log("scroll")
        scrollableRef.current.scrollBy({
          left: -100, // Adjust the scroll amount as needed
          behavior: 'smooth' // Add smooth scrolling effect
        });
      };

    const productsList = context.productsList
    
    const productsHtml = productsList.slice(0, productsList.length).map((product, index) => {
        return <ProductCard key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            rating={product.rating}
            img={product.images[0]}
            addToCart={context.addToCart}
            scroll={scrollByAmount}
            last={index === productsList.length - 2 ? true : false}

        />
    })

    return (
        <div className='products'>
            {productsHtml}
        </div>
    );
}

export default ScrollableProductsList;
