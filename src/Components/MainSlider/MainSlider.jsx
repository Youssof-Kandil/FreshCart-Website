import React from "react";
import Style from "./MainSlider.module.css";
import slide1 from "../../Assets/images/slider-image-1.jpeg";
import slide2 from "../../Assets/images/slider-image-2.jpeg";
import slide3 from "../../Assets/images/slider-image-3.jpeg";
import blog1 from "../../Assets/images/grocery-banner.png";
import blog2 from "../../Assets/images/grocery-banner-2.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <>
      <div className="row g-0 py-3">
        <div className="col-md-9">
          <Slider {...settings}>
            <img
              height={500}
              className="w-100"
              src={slide1}
              alt="first Slider image"
            />
            <img
              height={500}
              className="w-100"
              src={slide2}
              alt="first Slider image"
            />
            <img
              height={500}
              className="w-100"
              src={slide3}
              alt="first Slider image"
            />
          </Slider>
        </div>
        <div className="col-md-3">
          <img className="w-100" height={250} src={blog1} alt="blog1" />
          <img className="w-100" height={250} src={blog2} alt="blog2" />
        </div>
      </div>
    </>
  );
}
