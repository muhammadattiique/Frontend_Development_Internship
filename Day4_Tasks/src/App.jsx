import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./task2/Home";
import About from "./task2/About";
import Products from "./task2/Products";
import ProductDetails from "./task2/ProductDetails";
import Dashboard from "./task2/Dashboard";
import Settings from "./task2/Settings";
import NotFound from "./task2/NotFound";

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Sticky Navigation Bar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-extrabold text-xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
            Day 4 Tasks
          </span>
          <nav className="flex flex-wrap justify-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors"
            >
              About
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/dashboard"
              className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/settings"
              className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors"
            >
              Settings
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content Area with Fade-In Animation */}
      <main className="max-w-4xl w-full mx-auto px-6 py-12 flex-grow fade-in">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Subtle Footer */}
      <footer className="text-center py-6 text-xs text-slate-400 border-t border-slate-200/60 bg-white/40">
        Frontend Development Internship &bull; Day 4 Task Suite
      </footer>
    </div>
  );
}

export default App;
