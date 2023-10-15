import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Slider from "react-slick";

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 5,
    lazyLoad: true,
  };

  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { data, isLoading } = useQuery("categorySlider", getCategories);
  return (
    <>
      {data?.data.data ? (
        <div className="py-4">
          <Slider {...settings}>
            {data?.data.data.map((category) => (
              <div key={category._id} className="text-center">
                {" "}
                <img
                  height={300}
                  key={category._id}
                  src={category.image}
                  className="w-100"
                ></img>
                <h4 className="fw-bold">{category.name}</h4>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
