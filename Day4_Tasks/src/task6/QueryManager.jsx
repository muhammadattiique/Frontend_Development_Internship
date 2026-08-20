import React from "react";
import { useSearchParams } from "react-router-dom";

export default function QueryManager() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Helper to update specific parameters while keeping others
  const updateParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-slate-200">
      <h2 className="text-xl font-bold mb-4">Query Parameters Manager</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          placeholder="Search..."
          className="border p-2 rounded"
          onChange={(e) => updateParams("search", e.target.value)}
          value={searchParams.get("search") || ""}
        />
        <select
          onChange={(e) => updateParams("category", e.target.value)}
          value={searchParams.get("category") || ""}
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
        <select
          onChange={(e) => updateParams("status", e.target.value)}
          value={searchParams.get("status") || ""}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          onChange={(e) => updateParams("sort", e.target.value)}
          value={searchParams.get("sort") || ""}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="mt-4 p-4 bg-slate-100 rounded text-sm font-mono break-all">
        Current URL Params: {searchParams.toString()}
      </div>
    </div>
  );
}
