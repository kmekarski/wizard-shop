import React from "react";

export default function ProductImage(props) {
    return (
        <div className={`product-image ${props.onClick ? "btn" : ""}`} style={{backgroundImage: `url(${props.src})`, boxShadow: props.shadow ? "0px 10px 33px rgba(0, 0, 0, 0.1)" : "none"}} onClick={() => props.onClick(props.src)}></div>
    )
}

ProductImage.defaultProps = {
    shadow: false
}