import React, { useContext, useEffect } from "react";
import Style from "./Layout.module.css";
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { Offline, Online } from "react-detect-offline";

export default function Layout() {
  let { setUserToken } = useContext(userContext);

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className="container-fluid padding-container ">
        <Outlet />
        <Offline>
          <div className="network text-danger-emphasis">
            <i className="fas fa-wifi "> </i> you are offline, please reconnect!
          </div>
        </Offline>
      </div>

      <Footer />
    </>
  );
}
