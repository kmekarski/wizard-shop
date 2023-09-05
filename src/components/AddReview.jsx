import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartPopup from "./CartPopup.jsx";
import ProductImage from "./ProductImage.jsx";
import Header from "./Header.jsx";
import { ProductsContext } from "../context/productsContext";
import { ModalContext } from "../context/modalContext.jsx";
import { UserContext } from "../context/userContext";
import UploadImage from "./UploadImage.jsx";
import { useParams } from "react-router-dom";
import TextInput from "./TextInput.jsx";

export default function AddReview(props) {
  const navigate = useNavigate();
  const productsContext = React.useContext(ProductsContext);

  const { id } = useParams();
  const product = productsContext.productsList.filter(
    (el) => el.id === parseInt(id)
  )[0];

  const backendAddr = productsContext.apiAddress;

  function handleSubmitClick() {
    addReview();
  }

  function addReview() {
    const userid = localStorage.getItem("userID");

    console.log("add review");

    const reviewData = {
      productId: id,
      userId: userid,
      title: formData.name,
      description: formData.desc,
      rating: clickedRating,
    };

    fetch(backendAddr + "/Reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Review added:", data);
        // You can handle the success response here, for example, show a success message
        // or redirect the user to a different page.
      })
      .catch((error) => {
        console.error("Error adding review:", error);
        // Handle error here, e.g., show an error message to the user.
      });
  }

  // inputs limits management:
  const [inputsOkay, setInputsOkay] = React.useState({
    name: false,
    desc: false,
    stars: false,
  });
  function setInputOkay(name, okay) {
    setInputsOkay({
      ...inputsOkay,
      [name]: okay,
    });
  }
  const allInputsOkay = Object.keys(inputsOkay).every((key) => {
    return inputsOkay[key];
  });
  ////////

  // image upload functionality
  const [reviewImages, setReviewImages] = React.useState(
    new Array(1).fill(null)
  );

  function setReviewImage(number, image) {
    const newArray = reviewImages;
    reviewImages[number - 1] = image;
    setReviewImages(newArray);
  }
  ////////////

  // stars functionality
  const [clickedRating, setClickedRating] = React.useState(0);
  const [stars, setStars] = React.useState([
    {
      filled: false,
    },
    {
      filled: false,
    },
    {
      filled: false,
    },
    {
      filled: false,
    },
    {
      filled: false,
    },
  ]);

  const starsHtml = stars.map((el, index) => {
    return (
      <div
        onMouseEnter={() => handleMouseEnterStar(index + 1)}
        onMouseLeave={handleMouseLeaveStar}
        onClick={() => handleClickStar(index + 1)}
        className={`icon--star${el.filled ? "--filled" : "--empty"}`}
      >
        <FontAwesomeIcon icon="fa-solid fa-star" className="icon--l" />
      </div>
    );
  });

  function handleMouseEnterStar(starNumber) {
    updateStars(starNumber);
  }
  function handleMouseLeaveStar() {
    updateStars(clickedRating);
  }
  function handleClickStar(starNumber) {
    setInputsOkay({
      ...inputsOkay,
      stars: true,
    });
    setClickedRating(starNumber);
  }
  function updateStars(number) {
    let newStars = [];
    for (let i = 0; i < number; i++) {
      newStars.push({ filled: true });
    }
    for (let i = number; i < 5; i++) {
      newStars.push({ filled: false });
    }
    setStars(newStars);
  }
  ///////////////////

  function handleSubmit(e) {
    e.preventDefault();
  }

  const [formData, setFormData] = React.useState({
    name: "",
    desc: "",
  });

  const leftForm = (
    <form className="add-product__form">
      <div>
        <div className="text--medium-bold text--dark">{product.name}</div>
        <div className="add-review__product-image">
          <ProductImage shadow={true} src={product.images[0]}></ProductImage>
        </div>
      </div>
      <div className="add-product__long-input-container">
        <TextInput
          limit={20}
          name="name"
          label="Set a title for your review"
          placeholder="Summarize review"
          formData={formData}
          setFormData={setFormData}
          setInputOkay={setInputOkay}
        />
      </div>
      <div className="add-product__long-input-container">
        <TextInput
          limit={20}
          name="desc"
          label="What did you like or dislike?"
          placeholder="What should shoppers know?"
          formData={formData}
          setFormData={setFormData}
          setInputOkay={setInputOkay}
        />
      </div>
    </form>
  );

  const rightForm = (
    <form onSubmit={(e) => handleSubmit(e)} className="add-product__form">
      <div>
        <label htmlFor="name">Would you like to add a photo?</label>
        <UploadImage setImage={setReviewImage} />
      </div>
      <div>
        <label htmlFor="name">Your overall rating of this product</label>
        <div className="add-review__stars">{starsHtml}</div>
      </div>
      <button
        className="btn--medium btn--solid btn add-review__add-btn"
        disabled={!allInputsOkay}
        onClick={handleSubmitClick}
      >
        Add review
      </button>
    </form>
  );

  return (
    <div className="add-review">
      <div className="container">
        <Header
          title="Add review"
          subtitle=""
          searchbar={false}
          buttons={false}
        ></Header>
        <div className="add-review__main">
          <div className="add-review__left card--big">{leftForm}</div>
          <div className="add-review__right card--big">{rightForm}</div>
        </div>
      </div>
    </div>
  );
}
