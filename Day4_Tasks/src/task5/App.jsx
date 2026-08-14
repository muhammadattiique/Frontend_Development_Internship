import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./MainLayout";
import Home from "./Home";
import ProductsList from "./ProductsList";
import ProductDetail from "./ProductDetail";
import UsersList from "./UsersList";
import UserDetail from "./UserDetail";

export default function Task5App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Route>
    </Routes>
  );
}
