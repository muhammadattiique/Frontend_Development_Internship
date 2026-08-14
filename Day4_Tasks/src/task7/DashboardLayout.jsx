import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function DashboardLayout() {
  // Layout-level state that we want to share with nested child routes
  const [user, setUser] = useState({
    name: "Muhammad Attique Tariq",
    role: "Software Engineering Intern",
    theme: "light",
  });

  // Function to toggle layout settings/user info
  const toggleTheme = () => {
    setUser((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  return (
    <div
      className={`min-h-screen ${user.theme === "dark" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-800"}`}
    >
      <header className="bg-white border-b border-slate-200 shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-lg text-indigo-600">
          Task 7: Outlet Context
        </h1>
        <div className="flex gap-4 items-center text-sm font-semibold">
          <Link to="/dashboard" className="hover:text-indigo-600">
            Overview
          </Link>
          <Link to="/dashboard/settings" className="hover:text-indigo-600">
            Settings
          </Link>
          <button
            onClick={toggleTheme}
            className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors"
          >
            Toggle Theme ({user.theme})
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-8">
        {/* Pass user state and updater function down via context */}
        <Outlet context={{ user, setUser, toggleTheme }} />
      </main>
    </div>
  );
}
