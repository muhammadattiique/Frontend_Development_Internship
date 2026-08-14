import React from "react";
import { useOutletContext } from "react-router-dom";

export default function DashboardSettings() {
  // Consume both user data and the state updater function
  const { user, toggleTheme } = useOutletContext();

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-slate-800">
      <h2 className="text-2xl font-bold mb-3">Layout Settings & Actions</h2>
      <p className="text-slate-600 mb-4">
        You can trigger layout-level updates directly from nested child views
        using functions passed through the outlet context.
      </p>

      <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-between">
        <div>
          <p className="font-semibold text-indigo-900">
            Theme Preference Control
          </p>
          <p className="text-xs text-indigo-700">Active mode: {user.theme}</p>
        </div>
        <button
          onClick={toggleTheme}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
        >
          Change Theme
        </button>
      </div>
    </div>
  );
}
