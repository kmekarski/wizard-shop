import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";

export default function NavLink(props) {
  const navigate = useNavigate();

  return (
    <div className="nav__element btn" onClick={() => navigate(props.link)}>
      <FontAwesomeIcon icon={`fa-solid fa-${props.icon}`} className='icon--l icon--primary' />
      <p className="nav__text">{props.text}</p>
    </div>
  )
}