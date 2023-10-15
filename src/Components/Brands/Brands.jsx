import React, { useState } from "react";
import { MutatingDots } from "react-loader-spinner";
import { useQuery } from "react-query";
import axios from "axios";
import { Button, Modal } from "bootstrap";

export default function Brands() {
  // Get all brands
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/Brands");
  }
  let { data, isLoading } = useQuery("brands", getBrands);

  return (
    <>
      {data?.data.data ? (
        <div className="py-4 text-center">
          <h1 className="text-main mb-3 fw-bold">All Brands</h1>
          <div className="text-center row g-4 justify-content-center">
            {data?.data.data.map((brands) => (
              <div className="col-md-3   p-0 overflow-hidden">
                <div className=" border brand cursor-pointer ">
                  <div className="img">
                    <img
                      height={300}
                      key={brands._id}
                      src={brands.image}
                      className="w-100 img-fluid ratio-4x3"
                    ></img>
                  </div>
                  <p className="fw-bold text-main bg-white py-3 mb-0">
                    {brands.name}
                  </p>
                </div>
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                ></div>
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
