import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MutatingDots } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function FeauturedProducts() {
  let { addToCart } = useContext(cartContext);

  async function addProductToCart(pID) {
    let response = await addToCart(pID);
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

  function getFeaturedProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { isLoading, isError, data, isFetching } = useQuery(
    "featuredProducts",
    getFeaturedProducts
  );

  return (
    <>
      {data ? (
        <>
          <div className="row gx-4 gy-5 mt-4">
            {data.data.data.map(function (product, idx) {
              return (
                <div className="col-md-2" key={idx}>
                  <div className="product cursor-pointer">
                    <Link to={`/productdetails/${product.id}`}>
                      <img
                        className="w-100 pb-2"
                        src={product.imageCover}
                        alt="productImg"
                      />
                      <h6 className="m-0 Product-Cat-Color">
                        {product.category.name}
                      </h6>
                      <h4 className="m-0 fw-bold mb-4">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h4>
                      <div className="d-flex justify-content-between  align-items-center px-2">
                        <h5 className="fw-semibold">{product.price} EGP</h5>
                        <i
                          className="fa-solid fa-star"
                          style={{ color: "#ffd700" }}
                        >
                          <span className="text- text-secondary">
                            {product.ratingsAverage}
                          </span>
                        </i>
                      </div>
                    </Link>
                    <button
                      onClick={() => addProductToCart(product.id)}
                      className="btn bg-main text-white w-100 btn-sm mt-2"
                    >
                      <span className="fs-5">add to cart</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
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
