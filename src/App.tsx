import { Box } from "@mantine/core";
import React, { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const ProductList = lazy(
  () => import("./components/dashboard/ProductListing.tsx")
);
const ProductDetails = lazy(
  () => import("./components/dashboard/ProductDetail.tsx")
);
const CartDetails = lazy(
  () => import("./components/dashboard/CartDetails.tsx")
);
const CheckoutPage = lazy(() => import("./components/dashboard/Checkout.tsx"));
const AdminLogin = lazy(() => import("./components/admin/AdminLogin.tsx"));
const AdminDashboard = lazy(
  () => import("./components/admin/AdminOverview.tsx")
);
const App = () => {
  return (
    <Box className="App" bg="white">
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartDetails />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* Add more routes as needed */}
          {/* Example routes for other components */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* <Route path="/admin/products" element={<AdminProductList />} /> */}
          {/* <Route path="/admin/orders" element={<AdminOrderList />} /> */}
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
