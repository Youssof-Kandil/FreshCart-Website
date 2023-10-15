import React, { useContext, useState } from "react";
import Style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { MutatingDots } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { wishListContext } from "../../Context/WishListContext";

export default function ProductDetails() {
  let { addToCart } = useContext(cartContext);

  async function addProductToCart() {
    let response = await addToCart(productID);
    if (response.data.status === "success") {
      toast.success("Product added to your cart", {
        duration: 3000,
        position: "top-center",
      });
    } else {
      toast.error("Problem with adding product to your cart", {
        duration: 3000,
        position: "top-center",
      });
    }
  }

  let { productID } = useParams();

  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { data, isLoading, isError } = useQuery(
    `productDetails${productID}`,
    () => getProductDetails(productID)
  );

  const [isClicked, setIsClicked] = useState(false);
  const [loading, setLoaLing] = useState(false);
  let { addToWishList } = useContext(wishListContext);

  async function addProductToWishList() {
    setLoaLing(true);
    let response = await addToWishList(productID);
    if (response.data.status === "success") {
      setLoaLing(false);
      setIsClicked(true);
      toast.success("Product added to your WishList", {
        duration: 3000,
        position: "top-center",
      });
    } else {
      setLoaLing(false);
      toast.error("Problem with adding product to your WishList", {
        duration: 3000,
        position: "top-center",
      });
    }
  }
  console.log();
  return (
    <>
      {data?.data.data ? (
        <div className="row py-4 align-items-center gx-5 ">
          <Helmet>
            <title>{data?.data.data.title}</title>
          </Helmet>
          <div className="col-md-4">
            <img
              src={data?.data.data.imageCover}
              alt={data?.data.data.title}
              className="w-100"
            />
          </div>

          <div className="col-md-7">
            <h1>{data?.data.data.title}</h1>
            <p>{data?.data.data.description}</p>

            <h6 className="text-main">{data?.data.data?.category.name}</h6>
            <h6 className="text-main">{data?.data.data?.price} EGP</h6>

            <div className="d-flex justify-content-between">
              <span>Ratings quanitity: {data?.data.data?.ratingsQuantity}</span>
              <span>
                <i className=" fas fa-star rating-color">
                  {" "}
                  {data?.data.data?.ratingsAverage}
                </i>
              </span>
            </div>
            <div className="row my-5 justify-content-between">
              <div className="col-md-9">
                <button
                  onClick={addProductToCart}
                  className="btn bg-main text-white w-100 my-2"
                >
                  {" "}
                  Add to Cart
                </button>
              </div>
              <div className="col-md-3 d-flex justify-content-end align-items-center">
                {isClicked ? (
                  <button
                    onClick={addProductToWishList}
                    className="border-0 bg-transparent ms-4 me-2"
                  >
                    <i class="fa-solid fa-heart fa-2xl text-danger"></i>
                  </button>
                ) : (
                  <button
                    onClick={addProductToWishList}
                    className="border-0 bg-transparent ms-4 me-2"
                  >
                    <i className="fa-regular fa-heart fa-2xl"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center vh-100 ">
          <MutatingDots
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
    </>
  );
}
