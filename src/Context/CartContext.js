import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();

function addToCart(x) {
  console.log(x, localStorage.getItem("userToken"));
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
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
function onlinePayment(cartId, url, values) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}
      `,
      {
        shippingAddress: values,
      },
      {
        headers: { token: localStorage.getItem("userToken") },
      }
    )
    .then((response) => response)
    .catch((error) => error);
}

export function getLoggedUserCart() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: { token: localStorage.getItem("userToken") },
    })
    .then((response) => response)
    .catch((error) => error);
}

function removeCartItem(prodID) {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodID}`, {
      headers: { token: localStorage.getItem("userToken") },
    })
    .then((response) => response)
    .catch((error) => error);
}
function ClearCart() {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: { token: localStorage.getItem("userToken") },
    })
    .then((response) => response)
    .catch((error) => error);
}

function updateProductQuanitity(prodID, count) {
  return axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${prodID}`,
      {
        count,
      },
      {
        headers: { token: localStorage.getItem("userToken") },
      }
    )
    .then((response) => response)
    .catch((error) => error);
}

export default function CartContextProvider(props) {
  const [cartId, setCartId] = useState(null);
  const [cartOwner, setcartOwner] = useState(null);
  async function getCart() {
    let { data } = await getLoggedUserCart();
    console.log(data?.data._id);

    setCartId(data?.data._id);
    setcartOwner(data?.data.cartOwner);
  }
  useEffect(() => {
    getCart();
  }, []);
  return (
    <cartContext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        removeCartItem,
        updateProductQuanitity,
        ClearCart,
        onlinePayment,
        cartId,
        cartOwner,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
