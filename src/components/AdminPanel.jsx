import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartPopup from "./CartPopup.jsx";
import ProductImage from "./ProductImage.jsx";
import Header from './Header.jsx';
import { ProductsContext } from "../context/productsContext";

export default function AdminPanel(props) {
    const navigate = useNavigate()
    const context = React.useContext(ProductsContext)

    const panel = [
        {
            header: "Products",
            buttons: [
                {
                    text: "View products",
                    icon: "hat-wizard",
                    link: ""
                },
                {
                    text: "Add product",
                    icon: "wand-magic-sparkles",
                    link: ""
                }
            ]
        },
        {
            header: "Users",
            buttons: [
                {
                    text: "Active users",
                    icon: "user",
                    link: ""
                },
                {
                    text: "Blocked users",
                    icon: "user-slash",
                    link: ""
                }
            ]
        },
        {
            header: "Reports",
            buttons: [
                {
                    text: "Create report",
                    icon: "file-lines",
                    link: ""
                }
            ]
        },
        {
            header: "Orders",
            buttons: [
                {
                    text: "Pending orders",
                    icon: "plane-circle-exclamation",
                    link: ""
                },
                {
                    text: "Completed orders",
                    icon: "plane-circle-check",
                    link: ""
                },
                {
                    text: "Rejected orders",
                    icon: "plane-circle-xmark",
                    link: ""
                }

            ]
        }
    ]

    const panelHtml = panel.map(el => {
        const buttonsHtml = el.buttons.map(button => {
            return (
                <div className="admin__card__button card--small">
                    <FontAwesomeIcon icon={`fa-solid fa-${button.icon}`} className='admin__button__icon' />
                    <p className="text--medium-bold text--dark">{button.text}</p>
                </div>
            )
        })
        return (
            <div className="admin__card card--small">
                <p className="text--medium-bold text--dark">{el.header}</p>
                <div className="admin__card__buttons">
                    {buttonsHtml}
                </div>
            </div>)
    })

    return (
        <div className="admin">
            <div className="container">
                <Header title="Admin panel" subtitle="" searchbar={false} buttons={false}></Header>
                <div className="admin__main">
                    <div className="admin__top-cards">
                        {panelHtml.slice(0, 2)}
                    </div>
                    <div className="admin__bottom-cards">
                        {panelHtml.slice(2, 4)}
                    </div>

                </div>
            </div>
        </div>
    );
}