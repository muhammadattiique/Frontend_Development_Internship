import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-8 text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-extrabold text-red-600 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        The route you requested does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700"
      >
        Return Home
      </Link>
    </div>
  );
}
