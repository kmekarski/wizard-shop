import React from "react";

export default function ProductImage(props) {
    return (
        <div className="product-image" style={{backgroundImage: `url(${props.src})`, boxShadow: props.shadow ? "0px 10px 33px rgba(0, 0, 0, 0.1)" : "none"}}></div>
    )
}

ProductImage.defaultProps = {
    shadow: false
}