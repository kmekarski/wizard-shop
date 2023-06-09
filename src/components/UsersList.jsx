import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartPopup from "./CartPopup.jsx";
import ProductImage from "./ProductImage.jsx";
import Header from './Header.jsx';
import { ProductsContext } from "../context/productsContext";
import { ModalContext } from '../context/modalContext.jsx';
import UploadImage from './UploadImage.jsx';
import { useParams } from 'react-router-dom';

export default function UsersList(props) {
    const navigate = useNavigate()
    const productsContext = React.useContext(ProductsContext)
    const modalContext = React.useContext(ModalContext)

    const header = ["Username", "Name", "Email", "Role", "Action"]

    function performAction() {
        if (props.type === "active") {
            //odpowiedni fetch dla banowania uźytkownika tutaj
        }
        else {
            //odpowiedni fetch dla odbanowania uźytkownika tutaj
        }
    }

    function handleActionClick() {
        modalContext.setCallback(performAction)
    }

    const activeUsers = [
        {
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            email: "klaudiuszmekarski@gmail.com",
            role: "user"
        },
        {
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            email: "klaudiuszmekarski@gmail.com",
            role: "user"
        },
        {
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            email: "klaudiuszmekarski@gmail.com",
            role: "user"
        },
        {
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            email: "klaudiuszmekarski@gmail.com",
            role: "user"
        }
    ]

    const blockedUsers = [
        {
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            email: "klaudiuszmekarski@gmail.com",
            role: "user"
        },
        {
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            email: "klaudiuszmekarski@gmail.com",
            role: "user"
        },
        {
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            email: "klaudiuszmekarski@gmail.com",
            role: "user"
        }
    ]

    const usersHtml = (props.type === "active" ? activeUsers : blockedUsers).map((el, index) => {
        return (
            <div className={`users-list__row ${index % 2 === 1 ? "users-list__row--gray" : ""}`}>
                <p className="text--small-regular text--dark">{el.username}</p>
                <p className="text--small-reguler text--dark">{el.name}</p>
                <p className="text--small-regular text--dark">{el.email}</p>
                <p className="text--small-regular text--dark">{el.role}</p>
                <div className="btn--solid btn--small btn" onClick={handleActionClick}>
                    {props.type === "active" ? "Block" : "Unblock"}
                </div>
            </div>
        )
    })

    const headerHtml = <div className="users-list__header">
        {header.map(el => {
            return (
                <p className="text--medium-bold text--dark">{el}</p>
            )
        })}
    </div>




    return (
        <div className="users-list">
            <div className="container">
                <Header title="Admin panel" subtitle={props.type === "active" ? "Active users" : "Blocked users"}
                    searchbar={false} buttons={false}></Header>
                <div className="users-list__main">
                    <div className='users-list__card card--big'>
                        {headerHtml}
                        <div className='users-list__card__rows'>
                            {usersHtml}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
