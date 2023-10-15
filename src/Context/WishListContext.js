import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let wishListContext = createContext();

function addToWishList(x) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        productId: x,
      },
      {
        headers: { token: localStorage.getItem("userToken") },
      }
    )
    .then((response) => response)
    .catch((error) => error);
}

export function getLoggedUserWishList() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: { token: localStorage.getItem("userToken") },
    })
    .then((response) => response)
    .catch((error) => error);
}

function removeWishListItem(prodID) {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodID}`, {
      headers: { token: localStorage.getItem("userToken") },
    })
    .then((response) => response)
    .catch((error) => error);
}

export default function WishListContextProvider(props) {
  return (
    <wishListContext.Provider
      value={{
        addToWishList,
        getLoggedUserWishList,
        removeWishListItem,
      }}
    >
      {props.children}
    </wishListContext.Provider>
  );
}
