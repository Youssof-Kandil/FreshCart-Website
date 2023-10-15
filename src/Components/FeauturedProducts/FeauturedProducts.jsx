import React, { useContext, useState } from "react";
import axios from "axios";
import { MutatingDots } from "react-loader-spinner";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { wishListContext } from "../../Context/WishListContext";

export default function FeauturedProducts() {
  const [loading, setLoaLing] = useState(false);
  const [count, setCount] = useState(0);
  let { addToCart } = useContext(cartContext);
  let { addToWishList, getLoggedUserWishList } = useContext(wishListContext);

  async function addProductToCart(pID) {
    setLoaLing(true);
    let response = await addToCart(pID);
    if (response.data.status === "success") {
      setLoaLing(false);
      toast.success("Product added to your cart", {
        duration: 3000,
        position: "top-center",
      });
    } else {
      setLoaLing(false);
      toast.error("Problem with adding product to your cart", {
        duration: 3000,
        position: "top-center",
      });
    }
  }

  const [wishListItems, setWishListItems] = useState(0);
  async function addProductToWishList(pID) {
    setLoaLing(true);
    let response = await addToWishList(pID);
    if (response.data.status === "success") {
      setLoaLing(false);
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
    setWishListItems(wishListItems + 1);
  }

  function getFeaturedProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data } = useQuery("featuredProducts", getFeaturedProducts);

  let { data: Wishlist } = useQuery(
    `wishlist-${wishListItems}`,
    getLoggedUserWishList
  );

  function isWishlisted(Pid) {
    let arrays = Wishlist?.data.data;
    for (let i = 0; i < arrays?.length; i++) {
      if (arrays[i].id == Pid) {
        return true;
      }
    }
    return false;
  }

  return (
    <>
      {data ? (
        <>
          <h1 className="pb-5">FeauturedProducts</h1>
          <div className="row gx-4 gy-5 justify-content-evenly">
            {data.data.data.map(function (product, idx) {
              return (
                <div className="col-md-2 mx-1" key={idx}>
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
                    <div className="d-flex">
                      <button
                        onClick={() => addProductToCart(product.id)}
                        className="btn bg-main text-white w-100 btn-sm mt-2"
                      >
                        <span className="fs-5">add to cart</span>
                      </button>
                      {isWishlisted(product.id) ? (
                        <button
                          onClick={() => addProductToWishList(product.id)}
                          className="border-0 bg-transparent ms-4 me-2"
                        >
                          <i class="fa-solid fa-heart fa-2xl text-danger"></i>
                        </button>
                      ) : (
                        <button
                          onClick={() => addProductToWishList(product.id)}
                          className="border-0 bg-transparent ms-4 me-2"
                        >
                          <i className="fa-regular fa-heart fa-2xl"></i>
                        </button>
                      )}
                    </div>
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
      {loading ? (
        <div className="loadingscreen">
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
      ) : (
        ""
      )}
    </>
  );
}
