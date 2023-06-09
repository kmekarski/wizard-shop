import React from "react";
import { ModalContext } from "../context/modalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Modal(props) {

    const modalContext = React.useContext(ModalContext)

    function handleNoClick() {
        modalContext.setVisible(false)
    }

    let title = "Do you want to continue?"
    let subtitle = "Following action cannot be reversed"
    let confirmText = "Yes"
    let cancelText = "No"

    switch(modalContext.method) {
        case "deleteReview": {
            title = "Confirm"
            subtitle = "Are you sure you want to remove this review?"
            break
        }
        case "addProduct": {
            title = "Confirm"
            subtitle = "Are you sure you want to add product with provided parameters?"
            break
        }
        case "editProduct": {
            title = "Confirm"
            subtitle = "Are you sure you want to edit this product with provided details?"
            break
        }
        case "deleteProduct": {
            title = "Confirm"
            subtitle = "Are you sure you want to delete this product?"
            break
        }
        case "addressSubmit": {
            title = "Confirm"
            subtitle = "Are you sure provided address is correct?"
            break
        }
        case "paymentSubmit": {
            title = "Confirm"
            subtitle = "Are you sure provided data is correct and want to proceed?"
            break
        }
        case "blockUser": {
            title = "Confirm"
            subtitle = "Are you sure you want to block this user?"
            break
        }
        case "unblockUser": {
            title = "Confirm"
            subtitle = "Are you sure you want to unblock this user?"
            break
        }
        case "completeOrder": {
            title = "Confirm"
            subtitle = "Are you sure you want to complete this order?"
            break
        }
        case "deleteOrder": {
            title = "Confirm"
            subtitle = "Are you sure you want to delete this order?"
            break
        }
        case "reacceptOrder": {
            title = "Confirm"
            subtitle = "Are you sure you want to return this order to the list of pending orders?"
            break
        }
    }

    return (
        <div>
            {modalContext.visible && <div className="modal">
                <div className={`modal__card--${modalContext.size} card--small`}>
                    <div className="modal__header text--medium-bold text--dark">
                        <p className="text--medium-bold text--dark">
                            {title}
                        </p>
                        <p className="text--small-regular text--dark">
                            {subtitle}
                        </p>
                    </div>
                    <div className="modal__buttons">
                        <div className="btn--solid btn--small btn" onClick={modalContext.handleButtonClick}>
                            {confirmText}
                        </div>
                        <div className="btn--solid btn--small btn" onClick={handleNoClick}>
                            {cancelText}
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}