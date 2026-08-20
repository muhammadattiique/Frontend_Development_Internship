import React, { useEffect } from "react";

export default function Catalog() {
  useEffect(() => {
    document.title = "Catalog | Task 8 App";
  }, []);

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <h1 className="text-3xl font-bold mb-3 text-slate-900">
        Product Catalog
      </h1>
      <p className="text-slate-600">Browse hierarchical item listings.</p>
    </div>
  );
}
