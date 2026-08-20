import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-[80vh] flex flex-col md:flex-row bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Dashboard Sidebar with links for all 5 sections */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-white font-bold text-lg mb-6 tracking-wide">
            Admin Workspace
          </h3>
          <nav className="flex flex-col gap-2 text-sm font-medium">
            <Link
              to="/dashboard"
              className="hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800"
            >
              Overview
            </Link>
            <Link
              to="/dashboard/profile"
              className="hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800"
            >
              Profile
            </Link>
            <Link
              to="/dashboard/settings"
              className="hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800"
            >
              Settings
            </Link>
            <Link
              to="/dashboard/products"
              className="hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800"
            >
              Products
            </Link>
            <Link
              to="/dashboard/analytics"
              className="hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800"
            >
              Analytics
            </Link>
            <Link
              to="/dashboard/users"
              className="hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800"
            >
              User Management
            </Link>
          </nav>
        </div>
        <div className="pt-6 border-t border-slate-800 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-300 transition-colors">
            &larr; Exit to Home
          </Link>
        </div>
      </aside>

      {/* Nested Dashboard Content Outlet */}
      <section className="flex-grow p-8 bg-slate-50">
        <Outlet />
      </section>
    </div>
  );
}
