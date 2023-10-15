import React from "react";
import Style from "./Categories.module.css";
import { MutatingDots } from "react-loader-spinner";
import { useQuery } from "react-query";
import axios from "axios";

export default function Categories() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { data, isLoading } = useQuery("categories", getCategories);
  return (
    <>
      {data?.data.data ? (
        <div className="py-4 text-center">
          <h1 className="text-main mb-3 fw-bold">All Categories</h1>
          <div className="text-center row g-4 justify-content-center">
            {data?.data.data.map((category) => (
              <div className="col-md-4   p-0 overflow-hidden">
                <div className=" border category cursor-pointer">
                  <div className="img">
                    <img
                      height={300}
                      key={category._id}
                      src={category.image}
                      className="w-100 img-fluid ratio-4x3"
                    ></img>
                  </div>
                  <p className="fw-bold text-main bg-white py-3 mb-0">
                    {category.name}
                  </p>
                </div>
              </div>
            ))}
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
