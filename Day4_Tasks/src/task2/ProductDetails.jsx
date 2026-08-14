import React from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();

  return (
    <div className="p-8 text-center max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Details</h1>
      <p className="text-gray-600 mb-6">
        Showing detailed specification parameters for Item ID:{" "}
        <strong className="text-purple-600">#{id}</strong>
      </p>
      <Link
        to="/products"
        className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
      >
        &larr; Back to Products
      </Link>
    </div>
  );
}
