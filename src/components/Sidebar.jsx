import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import NavLink from "./NavLink";

export default function Sidebar(props) {


    const navLinksData = [
        {
            text: "Home",
            icon: "home",
            link: ""
        },
        {
            text: "All products",
            icon: "hat-wizard",
            link: ""
        },
        {
            text: "Categories",
            icon: "wand-magic-sparkles",
            link: ""
        },
        {
            text: "Contact",
            icon: "phone",
            link: ""
        }
    ]
    
    const navLinksHtml = navLinksData.map(link => {
        return <NavLink text={link.text}
                        icon={link.icon}
                        link={link.link}/>
    })

    return (
        <div className='sidebar'>
            <div className="container">

                <div className='title text--primary'>
                    <h2 className="title__text text--primary">Wizards Shop</h2>
                    <FontAwesomeIcon icon="fa-solid fa-wand-magic-sparkles" className='icon--xl'/>
                </div>

                <div className="nav">
                   {navLinksHtml}
                </div>

                <div className='newsletter card--small'>
                    <div className="newsletter__header">
                    <FontAwesomeIcon icon="fa-solid fa-newspaper" className='icon--xl'/>
                    <h2 className="text--medium-bold">Join our Newsletter!</h2>
                    <h2 className="text--desc">Get great deals and information about new products</h2>
                    </div>
                    <div className="newsletter__form">
                    <div className="newsletter__input input">
                        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className='icon--input'/>
                        <p className='text--input-small'>Email</p>
                    </div>
                    <div className="btn--solid btn--small btn">Sign me up</div>
                    </div>
                </div>

            </div>
        </div>
    )
}