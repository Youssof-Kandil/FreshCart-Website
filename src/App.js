import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Notfound from "./Components/Notfound/Notfound";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";
import Adress from "./Components/adress/adress";
import Orders from "./Components/Orders/Orders";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyCode from "./Components/Verify-code/Verify-code";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import WishListContextProvider from "./Context/WishListContext";
import WishList from "./Components/WishList/WishList";
let routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        path: "FreshCart-Website",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:productID",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "adress",
        element: (
          <ProtectedRoute>
            <Adress></Adress>
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Orders></Orders>
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList></WishList>
          </ProtectedRoute>
        ),
      },
      {
        path: "forgetPassword",
        element: <ForgetPassword></ForgetPassword>,
      },
      {
        path: "verify-code",
        element: <VerifyCode></VerifyCode>,
      },
      {
        path: "reset-password",
        element: <ResetPassword></ResetPassword>,
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <UserContextProvider>
        <WishListContextProvider>
          <CartContextProvider>
            <RouterProvider router={routes}></RouterProvider>
          </CartContextProvider>
        </WishListContextProvider>
      </UserContextProvider>

      <Toaster />
    </>
  );
}

export default App;
