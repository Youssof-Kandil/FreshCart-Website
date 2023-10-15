import React, { useContext } from "react";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import { Link } from "react-router-dom";
import { cartContext, getLoggedUserCart } from "../../Context/CartContext";
import { useQuery } from "react-query";
import Axios from "axios";

export default function Adress() {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  let x = Yup.object({
    details: Yup.string().required("Please Enter the Details"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required"),
    city: Yup.string().required("Please Enter the City"),
  });
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: x,
    onSubmit: submitadress,
  });
  async function submitadress(values) {
    console.log("im here");
    let data = await Axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: { token: localStorage.getItem("userToken") },
    })
      .then((response) => response)
      .catch((error) => error);
    console.log(data.data.data._id);
    let response = await onlinePayment(
      data.data.data._id,
      "http://localhost:3000",
      values
    );
    console.log(response);
    window.location.href = response.data.session.url;
  }
  let { onlinePayment, cartId } = useContext(cartContext);

  return (
    <>
      <div className="w-75 mx-auto py-5">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details">Details :</label>
          <input
            type="string"
            className="form-control mb-3"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="details"
          />
          {formik.errors.details && formik.touched.details ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.details}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="phone">Phone :</label>
          <input
            type="string"
            className="form-control mb-3"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phone"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.phone}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="city">City :</label>
          <input
            type="string"
            className="form-control mb-3"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="city"
          />
          {formik.errors.city && formik.touched.city ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.city}
            </div>
          ) : (
            ""
          )}

          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn w-100 bg-info d-block my-5 text-white"
            to={"/register"}
          >
            pay now
          </button>
        </form>
      </div>
    </>
  );
}
