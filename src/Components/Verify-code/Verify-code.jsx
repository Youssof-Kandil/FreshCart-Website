import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";

export default function VerifyCode() {
  let { setUserToken } = useContext(userContext);
  let x = Yup.object({
    code: Yup.string().required("code is required"),
  });

  let formik = useFormik({
    initialValues: {
      code: "",
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
    let sendable = {
      resetCode: values.code,
    };
    let { data } = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        sendable
      )
      .catch((error) => {
        setisLoading(false);
        console.log(error);
        changeError(error);
      });
    console.log(data);
    if (data.status === "Success") {
      setisLoading(false);
      navigate("/reset-password");
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

        <h3>Enter Code recieved on Mail :</h3>

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Code :</label>
          <input
            className="form-control mb-3"
            name="code"
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="code"
          />
          {formik.errors.code && formik.touched.code ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.code}
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
                  valdiate
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
