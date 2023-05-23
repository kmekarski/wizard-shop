import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import NavLink from "./NavLink";
import {useNavigate} from "react-router-dom";

export default function Sidebar(props) {
    const navigate = useNavigate()

    const navLinksData = [
        {
            text: "Home",
            icon: "home",
            link: "/"
        },
        {
            text: "All products",
            icon: "hat-wizard",
            link: "/products"
        },
        {
            text: "Categories",
            icon: "wand-magic-sparkles",
            link: "/products"
        },
        {
            text: "Contact",
            icon: "phone",
            link: "/contact"
        }
    ]

    const navLinksHtml = navLinksData.map((link,index) => {
        return <NavLink key={index}
                        text={link.text}
                        icon={link.icon}
                        link={link.link}/>
    })

    return (
        <div className='sidebar'>
            <div className="container">

                <div className='title text--primary btn' onClick={() => navigate("/")}>
                    <h2 className="title__text text--primary">Wizards Shop</h2>
                    <FontAwesomeIcon icon="fa-solid fa-wand-magic-sparkles" className='icon--xl icon--primary'/>
                </div>

                <div className="nav">
                   {navLinksHtml}
                </div>

                <div className='newsletter card--small'>
                    <div className="newsletter__header">
                        <FontAwesomeIcon icon="fa-solid fa-newspaper" className='icon--xl icon--primary'/>
                        <h2 className="text--medium-bold">Join our Newsletter!</h2>
                        <h2 className="text--desc">Get great deals and information about new products</h2>
                    </div>
                    <div className="newsletter__form">
                        <div className="newsletter__input input">
                            <FontAwesomeIcon icon="fa-solid fa-envelope" className='icon--input'/>
                            <input className='text--input-medium' placeholder="Email"/>
                        </div>
                        <div className="btn--solid btn--small btn">
                            Sign me up
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}