import { Box } from "@mantine/core";
import React, { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const ProductList = lazy(
  () => import("./components/dashboard/ProductListing.tsx")
);
// const CommonNavBar = lazy(
//   () => import("./components/common-navbar/CommonNavbar.tsx")
// );
const ProductDetails = lazy(
  () => import("./components/dashboard/ProductDetail.tsx")
);
const CartDetails = lazy(
  () => import("./components/dashboard/CartDetails.tsx")
);
const CheckoutPage = lazy(() => import("./components/dashboard/Checkout.tsx"));
const App = () => {
  return (
    <Box className="App" bg="white">
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartDetails />} />
          {/* Add more routes as needed */}
          <Route path="/checkout" element={<CheckoutPage />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/orders" element={<Orders />} /> */}
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
