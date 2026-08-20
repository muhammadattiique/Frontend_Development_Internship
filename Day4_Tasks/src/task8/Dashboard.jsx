import React, { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard | Task 8 App";
  }, []);

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <h1 className="text-3xl font-bold mb-3 text-slate-900">User Dashboard</h1>
      <p className="text-slate-600">Manage user metrics and account details.</p>
    </div>
  );
}
