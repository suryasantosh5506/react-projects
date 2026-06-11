import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import ProductContextProvider from "./Contexts/ProductContext/ProductContextProvider.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import ProductContext from "./Contexts/ProductContext/ProductContext.js";
import Cart from "./Components/Cart/Cart.jsx";
import ErrorPage from "./Components/ErrorPage/ErrorPage.jsx";
import CheckOut from "./Components/CheckOut/CheckOut.jsx";

const fetchAllProducts = async () => {
  const response = await fetch("https://dummyjson.com/products?limit=100");
  const data = await response.json();
  return data.products;
};

const loadDetails = async ({ params }) => {
  const response = await fetch(`https://dummyjson.com/products/${params.id}`);
  return response.json();
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} loader={fetchAllProducts} />
      <Route
        path="/product/:id"
        element={<ProductDetails />}
        loader={loadDetails}
      />
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/cart" element={<Cart />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <ProductContextProvider>
    <RouterProvider router={router} />
  </ProductContextProvider>,
);
