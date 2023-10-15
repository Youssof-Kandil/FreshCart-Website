import React, { useContext, useEffect, useState } from "react";
import Style from "./WishList.module.css";
import { wishListContext } from "../../Context/WishListContext";

export default function WishList() {
  let { getLoggedUserWishList, removeWishListItem } =
    useContext(wishListContext);

  const [WishListProducts, setWishListProducts] = useState(null);

  async function getwishList() {
    let { data } = await getLoggedUserWishList();
    setWishListProducts(data);
    console.log(data);
  }

  async function removeWishItem(id) {
    let { data } = await removeWishListItem(id);
    console.log(data);
    if (data.status === "success") {
      const updatedWishList = WishListProducts.data.filter(
        (product) => product._id !== id
      );

      setWishListProducts((prevProducts) => ({
        ...prevProducts,
        count: prevProducts.count - 1,
        data: updatedWishList,
      }));
    }
  }

  useEffect(() => {
    getwishList();
  }, []);
  return (
    <>
      {WishListProducts ? (
        <div className="bg-main-light py-4 px-4">
          <h3>Wish List</h3>
          <h4 className="h6 text-main fw-bolder">
            {" "}
            wishList Items:{WishListProducts.count}{" "}
          </h4>
          {WishListProducts.data.map((product) => (
            <div key={product._id} className="row gy-4 border-bottom py-2 px-2">
              <div className="col-md-1">
                <img
                  className="w-100"
                  src={product.imageCover}
                  alt={product.title}
                />
              </div>
              <div className="col-md-11">
                <div className=" align-items-center h-100">
                  <div>
                    <h3 className="h6">
                      {product.title?.split(" ").slice(0, 5).join(" ")}
                    </h3>
                    <h6 className="text-main">Price: {product.price} EGP</h6>

                    <button
                      onClick={() => removeWishItem(product._id)}
                      className="btn p-0  pt-4"
                    >
                      <i className="fas fa-trash-can text-danger"></i> Remove
                      item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-main-light py-4 px-4">
          <h3>Wish List</h3>
          <h4 className="h6 text-main fw-bolder"> WishList Items: 0</h4>
        </div>
      )}
    </>
  );
}
