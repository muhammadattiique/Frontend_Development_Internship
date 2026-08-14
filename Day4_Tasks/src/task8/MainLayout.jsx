import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";

export default function MainLayout() {
  // Helper style function for NavLink active states
  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
      isActive
        ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-bold text-lg text-indigo-600 tracking-tight">
            Task 8 Navigation
          </span>
          <nav className="flex gap-2">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/catalog" className={navLinkClass}>
              Catalog
            </NavLink>
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-4xl w-full mx-auto px-6 py-8">
        <Breadcrumbs />
        <Outlet />
      </main>

      <footer className="text-center py-4 text-xs text-slate-400 border-t border-slate-200 bg-white">
        Frontend Development Internship &bull; Task 8 Advanced Navigation
        Hierarchy
      </footer>
    </div>
  );
}
