import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-bold text-lg text-rose-600">Task 5 App</span>
          <nav className="flex gap-6 text-sm font-semibold text-slate-600">
            <Link to="/" className="hover:text-rose-600 transition-colors">
              Home
            </Link>
            <Link
              to="/products"
              className="hover:text-rose-600 transition-colors"
            >
              Products
            </Link>
            <Link to="/users" className="hover:text-rose-600 transition-colors">
              Users
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-4xl w-full mx-auto px-6 py-10">
        <Outlet />
      </main>

      <footer className="text-center py-4 text-xs text-slate-400 border-t border-slate-200 bg-white">
        Frontend Development Internship &bull; Task 5 Dynamic Routes
      </footer>
    </div>
  );
}
