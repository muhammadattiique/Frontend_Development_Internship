import React from "react";
import { useOutletContext } from "react-router-dom";

export default function DashboardOverview() {
  // Consume layout-level data using useOutletContext
  const { user } = useOutletContext();

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-slate-800">
      <h2 className="text-2xl font-bold mb-3">Layout Context Overview</h2>
      <p className="text-slate-600 mb-4">
        This data was passed down from the parent layout via{" "}
        <code className="bg-slate-100 px-2 py-0.5 rounded text-indigo-600">
          useOutletContext
        </code>{" "}
        without manual prop drilling:
      </p>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-sm font-medium">
        <p>
          <span className="text-slate-400">Name:</span> {user.name}
        </p>
        <p>
          <span className="text-slate-400">Role:</span> {user.role}
        </p>
        <p>
          <span className="text-slate-400">Current Theme:</span> {user.theme}
        </p>
      </div>
    </div>
  );
}
