import React from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const productList = [
    { id: 1, name: "React UI Component Kit" },
    { id: 2, name: "Tailwind Dashboard Template" },
    { id: 3, name: "Fullstack Node Microservices" },
  ];

  return (
    <div className="p-8 max-w-xl mx-auto text-left">
      <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
        Products Registry
      </h1>
      <div className="space-y-3">
        {productList.map((prod) => (
          <div
            key={prod.id}
            className="p-4 border border-gray-200 rounded-lg flex justify-between items-center bg-white shadow-sm"
          >
            <span className="font-semibold text-gray-800">{prod.name}</span>
            <Link
              to={`/products/${prod.id}`}
              className="text-sm text-purple-600 font-medium hover:underline"
            >
              Details &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
