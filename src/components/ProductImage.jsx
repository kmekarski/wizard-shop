import React from "react";

export default function ProductImage(props) {
    return (
        <div className="product-image" style={{backgroundImage: `url(${props.src})`}}></div>
    )
}