import { Box } from "@mantine/core";
import React, { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const ProductList = lazy(
  () => import("./components/dashboard/ProductListing.tsx")
);
const CommonNavBar = lazy(
  () => import("./components/common-navbar/CommonNavbar.tsx")
);

const App = () => {
  return (
    <Box className="App" bg="white">
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
