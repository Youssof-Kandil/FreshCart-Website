import React, { useContext } from "react";
import Style from "./Orders.module.css";
import { cartContext } from "../../Context/CartContext";
import { useQuery } from "react-query";
import axios from "axios";

export default function Orders() {
  let { cartOwner } = useContext(cartContext);

  function getLoggedUserCart(cartOwner) {
    console.log(cartOwner);
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`)
      .then((response) => response)
      .catch((error) => error);
  }
  let {
    isLoading,
    isError,
    data: allOrders,
    isFetching,
  } = useQuery("AllOrders", () => getLoggedUserCart(cartOwner));
  console.log(allOrders);

  return (
    <>
      {allOrders ? (
        <div className="bg-main-light py-4 px-4">
          <h3>AllORders</h3>
          <h4 className="h6 text-main fw-bolder"> allOrders numer:{}</h4>
          <h4 className="h6 text-main fw-bolder mb-4">Total Cart Price:{}</h4>
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
