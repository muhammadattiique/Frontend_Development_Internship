import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Home | Task 8 App";
  }, []);

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <h1 className="text-3xl font-bold mb-3 text-slate-900">
        Welcome to Task 8
      </h1>
      <p className="text-slate-600">
        Explore clean hierarchy, active NavLink styling, and dynamic
        breadcrumbs.
      </p>
    </div>
  );
}
