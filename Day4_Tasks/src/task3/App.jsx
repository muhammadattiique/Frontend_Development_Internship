import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./MainLayout";
import DashboardLayout from "./DashboardLayout";
import Home from "./Home";
import About from "./About";
import DashboardHome from "./DashboardHome";
import Profile from "./Profile";
import Analytics from "./Analytics";

export default function Task3App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Route>
    </Routes>
  );
}
