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

    const backendAddr = 'https://wishop.azurewebsites.net/api'

    /*
    0 - unpaid
    1 - paid
    2 - completed (shipped and delivered)
    3 - rejected
     */
    function completeOrder(order) {
        //odpowiedni fetch dla zatwierdzenia zamowienia tutaj
        order.orderState = 2
        fetch(backendAddr + '/Order/' + order.id + "?orderSate=2", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Network response was not ok");
              }
              return response;
          })
          .then((data) => {
              console.log("Order completed: ", data);
          })
          .catch((error) => {
              console.error("Error completing order: ", error);
          });
    }

    function deleteOrder(order) {
        //odpowiedni fetch dla usuniecia zamowienia z historii tutaj
        order.orderState = 3
        fetch(backendAddr + '/Order/' + order.id + "?orderSate=3", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Network response was not ok");
              }
              return response;
          })
          .then((data) => {
              console.log("Order rejected: ", data);
          })
          .catch((error) => {
              console.error("Error rejecting order: ", error);
          });
    }

    function reacceptOrder(order) {
        //odpowiedni fetch dla ponownego przyjęcia zamowienia tutaj
        completeOrder(order)
    }

    function showItemsList() {

    }

    function handleShowClick(items) {
        console.log(JSON.stringify(items))
        modalContext.setCallback(showItemsList)
        modalContext.setList(items)
    }

    function handleActionClick(e, order) {
        e.preventDefault()
        switch (e.target.innerHTML) {
            case "Complete": {
                modalContext.setCallback(() => completeOrder(order))
                break;
            }
            case "Delete": {
                modalContext.setCallback(() => deleteOrder(order))
                break;
            }
            case "Reaccept": {
                modalContext.setCallback(() => reacceptOrder(order))
                break;
            }
        }
    }
/*
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
*/

    const [orders, setOrders] = useState([])

    const getOrders = async (e) => {
        const response = await fetch(backendAddr + "/Order", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Network response was not ok");
              }
              return response.json();
          })
          .then((data) => {
              setOrders(data)
          })
          .catch((error) => {
              console.error("Error getting reviews:", error);
          })
    };

    useEffect(() => {
        getOrders()
          .catch(error => {
              console.error(error);
          });
    }, []);


    const usersHtml = (props.type === "pending" ? orders.filter(order => order.orderState === 0 || order.orderState === 1) : props.type === "completed" ? orders.filter(order => order.orderState === 2) : orders.filter(order => order.orderState === 3)).map((el, index) => {
      let date = new Date(el.dateCreated)
      return (
            <div className={`orders-list__row ${index % 2 === 1 ? "orders-list__row--gray" : ""}`}>
                <p className="text--small-regular text--dark">{el.id}</p>
                <p className="text--small-regular text--dark">{el.email}</p>
                <p className="text--small-reguler text--dark">{el.firstName + " " + el.lastName}</p>
                <p className="text--small-regular text--dark">{date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + " " + date.getHours() + ":" + (date.getMinutes().valueOf() < 10 ? '0' + date.getMinutes() : date.getMinutes())}</p>
                <p className="text--small-regular text--dark">{el.orderState === 0 ? "unpaid" : el.orderState === 1 ? "paid" : el.orderState === 2 ? "completed" : el.orderState === 3 ? "rejected" : "other"}</p>
                <div className="btn--solid btn--small btn" onClick={() => handleShowClick(el.orderItems)}>
                    Show
                </div>
                <div className="btn--solid btn--small btn" onClick={(e) => handleActionClick(e, el)}>
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


