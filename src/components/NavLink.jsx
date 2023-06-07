import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function NavLink(props) {
  const navigate = useNavigate();
  const isCurrent = props.link === window.location.pathname
  return (
    <div className={`nav__element  btn ${isCurrent ? "nav__element--selected" : ""}`} onClick={() => navigate(props.link)}>
      <FontAwesomeIcon icon={`fa-solid fa-${props.icon}`} className='icon--l icon--primary' />
      <p className="nav__text">{props.text}</p>
    </div>
  )
}