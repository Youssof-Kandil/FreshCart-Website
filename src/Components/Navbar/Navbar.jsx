import React, { useContext } from "react";
import Style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Assets/images/freshcart-logo.svg";
import { userContext } from "../../Context/UserContext";

export default function Navbar() {
  let { userToken, setUserToken } = useContext(userContext);
  
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid padding-containerNav">
          <Link className="navbar-brand" to="/FreshCart-Website">
            <img src={Logo} alt="Logo of Fresh Market" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userToken ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/FreshCart-Website">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/products">
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/categories">
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/brands">
                      Brands
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                      Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/wishlist">
                      WishList
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center">
                <i className="fab fa-instagram mx-2"></i>
                <i className="fab fa-facebook mx-2"></i>
                <i className="fab fa-tiktok mx-2"></i>
                <i className="fab fa-twitter mx-2"></i>
                <i className="fab fa-linkedin mx-2"></i>
                <i className="fab fa-youtube mx-2"></i>
              </li>
              {userToken ? (
                <li className="nav-item">
                  <span onClick={logOut} className="nav-link cursor-pointer">
                    Logout
                  </span>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
