import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-8 text-center max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Welcome to Day 4 Home
      </h1>
      <p className="text-gray-600 mb-6">
        Explore our multi-page application structure built with React Router.
      </p>
      <Link
        to="/products"
        className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700"
      >
        View Products
      </Link>
    </div>
  );
}
