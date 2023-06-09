import React from "react";
import { ModalContext } from "../context/modalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Modal(props) {

    const modalContext = React.useContext(ModalContext)

    function handleNoClick() {
        modalContext.setVisible(false)
    }

    return (
        <div>
            {modalContext.visible && <div className="modal">
                <div className={`modal__card--${modalContext.size} card--small`}>
                    <div className="modal__header text--medium-bold text--dark">
                        <p className="text--medium-bold text--dark">
                            Do you want to procceed?
                        </p>
                        <p className="text--small-regular text--dark">
                            This action cannot be reversed.
                        </p>
                    </div>
                    <div className="modal__buttons">
                        <div className="btn--solid btn--small btn" onClick={modalContext.handleButtonClick}>
                            Yes
                        </div>
                        <div className="btn--solid btn--small btn" onClick={handleNoClick}>
                            No
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}