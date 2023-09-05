import React, { useEffect, useState } from "react";

import Header from "./Header";
import FeaturedCard from "./FeaturedCard";
import AdCard from "./AdCard";
import ProductCard from "./ProductCard";
import ScrollableProductsList from "./ScrollableProductsList";
import ProductImage from "./ProductImage";
import StarsDisplay from "./StarsDisplay";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { ProductsContext } from "../context/productsContext";
import { ModalContext } from "../context/modalContext";
import { faList } from "@fortawesome/free-solid-svg-icons";

export default function ProductPage(props) {
  const navigate = useNavigate();

  const productsContext = React.useContext(ProductsContext);
  const modalContext = React.useContext(ModalContext);

  const { id } = useParams();

  let product = productsContext.productsList.filter(
    (el) => el.id === parseInt(id)
  )[0];

  const backendAddr = productsContext.apiAddress;

  React.useEffect(() => {
    productsContext.setShowCart(false);
    if (!product) {
      fetch(`${backendAddr}/Products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          fetch(`${backendAddr}/ProductStorage/${data.photoId}`)
            .then((res) => res.json())
            .then((imgData) => {
              const newProduct = {
                ...data,
                img: imgData.uri,
              };
              productsContext.setProductsList((prev) => [...prev, newProduct]);
            });
        });
    }
  }, []);

  const deleteReview = (reviewId) => {
    fetch(backendAddr + "/Reviews/" + reviewId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response;
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
      });
  };

  const handleActionClick = (reviewId) => {
    modalContext.setCallback(deleteReview(reviewId));
  };

  function handleImageClick(img) {
    console.log("img clicked");
    modalContext.setCallback(showImage);
    modalContext.setImage(img);
  }

  function showImage() {}

  const [reviews, setReviews] = useState([]);

  const getReviews = async (e) => {
    const response = await fetch(
      backendAddr + "/Reviews/" + id + "/ProductReviews",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        console.error("Error getting reviews:", error);
      });
  };

  useEffect(() => {
    getReviews().catch((error) => {
      console.error(error);
    });
  }, []);

  /*[
        {
            user: "Some user",
            title: "Excelent choice",
            text: "Great wand! Bought it for my sister and she absolutely loves it!",
            rating: 3,
            withPhoto: true,
            photo: product?.img
        },
        {
            user: "Some user",
            title: "Excelent choice",
            text: "Great wand! Bought it for my sister and she absolutely loves it!",
            rating: 2,
            withPhoto: false
        }
    ]*/

  const reviewsHtml = reviews.map((el) => {
    return (
      product && (
        <div
          key={el.reviewId}
          className={`product-page__review${
            el.withPhoto ? "--with-photo" : ""
          } card--small`}
        >
          <div className="product-page__review__panel">
            <div className="product-page__review__title">
              <FontAwesomeIcon
                icon="fa-solid fa-user"
                className="icon--darker icon--s"
              />
              <div className="text--medium-regular text--dark">
                {el.username}
              </div>
              <StarsDisplay rating={el.rating} />
            </div>
            <div className="text--medium-bold text--dark">{el.title}</div>
            <div className="text--medium-regular text--dark">
              {el.description}
            </div>
          </div>
          {el.withPhoto && (
            <div className="product-page__review__image">
              <ProductImage
                shadow={true}
                src={product.images[0]}
                onClick={handleImageClick}
              ></ProductImage>
            </div>
          )}
          <div className="product-page__review__footer">
            <div className="text--small-regular text-dark">2 hours ago</div>
            <div
              className="text--small-regular text-dark btn"
              onClick={() => handleActionClick(el.reviewId)}
            >
              remove
            </div>
          </div>
        </div>
      )
    );
  });

  return (
    <div className="product-page">
      {product && (
        <div className="container">
          <Header></Header>
          <div className="product-page__main">
            <div className="product-page__preview">
              <div className="product-page__images">
                <ProductImage
                  shadow={true}
                  src={product.images[0]}
                  onClick={handleImageClick}
                ></ProductImage>
                <div className="product-page__small-images">
                  <ProductImage
                    shadow={true}
                    src={product.images[1]}
                    onClick={handleImageClick}
                  ></ProductImage>
                  <ProductImage
                    shadow={true}
                    src={product.images[2]}
                    onClick={handleImageClick}
                  ></ProductImage>
                  <ProductImage
                    shadow={true}
                    src={product.images[3]}
                    onClick={handleImageClick}
                  ></ProductImage>
                </div>
              </div>
              <div className="product-page__panel">
                <div className="product-page__text">
                  <div>
                    <div className="text--primary">{product.name}</div>
                    <div className="hr--short"></div>
                  </div>
                  <div>
                    <div className="text--primary">${product.price}</div>
                    <div className="featured__rating">
                      <StarsDisplay size="m" rating={product.rating} />
                      <p className="text--regular text--white">(200 reviews)</p>
                    </div>
                  </div>
                  <div className="text--medium-regular">
                    {product.description}
                  </div>
                </div>
                <div className="product-page__buttons">
                  <div
                    className="btn--ghost btn--big btn"
                    onClick={() => {
                      productsContext.addToCart(product.id, 1);
                      productsContext.setShowCart(true);
                    }}
                  >
                    Add to Cart
                  </div>
                  <div
                    className="btn--solid btn--big btn"
                    onClick={() => {
                      productsContext.addToCart(product.id, 1);
                      navigate("/checkout");
                    }}
                  >
                    Buy now
                  </div>
                </div>
              </div>
            </div>
            <div className="product-page__reviews-panel">
              <div className="product-page__reviews__header">
                <div className="text--primary">User reviews</div>
                <div
                  className="btn--ghost btn--big btn"
                  onClick={() => navigate(`/product/${id}/add-review`)}
                >
                  Add review
                </div>
              </div>
              <div className="product-page__reviews">{reviewsHtml}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
