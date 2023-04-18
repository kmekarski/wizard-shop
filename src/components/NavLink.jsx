import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavLink(props) {
    return (
        <div className="nav__element">
            <FontAwesomeIcon icon={`fa-solid fa-${props.icon}`} className='icon--l' />
            <p className="nav__text">{props.text}</p>
        </div>
    )
}