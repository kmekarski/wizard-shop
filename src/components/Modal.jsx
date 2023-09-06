import React, { useState } from "react";
import { ModalContext } from "../context/modalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductImage from "./ProductImage";

export default function Modal(props) {
  const modalContext = React.useContext(ModalContext);

  function handleNoClick() {
    modalContext.setVisible(false);
    modalContext.setImage(null);
  }

  const listHeader = ["ID", "Name", "Price", "Quantity"];

  const headerHtml = (
    <div className="modal__items-list__header">
      {listHeader.map((el) => {
        return <p className="text--medium-bold text--dark">{el}</p>;
      })}
    </div>
  );

  const itemsHtml = modalContext.list?.map((el, index) => {
    return (
      <div
        className={`modal__items-list__row ${
          index % 2 === 1 ? "modal__items-list__row--gray" : ""
        }`}
      >
        <p className="text--small-regular text--dark">{el.id}</p>
        <p className="text--small-regular text--dark">{el.name}</p>
        <p className="text--small-reguler text--dark">${el.price}</p>
        <p className="text--small-regular text--dark">{el.number}</p>
      </div>
    );
  });

  let title = "Do you want to continue?";
  let subtitle = "Following action cannot be reversed";
  let confirmText = "Yes";
  let cancelText = "No";

  let formHtml;
  let listHtml;
  let imageHtml;

  let confirmButtonVisible = true;
  let cancelButtonVisible = true;

  switch (modalContext.method) {
    case "deleteReview": {
      title = "Confirm";
      subtitle = "Are you sure you want to remove this review?";
      break;
    }
    case "addProduct": {
      title = "Confirm";
      subtitle =
        "Are you sure you want to add product with provided parameters?";
      break;
    }
    case "editProduct": {
      title = "Confirm";
      subtitle =
        "Are you sure you want to edit this product with provided details?";
      break;
    }
    case "deleteProduct": {
      title = "Confirm";
      subtitle = "Are you sure you want to delete this product?";
      break;
    }
    case "addressSubmit": {
      title = "Confirm";
      subtitle = "Are you sure provided address is correct?";
      break;
    }
    case "paymentSubmit": {
      title = "Confirm";
      subtitle = "Are you sure provided data is correct and want to proceed?";
      break;
    }
    case "blockUser": {
      title = "Confirm";
      subtitle = "Are you sure you want to block this user?";
      break;
    }
    case "unblockUser": {
      title = "Confirm";
      subtitle = "Are you sure you want to unblock this user?";
      break;
    }
    case "completeOrder": {
      title = "Confirm";
      subtitle = "Are you sure you want to complete this order?";
      break;
    }
    case "deleteOrder": {
      title = "Confirm";
      subtitle = "Are you sure you want to delete this order?";
      break;
    }
    case "reacceptOrder": {
      title = "Confirm";
      subtitle =
        "Are you sure you want to return this order to the list of pending orders?";
      break;
    }
    case "createReport": {
      title = "Create report";
      subtitle = "Please provide the range of report";
      confirmText = "Create";
      cancelText = "Cancel";
      formHtml = (
        <div className="modal__form">
          <div className="checkout__long-input-container">
            <label htmlFor="from">Date from</label>
            <input
              type="date"
              id="from"
              name="from"
              className="checkout__input--long"
              value={modalContext.dateFrom}
              onChange={(e) => modalContext.setDateFrom(e.target.value)}
            />
          </div>
          <div className="checkout__long-input-container">
            <label htmlFor="to">Date to</label>
            <input
              type="date"
              id="to"
              name="to"
              className="checkout__input--long"
              value={modalContext.dateTo}
              onChange={(e) => modalContext.setDateTo(e.target.value)}
            />
          </div>
        </div>
      );
      break;
    }
    case "showItemsList": {
      title = "";
      subtitle = "";
      confirmButtonVisible = false;
      cancelText = "OK";
      listHtml = (
        <div className="modal__list">
          {headerHtml}
          <div className="modal__list__rows">{itemsHtml}</div>
        </div>
      );
      break;
    }
    case "showImage": {
      title = "";
      subtitle = "";
      confirmButtonVisible = false;
      cancelButtonVisible = false;
      imageHtml = <ProductImage src={modalContext.image}></ProductImage>;
      break;
    }
  }
  if (modalContext.image === null) {
    return (
      <div>
        {modalContext.visible && (
          <div className="modal">
            <div className="modal__card card--small">
              <div className="modal__header text--medium-bold text--dark">
                {title !== "" && (
                  <p className="text--medium-bold text--dark">{title}</p>
                )}
                {subtitle !== "" && (
                  <p className="text--small-regular text--dark">{subtitle}</p>
                )}
                {formHtml}
                {listHtml}
              </div>
              <div className="modal__buttons">
                {confirmButtonVisible && (
                  <div
                    className="btn--solid btn--small btn"
                    onClick={modalContext.handleButtonClick}
                  >
                    {confirmText}
                  </div>
                )}
                {cancelButtonVisible && (
                  <div
                    className="btn--solid btn--small btn"
                    onClick={handleNoClick}
                  >
                    {cancelText}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        {modalContext.visible && (
          <div className="modal btn" onClick={handleNoClick}>
            <div className="image-modal__card card--big">{imageHtml}</div>
          </div>
        )}
      </div>
    );
  }
}
