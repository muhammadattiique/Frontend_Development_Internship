import React from "react";
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Wireless Mechanical Keyboard", price: "$89" },
  { id: 2, name: "Ergonomic Office Chair", price: "$249" },
  { id: 3, name: "Ultra-Wide Gaming Monitor", price: "$499" },
];

export default function ProductsList() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-slate-900">
        Product Catalog
      </h1>
      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-lg text-slate-800">
                {product.name}
              </h3>
              <p className="text-slate-500">{product.price}</p>
            </div>
            <Link
              to={`/products/${product.id}`}
              className="bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-rose-700 transition-colors"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
