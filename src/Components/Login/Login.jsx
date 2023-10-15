import React, { useContext, useState } from "react";
import Style from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";

export default function Login() {
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
      email: "",
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
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((error) => {
        setisLoading(false);
        changeError(error);
      });
    if (data.message === "success") {
      setisLoading(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/");
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

        <h3>login :</h3>

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

          <label htmlFor="password">Password :</label>
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
                <Link to={"/forgetPassword"} className="text-danger mx-5 p-2 border btn">
                  Forgot Password?
                </Link>
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="btn bg-main text-white text-end"
                >
                  sign in
                </button>
                <Link
                  className="btn ms-2 bg-info d-block my-5 text-white"
                  to={"/register"}
                >
                  Register Now
                </Link>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
