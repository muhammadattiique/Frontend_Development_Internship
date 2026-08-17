import React from "react";
import TrendChart from "./TrendChart";
import CategoryBreakdown from "./CategoryBreakdown";

export default function Task6Preview() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8 pb-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Task 6: Dashboard Charts & Summaries
          </h1>
          <p className="text-slate-400 mt-1">
            Visual trends, category breakdowns, and performance analytics
            summaries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendChart />
          <CategoryBreakdown />
        </div>
      </div>
    </div>
  );
}
