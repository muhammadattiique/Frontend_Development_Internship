import React from "react";
import AdvancedTable from "./AdvancedTable";

export default function Task5Preview() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8 pb-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Task 5: Advanced Data Table
          </h1>
          <p className="text-slate-400 mt-1">
            Search, filters, status badges, row actions, pagination, and
            responsive behavior.
          </p>
        </div>

        <AdvancedTable />
      </div>
    </div>
  );
}
