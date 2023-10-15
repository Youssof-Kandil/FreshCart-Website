import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
export default function ResetPassword() {
  let { setUserToken } = useContext(userContext);
  let x = Yup.object({
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password is too weak Start with upperCase"
      )
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: localStorage.getItem("email"),
      password: "",
    },
    validationSchema: x,
    onSubmit: submitLogin,
  });

  const [isLoading, setisLoading] = useState(false);
  const [error, changeError] = useState(null);
  let navigate = useNavigate();

  async function submitLogin(values) {
    setisLoading(true);
    let sendable = {
      email: values.email,
      newPassword: values.password,
    };
    let { data } = await axios
      .put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        sendable
      )
      .catch((error) => {
        setisLoading(false);
        changeError(error);
      });
    console.log(data.token);
    setisLoading(false);
    localStorage.removeItem("email");
    localStorage.setItem("userToken", data.token);
    navigate("/login");
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

        <h3>login :</h3>

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email :</label>
          <input
            disabled
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

          <label htmlFor="password">New Password :</label>
          <input
            type="password"
            className="form-control mb-3"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}

          <div className="text-end">
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
                  resetPassword
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
