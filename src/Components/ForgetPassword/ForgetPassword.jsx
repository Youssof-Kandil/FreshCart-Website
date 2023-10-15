import React, { useContext, useState } from "react";
import Style from "./ForgetPassword.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";

export default function ForgetPassword() {
  let { setUserToken } = useContext(userContext);
  let x = Yup.object({
    email: Yup.string().email("invalid email").required("email is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: x,
    onSubmit: submitLogin,
  });

  const [isLoading, setisLoading] = useState(false);
  const [error, changeError] = useState(null);
  let navigate = useNavigate();

  async function submitLogin(values) {
    setisLoading(true);
    console.log(values);
    let { data } = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .catch((error) => {
        setisLoading(false);
        console.log(error);
        changeError(error);
      });
    console.log(data);
    if (data.statusMsg === "success") {
      localStorage.setItem("email", values.email);
      setisLoading(false);
      
      navigate("/verify-code");
    }
  }

  return (
    <>
      <div className="w-75 mx-auto py-5">
        {error ? (
          <div className="alert mt-2 p-4 alert-danger">
            {error.response.data.message}
          </div>
        ) : (
          ""
        )}

        <h3>Enter Email for valdiation code :</h3>

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            className="form-control mb-3"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}

          <div className="">
            {isLoading ? (
              <button className="btn bg-main text-white mt-2">
                <i className="fas fa-spinner fa-spin"></i>
              </button>
            ) : (
              <>
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="btn bg-main text-white text-end"
                >
                  Send Code
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
