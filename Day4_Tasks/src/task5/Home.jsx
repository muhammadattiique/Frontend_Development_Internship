import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center shadow-sm">
      <h1 className="text-3xl font-bold mb-3 text-slate-900">
        Task 5: Dynamic Routes with useParams
      </h1>
      <p className="text-slate-600 mb-6">
        Explore dynamic detail views configured using route parameters.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/products"
          className="bg-rose-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-rose-700 transition-colors"
        >
          View Products
        </Link>
        <Link
          to="/users"
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
        >
          View Users
        </Link>
      </div>
    </div>
  );
}
