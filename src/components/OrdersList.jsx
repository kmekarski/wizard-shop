import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartPopup from "./CartPopup.jsx";
import ProductImage from "./ProductImage.jsx";
import Header from './Header.jsx';
import { ProductsContext } from "../context/productsContext.jsx";
import { ModalContext } from '../context/modalContext.jsx';
import UploadImage from './UploadImage.jsx';
import { useParams } from 'react-router-dom';

export default function OrdersList(props) {
    const navigate = useNavigate()
    const productsContext = React.useContext(ProductsContext)
    const modalContext = React.useContext(ModalContext)

    const header = ["Order ID", "Username", "Name", "Date", "Status", "Items", "Action"]

    function completeOrder() {
        //odpowiedni fetch dla zatwierdzenia zamowienia tutaj
    }

    function deleteOrder() {
        //odpowiedni fetch dla usuniecia zamowienia z historii tutaj
    }

    function reacceptOrder() {
        //odpowiedni fetch dla ponownego przyjęcia zamowienia tutaj
    }

    function showItemsList() {

    }

    function handleShowClick(items) {
        modalContext.setCallback(showItemsList)
        modalContext.setList(items)
    }

    function handleActionClick(e) {
        e.preventDefault()
        switch (e.target.innerHTML) {
            case "Complete": {
                modalContext.setCallback(completeOrder)
                break;
            }
            case "Delete": {
                modalContext.setCallback(deleteOrder)
                break;
            }
            case "Reaccept": {
                modalContext.setCallback(reacceptOrder)
                break;
            }
        }
    }

    const pendingOrders = [
        {
            id: "AKN15208",
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            date: "08.06.2023",
            status: "unpaid",
            items: [
                {
                    id: 1,
                    name: "Cedric Diggory's Wand",
                    price: 49,
                    quantity: 1                },
                {
                    id: 1,
                    name: "Cedric Diggory's Wand",
                    price: 49,
                    quantity: 2
                }
            ]
        },
        {
            id: "AKN15208",
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            date: "08.06.2023",
            status: "unpaid",
        },
        {
            id: "AKN15208",
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            date: "08.06.2023",
            status: "paid",
        },
        {
            id: "AKN15208",
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            date: "08.06.2023",
            status: "paid",
        }
    ]

    const completedOrders = [
        {
            id: "AKN15208",
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            date: "08.06.2023",
            status: "sent",
        },
        {
            id: "AKN15208",
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            date: "08.06.2023",
            status: "delivered",
        },
        {
            id: "AKN15208",
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            date: "08.06.2023",
            status: "delivered",
        }
    ]

    const rejectedOrders = [
        {
            id: "AKN15208",
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            date: "08.06.2023",
            status: "rejected"
        },
        {
            id: "AKN15208",
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            date: "08.06.2023",
            status: "rejected"
        }
    ]



    const usersHtml = (props.type === "pending" ? pendingOrders : props.type === "completed" ? completedOrders : rejectedOrders).map((el, index) => {
        return (
            <div className={`orders-list__row ${index % 2 === 1 ? "orders-list__row--gray" : ""}`}>
                <p className="text--small-regular text--dark">{el.id}</p>
                <p className="text--small-regular text--dark">{el.username}</p>
                <p className="text--small-reguler text--dark">{el.name}</p>
                <p className="text--small-regular text--dark">{el.date}</p>
                <p className="text--small-regular text--dark">{el.status}</p>
                <div className="btn--solid btn--small btn" onClick={() => handleShowClick(el.items)}>
                    Show
                </div>
                <div className="btn--solid btn--small btn" onClick={handleActionClick}>
                    {props.type === "pending" ? "Complete" : props.type === "completed" ? "Delete" : "Reaccept"}
                </div>
            </div>
        )
    })

    const headerHtml = <div className="orders-list__header">
        {header.map(el => {
            return (
                <p className="text--medium-bold text--dark">{el}</p>
            )
        })}
    </div>




    return (
        <div className="orders-list">
            <div className="container">
                <Header title="Admin panel" subtitle={props.type === "pending" ? "Pending orders" : props.type === "completed" ? "Completed orders" : "Rejected orders"}

                    searchbar={false} buttons={false}></Header>
                <div className="orders-list__main">
                    <div className='orders-list__card card--big'>
                        {headerHtml}
                        <div className='orders-list__card__rows'>
                            {usersHtml}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


