import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-bold text-lg text-indigo-600">Task 4 App</span>
          <nav className="flex gap-6 text-sm font-semibold text-slate-600">
            <Link to="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-indigo-600 transition-colors"
            >
              About
            </Link>
            <Link
              to="/dashboard"
              className="hover:text-indigo-600 transition-colors"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-5xl w-full mx-auto px-6 py-10">
        <Outlet />
      </main>

      <footer className="text-center py-4 text-xs text-slate-400 border-t border-slate-200 bg-white">
        Frontend Development Internship &bull; Task 4 Nested Routes
      </footer>
    </div>
  );
}
