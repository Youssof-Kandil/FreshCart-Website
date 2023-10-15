import React from "react";
import Style from "./Home.module.css";
import FeauturedProducts from "../FeauturedProducts/FeauturedProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>FreshCart</title>
      </Helmet>
      <MainSlider />
      <CategorySlider />

      <FeauturedProducts />
    </>
  );
}
