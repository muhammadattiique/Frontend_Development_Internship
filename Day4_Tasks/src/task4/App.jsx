import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./MainLayout";
import DashboardLayout from "./DashboardLayout";
import Home from "./Home";
import About from "./About";
import DashboardHome from "./DashboardHome";
import Profile from "./Profile";
import Settings from "./Settings";
import Products from "./Products";
import Analytics from "./Analytics";
import UserManagement from "./UserManagement";

export default function Task4App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Nested Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="products" element={<Products />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="users" element={<UserManagement />} />
        </Route>
      </Route>
    </Routes>
  );
}
