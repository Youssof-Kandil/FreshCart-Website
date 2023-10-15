import React, { useContext, useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { cartContext } from "../../Context/CartContext";
import { useQuery } from "react-query";
import { MutatingDots } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Cart() {
  let { getLoggedUserCart, removeCartItem, updateProductQuanitity, ClearCart } =
    useContext(cartContext);

  const [cartProducts, setCartProducts] = useState(null);

  async function getCart() {
    let { data } = await getLoggedUserCart();
    console.log(data);
    setCartProducts(data);
  }
  async function CleartheCart() {
    let { data } = await ClearCart();
    setCartProducts(null);
  }

  async function removeItem(id) {
    let { data } = await removeCartItem(id);
    setCartProducts(data);
  }
  async function updateCount(id, count) {
    console.log(count);
    if (count == 0) {
      removeItem(id);
      return;
    }
    let { data } = await updateProductQuanitity(id, count);
    console.log(data);
    setCartProducts(data);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {cartProducts ? (
        <div className="bg-main-light py-4 px-4">
          <h3>shopping cart</h3>
          <h4 className="h6 text-main fw-bolder">
            {" "}
            Cart Items:{cartProducts.numOfCartItems}{" "}
          </h4>
          <h4 className="h6 text-main fw-bolder mb-4">
            Total Cart Price:{cartProducts.data.totalCartPrice}
          </h4>

          {cartProducts.data.products.map((product) => (
            <div key={product._id} className="row gy-4 border-bottom py-2 px-2">
              <div className="col-md-1">
                <img
                  className="w-100"
                  src={product.product.imageCover}
                  alt={product.product.title}
                />
              </div>
              <div className="col-md-11">
                <div className=" d-flex justify-content-between align-items-center h-100">
                  <div>
                    <h3 className="h6">
                      {product.product.title.split(" ").slice(0, 5).join(" ")}
                    </h3>
                    <h6 className="text-main">Price: {product.price} EGP</h6>

                    <button
                      onClick={() => removeItem(product.product._id)}
                      className="btn p-0  pt-4"
                    >
                      <i className="fas fa-trash-can text-danger"></i> Remove
                      item
                    </button>
                  </div>

                  <div>
                    <button
                      onClick={() =>
                        updateCount(product.product._id, ++product.count)
                      }
                      className="btn border-main p-2 mx-2 "
                    >
                      <i className="fa-solid fa-plus fa-xs"></i>
                    </button>
                    <span>{product.count}</span>
                    <button
                      onClick={() =>
                        updateCount(product.product._id, --product.count)
                      }
                      className="btn border-main p-2 mx-2"
                    >
                      <i className="fa-solid fa-minus fa-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="text-center">
            <Link className="btn bg-main text-white mt-3" to={"/adress"}>
              Online Payment
            </Link>
            <br />
            <Link className="btn bg-primary text-white my-3" to={"/adress"}>
              Cash payment
            </Link>
            <br />
            <br />
            <br />
            <button onClick={CleartheCart} className="btn btn-danger ">
              Clear Cart
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-main-light py-4 px-4">
          <h3>shopping cart</h3>
          <h4 className="h6 text-main fw-bolder"> Cart Items: 0</h4>
          <h4 className="h6 text-main fw-bolder mb-4">Total Cart Price:0</h4>
        </div>
      )}
    </>
  );
}
