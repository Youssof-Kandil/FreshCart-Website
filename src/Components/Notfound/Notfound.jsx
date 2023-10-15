import React from "react";
import Style from "./Notfound.module.css";
import err from "../../Assets/images/error.svg";

export default function Notfound() {
  return (
    <>
      <div className="text-center">
        <img src={err} alt="" className="w-50" />
      </div>
    </>
  );
}
